//import { useState } from 'react'
import { storeItems } from './temp'
import Card from './components/card/card'

function App() {
  //const [searchValue, setSearchValue] = useState(0)

  return (
    <main className=" bg-indigo-100 flex flex-col gap-8 items-center min-h-screen p-8 text-center mx-auto">
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
          fill-rule="evenodd"
          d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
          clip-rule="evenodd" />
        </svg>
      </label>
      </header>
      <div className='flex gap-5'>
      <div className='flex flex-col'>
        <span className='text-xl text-gray-600 font-semibold'>Collections</span>
        <ul></ul>
      </div>
      <div className='grid grid-cols-3 gap-10'>
        {storeItems.map((product, index)=><Card key={`card-${+index}`} image={product.image} title={product.title} description={product.description}/>)}
      </div>
      <div className='flex flex-col items-start'>
        <span className='text-xl text-gray-600 font-semibold'>Sort by</span>
        <button type='button' className='hover:underline hover:text-gray-600'>Pricing (Highest to Lowest)</button>
        <button type='button' className='hover:underline hover:text-gray-600'>Pricing (Lowest to Highest)</button >
      </div>
      </div>
    </main>
  )
}

export default App
