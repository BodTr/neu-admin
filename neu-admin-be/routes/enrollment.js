const express = require('express')
const router = express.Router()
const EnrollmentSchema = require('../models/enrollment')
const EnrollmentDocsSchema = require('../models/enrollment_file')
const {  emptyEnrollmentFileInputValidation, emptyEnrollmentInputsValidation, typeEnrollmentInputsValidation } = require('../helpers/input_validate_middleware')
const { authenticateAccessToken } = require('../helpers/jwt_services')
const { initEnrollmentDocMiddleware } = require('../helpers/init_doc')
const { S3Client, DeleteObjectsCommand } = require("@aws-sdk/client-s3");
const { docsControl } = require("../helpers/docs_controller");
const { deleteFolder } = require("../helpers/delete_s3files");
const { upload } = require("../helpers/multer_middleware");
const ObjectId = require("mongodb").ObjectId

const config = {
    version: "latest",
    region: "ap-southeast-1",
    endpoint: "https://s3.ap-southeast-1.amazonaws.com",
    credentials: {
        accessKeyId: "AKIAJWV2UWBGOU7M53TA",
        secretAccessKey: "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",
    },
};

const s3 = new S3Client(config);

router.use(authenticateAccessToken)
router.get('/api/get-all-enrollments', async (req, res) => {
    try {
        let { page, limit, query, id } = req.query
        console.log(id, "get req id")
        let skip = (parseInt(page) - 1) * parseInt(limit)
        let filter = {program: { id: new ObjectId(id) }}
        if (query) {
            filter = {
                year: { $eq: query },
                program: { id: new ObjectId(id) }
            }
        }
        const enrollments = await EnrollmentSchema.find(
            filter
            // year : { $eq: query }
            
        ).lean().sort({ _id: -1 }).skip(skip).limit(limit)
        let count = await EnrollmentSchema.countDocuments({
            program: { id: new ObjectId(id) }
        })
        const enrollmentDocs = await EnrollmentDocsSchema.find({
            program: { id: new ObjectId(id) },
        }).lean().skip(skip).limit(limit);
        let stt = 0
        const aEnrollments = enrollments.map( doc => {
            stt++
            // const id = doc._id.toString()
            const id = doc._id.toString();
            const enrollmentDocsArr = enrollmentDocs.filter((doc) => {
                return doc.enrollment.id.toString() === id;
            })
            return {
                ...doc,
                stt: stt,
                enrollmentDocs: enrollmentDocsArr
            }
        })
        console.log(aEnrollments, "aEnrollments")
        res.json({ data: aEnrollments, count: count, error: false })
    } catch (error) {
        console.log(error, "get programs api catch block error")
        res.json({ error: true, message: "something went wrong" })
    }
})

router.post('/api/create-enrollment', initEnrollmentDocMiddleware, upload.array("enrollmentDocs"), emptyEnrollmentFileInputValidation, emptyEnrollmentInputsValidation, typeEnrollmentInputsValidation, async (req, res) => {
    try {
        const { programId, year, enrollmentCount, admissionCount, transferStudents, graduatedCount, admittedStudents, applicantsCount, dropoutCount, reservedStudents, trainingStudents } = req.body;
        console.log(req.body, "req.body post api")
        console.log(req.payload, "req.payload, create-enrollment api");
        const enrollmentId = req.payload
        const docs = req.files
        console.log(docs, "req.files create-enrollment api");
        const newEnrollment = {
            year: year,
            enrollmentCount: enrollmentCount,
            admissionCount: admissionCount,
            transferStudents: transferStudents,
            graduatedCount: graduatedCount,
            admittedStudents: admittedStudents,
            applicantsCount: applicantsCount,
            dropoutCount: dropoutCount,
            reservedStudents: reservedStudents,
            trainingStudents: trainingStudents,
            program: {
                id: programId
            }
        }

        const storingEnrollment = await EnrollmentSchema.findOneAndUpdate({ _id: enrollmentId }, newEnrollment, { new: true })
        console.log(storingEnrollment, "storingEnrollment create-enrollment api")
        const enrollmentDocsArray = docs.map((doc) => {
            return {
                docLink: doc.location,
                docName: doc.originalname,
                docSize: doc.size,
                docType: doc.mimetype,
                program: {
                    id: programId
                },
                enrollment: {
                    id: enrollmentId
                }
            }
        })
        const savedEnrollmentDocsArray = await EnrollmentDocsSchema.insertMany(enrollmentDocsArray)
        console.log(savedEnrollmentDocsArray, "savedEnrollmentDocsArray create-enrollment api")
        res.json({ error: false, message: 'Lưu thành công' })
        
    } catch (error) {
        console.log(error, "post api catch block error")
        res.json({ error: true, message: "something went wrong" })
    }
})

router.put('/api/edit-enrollment/:id', upload.array("enrollmentDocs1"), emptyEnrollmentInputsValidation, typeEnrollmentInputsValidation, async(req, res) => {
    try {
        const { id } = req.params
        const { programId, year, enrollmentCount, admissionCount, transferStudents, graduatedCount, admittedStudents, applicantsCount, dropoutCount, reservedStudents, trainingStudents, docsState } = req.body;
        console.log(id, "::edit-enrollment api id::")
        const updatingEnrollment = {
            year: year,
            enrollmentCount: enrollmentCount,
            admissionCount: admissionCount,
            transferStudents: transferStudents,
            graduatedCount: graduatedCount,
            admittedStudents: admittedStudents,
            applicantsCount: applicantsCount,
            dropoutCount: dropoutCount,
            reservedStudents: reservedStudents,
            trainingStudents: trainingStudents,
        }
        const doc1Refs = JSON.parse(docsState)["docs1Refs"];
        const docs1 = req.files;
        console.log(req.body, "edit-enrollment api req.body");
        console.log(doc1Refs, "doc1Refs edit-enrollment api");
        console.log(docs1, "docs1 edit-enrollment api");

        let deleteEnrollmentDocsLinks = [];
        let deletedEnrollmentDocsKeys = [];
        let docsControlResultError = "";
        const enrollmentdocsArrayInDb = await EnrollmentDocsSchema.find({ enrollment: {id: new ObjectId(id)} })
        console.log(enrollmentdocsArrayInDb, "enrollmentdocsArrayInDb edit-enrollment api")
        const docsControlResult = docsControl(doc1Refs, enrollmentdocsArrayInDb)
        console.log(docsControlResult, "docsControlResult edit-enrollment api");
        if (docsControlResult === "DOCS1_EMPTY_INPUT_ERROR") {
            console.log("empty docs1 input");
            docsControlResultError = "DOCS1_EMPTY_INPUT_ERROR";
            // res.json({ error: true, message: "Hãy điền đầy đủ form" })
        } else if (docsControlResult === "DUPLICATED_DOCS_ERROR") {
            console.log("duplicated docs");
            docsControlResultError = "DUPLICATED_DOCS_ERROR";
            // res.json({ error: true, message: "có file trùng" })
        } else if (docsControlResult.length === 0) {
            // pass
            console.log("không file nào phải xóa");
        } else {
            docsControlResult.forEach((doc) => {
                const docLink = doc.docLink;
                const key = docLink.replace(
                    "https://acvnapps.s3.ap-southeast-1.amazonaws.com/",
                    ""
                );
                deleteEnrollmentDocsLinks.push(docLink);
                deletedEnrollmentDocsKeys.push(key);
            });
            console.log(deleteEnrollmentDocsLinks, "deleteEnrollmentDocsLinks put api");
            console.log(deletedEnrollmentDocsKeys, "deletedEnrollmentDocsKeys put api");

            // Xóa link các file không tồn tại nữa trên s3
            const deleteObjectsCommand = new DeleteObjectsCommand({
                // Object này yêu cầu có 1 array các key của các file ta muốn xóa
                Bucket: "acvnapps",
                Delete: {
                    Objects: deletedEnrollmentDocsKeys.map((key) => {
                        return {
                            Key: key,
                        };
                    }),
                },
            });

            const result = await s3.send(deleteObjectsCommand);
            console.log(result, "result deleteObjectsCommand put api");

            // Xóa link các file không tồn tại nữa trong db
            const deletedEnrollmentDocs = await EnrollmentDocsSchema.deleteMany({
                docLink: { $in: deleteEnrollmentDocsLinks },
            });
            console.log(deletedEnrollmentDocs, "deletedEnrollmentDocs edit-enrollment api");
        }

        if (docsControlResultError === "") {
            // update Enrollment infor
            const updatedEnrollment = await EnrollmentSchema.findOneAndUpdate(
                { _id: id },
                updatingEnrollment,
                { new: true }
            );
            console.log(updatedEnrollment, "updatedEnrollment edit-enrollment api");

            // update Enrollment files
            if (docs1) {
                const updatedEnrollmentDocs = docs1.map((doc) => {
                    return {
                        docLink: doc.location,
                        docName: doc.originalname,
                        docSize: doc.size,
                        docType: doc.mimetype,
                        program: {
                            id: programId,
                        },
                        enrollment: {
                            id: id,
                        },
                    };
                });

                const savedEnrollmentDocs = await EnrollmentDocsSchema.insertMany(
                    updatedEnrollmentDocs
                );
                console.log(savedEnrollmentDocs, "savedEnrollmentDocs put api");
            } else {
                console.log("không có ảnh mới để lưu");
            }
            res.json({ error: false, message: "Sửa thành công" })
        } else if (docsControlResultError === "DOCS1_EMPTY_INPUT_ERROR") {
            res.json({ error: true, message: "Hãy điền đầy đủ form" })
        } else if (docsControlResultError === "DUPLICATED_DOCS_ERROR") {
            res.json({ error: true, message: "có file trùng" })
        }
        
    } catch (error) {
        console.log(error, "put catch block error")
        res.json({error: true, message: "something went wrong!"})
        // next(error)
    }
})

router.delete('/api/delete-enrollment/:id', async(req, res) => {
    try {
        const { id } = req.params
        console.log(id, "::id delete api::")
        // Xóa các file cần xóa trên s3
        const prefix = `enrollment-file-${id}`;
        const delFolderRes = await deleteFolder(prefix);
        console.log(delFolderRes, "delFolderRes delete-enrollment api");

        // Xóa thông tin các file cần xóa trong db
        const delEnrollmentFiles = await EnrollmentDocsSchema.deleteMany({
            enrollment: { id: new ObjectId(id) },
        });
        console.log(delEnrollmentFiles, "delEnrollmentFiles delete-enrollment api");

        // Xóa thông tin enrollment cần xóa
        const deletingEnrollment = await EnrollmentSchema.findOneAndDelete({ _id: id })
        console.log(deletingEnrollment, "deletingEnrollment")
        res.json({ error: false, message: "Xóa thành công" })
    } catch (error) {
        console.log(error, "delete catch block error")
        res.json({error: true, message: "something went wrong!"})
    }
})

router.use("/api/create-enrollment", async (error, req, res, next) => {
    try {
        console.log(error, "error handler post api middleware");
        const enrollmentId = req.payload;
        const docs = req.files;
        const delInitDoc = await EnrollmentSchema.deleteOne({ _id: enrollmentId });
        console.log(delInitDoc, "delInitDoc error handler post api");
        if (!docs) {
            next(error);
        } else {
            const prefix = `enrollment-file-${id}`;
            const delFolderRes = await deleteFolder(prefix);
            console.log(
                "POST api error!! So, delete images just uploaded",
                delFolderRes
            );
            next(error);
        }
    } catch (error) {
        console.log(error, "error handler post api catch block error");
        res.json({ error: true, message: "something went wrong" });
    }
});

router.use("/api/edit-enrollment/:id", async (error, req, res, next) => {
    try {
        console.log(error, "error handler put api middleware");
        const { id } = req.params;
        const docs1 = req.files;

        if (!docs1) {
            next(error);
        } else {
            const keysArr = docs1.map((doc) => {
                doc.key;
            });
            console.log(keysArr);
            const deleteObjectsCommand = new DeleteObjectsCommand({
                Bucket: "acvnapps",
                Delete: {
                    Objects: keysArr.map((key) => {
                        return {
                            Key: key,
                        };
                    }),
                },
            });

            const result = await s3.send(deleteObjectsCommand);
            console.log(
                result,
                ":::PUT api error!! So, delete images just uploaded:::"
            );
            next(error);
        }
    } catch (error) {
        console.log(error, "error handler put api catch block error");
        res.json({ error: true, message: "something went wrong" });
    }
});

router.use((error, req, res, next) => { // hàm này cần đủ cả 4 params error, req, res, next
    if (error) {
        console.log(error, "custom error handler")

        if (error.code === "EMPTY_ENROLLMENT_INPUTS_ERROR" || error.code === "EMPTY_ENROLLMENT_FILES_INPUT_ERROR") {
            console.log(error.code, "empty input error")
            return res.json({ error: true, message: "Hãy điền đẩy đủ form" })
        }
    
        if (error.code === "ENROLLMENT_INPUTS_TYPE_ERROR") {
            console.log("input type error")
            return res.json({ error: true, message: "Hãy điền đúng loại dữ liệu" })
        }
    }
    

})

module.exports = router