const multer = require('multer')
const multerS3 = require('multer-s3')
const { S3Client } = require('@aws-sdk/client-s3')

const allowedTypes = ["application/pdf"]
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
            let fileName = ""
            const { programId } = req.body
            const getId = () => { // nếu tồn tại req.payload thì đây là từ post req, còn ko tồn tại req.payload thì đây là put req, vì đã lọc xem đây là api nào r (mỗi 1 api có 1 ref image riêng, moumoa-attachedDoc) nên hàm này dùng đc nhiều lần
                if (!req.payload) {
                    return req.params.id
                    
                } else {
                    return req.payload
                }
            }
            if (fieldname === "attachedMoumoaDoc" || fieldname === "attachedMoumoaDoc1") {
                fileName = `program-${programId}/attached-moumoa-doc-${getId()}/${Date.now()}_${file.originalname}`
            } else if (fieldname === "attachedHTQTDoc" || fieldname === "attachedHTQTDoc1") {
                fileName = `program-${programId}/attached-htqt-doc-${getId()}/${Date.now()}_${file.originalname}`
            }

            cb(null, fileName)
        }
        

    }),
    limits: {
        fileSize: MAX_SIZE
    },
    fileFilter: (req, file, cb) => {
        
        if (!allowedTypes.includes(file.mimetype)) {
            const error = new multer.MulterError("LIMIT_FILE_TYPES")
            error.name = 'imageTypeError'
            return cb(error, false)
        }

        cb(null, true)
    }
})



module.exports = {
    upload
}