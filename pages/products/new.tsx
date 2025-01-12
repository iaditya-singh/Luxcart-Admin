import Product from '@/components/Product'
import React, { useState } from 'react'

const product = {}
const NewProduct = () => {
  return (
    <>
      <div className="sm:flex sm:items-center sm:justify-between">
        <div className="text-center sm:text-left">
          <p className="m-4 text-sm text-gray-500">Lets create a new product! 🎉</p>
        </div>
        <div className="mt-4 flex flex-col gap-4 sm:mt-0 sm:flex-row sm:items-center">
        </div>
      </div>

      <hr className="h-px border-0 bg-gray-200" />

      <div className='my-10'>
        <Product _id={''} title={''} description={''} price={0} images={['']} category={''} details={''} brand={''} colors={''} gender={''} sizes={''} />
      </div>
    </>
  )
}

export default NewProduct