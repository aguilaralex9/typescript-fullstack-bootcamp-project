import { Link, useParams } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'

const AboutPage = () => {
  const { productId } = useParams({ strict: false })
    const {isLoading, data} = useQuery({ queryKey: ['products'], queryFn: () => fetch(`http://localhost:5001/api/products/${productId}`).then((result)=> result.json()) })
    if(isLoading){
        return <span>Loading...</span>
    }
    const { image, name, price, variants } = data?.data || {};
    console.log(data.data)
  return (
    <main className=" bg-blue-100 flex flex-col gap-8 items-center min-h-screen p-8 text-center mx-auto">
      <header className='container w-full flex justify-start items-center'>
      <Link to='/' className="text-3xl font-bold text-balance hover:underline">
        Home
      </Link>
      </header>
      <div className='flex rounded-xl bg-base-100 shadow-xl'>
      <figure className='w-2/3'>
            <img
            className='rounded-xl'
            src={image}
            alt='product' />
        </figure>
      <div className='w-1/3 flex flex-col items-start gap-3 py-5'>
        <h1 className=' text-start text-4xl font-bold'>{name}</h1>
        <span className="rounded-xl py-2 px-4 bg-blue-500 text-white text-lg font-bold font-mono">${(price / 100).toFixed(2)}</span>
        <div className="divider my-0" />
        <span className='font-semibold'>VARIANTS</span>
        <div className='flex flex-wrap gap-2'>
        {variants?.map((variant: { name: string  }, index: string | number)=><span key={`varaint-${+index}`} className='rounded-xl p-1 px-3 border border-gray-600 bg-gray-200 hover:bg-gray-300 font-semibold text-sm'>{variant.name}</span>)}
        </div>
      </div>
      </div>
    </main>
  )
}

export default AboutPage