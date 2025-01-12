import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

const formatPrice = (price:any) =>{
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g,',')
}

type Product = {
  _id: string;
  title: string;
  description: string;
  price: number;
  images:[string]
}


const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('/api/products').then(res => {
      setProducts(res.data);
      setLoading(false);
    })
  }, [])

  return (
    <>
      <header>
        <div className="mx-auto max-w-screen-lg px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
          <div className="sm:flex sm:items-center sm:justify-between">
            <div className="text-center sm:text-left">
              <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">All Products</h1>
              <p className="mt-1.5 text-sm text-gray-500">Lets create a new product! 🎉</p>
            </div>

            <div className="mt-4 flex flex-col gap-4 sm:mt-0 sm:flex-row sm:items-center">
              <Link
                className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-orange-200 px-5 py-3 text-orange-500 transition hover:bg-gray-50 hover:text-green-600 hover:border-green-600 focus:outline-none focus:ring"
                href='/products/new'
              >
                <span className="text-sm font-medium"> Create Product </span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>

              </Link>
            </div>
          </div>
        </div>
      </header>

      <hr className='my-1 h-px border-0 bg-gray-100' />

      <div className='w-full py-8'>
        {products.length === 0 ? (
          <p>No products found</p>
        ) : (

          <div className="w-full overflow-scroll">
            <table className="w-full border-collapse bg-white text-left text-sm text-gray-500 overflow-x-scroll">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-4 font-medium text-gray-900"></th>
                  <th scope="col" className="px-6 py-4 font-medium text-gray-900">Name</th>
                  <th scope="col" className="px-6 py-4 font-medium text-gray-900">Description</th>
                  <th scope="col" className="px-6 py-4 font-medium text-gray-900">Price</th>
                  <th scope="col" className="px-6 py-4 font-medium text-gray-900"></th>
                </tr>
              </thead>
              {products.map((product: Product, index: number) => (
                <tbody key={product._id} className="divide-y divide-gray-100 border-t border-gray-100">
                  <tr>
                    <th className="px-6 py-4 font-medium text-gray-900">{index + 1}</th>
                    <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 flex items-center  gap-1">
                      <div className="h-10 w-10">
                        <Image
                          className="h-full w-full rounded-full object-cover object-center bg-gray-200"
                          src={product.images?.[0]}
                          alt={product.title}
                          width={100}
                          height={100}
                        />

                      </div>
                      {product.title}
                    </td>
                    <td className="px-6 py-4 truncate max-w-xs">{product.description}</td>
                    <td className="px-6 py-4">
                      {formatPrice(product.price)}
                    </td>
                    <td className="flex justify-end gap-4 px-6 py-4 font-medium">
                      <Link href={"/products/delete/" + product._id} className='text-red-500 p-2'><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                      </svg>
                      </Link>
                      <Link href={"/products/edit/" + product._id} className="text-primary-700 text-green-500 p-2"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                      </svg>
                      </Link>
                    </td>
                  </tr>
                </tbody>
              ))}

            </table>
          </div>

        )}
      </div>
    </>
  )
}

export default Products