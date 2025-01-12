import multiparty from 'multiparty';
import cloudinary from 'cloudinary';
import { mongooseConnect } from "@/lib/mongoose";
import { NextApiRequest, NextApiResponse } from 'next';

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

type File = {
  path: string;
};

type FormFiles = {
  file: File[];
};

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  await mongooseConnect();

  const form = new multiparty.Form();
  const { files } = await new Promise<{ files: any }>((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) reject(err);
      resolve({ files });
    });
  });

  const filesData = files.file as File[];
  const links = [];

  for (const file of filesData) {
    const result = await cloudinary.v2.uploader.upload(file.path, {
      folder: 'luxcart',
      public_id: `file_${Date.now()}`,
      resource_type: 'auto',
    });

    const link = result.secure_url;
    links.push(link);
  }

  return res.json({ links });
}

export const config = {
  api: { bodyParser: false },
};
