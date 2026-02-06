//  Objective-: Price is higher than previous one. update the db and sent the alert

import { scheduleAggregate } from "../scrapers/amazon.scrapers.js"
import { priceStore  } from "../tmp_storage/priceStore.js"
import { priceTracker } from "./priceTracker.js"

export const priceChecker = async():Promise<void>=>{
   console.log("price checker..", priceStore.entries())
   // TODO:  priceStore can be empty validation missing
  const promises =   Array.from(priceStore.entries(),([asin,curPrice])=>{
     console.log('check >>', asin, curPrice)
       return scheduleAggregate(asin)
    })

    const outcomes = await Promise.allSettled(promises);
    outcomes.forEach((outcomes,index)=>{
        console.log('outcomes >> ',outcomes,index)
        if(outcomes.status === "fulfilled"){
            console.log("succeeded")
          const priceResult =    priceTracker(outcomes.value?.product_asin!,outcomes.value?.product_price!)
          // TODO: alert the message email id, or any another services
          console.log(priceResult)
        }else{
            console.log("failed >> ", outcomes)
            // pending feature
        }
    })
}

