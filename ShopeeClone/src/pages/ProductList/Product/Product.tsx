import { Link } from 'react-router-dom'

export default function Product() {
  return (
    <Link to=''>
      <div className='bg-white shadow-sm rounded-sm hover:translate-y-[-0.0625rem] hover:shadow-md duration-100 transition-transform'>
        <div className='w-full pt-[100%] relative '>
          <img
            src='https://down-vn.img.susercontent.com/file/sg-11134201-22120-10l3lifcvqlva9_tn'
            alt=''
            className='absolute top-0 left-0 bg-white w-full object-cover'
          />
        </div>
        <div className='p-2 overflow-hidden'>
          <div className='min-h-[1.75rem] line-clamp-2 text-sm'>
            Đồng hồ nam chính hãng lịch đồng hồ nam dây thép dạ quang chống nước chống bức xạ đồng hồ
          </div>
          <div className='flex items-center mt-3'>
            <div className='line-through max-m-[50%] text-gray-500 truncate'>
              <span>₫</span>
              <span>990.000</span>
            </div>
            <div className='ml-1 max-m-[50%] text-red-500 truncate'>
              <span>₫</span>
              <span>790.000</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
