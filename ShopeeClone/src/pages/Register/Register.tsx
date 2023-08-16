/* eslint-disable @typescript-eslint/no-unused-vars */
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import Input from 'src/components/Input'
import { Schema, schema } from 'src/utils/rules'
import { useMutation } from '@tanstack/react-query'
import authApi from 'src/apis/auth.api'
import { omit } from 'lodash'
import { isAxiosErrorUnprocessableEntity } from 'src/utils/utils'
import { ErrorResponse } from 'src/types/utils.type'
import { useContext } from 'react'
import { AppContext } from 'src/contexts/app.context'
import Button from 'src/components/Button'

type FormData = Pick<Schema, 'email' | 'password' | 'confirm_password'>
const registerSchema = schema.pick(['email', 'password', 'confirm_password'])

export default function Register() {
  const { setIsAuthenticated, setProfile } = useContext(AppContext)
  const navigate = useNavigate()
  const {
    formState: { errors },
    handleSubmit,
    register,
    setError,
  } = useForm<FormData>({
    resolver: yupResolver(registerSchema),
  })

  const registerAccountMutation = useMutation({
    mutationFn: (body: Omit<FormData, 'confirm_password'>) => authApi.registerAccount(body),
  })

  const onSubmit = handleSubmit((data) => {
    const body = omit(data, ['confirm_password'])
    registerAccountMutation.mutate(body, {
      onSuccess: (data) => {
        setIsAuthenticated(true)
        setProfile(data.data.data.user)
        navigate('/')
      },
      onError: (error) => {
        if (isAxiosErrorUnprocessableEntity<ErrorResponse<Omit<FormData, 'confirm_password'>>>(error)) {
          const formError = error.response?.data.data
          if (formError?.email) {
            setError('email', { message: formError.email, type: 'Server' })
          }
          if (formError?.password) {
            setError('password', { message: formError.password, type: 'Server' })
          }
        }
      },
    })
  })

  return (
    <div className='bg-orange-600'>
      <div className='container'>
        <div className='grid grid-cols-1 py-12 lg:grid-cols-5 lg:py-32 lg:pr-10'>
          <div className='lg:col-span-2 lg:col-start-4'>
            <form className='bg-white p-10 shadow-sm  rounded-md' onSubmit={onSubmit}>
              <div className='text-2xl'>Đăng Ký</div>
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
              <Input
                type='text'
                name='confirm_password'
                placeholder='Confirm Password'
                register={register}
                className='mt-2'
                errorMassage={errors.confirm_password?.message}
                autoComplete='on'
              />
              <div className='mt-2'>
                <Button
                  type='submit'
                  disabled={registerAccountMutation.isLoading}
                  isLoading={registerAccountMutation.isLoading}
                  className='flex justify-center items-center w-full text-center py-4 px-2 bg-red-500 text-white  hover:bg-red-600'
                >
                  Đăng ký
                </Button>
              </div>
              <div className='flex items-center justify-center mt-8'>
                <span className='text-gray-400'>Bạn đã có tài khoản?</span>
                <Link className='text-red-400 ml-1' to={'/login'}>
                  Đăng nhập
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
