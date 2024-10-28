import { mongooseConnect } from "@/lib/mongoose";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import multiparty from "multiparty";
import fs from "fs";
import mime from "mime-types";

const bucket = "ecommerce2-michal";

export default async function handle(req, res) {
  await mongooseConnect(); // połączenie z bazą danych
  const form = new multiparty.Form(); // tworzę nowy obiekt multiparty.Form
  const { fields, files } = await new Promise((resolve, reject) => {
    // tworzę nowy Promise, który zwraca fields i files,
    form.parse(req, (err, fields, files) => {
      // parsuję request
      if (err) reject(err); // jeśli wystąpi błąd, zwróć błąd
      resolve({ fields, files }); // zwróć fields i files
    });
  });

  const client = new S3Client({
    // tworzę nowy obiekt S3Client
    region: "eu-north-1",
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY,
      secretAccessKey: process.env.AWS_SECRET_KEY,
    },
  });
  const links = []; // tworzę pustą tablicę links
  for (const file of files.file) {
    // dla każdego pliku w files.file
    const ext = file.originalFilename.split(".").pop(); // pobieram rozszerzenie pliku
    const newFilename = Date.now() + "." + ext; // tworzę nową nazwę pliku
    await client.send(
      // wysyłam plik na serwer
      new PutObjectCommand({
        // tworzę nowy obiekt PutObjectCommand
        Bucket: bucket,
        Key: newFilename,
        Body: fs.readFileSync(file.path),
        ACL: "public-read",
        ContentType: mime.lookup(file.path),
      })
    );
    const link = `https://${bucket}.s3.amazonaws.com/${newFilename}`; // tworzę link do pliku
    links.push(link); // dodaję link do tablicy links
  }
  return res.json({ links }); // zwracam tablicę links
}
export const config = {
  // konfiguracja API
  api: { bodyParser: false }, // wyłączam domyślny parser
};
