import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import AsideFilter from './AsideFilter'
import SortProductList from './SortProductList'
import useQueryParam from 'src/hooks/useQueryParam'
import productApi from 'src/apis/product.api'
import Product from './Product'
import Pagination from 'src/components/Pagination'

export default function ProductList() {
  const [page, setPage] = useState(1)
  const queryParams = useQueryParam()
  const { data } = useQuery({
    queryKey: ['Products', queryParams],
    queryFn: () => {
      return productApi.getProducts(queryParams)
    }
  })

  return (
    <div className='bg-gray-200 py-6'>
      <div className='container'>
        <div className='grid grid-cols-12 gap-6'>
          <div className='col-span-3'>
            <AsideFilter />
          </div>
          <div className='col-span-9'>
            <SortProductList />
            <div className='mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 '>
              {data &&
                data.data.data.products.map((product: any) => (
                  <div className='col-span-1' key={product._id}>
                    <Product product={product} />
                  </div>
                ))}
            </div>
            <Pagination page={page} setPage={setPage} pageSize={20} />
          </div>
        </div>
      </div>
    </div>
  )
}
