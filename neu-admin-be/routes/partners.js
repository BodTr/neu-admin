const express = require("express");
const router = express.Router();
const PartnerSchema = require("../models/partner");
const PartnerDocsSchema = require("../models/partner_file");
const {
    emptyPartnerInputsValidation,
    emptyPartnerFileInputValidation,
} = require("../helpers/input_validate_middleware");
const { initPartnerMiddleware } = require("../helpers/init_doc");
const { authenticateAccessToken } = require("../helpers/jwt_services");
const { S3Client, DeleteObjectsCommand } = require("@aws-sdk/client-s3");
const { docsControl } = require("../helpers/docs_controller");
const { deleteFolder } = require("../helpers/delete_s3files");
const { upload } = require("../helpers/multer_middleware");
const ObjectId = require("mongodb").ObjectId;

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

router.use(authenticateAccessToken);
router.get("/api/get-all-partners", async (req, res) => {
    try {
        let { page, limit, query, id } = req.query;
        console.log(id, "get req id");
        let skip = (parseInt(page) - 1) * parseInt(limit);
        const partners = await PartnerSchema.find({
            program: { id: new ObjectId(id) },
            vn_name: { $regex: query },
        })
            .lean()
            .sort({ _id: -1 })
            .skip(skip)
            .limit(limit);
        let count = await PartnerSchema.countDocuments({
            program: { id: new ObjectId(id) },
        });
        let stt = 0;

        const partnerDocs = await PartnerDocsSchema.find({
            program: { id: new ObjectId(id) },
        })
            .lean()
            .skip(skip)
            .limit(limit);
        console.log(partnerDocs, "partnerDocs get api");

        const aPartners = partners.map((doc) => {
            stt++;
            const id = doc._id.toString();
            const partnerDocsArr = partnerDocs.filter((doc) => {
                return doc.partner.id.toString() === id;
            });
            return {
                ...doc,
                stt: stt,
                partnerDocs: partnerDocsArr,
            };
        });
        console.log(aPartners, "aPartners");
        res.json({ data: aPartners, count: count, error: false });
    } catch (error) {
        console.log(error, "get programs api catch block error");
        res.json({ error: true, message: "something went wrong" });
    }
});

router.post(
    "/api/create-partner",
    initPartnerMiddleware,
    upload.array("docs"),
    emptyPartnerFileInputValidation,
    emptyPartnerInputsValidation,
    async (req, res) => {
        try {
            const {
                programId,
                vn_name,
                en_name,
                address,
                internationalRanking,
                website,
                contacterName,
                contacterPosition,
                contacterEmail,
                contacterUnit,
                uniLeaderName,
                uniLeaderPosition,
                uniLeaderEmail,
                uniLeaderUnit,
                unitLeaderName,
                unitLeaderPosition,
                unitLeaderEmail,
                unitLeaderUnit,
                farName,
                farPosition,
                farEmail,
                farUnit,
                progManagerName,
                progManagerPosition,
                progManagerEmail,
                progManagerUnit,
            } = req.body;
            console.log(req.body, "req.body post api");
            console.log(req.payload, "req.payload, create-partner api");
            const partnerId = req.payload;
            const docs = req.files;
            console.log(docs, "req.files create-partner api");
            const newPartner = {
                vn_name: vn_name,
                en_name: en_name,
                address: address,
                internationalRanking: internationalRanking,
                website: website,
                contacterName: contacterName,
                contacterPosition: contacterPosition,
                contacterEmail: contacterEmail,
                contacterUnit: contacterUnit,
                uniLeaderName: uniLeaderName,
                uniLeaderPosition: uniLeaderPosition,
                uniLeaderEmail: uniLeaderEmail,
                uniLeaderUnit: uniLeaderUnit,
                unitLeaderName: unitLeaderName,
                unitLeaderPosition: unitLeaderPosition,
                unitLeaderEmail: unitLeaderEmail,
                unitLeaderUnit: unitLeaderUnit,
                farName: farName,
                farPosition: farPosition,
                farEmail: farEmail,
                farUnit: farUnit,
                progManagerName: progManagerName,
                progManagerPosition: progManagerPosition,
                progManagerEmail: progManagerEmail,
                progManagerUnit: progManagerUnit,
                program: {
                    id: programId,
                },
            };

            const storingPartner = await PartnerSchema.findOneAndUpdate(
                { _id: partnerId },
                newPartner,
                { new: true }
            );
            console.log(storingPartner, "storingPartner create-partner api");

            const partnerDocsArray = docs.map((doc) => {
                return {
                    docLink: doc.location,
                    docName: doc.originalname,
                    docSize: doc.size,
                    docType: doc.mimetype,
                    program: {
                        id: programId,
                    },
                    partner: {
                        id: partnerId,
                    },
                };
            });

            const savedPartnerDocsArray = await PartnerDocsSchema.insertMany(
                partnerDocsArray
            );
            console.log(
                savedPartnerDocsArray,
                "savedPartnerDocsArray create-partner api"
            );

            res.json({ error: false, message: "Lưu thành công đối tác" });
        } catch (error) {
            console.log(error, "post api catch block error");
            res.json({ error: true, message: "something went wrong" });
        }
    }
);

router.put(
    "/api/edit-partner/:id",
    upload.array("docs1"),
    emptyPartnerInputsValidation,
    async (req, res) => {
        try {
            const { id } = req.params;
            const {
                programId,
                vn_name,
                en_name,
                address,
                internationalRanking,
                website,
                contacterName,
                contacterPosition,
                contacterEmail,
                contacterUnit,
                uniLeaderName,
                uniLeaderPosition,
                uniLeaderEmail,
                uniLeaderUnit,
                unitLeaderName,
                unitLeaderPosition,
                unitLeaderEmail,
                unitLeaderUnit,
                farName,
                farPosition,
                farEmail,
                farUnit,
                progManagerName,
                progManagerPosition,
                progManagerEmail,
                progManagerUnit,
                docsState,
            } = req.body;
            console.log(id, "::put api id::");
            const updatingPartner = {
                vn_name: vn_name,
                en_name: en_name,
                address: address,
                internationalRanking: internationalRanking,
                website: website,
                contacterName: contacterName,
                contacterPosition: contacterPosition,
                contacterEmail: contacterEmail,
                contacterUnit: contacterUnit,
                uniLeaderName: uniLeaderName,
                uniLeaderPosition: uniLeaderPosition,
                uniLeaderEmail: uniLeaderEmail,
                uniLeaderUnit: uniLeaderUnit,
                unitLeaderName: unitLeaderName,
                unitLeaderPosition: unitLeaderPosition,
                unitLeaderEmail: unitLeaderEmail,
                unitLeaderUnit: unitLeaderUnit,
                farName: farName,
                farPosition: farPosition,
                farEmail: farEmail,
                farUnit: farUnit,
                progManagerName: progManagerName,
                progManagerPosition: progManagerPosition,
                progManagerEmail: progManagerEmail,
                progManagerUnit: progManagerUnit,
            };
            const docs1Refs = JSON.parse(docsState)["docs1Refs"];
            const docs1 = req.files;
            console.log(docs1Refs, "docs1Refs put api");
            console.log(req.body, "put api req.body");
            console.log(docs1, "docs1 put api");
            let deletePartnerDocsLinks = [];
            let deletedPartnerDocsKeys = [];
            let docsControlResultError = "";
            const partnerDocsArrayInDb = await PartnerDocsSchema.find({
                partner: { id: new ObjectId(id) },
            });
            const docsControlResult = docsControl(docs1Refs, partnerDocsArrayInDb);
            console.log(docsControlResult, "docsControlResult");
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
                    deletePartnerDocsLinks.push(docLink);
                    deletedPartnerDocsKeys.push(key);
                });
                console.log(deletePartnerDocsLinks, "deletePartnerDocsLinks put api");
                console.log(deletedPartnerDocsKeys, "deletedPartnerDocsKeys put api");

                // Xóa link các file không tồn tại nữa trên s3
                const deleteObjectsCommand = new DeleteObjectsCommand({
                    // Object này yêu cầu có 1 array các key của các file ta muốn xóa
                    Bucket: "acvnapps",
                    Delete: {
                        Objects: deletedPartnerDocsKeys.map((key) => {
                            return {
                                Key: key,
                            };
                        }),
                    },
                });

                const result = await s3.send(deleteObjectsCommand);
                console.log(result, "result deleteObjectsCommand put api");

                // Xóa link các file không tồn tại nữa trong db
                const deletedPartnerDocs = await PartnerDocsSchema.deleteMany({
                    docLink: { $in: deletePartnerDocsLinks },
                });
                console.log(deletedPartnerDocs, "deletedPartnerDocs put api");
            }
            if (docsControlResultError === "") {
                // update Partner infor
                const updatedPartner = await PartnerSchema.findOneAndUpdate(
                    { _id: id },
                    updatingPartner,
                    { new: true }
                );
                console.log(updatedPartner, "updatedPartner put api");

                // update Partner files
                if (docs1) {
                    const updatedPartnerDocs = docs1.map((doc) => {
                        return {
                            docLink: doc.location,
                            docName: doc.originalname,
                            docSize: doc.size,
                            docType: doc.mimetype,
                            program: {
                                id: programId,
                            },
                            partner: {
                                id: id,
                            },
                        };
                    });

                    const savedPartnerDocs = await PartnerDocsSchema.insertMany(
                        updatedPartnerDocs
                    );
                    console.log(savedPartnerDocs, "savedPartnerDocs put api");
                } else {
                    console.log("không có ảnh mới để lưu");
                }
                res.json({ error: false, message: "Đối tác đã được sửa thành công" });
            } else if (docsControlResultError === "DOCS1_EMPTY_INPUT_ERROR") {
                res.json({ error: true, message: "Hãy điền đầy đủ form" })
            } else if (docsControlResultError === "DUPLICATED_DOCS_ERROR") {
                res.json({ error: true, message: "có file trùng" })
            }
        } catch (error) {
            console.log(error, "put catch block error");
            res.json({ error: true, message: "something went wrong!" });
            // next(error)
        }
    }
);

router.delete("/api/delete-partner/:id", async (req, res) => {
    try {
        const { id } = req.params;
        console.log(id, "::id delete api::");

        // Xóa các file cần xóa trên s3
        const prefix = `partner-file-${id}`;
        const delFolderRes = await deleteFolder(prefix);
        console.log(delFolderRes, "delFolderRes delete-partner api");

        // Xóa thông tin các file cần xóa trong db
        const delPartnerFiles = await PartnerDocsSchema.deleteMany({
            partner: { id: new ObjectId(id) },
        });
        console.log(delPartnerFiles, "delPartnerFiles delete-partner api");

        // Xóa thông tin partner cần xóa
        const deletingPartner = await PartnerSchema.findOneAndDelete({ _id: id });
        console.log(deletingPartner, "deletingPartner");
        res.json({ error: false, message: "Xóa thành công đối tác" });
    } catch (error) {
        console.log(error, "delete catch block error");
        res.json({ error: true, message: "something went wrong!" });
    }
});

router.use("/api/create-partner", async (error, req, res, next) => {
    try {
        console.log(error, "error handler post api middleware");
        const partnerId = req.payload;
        const docs = req.files;
        const delInitDoc = await PartnerSchema.deleteOne({ _id: partnerId });
        console.log(delInitDoc, "delInitDoc error handler post api");
        if (!docs) {
            next(error);
        } else {
            const prefix = `partner-file-${id}`;
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

router.use("/api/edit-partner/:id", async (error, req, res, next) => {
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

router.use((error, req, res, next) => {
    // hàm này cần đủ cả 4 params error, req, res, next
    if (error) {
        console.log(error, "custom error handler");

        if (
            error.code === "EMPTY_PARTNER_INPUTS_ERROR" ||
            error.code === "EMPTY_PARTNER_FILE_INPUT_ERROR"
        ) {
            console.log(error.code, "empty input error");
            return res.json({ error: true, message: "Hãy điền đẩy đủ form" });
        }

        if (error.code === "PARTNER_INPUTS_TYPE_ERROR") {
            console.log("input type error");
            return res.json({ error: true, message: "Hãy điền đúng loại dữ liệu" });
        }
    }
});

module.exports = router;
