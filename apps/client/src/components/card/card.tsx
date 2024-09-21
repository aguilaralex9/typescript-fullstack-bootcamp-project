import { Link } from '@tanstack/react-router'
import type { FC } from 'react'
import type { CardProps } from './types'
import { formatPrice } from '../../utils/formatPrice'

const Card: FC<CardProps> = ({id, image, name, price, description}) => {
  return (
    <Link
     to='/about/$productId'
     params={{ productId: id }} 
     className="card card-compact bg-base-100 w-96 shadow-xl hover:ring-2 hover:ring-blue-700"
    >
        <figure>
            <img
            src={image}
            alt={name} />
        </figure>
        <div className="card-body items-center">
            <h2 className="card-name">{name}</h2>
            <p>{description}</p>
            <div className="card-actions self-end justify-end">
                <span className="rounded-xl p-3 bg-blue-500 text-white text-lg font-bold font-mono">{formatPrice(price)}</span>
            </div>
        </div>
    </Link>
  )
}

export default Card