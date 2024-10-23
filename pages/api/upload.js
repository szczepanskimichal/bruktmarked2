import { mongooseConnect } from "@/lib/mongoose";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import multiparty from "multiparty";
import fs from "fs";
import mime from "mime-types";

const bucket = "ecommerce2-michal";
export default async function handle(req, res) {
  await mongooseConnect();
  const form = new multiparty.Form();
  const { fields, files } = await new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) reject(err);
      resolve({ fields, files });
    });
  });
  const client = new S3Client({
    region: "eu-north-1",
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY,
      secretAccessKey: process.env.AWS_SECRET_KEY,
    },
  });
  const links = [];
  for (const file of files.file) {
    const ext = file.originalFilename.split(".").pop();
    const newFilename = Date.now() + "." + ext;
    await client.send(
      new PutObjectCommand({
        Bucket: bucket,
        Key: newFilename,
        Body: fs.readFileSync(file.path),
        ACL: "public-read",
        ContentType: mime.lookup(file.path),
      })
    );
    const link = `https://${bucket}.s3.amazonaws.com/${newFilename}`;
    links.push(link);
  }
  return res.json({ links });
}
export const config = {
  api: { bodyParser: false },
};
