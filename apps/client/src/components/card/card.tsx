import type { FC } from 'react'
import type { CardProps } from './types'

const Card: FC<CardProps> = ({image, title, description}) => {
  return (
    <button 
    type='button' 
    className="card card-compact bg-base-100 w-96 shadow-xl hover:ring-2 hover:ring-blue-700"
    onClick={()=>alert('hola')}
    >
        <figure>
            <img
            src={image}
            alt={title} />
        </figure>
        <div className="card-body items-center">
            <h2 className="card-title">{title}</h2>
            <p>{description}</p>
            <div className="card-actions self-end justify-end">
                <button className="btn btn-primary">$99.99</button>
            </div>
        </div>
    </button>
  )
}

export default Card