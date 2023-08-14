import Button from 'src/components/Button'
import Input from 'src/components/Input'

export default function Profile() {
  return (
    <div className='rounded-sm bg-white px-2 md:px-7 pb-10 md:pb-20 shadow'>
      <div className='border-b border-b-gray-200 py-4'>
        <h1 className='text-gray-900 text-lg font-medium capitalize px-10'>Hồ Sơ Của Tôi</h1>
        <p className='text-gray-700 text-sm mt-1 px-10'>Quản lý trang thông tin hồ sơ để bảo vệ tài khoản</p>
      </div>
      <div className='mt-8 flex flex-col-reverse md:flex-row md:items-start'>
        <form className='flex-grow mt-6 pr-12 md:mt-0'>
          <div className='flex flex-wrap sm:flex-row'>
            <div className='sm:w-[20%] truncate pt-3 sm:text-right capitalize'>Email</div>
            <div className='sm:w-[80%] pl-5'>
              <div className='pt-3 text-gray-700'>xu*************@gmail.com</div>
            </div>
          </div>
          <div className='flex flex-wrap mt-6  sm:flex-row'>
            <div className='sm:w-[20%] truncate pt-3 sm:text-right capitalize'>Tên</div>
            <div className='sm:w-[80%] pl-5'>
              <Input classNameInput='w-full rounded-sm border border-gray-300 px-3 py-2 outline-none focus:border-gray-500 focus:shadow-sm' />
            </div>
          </div>
          <div className='flex flex-wrap mt-2  sm:flex-row'>
            <div className='sm:w-[20%] truncate pt-3 sm:text-right capitalize'>Số điện thoại</div>
            <div className='sm:w-[80%] pl-5'>
              <Input classNameInput='w-full rounded-sm border border-gray-300 px-3 py-2 outline-none focus:border-gray-500 focus:shadow-sm' />
            </div>
          </div>
          <div className='flex flex-wrap mt-2  sm:flex-row'>
            <div className='sm:w-[20%] truncate pt-3 sm:text-right capitalize'>Địa chỉ</div>
            <div className='sm:w-[80%] pl-5'>
              <Input classNameInput='w-full rounded-sm border border-gray-300 px-3 py-2 outline-none focus:border-gray-500 focus:shadow-sm' />
            </div>
          </div>
          <div className='flex flex-wrap mt-2  sm:flex-row'>
            <div className='sm:w-[20%] truncate pt-3 sm:text-right capitalize'>Ngày Sinh</div>
            <div className='sm:w-[80%] pl-5'>
              <div className='flex justify-between'>
                <select className='h-10 w-[32%] rounded-sm border border-black/10 px-3'>
                  <option>Ngày</option>
                </select>
                <select className='h-10 w-[32%] rounded-sm border border-black/10 px-3'>
                  <option>Tháng</option>
                </select>
                <select className='h-10 w-[32%] rounded-sm border border-black/10 px-3'>
                  <option>Năm</option>
                </select>
              </div>
            </div>
          </div>
          <div className='flex flex-wrap mt-5 sm:flex-row'>
            <div className='sm:w-[20%] truncate pt-3 sm:text-right capitalize' />
            <div className='sm:w-[80%] pl-5 '>
              <Button className='sm:w-[30%] md:w-[50px] text-center bg-orange-600 py-2 px-2 text-white  hover:bg-orange-600/80'>
                Lưu
              </Button>
            </div>
          </div>
        </form>
        <div className='flex justify-center md:w-72 md:border-l md:border-l-gray-200'>
          <div className='flex flex-col items-center'>
            <div className='my-5 h-24 w-24'>
              <img
                src='https://down-vn.img.susercontent.com/file/00f19b3560b8b12a609f50ef1e70809e_tn'
                alt=''
                className='w-full h-full object-cover rounded-full'
              />
            </div>
            <input type='file' accept='.jpg, .png, .jpeg' className='hidden' />
            <button className=' border border-gray-200 bg-white px-6  py-2 text-sm text-gray-600'>Chọn Ảnh</button>
            <div className='text-center mt-2 text-gray-400'>Dụng lượng file tối đa 1 MB </div>
            <div className='text-center mt-2 text-gray-400'>Định dạng:.JPEG, .PNG</div>
          </div>
        </div>
      </div>
    </div>
  )
}
