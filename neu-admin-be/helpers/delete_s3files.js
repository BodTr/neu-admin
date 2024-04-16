const { S3Client, DeleteObjectsCommand, ListObjectsV2Command } = require('@aws-sdk/client-s3')

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

// function xóa các file trên s3 có cùng prefix
async function deleteFolder(prefix) {
    try {
        console.log(prefix, "prefix delete_s3files")
        // lấy các file
        const listCommand = new ListObjectsV2Command({
            Bucket: 'acvnapps',
            Prefix: prefix
        })

        let list = await s3.send(listCommand)
        console.log(list, "list delete_s3files")
        console.log(list.KeyCount, "list.KeyCount delete_s3files")

        if (list.KeyCount) { // Nếu có item trong list để xóa
            // xóa files
            const deleteCommand = new DeleteObjectsCommand({
                Bucket: 'acvnapps',
                Delete: {
                    Objects: list.Contents.map(item => {
                        return {
                            Key: item.Key
                        }
                    }),
                    Quiet: false // cho ta thông tin về những ảnh xóa 
                }
            })

            let deletedFiles = await s3.send(deleteCommand)

            // nếu có lỗi thì log ra
            if (deletedFiles.Errors) {
                deletedFiles.Errors.forEach(error => {
                    console.log(error, "delete_s3files error")
                    console.log(`${error.Key} could not be deleted - ${error.Code}`);
                });
            }

            return `${deletedFiles.Deleted.length} files deleted.`
        }

    } catch (error) {
        console.log(error, "deleteFolder catch block error delete_s3files")
    }

}

module.exports = {
    deleteFolder
}