export const formatPrice = (price: string) =>{
    return `$${(parseInt(price) / 100).toFixed(2)}`
}