const express = require("express");
const router = express.Router();
const DocumentSchema = require("../models/document");
const {
    emptyDocumentInputsValidation,
    typeDocumentInputsValidation,
    emptyFileDocumentInputValidation
} = require("../helpers/input_validate_middleware");
const { initDocumentMiddleware } = require('../helpers/init_doc')
const { authenticateAccessToken } = require("../helpers/jwt_services");
const { upload } = require("../helpers/multer_middleware");
const ObjectId = require("mongodb").ObjectId;
const { S3Client, DeleteObjectCommand } = require('@aws-sdk/client-s3')

const config = {
    version: 'latest',
    region: 'ap-southeast-1',
    endpoint: 'https://s3.ap-southeast-1.amazonaws.com',
    credentials: {
        accessKeyId: 'AKIAJWV2UWBGOU7M53TA',
        secretAccessKey: '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',
    },
}

const s3 = new S3Client(config)

router.use(authenticateAccessToken);
router.get("/api/get-all-documents", async (req, res) => {
    try {
        let { page, limit, query, id } = req.query;
        console.log(id, "get req id");
        let skip = (parseInt(page) - 1) * parseInt(limit);
        const documents = await DocumentSchema.find({
            program: {
                id: new ObjectId(id),
            },
            name: {
                $regex: query,
            },
        })
            .lean()
            .sort({
                _id: -1,
            })
            .skip(skip)
            .limit(limit);
        let count = await DocumentSchema.countDocuments({
            program: { id: new ObjectId(id) }
        });
        let stt = 0;
        const aDocuments = documents.map((doc) => {
            stt++;
            // const id = doc._id.toString()
            return {
                ...doc,
                stt: stt,
            };
        });
        console.log(aDocuments, "aDocuments");
        res.json({
            data: aDocuments,
            count: count,
            error: false,
        });
    } catch (error) {
        console.log(error, "get programs api catch block error");
        res.json({
            error: true,
            message: "something went wrong",
        });
    }
});

router.post(
    "/api/create-document",
    initDocumentMiddleware,
    upload.single("documentFile"),

    async (req, res) => {
        try {
            const {
                programId,
                name,
                content,
                effDate,
                expireIn,
            } = req.body;
            console.log(req.body, "req.body post api");
            const attachedDoc = req.file;
            console.log(attachedDoc, "req.file post api");
            let attachedDocLink = ""
            let attachedDocName = ""
            if (!attachedDoc) {
                attachedDocLink = ""
                attachedDocName = ""
            } else {
                attachedDocLink = attachedDoc.location
                attachedDocName = attachedDoc.originalname
            }
            const docId = req.payload
            console.log(docId, "docId post api")
            const newDocument = {
                name: name,
                content: content,
                effDate: effDate,
                expireIn: expireIn,
                attachedDocLink: attachedDocLink,
                attachedDocName: attachedDocName,

                program: {
                    id: programId,
                },
            };
            const storingDoc = await DocumentSchema.findOneAndUpdate({ _id: docId }, newDocument, {new: true})
            console.log(storingDoc, "storingDoc")
            res.json({
                error: false,
                message: "Lưu thành công văn bản",
            });
            
        } catch (error) {
            console.log(error, "post api catch block error");
            res.json({
                error: true,
                message: "something went wrong",
            });
        }
    }
);

router.put(
    "/api/edit-document/:id",
    upload.single("documentFile1"),

    async (req, res) => {
        try {
            const { id } = req.params;
            const {
                name,
                content,
                effDate,
                expireIn,
                attachedDocLink,
                attachedDocName,
            } = req.body;
            console.log(id, "::put api id::");
            let newAttachedDocLink = '';
            const attachedDoc = req.file;
            console.log(attachedDoc, "attachedDoc put api")
            if (attachedDoc) {
                if (attachedDocLink === "") {
                    console.log('ko có link ảnh cũ edit-document api')
                } else {
                    const oldFileKey = attachedDocLink.replace("https://acvnapps.s3.ap-southeast-1.amazonaws.com/", "")
                    console.log(oldFileKey, "oldFileKey put api")
                    const newDeleteCommand = new DeleteObjectCommand({
                        Bucket: 'acvnapps',
                        Key: `${oldFileKey}`
                    })
                    const result = await s3.send(newDeleteCommand)
                    console.log(result, ":::result, newDeleteCommand put api:::")
                }
                newAttachedDocLink = attachedDoc.location
            } else {
                newAttachedDocLink = attachedDocLink
            }

            const updatingDocument = {
                name: name,
                content: content,
                effDate: effDate,
                expireIn: expireIn,
                attachedDocLink: newAttachedDocLink,
                attachedDocName: attachedDocName,
            };
            console.log(req.body, "put api req.body");
            const updatedDocument = await DocumentSchema.findOneAndUpdate(
                {
                    _id: id,
                },
                updatingDocument,
                {
                    new: true,
                }
            );
            console.log(updatedDocument, "updatedDocument");
            res.json({
                error: false,
                message: "Văn bản đã được sửa thành công",
            });
        } catch (error) {
            console.log(error, "put catch block error");
            res.json({
                error: true,
                message: "something went wrong!",
            });
            // next(error)
        }
    }
);

router.delete("/api/delete-document/:id", async (req, res) => {
    try {
        const { id } = req.params;
        console.log(id, "::id delete api::");
        const deletingDocument = await DocumentSchema.findOne({
            _id: id
        });
        const attachedDocLink = deletingDocument.attachedDocLink

        if (attachedDocLink === "") {
            console.log('ko có link ảnh cũ delete-close-decision api')
        } else {
            const delDocKey = deletingDocument.attachedDocLink.replace("https://acvnapps.s3.ap-southeast-1.amazonaws.com/", "")
            console.log(delDocKey, "delDocKey delete api")
            const newDeleteCommand = new DeleteObjectCommand({
                Bucket: 'acvnapps',
                Key: `${delDocKey}`
            })
            const result = await s3.send(newDeleteCommand)
            console.log(result, "newDeleteCommand result delete api")
        }
        const delDoc = await DocumentSchema.findOneAndDelete({ _id: id })
        console.log(delDoc, "delDoc")
        res.json({
            error: false,
            message: "Xóa thành công văn bản",
        });
    } catch (error) {
        console.log(error, "delete catch block error");
        res.json({
            error: true,
            message: "something went wrong!",
        });
    }
});

router.use('/api/create-document', async (error, req, res, next) => {
    try {
        console.log(error, "error handle post api midddleware")
        const docId = req.payload
        const docFile = req.file
        const delInitDoc = await DocumentSchema.deleteOne({ _id: docId })
        console.log(delInitDoc, "deleted delInitDoc")
        if (!docFile) {
            next(error)
        } else {
            console.log('POST api error!! So, delete images just uploaded')
            const fileKey = docFile.Key
            const newDeleteCommand = new DeleteObjectCommand({
                Bucket: 'acvnapps',
                Key: `${fileKey}`
            })
            const result = await s3.send(newDeleteCommand)
            console.log(result, "::: s3 file deleted result, post api:::")
            next(error)
        }
    } catch (error) {
        console.log(error, "post error handling middleware catch block error")
        res.json({ error: true, message: 'something went wrong' }) // nếu có lỗi gì xảy ra ở try block owr treen thì lỗi đc xử lí ở đây
    }
})

router.use('/api/edit-document/:id', async(error, req, res, next) => {
    try {
        console.log(error, "error handle put api middleware")
        const { id } = req.params
        const docFile = req.file
        if (!docFile) {
            next(error)
        } else {
            const fileKey = docFile.Key
            const newDeleteCommand = new DeleteObjectCommand({
                Bucket: 'acvnapps',
                Key: `${fileKey}`
            })
            const result = await s3.send(newDeleteCommand)
            console.log(result, ":::result, post api:::")
            next(error)
        }
    } catch (error) {
        console.log(error, "put error handling middleware catch block error")
        res.json({ error: true, message: 'something went wrong' })
    }
})

router.use((error, req, res, next) => {
    // hàm này cần đủ cả 4 params error, req, res, next
    if (error) {
        console.log(error, "custom error handler");

        if (error.code === "EMPTY_DOCUMENT_FILE_INPUT_ERROR") {
            console.log(error.code, "empty input error");
            return res.json({
                error: true,
                message: "Chưa chọn file nào",
            });
        }

        // if (error.code === "DOCUMENT_INPUTS_TYPE_ERROR") {
        //     console.log("input type error");
        //     return res.json({
        //         error: true,
        //         message: "Hãy điền đúng loại dữ liệu",
        //     });
        // }
    }
});

module.exports = router;
