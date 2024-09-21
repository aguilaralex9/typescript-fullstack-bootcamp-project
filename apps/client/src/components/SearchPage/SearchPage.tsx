import Card from '../Card/Card'
import FilterButton from '../FilterButton/FilterButton'
import { useState } from 'react';
import {
    useQuery,
  } from '@tanstack/react-query'
  import { handleSort } from '../../utils/handleSort';

const SearchPage = () => {
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const { isLoading: productsLoading, data: products } = useQuery({
    queryKey: ['products', sortOrder], 
    queryFn: () => fetch(`http://localhost:5001/api/products?order=${sortOrder}`)
      .then((result) => result.json()),
  });
    const {isLoading: collectionsLoading, data: collections} = useQuery({ queryKey: ['collections'], queryFn: () => fetch('http://localhost:5001/api/collections').then((result)=> result.json()) })

    if(productsLoading || collectionsLoading){
        return <span>Loading...</span>
    }
  return (
    <main className=" bg-blue-100 flex flex-col gap-8 items-center min-h-screen p-8 text-center mx-auto">
      <header className='container w-full flex justify-between items-center'>
      <h1 className="text-5xl font-bold text-balance">
        Store
      </h1>
        <label className="input input-bordered flex items-center gap-2 w-1/3">
          <input type="text" className="grow" placeholder="Search" />
        <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 16 16"
        fill="currentColor"
        className="h-4 w-4 opacity-70">
          <path
          fillRule="evenodd"
          d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
          clipRule="evenodd" />
        </svg>
      </label>
      </header>
      <div className='flex gap-5'>
      <div className='flex flex-col items-start'>
        <span className='text-xl text-gray-600 font-semibold'>Collections</span>
        <FilterButton>All</FilterButton>
        {collections?.result?.map((collection: { id: string, name: string }, index: string | number)=><FilterButton key={`collection-${+index}`}>{collection.name}</FilterButton>)}
      </div>
      <div className='grid grid-cols-3 gap-10'>
        {products?.result?.map((product: {
            id: string,
            price: string, image: string; name: string; description: string 
          }, index: string | number)=><Card key={`card-${+index}`} id={product.id} image={product.image} name={product.name} description={product.description} price={product.price}/>)}
      </div>
      <div className='flex flex-col items-start'>
        <span className='text-xl text-gray-600 font-semibold'>Sort by</span>
        <FilterButton onClick={() => handleSort('desc', setSortOrder)}>Pricing (Highest to Lowest)</FilterButton>
        <FilterButton onClick={() => handleSort('asc', setSortOrder)}>Pricing (Lowest to Highest)</FilterButton>
      </div>
      </div>
    </main>
  )
}

export default SearchPage