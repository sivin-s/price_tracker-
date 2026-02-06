import type{Request,Response} from 'express'
import { initialTimeAggregate, scheduleAggregate } from '../../scrapers/amazon.scrapers.js'
import {priceChecker} from '../../utils/priceChecker.js'
import { priceStore } from '../../tmp_storage/priceStore.js'

async function initialAggregateController(req:Request,res:Response){
   try {
    const url = req.query.url  
    if(!url || typeof url !== "string"){
        res.status(400).send("url is missing")
        return;
    }
      const data = await initialTimeAggregate(url)
    //   console.log(data?.product_asin,data?.product_price)
      priceStore.add(data?.product_asin!,data?.product_price)
    //   console.log(priceStore.entries())
      res.status(200).json({data})
   } catch (error:any) {
       res.status(500).send("Server Error")
   }
}

// schedule
async function scheduleAggregateController(req:Request,res:Response){
   try {
    //  we donot use 'await' here because we don't want to block the response.
    priceChecker().catch((err)=> console.error("Background job failed :",err));
    res.status(200).json({
        message: "Scraping job started job started successfully in the background"
    })
   } catch (error:any) {
     res.status(500).send("Server Error")
   }
}

export{
    initialAggregateController,
    scheduleAggregateController
}