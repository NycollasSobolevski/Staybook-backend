// import { S3Client, PutObjectCommand, DeleteObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3"
// import { getSignedUrl } from "@aws-sdk/s3-request-presigner"

// import dotenv from 'dotenv'

// dotenv.config()

// const bucketName = process.env.BUCKETNAME
// const region = process.env.BUCKETREGION
// const accessKeyId = process.env.AWSKEY
// const secretAccessKey = process.env.SECRETAWSKEY

// const s3Client = new S3Client({
//   region,
//   credentials: {
//     accessKeyId,
//     secretAccessKey
//   }
// })


// export function uploadFile(fileBuffer, fileName, mimetype) {
//   const uploadParams = {
//     Bucket: bucketName,
//     Body: fileBuffer,
//     Key: fileName,
//     ContentType: mimetype
//   }

//   return s3Client.send(new PutObjectCommand(uploadParams));
// }

// export function deleteFile(fileName) {
//   const deleteParams = {
//     Bucket: bucketName,
//     Key: fileName,
//   }

//   return s3Client.send(new DeleteObjectCommand(deleteParams));
// }

// export async function getObjectSignedUrl(key) {
//   const params = {
//     Bucket: bucketName,
//     Key: key
//   }

//   const command = new GetObjectCommand(params);
//   const seconds = 60
//   const url = await getSignedUrl(s3Client, command, { expiresIn: seconds });

//   return url
// }