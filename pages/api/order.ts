import { mongooseConnect } from "@/lib/mongoose";
import { Order } from "@/models/Order";
import { NextApiRequest, NextApiResponse } from "next";

type Data = {}

export default async function handler(req:NextApiRequest,res:NextApiResponse<Data>) {
  await mongooseConnect();

  res.json(await Order.find().sort({createdAt: -1}));
}