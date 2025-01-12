import Product from "@/components/Product";
import axios from "axios";
import { useRouter } from "next/router"
import { useEffect, useState } from "react";

type ProductInfo = {
    _id:string;
    description: string;
    images:[string];
    price: number;
    title: string;
    category:string,
    details:string,
    brand:string,
    colors:string,
    gender:string,
    sizes:string
}

export default function EditProduct() {
  const router = useRouter();
  const { id } = router.query;
  const [productInfo, setProductInfo] = useState<ProductInfo>();

  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get('/api/products?id=' + id).then(response => {
      setProductInfo(response.data)
    })
  }, [id])

    if(productInfo)
      console.log({productInfo});

  return <>
    <div className="max-sm:p-4">

      <div className="sm:flex sm:items-center sm:justify-center">
        <div className="text-center sm:text-left">
          <p className="mt-4 text-xl text-red-500">
            Editing <span className="text-green-600">{productInfo?.title}</span>
          </p>
        </div>
      </div>
      <hr className="my-4 h-px border-0 bg-gray-300" />
      <div className="my-10 max-sm:my-12">
        {productInfo && (
          <Product {...productInfo} />
        )}
      </div>
    </div>
  </>
}