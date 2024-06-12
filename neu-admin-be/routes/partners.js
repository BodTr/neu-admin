const express = require("express");
const router = express.Router();
const PartnerSchema = require("../models/partner");
const PartnerDocsSchema = require("../models/partner_file");
const ExcelJs = require("exceljs")
const ProgramSchema = require('../models/program')
const {
    emptyPartnerInputsValidation,
    emptyPartnerFileInputValidation,
} = require("../helpers/input_validate_middleware");
const { initPartnerMiddleware } = require("../helpers/init_doc");
const { authenticateAccessToken } = require("../helpers/jwt_services");
const { S3Client, DeleteObjectsCommand } = require("@aws-sdk/client-s3");
const { docsControl } = require("../helpers/docs_controller");
const { deleteFolder } = require("../helpers/delete_s3files");
const { upload, uploadToServer } = require("../helpers/multer_middleware");
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
            if (!docs) {
                console.log('ko có file được up lên create-partner api')
            } else {
                // trường hợp có file up lên, lưu các thông tin của các file up lên vào db
                console.log(docs, "docs create-partner api")
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
            }
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
            // if (docsControlResult === "DOCS1_EMPTY_INPUT_ERROR") {
            //     console.log("empty docs1 input");
            //     docsControlResultError = "DOCS1_EMPTY_INPUT_ERROR";
            //     // res.json({ error: true, message: "Hãy điền đầy đủ form" })
            // }
            if (docsControlResult === "DUPLICATED_DOCS_ERROR") {
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
        const checkPartnerDocs = await PartnerDocsSchema.find({ partner: { id: new ObjectId(id) } })
        if (checkPartnerDocs.length === 0) {
            console.log(`ko có file nào trong db của partner id: ${id}`)
        } else {
            // trường hợp có thông tin file trong db của partner đó
            // Xóa các file cần xóa trên s3
            const programId = checkPartnerDocs[0].program.id.toString()
            // prefix là toàn bộ phần trước tên file
            const prefix = `program-${programId}/partner-file-${id}/`;
            const delFolderRes = await deleteFolder(prefix);
            console.log(delFolderRes, "delFolderRes delete-partner api");

            // Xóa thông tin các file cần xóa trong db
            const delPartnerFiles = await PartnerDocsSchema.deleteMany({
                partner: { id: new ObjectId(id) },
            });
            console.log(delPartnerFiles, "delPartnerFiles delete-partner api");
        }
        

        // Xóa thông tin partner cần xóa
        const deletingPartner = await PartnerSchema.findOneAndDelete({ _id: id });
        console.log(deletingPartner, "deletingPartner");
        res.json({ error: false, message: "Xóa thành công đối tác" });
    } catch (error) {
        console.log(error, "delete catch block error");
        res.json({ error: true, message: "something went wrong!" });
    }
});

router.get('/api/export-excel-partners', async (req, res) => {
    try {
        const { id } = req.query // id: program id
        const partnerDocs = await PartnerDocsSchema.find({
            program: { id: new ObjectId(id) },
        }).lean()
        console.log(partnerDocs, "partnerDocs /api/export-excel-partners");
        const partners = await PartnerSchema.find({
            program: { id: new ObjectId(id)}
        }).lean()
        let stt = 0
        const aPartners = partners.map(doc => {
            const partnerId = doc._id.toString()
            const partnerDocsArr = partnerDocs.filter(doc => {
                return doc.partner.id.toString() === partnerId;
            })
            stt++
            return {
                ...doc,
                stt: stt,
                partnerDocs: partnerDocsArr
            }
        })

        let partnerDocsArrayLengthArray = []
        aPartners.forEach(partner => {
            let partnerArrayLength = partner.partnerDocs.length
            partnerDocsArrayLengthArray.push(partnerArrayLength)
        })

        console.log(partnerDocsArrayLengthArray, "partnerDocsArrayLengthArray /api/export-excel-partners")

        const maxValue = Math.max(...partnerDocsArrayLengthArray)
        console.log(maxValue, "maxValue /api/export-excel-partners")
        let pushCol = []
        for (let i = 0; i < maxValue; i++) {
            pushCol.push(
                {
                    header: `TÊN VĂN BẢN KIỂM ĐỊNH ${i + 1}`,
                    key: `docName${i + 1}`,
                    width: 30
                },
                {
                    header: `LINK VĂN BẢN KIỂM ĐỊNH ${i + 1}`,
                    key: `docLink${i + 1}`,
                    width: 50
                }
            )
        }
        console.log(pushCol, "pushCol /api/export-excel-partners")
        const constCol = [
            {header: "STT", key:"stt", width: 10},
            {header: "TÊN ĐỐI TÁC TIẾNG VIỆT", key:"vn_name", width: 40},
            {header: "TÊN ĐỐI TÁC TIẾNG ANH", key:"en_name", width: 40},
            {header: "ĐỊA CHỈ", key:"address", width: 60},
            {header: "XẾP HẠNG QUỐC TẾ", key:"internationalRanking", width: 30},
            {header: "WEBSITE", key:"website", width: 40},
            {header: "HỌ TÊN NGƯỜI LIÊN HỆ", key:"contacterName", width: 40},
            {header: "EMAIL NGƯỜI LIÊN HỆ", key:"contacterEmail", width: 30},
            {header: "CHỨC VỤ NGƯỜI LIÊN HỆ", key:"contacterPosition", width: 40},
            {header: "ĐƠN VỊ NGƯỜI LIÊN HỆ", key:"contacterUnit", width: 40},
            {header: "HỌ TÊN LÃNH ĐẠO CẤP TRƯỜNG", key:"uniLeaderName", width: 50},
            {header: "EMAIL LÃNH ĐẠO CẤP TRƯỜNG", key:"uniLeaderEmail", width: 40},
            {header: "CHỨC VỤ LÃNH ĐẠO CẤP TRƯỜNG", key:"uniLeaderPosition", width: 30},
            {header: "ĐƠN VỊ LÃNH ĐẠO CẤP TRƯỜNG", key:"uniLeaderUnit", width: 40},
            {header: "HỌ TÊN LÃNH ĐẠO ĐƠN VỊ LIÊN KẾT", key:"unitLeaderName", width: 50},
            {header: "EMAIL LÃNH ĐẠO ĐƠN VỊ LIÊN KẾT", key:"unitLeaderEmail", width: 50},
            {header: "CHỨC VỤ LÃNH ĐẠO ĐƠN VỊ LIÊN KẾT", key:"unitLeaderPosition", width: 50},
            {header: "ĐƠN VỊ LÃNH ĐẠO ĐƠN VỊ LIÊN KẾT", key:"unitLeaderUnit", width: 50},
            {header: "HỌ TÊN ĐẠI DIỆN BỘ PHẬN ĐỐI NGOẠI", key:"farName", width: 50},
            {header: "EMAIL ĐẠI DIỆN BỘ PHẬN ĐỐI NGOẠI", key:"farEmail", width: 40},
            {header: "CHỨC VỤ ĐẠI DIỆN BỘ PHẬN ĐỐI NGOẠI", key:"farPosition", width: 40},
            {header: "ĐƠN VỊ ĐẠI DIỆN BỘ PHẬN ĐỐI NGOẠI", key:"farUnit", width: 40},
            {header: "HỌ TÊN NGƯỜI PHỤ TRÁCH CHƯƠNG TRÌNH", key:"progManagerName", width: 40},
            {header: "EMAIL NGƯỜI PHỤ TRÁCH CHƯƠNG TRÌNH", key:"progManagerEmail", width: 40},
            {header: "CHỨC VỤ NGƯỜI PHỤ TRÁCH CHƯƠNG TRÌNH", key:"progManagerPosition", width: 40}, // progManagerUnit
            {header: "ĐƠN VỊ NGƯỜI PHỤ TRÁCH CHƯƠNG TRÌNH", key:"progManagerUnit", width: 40},
        ]

        const program = await ProgramSchema.findOne({ _id: id })
        console.log(program, "program /api/export-excel-partners")
        const programName = program.name
        let workbook = new ExcelJs.Workbook()
        const sheet = workbook.addWorksheet("partners")
        sheet.columns = constCol.concat(pushCol)
        console.log(aPartners, "aPartners /api/export-excel-partners 3")
        aPartners.map(partner => {
            const partnerDocs = partner.partnerDocs
            console.log(partnerDocs, "partnerDocs 2 /api/export-excel-partners")
            let addObj = {}
            if (partnerDocs.length === 0) {
                console.log("partnerDocs.length === 0")
                addObj = {}
            } else {
                console.log(partnerDocs, "partnerDocs 3 /api/export-excel-partners")
                addObj = partnerDocs.reduce((acc, partner, i) => {
                    acc[`docName${i + 1}`] = partner.docName;
                    acc[`docLink${i + 1}`] = partner.docLink;
                    return acc;
                }, {})
                console.log(addObj, "addObj /api/export-excel-partners 1")
            }

            console.log(addObj, "addObj /api/export-excel-partners")
            const constObj = {
                stt: partner.stt,
                vn_name: partner.vn_name,
                en_name: partner.en_name,
                address: partner.address,
                internationalRanking: partner.internationalRanking,
                website: partner.website,
                contacterName: partner.contacterName,
                contacterEmail: partner.contacterEmail,
                contacterPosition: partner.contacterPosition,
                contacterUnit: partner.contacterUnit,
                uniLeaderName: partner.uniLeaderName,
                uniLeaderEmail: partner.uniLeaderEmail,
                uniLeaderPosition: partner.uniLeaderPosition,
                uniLeaderUnit: partner.uniLeaderUnit,
                unitLeaderName: partner.unitLeaderName,
                unitLeaderEmail: partner.unitLeaderEmail,
                unitLeaderPosition: partner.unitLeaderPosition,
                unitLeaderUnit: partner.unitLeaderUnit,
                farName: partner.farName,
                farEmail: partner.farEmail,
                farPosition: partner.farPosition,
                farUnit: partner.farUnit,
                progManagerName: partner.progManagerName,
                progManagerEmail: partner.progManagerEmail,
                progManagerPosition: partner.progManagerPosition,
                progManagerUnit: partner.progManagerUnit,
            }
            const finalObj = { ...constObj, ...addObj }
            sheet.addRow(finalObj)
        })
        await workbook.xlsx.writeFile(`public/Thông tin đối tác-${programName}.xlsx`)
        const excelFilePath = process.env.CND_EXCELFILE + `Thông tin đối tác-${programName}.xlsx`
        res.json({
            error: false,
            path: excelFilePath
        })
    } catch (error) {
        console.log(error, "/api/export-excel-partners catch block error")
        res.json({
            error: true,
            message: "something went wrong!"
        })
    }
})

router.get('/api/get-partners-template', async (req, res) => {
    try {
        const templateFilePath = process.env.CND_EXCELFILE + 'import-template/template-thong-tin-doi-tac.xlsx'
        res.json({
            error: false,
            path: templateFilePath
        }) 
    } catch (error) {
        console.log(error, "/api/get-partners-template catch block error")
        res.json({
            error: true,
            message: "something went wrong!"
        })
    }
})

router.post('/api/import-partners-data', uploadToServer.single("partners-import-file"), async (req, res) => {
    

    try {

        console.log(req.file, "req.file /api/import-partners-data")
        const file = req.file
        const { programId } = req.body
        const filePath = file.path // .replace("public\\", "public/")
        let workbook = new ExcelJs.Workbook()
        await workbook.xlsx.readFile(`${filePath}`)

        let importPartnerArr = []
        const sheet = workbook.getWorksheet(workbook._name);
        sheet.eachRow((row, rowNumber) => {
            // console.log(row.values, "row.values")
            console.log("Row " + rowNumber + " = " +  JSON.stringify(row.values)); // JSON.stringify()
            if (rowNumber > 1) {
                importPartnerArr.push({
                    vn_name: row.values[2],
                    en_name: row.values[3],
                    address: row.values[4],
                    internationalRanking: row.values[5],
                    website: row.values[6],
                    contacterName: row.values[7],
                    contacterEmail: row.values[8],
                    contacterPosition: row.values[9],
                    contacterUnit: row.values[10],
                    uniLeaderName: row.values[11],
                    uniLeaderEmail: row.values[12],
                    uniLeaderPosition: row.values[13],
                    uniLeaderUnit: row.values[14],
                    unitLeaderName: row.values[15],
                    unitLeaderEmail: row.values[16],
                    unitLeaderPosition: row.values[17],
                    unitLeaderUnit: row.values[18],
                    farName: row.values[19],
                    farEmail: row.values[20],
                    farPosition: row.values[21],
                    farUnit: row.values[22],
                    progManagerName: row.values[23],
                    progManagerEmail: row.values[24],
                    progManagerPosition: row.values[25],
                    progManagerUnit: row.values[26],
                    program: {
                        id: programId
                    }
                })
            }
            
        })
        console.log(importPartnerArr, "importPartnerArr /api/import-partners-data")
        const savedImportPartners = await PartnerSchema.insertMany(importPartnerArr)

        console.log(savedImportPartners, "savedImportPartners /api/import-partners-data")
        res.json({
            error: false,
            message: "import data thành công"
        })
    } catch (error) {
        console.log(error, "/api/import-partners-data catch block error")
        res.json({
            error: true,
            message: "something went wrong!"
        })
    }
})

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

        // if (
        //     error.code === "EMPTY_PARTNER_FILE_INPUT_ERROR"
        // ) {
        //     console.log(error.code, "empty input error");
        //     return res.json({ error: true, message: "Chưa chọn file nào" });
        // }

        // if (error.code === "PARTNER_INPUTS_TYPE_ERROR") {
        //     console.log("input type error");
        //     return res.json({ error: true, message: "Hãy điền đúng loại dữ liệu" });
        // }
    }
});

module.exports = router;
