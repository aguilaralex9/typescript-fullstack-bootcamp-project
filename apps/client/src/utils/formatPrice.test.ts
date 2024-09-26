import { formatPrice } from "./formatPrice";

describe('format price', ()=>{
    it('should format price', ()=> {
        const result = formatPrice('1234')
        expect(result).toEqual('$12.34')
    })
})