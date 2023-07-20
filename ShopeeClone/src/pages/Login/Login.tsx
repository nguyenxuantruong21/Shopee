/* eslint-disable @typescript-eslint/no-unused-vars */
import { yupResolver } from '@hookform/resolvers/yup/src/yup.js'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { LoginAccount } from 'src/apis/auth.api'
import Input from 'src/components/Input'
import { LoginSchema, loginSchema } from 'src/utils/rules'
import { toast } from 'react-toastify'
import { isAxiosErrorUnprocessableEntity } from 'src/utils/utils'
import { ResponseApi } from 'src/types/utils.type'

type FormData = LoginSchema

export default function Login() {
  const {
    formState: { errors },
    handleSubmit,
    register,
    setError
  } = useForm<FormData>({
    resolver: yupResolver(loginSchema)
  })

  const loginAccountMutation = useMutation({
    mutationFn: (body: FormData) => LoginAccount(body)
  })

  const onSubmit = handleSubmit((data) => {
    loginAccountMutation.mutate(data, {
      onSuccess: (data) => {
        const message = data.data.message
        toast.success(message)
      },
      onError: (error) => {
        if (isAxiosErrorUnprocessableEntity<ResponseApi<Omit<FormData, 'confirm_password'>>>(error)) {
          const formError = error.response?.data.data
          if (formError?.email) {
            setError('email', { message: formError.email, type: 'Server' })
          }
          if (formError?.password) {
            setError('password', { message: formError.password, type: 'Server' })
          }
        }
      }
    })
  })

  return (
    <div className='bg-orange-600'>
      <div className='container'>
        <div className='grid grid-cols-1 lg:grid-cols-5 py-12 lg:py-32 lg:pr-10'>
          <div className='lg:col-span-2 lg:col-start-4'>
            <form className='bg-white p-10 shadow-sm  rounded-md' onSubmit={onSubmit}>
              <div className='text-2xl'>Đăng nhập</div>
              <Input
                type='text'
                name='email'
                placeholder='Email'
                register={register}
                className='mt-8'
                errorMassage={errors.email?.message}
                autoComplete='on'
              />
              <Input
                type='text'
                name='password'
                placeholder='Password'
                register={register}
                className='mt-2'
                errorMassage={errors.password?.message}
                autoComplete='on'
              />
              <div className='mt-2'>
                <button className='w-full text-center bg-red-500 py-4 px-2 text-white hover:bg-red-600'>
                  Đăng nhập
                </button>
              </div>
              <div className='mt-8 flex justify-center items-center'>
                <span className='text-gray-400'>Bạn mới biết đến Shopee?</span>
                <Link className='text-red-400 ml-1' to={'/register'}>
                  Đăng ký
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}