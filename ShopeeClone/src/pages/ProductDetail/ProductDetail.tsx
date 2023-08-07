import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import productApi from 'src/apis/product.api'
import InputNumber from 'src/components/InputNumber'
import ProductRating from 'src/components/ProductRating'
import { discountRate, formatCurrency, formatNumberToSocial, getIdFromNameId } from 'src/utils/utils'
import DOMPurify from 'dompurify'
import { useEffect, useMemo, useRef, useState } from 'react'
import { Product } from 'src/types/product.type'

export default function ProductDetail() {
  const { nameId } = useParams()
  const id = getIdFromNameId(nameId as string)
  const { data: productDetailData } = useQuery({
    queryKey: ['productDetail', id],
    queryFn: () => productApi.getProductDetail(id as string),
  })

  const [currentIndexImages, setCurrentIndexImages] = useState([0, 5])
  const [activeImage, setActiveImage] = useState('')
  const imageRef = useRef<HTMLImageElement>(null)
  const product = productDetailData?.data.data

  const currentImages = useMemo(
    () => (product ? product.images.slice(...currentIndexImages) : []),
    [product, currentIndexImages],
  )

  // show image first
  useEffect(() => {
    if (product && product.images.length > 0) {
      setActiveImage(product.images[0])
    }
  }, [product])

  // hover slider show
  const chooseActiveImage = (img: string) => {
    setActiveImage(img)
  }

  //handle click next and prev
  // [1,5]=>[2,6]=>[3,7]....
  const next = () => {
    console.log(currentIndexImages[1])
    if (currentIndexImages[1] < (product as Product).images.length) {
      setCurrentIndexImages((prev) => [prev[0] + 1, prev[1] + 1])
    }
  }

  const prev = () => {
    console.log(currentIndexImages[1])
    if (currentIndexImages[0] > 0) {
      setCurrentIndexImages((prev) => [prev[0] - 1, prev[1] - 1])
    }
  }

  const handleZoom = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const rect = event.currentTarget.getBoundingClientRect()
    const image = imageRef.current as HTMLImageElement
    const { naturalHeight, naturalWidth } = image
    const offsetX = event.pageX - (rect.x + window.scrollX)
    const offsetY = event.pageY - (rect.y + window.scrollY)
    const top = offsetY * (1 - naturalHeight / rect.height)
    const left = offsetX * (1 - naturalWidth / rect.width)
    image.style.width = naturalWidth + 'px'
    image.style.height = naturalHeight + 'px'
    image.style.maxWidth = 'unset'
    image.style.top = top + 'px'
    image.style.left = left + 'px'
  }

  const handleRemoveZoom = () => {
    imageRef.current?.removeAttribute('style')
  }

  if (!product) return null
  return (
    <div className='bg-gray-200 py-6'>
      <div className='container'>
        <div className='bg-white p-4 shadow'>
          <div className='grid grid-cols-12 gap-9'>
            <div className='col-span-5'>
              <div
                className='relative cursor-zoom-in overflow-hidden w-full pt-[100%] shadow'
                onMouseMove={handleZoom}
                onMouseLeave={handleRemoveZoom}
              >
                <img
                  src={activeImage}
                  alt={product.name}
                  className='absolute top-0 left-0 bg-white h-full w-full object-cover'
                  ref={imageRef}
                />
              </div>
              <div className='relative mt-4 grid grid-cols-5 gap-1'>
                <button
                  className='absolute left-0 top-1/2 z-10 h-9 w-5 -translate-y-1/2 bg-black/20 text-white'
                  onClick={prev}
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='w-5 h-5'
                  >
                    <path strokeLinecap='round' strokeLinejoin='round' d='M15.75 19.5L8.25 12l7.5-7.5' />
                  </svg>
                </button>
                {currentImages.map((img) => {
                  const isActive = img === activeImage
                  return (
                    <div className='relative w-full pt-[100%]' key={img} onMouseEnter={() => chooseActiveImage(img)}>
                      <img
                        src={img}
                        alt={product.name}
                        className='absolute top-0 left-0 bg-white  object-cover cursor-pointer '
                      />
                      {isActive && <div className=' absolute inset-0 border-2 border-orange-600'></div>}
                    </div>
                  )
                })}
                <button
                  className='absolute right-0 top-1/2 z-10 h-9 w-5 -translate-y-1/2 bg-black/20 text-white'
                  onClick={next}
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='w-5 h-5'
                  >
                    <path strokeLinecap='round' strokeLinejoin='round' d='M8.25 4.5l7.5 7.5-7.5 7.5' />
                  </svg>
                </button>
              </div>
            </div>
            <div className='col-span-7'>
              <h1 className='text-xl font-medium uppercase'>{product.name}</h1>
              <div className='mt-8 flex items-center'>
                <div className='flex items-center'>
                  <span className='mr-1 border-b border-b-orange-600 text-orange-600'>{product.rating}</span>
                  <ProductRating
                    rating={product.rating}
                    activeClassName='fill-orange-600 text-orange-600 h-4 w-4'
                    NonactiveClassName='fill-gray-300 text-gray-300 h4- w-4'
                  />
                </div>
                <div className='mx-4 h-4 w-[1px] bg-gray-300'></div>
                <div className=''>
                  <span> {formatNumberToSocial(product.sold)}</span>
                  <span className='ml-1 text-gray-500'>đã bán</span>
                </div>
              </div>
              <div className='mt-8 flex items-center bg-gray-50 py-4 px-4'>
                <div className='text-gray-500 line-through'>₫{formatCurrency(product.price_before_discount)}</div>
                <div className='ml-3 text-3xl text-orange-600 font-medium'>₫{formatCurrency(product.price)}</div>
                <div className='bg-orange-600 ml-3 px-1 text-white text-xs rounded-sm uppercase font-semibold'>
                  {discountRate(product.price_before_discount, product.price)} Giảm
                </div>
              </div>
              <div className='flex items-center mt-8'>
                <div className='text-gray-500 capitalize'>Số lượng</div>
                <div className='flex ml-10 items-center'>
                  <button className='flex h-8 w-8 items-center justify-center rounded-l-sm border border-gray-300 text-gray-600'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                      strokeWidth={1.5}
                      stroke='currentColor'
                      className='w-4 h-4'
                    >
                      <path strokeLinecap='round' strokeLinejoin='round' d='M19.5 12h-15' />
                    </svg>
                  </button>
                  <InputNumber
                    value={1}
                    className=''
                    classNameError='hidden'
                    classNameInput='h-8 w-14 border border-t border-b border-gray-300 text-center outline-none'
                  />
                  <button className='flex h-8 w-8 items-center justify-center rounded-l-sm border border-gray-300 text-gray-600'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                      strokeWidth={1.5}
                      stroke='currentColor'
                      className='w-4 h-4'
                    >
                      <path strokeLinecap='round' strokeLinejoin='round' d='M12 4.5v15m7.5-7.5h-15' />
                    </svg>
                  </button>
                </div>
                <div className='ml-6 text-sm text-gray-500'>{product.quantity} Sản phẩm có sẵn</div>
              </div>
              <div className='mt-8 flex items-center '>
                <button className='flex h-12 items-center justify-center rounded-sm border border-orange-600 bg-orange-600/10 px-5 text-orange-600 hover:bg-orange-600/5'>
                  <svg
                    enable-background='new 0 0 15 15'
                    viewBox='0 0 15 15'
                    x='0'
                    y='0'
                    className='w-5 h-5 fill-current stroke-orange-600 mx-1'
                  >
                    <g>
                      <g>
                        <polyline
                          fill='none'
                          points='.5 .5 2.7 .5 5.2 11 12.4 11 14.5 3.5 3.7 3.5'
                          stroke-linecap='round'
                          stroke-linejoin='round'
                          stroke-miterlimit='10'
                        ></polyline>
                        <circle cx='6' cy='13.5' r='1' stroke='none'></circle>
                        <circle cx='11.5' cy='13.5' r='1' stroke='none'></circle>
                      </g>
                      <line
                        fill='none'
                        stroke-linecap='round'
                        stroke-miterlimit='10'
                        x1='7.5'
                        x2='10.5'
                        y1='7'
                        y2='7'
                      ></line>
                      <line
                        fill='none'
                        stroke-linecap='round'
                        stroke-miterlimit='10'
                        x1='9'
                        x2='9'
                        y1='8.5'
                        y2='5.5'
                      ></line>
                    </g>
                  </svg>
                  Thêm Vào Giỏ Hàng
                </button>
                <button className='mx-6 bg-orange-600 h-12 px-3 rounded-sm text-white hover:bg-orange-600/90'>
                  Mua Ngay
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className='mt-8 bg-white p-4 shadow'>
          <div className='container'>
            <div className='rounded bg-gray-50 p-4 text-lg uppercase'>mô tả sản phẩm</div>
            <div className='mx-4 mt-12 mb-4 text-sm leading-loose'>
              <div
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(product.description),
                }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
