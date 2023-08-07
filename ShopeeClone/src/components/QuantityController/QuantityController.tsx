import InputNumber, { InputNumberProps } from '../InputNumber'
interface Props extends InputNumberProps {
  max?: number
  handleSetBuyCount?: (value: number) => void
}

export default function QuantityController({ handleSetBuyCount, max, value, ...rest }: Props) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let _value = Number(event.target.value)
    if (max !== undefined && _value > max) {
      _value = max
    } else if (_value < 0) {
      _value = 1
    }
    handleSetBuyCount && handleSetBuyCount(_value)
  }

  const increase = () => {
    let _value = Number(value) + 1
    if (max !== undefined && _value > max) {
      _value = max
    }
    handleSetBuyCount && handleSetBuyCount(_value)
  }

  const decrease = () => {
    let _value = Number(value) - 1
    if (_value < 1) {
      _value = 1
    }
    handleSetBuyCount && handleSetBuyCount(_value)
  }

  return (
    <div className='flex ml-10 items-center'>
      <button
        className='flex h-8 w-8 items-center justify-center rounded-l-sm border border-gray-300 text-gray-600'
        onClick={decrease}
      >
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
        className=''
        classNameError='hidden'
        classNameInput='h-8 w-14 border border-t border-b border-gray-300 text-center outline-none'
        value={value}
        {...rest}
        onChange={handleChange}
      />
      <button
        className='flex h-8 w-8 items-center justify-center rounded-l-sm border border-gray-300 text-gray-600'
        onClick={increase}
      >
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
  )
}
