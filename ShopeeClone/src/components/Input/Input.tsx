/* eslint-disable @typescript-eslint/no-explicit-any */
import type { UseFormRegister, RegisterOptions } from 'react-hook-form'
import type { InputHTMLAttributes } from 'react'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  errorMassage?: string
  register?: UseFormRegister<any>
  rules?: RegisterOptions
  classNameInput?: string
  classNameError?: string
}

export default function Input({
  type,
  errorMassage,
  placeholder,
  className,
  name,
  register,
  rules,
  autoComplete,
  classNameError = 'text-red-600 text-sm min-h-[1.25rem]',
  classNameInput = 'p-3 w-full outline-none border border-gray-300 focus:border-gray-500 focus:shadow-sm rounded-sm '
}: Props) {
  const registerResult = register && name ? register(name, rules) : {}
  return (
    <div className={className}>
      <input
        type={type}
        placeholder={placeholder}
        className={classNameInput}
        autoComplete={autoComplete}
        {...registerResult}
      />
      <div className={classNameError}>{errorMassage}</div>
    </div>
  )
}
