import {type FC, ButtonHTMLAttributes} from 'react'

const FilterButton: FC<ButtonHTMLAttributes<HTMLButtonElement>> = (props) => {
  return (
    <button {...props} type='button' className='hover:underline hover:text-gray-600'/>
  )
}

export default FilterButton