const multer = require('multer')
const multerS3 = require('multer-s3')
const { S3Client } = require('@aws-sdk/client-s3')

const allowedTypes = ["application/pdf"]
const allowedTypes1 = ["application/pdf", "image/jpeg", "image/png", "image/gif", "image/jpg"]
const allowedType2 = ["application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"]
const MAX_SIZE = 20 * 1024 * 1024

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

const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: 'acvnapps',
        acl: 'public-read',
        contentType: multerS3.AUTO_CONTENT_TYPE,
        key: (req, file, cb) => {
            const fieldname = file.fieldname
            console.log(fieldname, "file fieldname")
            let fileName = ""
            const { programId } = req.body
            console.log(req.body, "req.body multer middleware")
            console.log(req.params, "req.params multer middleware")
            console.log(req.payload, "req.payload multer middleware")
            const getId = () => { // nếu tồn tại req.payload thì đây là từ post req, còn ko tồn tại req.payload thì đây là put req, vì đã lọc xem đây là api nào r (mỗi 1 api có 1 ref image riêng, moumoa-attachedDoc) nên hàm này dùng đc nhiều lần
                if (!req.params.id) {
                    console.log(req.payload, "req.payload multer middleware")
                    return req.payload
                    
                    
                } else {
                    const { id } = req.params
                    console.log(id, "id multer middleware")
                    return id
                }
            }
            if (fieldname === "attachedMoumoaDoc" || fieldname === "attachedMoumoaDoc1") {
                fileName = `attached-moumoa-doc-${getId()}/${Date.now()}_${file.originalname}`
            } else if (fieldname === "attachedHTQTDoc" || fieldname === "attachedHTQTDoc1") {
                fileName = `attached-htqt-doc-${getId()}/${Date.now()}_${file.originalname}`
            } else if (fieldname === "attachedExFStuDoc" || fieldname === "attachedExFStuDoc1") {
                fileName = `attached-ex-foreign-student-doc-${getId()}/${Date.now()}_${file.originalname}`
            } else if (fieldname === "attachedExchangeDoc" || fieldname === "attachedExchangeDoc1") {
                fileName = `attached-ex-doc-${getId()}/${Date.now()}_${file.originalname}`
            } else if (fieldname === "attachedScoreDoc1" || fieldname === "attachedScoreDoc") {
                fileName = `attached-ex-student-score-doc-${getId()}/${Date.now()}_${file.originalname}`
            } else if (fieldname === "suggestUnit" || fieldname === "suggestUnit1") {
                fileName = `suggest-unit-doc-${getId()}/${Date.now()}_${file.originalname}`
            } else if (fieldname === "decisionNumber" || fieldname === "decisionNumber1") {
                fileName = `decision-number-doc-${getId()}/${Date.now()}_${file.originalname}`
            } else if (fieldname === "attachedFile" || fieldname === "attachedFile1") {
                fileName = `attached-file-doc-${getId()}/${Date.now()}_${file.originalname}`
            } else if (fieldname === "closeDecisionDoc" || fieldname === "closeDecisionDoc1") {
                fileName = `program-${programId}/close-decision-doc-${getId()}/${Date.now()}_${file.originalname}`
            } else if (fieldname === "approvalDecisionDoc" || fieldname === "approvalDecisionDoc1") {
                fileName = `program-${programId}/approval-decision-doc-${getId()}/${Date.now()}_${file.originalname}`
            } else if (fieldname === "documentFile" || fieldname === "documentFile1") {
                fileName = `program-${programId}/document-file-${getId()}/${Date.now()}_${file.originalname}`
            } else if (fieldname === "docs" || fieldname === "docs1") {
                fileName = `program-${programId}/partner-file-${getId()}/${Date.now()}_${file.originalname}`
            } else if (fieldname === "planDoc" || fieldname === "planDoc1") {
                fileName = `program-${programId}/plan-file-${getId()}/${Date.now()}_${file.originalname}`
            } else if (fieldname === "enrollmentDocs" || fieldname === "enrollmentDocs1") {
                fileName = `program-${programId}/enrollment-file-${getId()}/${Date.now()}_${file.originalname}`
            } else if (fieldname === "decisionDoc" || fieldname === "decisionDoc1") {
                fileName = `student-decision-file-${getId()}/${Date.now()}_${file.originalname}`
            }

            cb(null, fileName)
        }
        

    }),
    limits: {
        fileSize: MAX_SIZE
    },
    fileFilter: (req, file, cb) => {
        const fieldname = file.fieldname

        if (fieldname === "attachedFile" || fieldname === "attachedFile1") {
            if (!allowedTypes1.includes(file.mimetype)) {
                const error = new multer.MulterError("LIMIT_FILE_TYPES")
                error.name = 'attachedFileTypeError'
                return cb(error, false)
            }
            
            cb(null, true)
        } else {
            if (!allowedTypes.includes(file.mimetype)) {
                const error = new multer.MulterError("LIMIT_FILE_TYPES")
                error.name = 'pdfTypeError'
                return cb(error, false)
            }
    
            cb(null, true)
        }
        
        
    }
})

const fileStorageEngine = multer.diskStorage({
    destination: (req, file, cb) => {
        cb (null, './public/')
    },
    filename: (req, file, cb) => {
        // console.log(file.fieldname, "file.fieldname")
        // if (file.fieldname === "trans-programs-import-file") {
        //     cb(null, `${file.fieldname}-${Date.now()}-${file.originalname}`)
        // } else if (file.fieldname === "decisions-import-file") {
        //     cb(null, `${file.fieldname}-${Date.now()}-${file.originalname}`)
        // } else if (file.fieldname === "close-decisions-import-file") {
        //     cb(null, `${file.fieldname}-${Date.now()}-${file.originalname}`)
        // } else if (file.fieldname === "document-import-file") {
        //     cb(null, `${file.fieldname}-${Date.now()}-${file.originalname}`)
        // }
        cb(null, `${file.fieldname}-${Date.now()}-${file.originalname}`)
    }
})

const uploadToServer = multer({
    storage: fileStorageEngine,
    limits: {
        fileSize: MAX_SIZE
    },
    fileFilter: (req, file, cb) => {
        // if (file.fieldname === "trans-programs-import-file") {
        //     if (!allowedType2.includes(file.mimetype)) {
        //         const error = new multer.MulterError("LIMIT_FILE_TYPES")
        //         error.name = 'excelTypeError'
        //         return cb(error, false)
        //     } else {
        //         return cb(null, true)
        //     }
        // } else if (file.fieldname === "decisions-import-file") {
        //     if (!allowedType2.includes(file.mimetype)) {
        //         const error = new multer.MulterError("LIMIT_FILE_TYPES")
        //         error.name = 'excelTypeError'
        //         return cb(error, false)
        //     } else {
        //         return cb(null, true)
        //     }
        // } else if (file.fieldname === "decisions-import-file") {
        //     if (!allowedType2.includes(file.mimetype)) {
        //         const error = new multer.MulterError("LIMIT_FILE_TYPES")
        //         error.name = 'excelTypeError'
        //         return cb(error, false)
        //     } else {
        //         return cb(null, true)
        //     }
        // } else if (file.fieldname === "close-decisions-import-file") {
        //     if (!allowedType2.includes(file.mimetype)) {
        //         const error = new multer.MulterError("LIMIT_FILE_TYPES")
        //         error.name = 'excelTypeError'
        //         return cb(error, false)
        //     } else {
        //         return cb(null, true)
        //     }
        // } else if (file.fieldname === "document-import-file") {
        //     if (!allowedType2.includes(file.mimetype)) {
        //         const error = new multer.MulterError("LIMIT_FILE_TYPES")
        //         error.name = 'excelTypeError'
        //         return cb(error, false)
        //     } else {
        //         return cb(null, true)
        //     }
        // }
        if (!allowedType2.includes(file.mimetype)) {
            const error = new multer.MulterError("LIMIT_FILE_TYPES")
            error.name = 'excelTypeError'
            return cb(error, false)
        } else {
            return cb(null, true)
        }
    },
    // onError: (error, next) => {
    //     console.log('multer error', error);
    //     next(err);
    // }
})

module.exports = {
    upload,
    uploadToServer
}

// khi file từ put api vào thì api vẫn có req.payload, req.payload này của middleware authenticateAccessToken, nên ta check đk !req.params để phân biệt file là từ put api hay post api