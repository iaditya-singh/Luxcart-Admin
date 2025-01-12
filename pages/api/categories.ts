import { mongooseConnect } from "@/lib/mongoose";
import { NextApiRequest, NextApiResponse } from "next";
import { Category } from "@/models/Categories";

type Data = {}

export default async function handle(req:NextApiRequest, res:NextApiResponse<Data>) {
  const {method} = req;

  await mongooseConnect();

  if(method === 'POST') {
    const {name, parentCategory} = req.body;

    const categoryDoc = await Category.create({name, parent: parentCategory || undefined});
    res.json(categoryDoc)
  }

  if (method === 'GET') {
    res.json(await Category.find().populate('parent'))
  }

  if(method === 'PUT') {
    const {name, parentCategory, _id} = req.body;

    const categoryDoc = await Category.updateOne({_id}, {name, parent: parentCategory || undefined});
    res.json(categoryDoc)
  }

  if (method === 'DELETE') {
    const {_id} = req.query;
    await Category.deleteOne({_id});
    res.json('ok');
  }
}