// import store using Map()
import {priceStore} from '../tmp_storage/priceStore.js'

export function priceTracker(asin:string,currentPrice:number){
   console.log("price Tracker >", currentPrice, asin)
    if(!asin || currentPrice === null) throw new Error("Check the input is null, undefined or check the params types")
    if(priceStore.has(asin)){
       const prevPrice =  priceStore.get(asin)
       if(typeof prevPrice === "number"){
          if(currentPrice > prevPrice){
             priceStore.add(asin,currentPrice);
             return {
                status: 'increased', newPrice: currentPrice
             }
          }else if(currentPrice < prevPrice){
             priceStore.add(asin, currentPrice);
             return{
                status: 'decreased', newPrice: currentPrice
             }
          }else{
            priceStore.add(asin,currentPrice);
            return{
                status: 'initialized', newPrice: currentPrice
            }
          }
       }
    }
}