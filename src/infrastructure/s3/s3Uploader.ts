import { S3Client } from "@aws-sdk/client-s3";
import { Upload } from "@aws-sdk/lib-storage";

const s3config = new S3Client({
  credentials: {
    accessKeyId: "AKIAU5ZGISIVSEPALZNZ",
    secretAccessKey: "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",
  },
  region: process.env.S3_REGION || "ap-south-1",
});

const uploadS3Video = async (file: any) => {
  const params = {
    Bucket:"almidancoursevideo",
    Key: Date.now().toString() + "-" + file.originalname,
    Body: file.buffer,
    ContentType: file.mimetype,
    ContentDisposition: "inline",
  };

  console.log("uploading video: ", params);
  return new Upload({
    client: s3config,
    params: params,
  })
    .done()
    .then((data) => {
      console.log("data from bucket", data);
      return data;
    })
    .catch((err) => {
      return { error: true, msg: err };
    });
};

const uploadS3Image = async (file: any) => {
  const params = {
    Bucket:"almidancoursethumbnail",
    Key: Date.now().toString() + "-" + file.originalname,
    Body: file.buffer,
    ContentType: file.mimetype,
    ContentDisposition: "inline",
  };

  console.log("uploading image: ", params);
  return new Upload({
    client: s3config,
    params: params,
  })
    .done()
    .then((data) => {
      console.log("data from bucket", data);
      return data;
    })
    .catch((err) => {
      return { error: true, msg: err };
    });
};

// const uploadS3ProfileImage = async (file : any)=>{
//     const params = {
//         Bucket: process.env.S3_BUCKET_PROFILE_IMAGE,
//         Key: Date.now().toString() + '-' + file.originalname,
//         Body: file.buffer,
//         ContentType: file.mimetype,
//         ContentDisposition: 'inline'
//     };

//     console.log('uploading image: ', params)
//     return new Upload({
//         client : s3config,
//         params : params
//     }).done()
//     .then(data => {
//         console.log('data from bucket', data)
//         return data
//     })
//     .catch(err =>{
//         return {error : true, msg : err}
//     })

// }

export { uploadS3Video, uploadS3Image };
