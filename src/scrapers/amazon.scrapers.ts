import {gotScraping} from 'got-scraping';
import fs from 'fs';
import * as  cheerio from 'cheerio'
import PQueue from 'p-queue'; //req queue

import {css_selectors} from '../selectors/amazon.css_selectors.js'
import {constant} from '../const/const.js'
import { UUID } from '../utils/uuidGenrater.js';


// req queue config -> configure RATE LIMIT: 1 request every 2.5 seconds
const scrapeQueue = new PQueue({concurrency:1,interval: 2500})


/**
 * @param url string
*/
let urlTemp:string|null = null;
async function initialTimeAggregate (url:string){
    if(!url) throw new Error("url is missing")
      urlTemp = url;
   const res =  gotScraping.get(url)
.then(({body})=> {
         // fs.writeFileSync("./data.json",body)
   //  console.log("File written successfully..")
    const $ = cheerio.load(body);
   const product_name =  $(css_selectors.product_name).text().trim()
   const product_price = parseInt($(css_selectors.price).text().replace(/,/g,''),10)
   const product_asin = url.match(/\/dp\/([A-Z0-9]+)/)![1];
  
   const rating = Number(($(css_selectors.rating).text()).split(' ')[1])
   const timestamp = new Date().toISOString() // timestamp
   // console.log("asin >>>>>>>" , product_asin)
   return {
    id: UUID,
     product_name,
     product_price,
     product_asin,
     rating,
     timestamp
   }
})
return res;
}

/**
 * @param asin string
*/
async function  scheduleAggregate(asin:string){
    if(!asin)   throw new Error('asin is missing..')
  // Add to Queue
 try {
   return  await scrapeQueue.add(async ()=>{
        const {body} = await  gotScraping.get(`${constant.amazonUrl}/${asin}`)
          
   //       fs.writeFileSync("./data.json",body)
   //  console.log("File written successfully..")
    const $ = cheerio.load(body);
   const product_name =  $(css_selectors.product_name).text().trim()
   const product_price = parseInt($(css_selectors.price).text().replace(/,/g,''),10)
   const product_asin = urlTemp?.match(/\/dp\/([A-Z0-9]+)/)![1];
   const rating = Number(($(css_selectors.rating).text()).split(' ')[1])
   const timestamp = new Date().toISOString()
   const data =  {
      id: UUID,
      product_name,
      product_price,
      product_asin,
      rating,
      timestamp
   }
   console.log('schedule data  >>',data)
   return data
    })
 } catch (error:any) {
    console.log('Failed to scrape',error.message)
    return null;
 }
// return res;
}

export {
   scheduleAggregate,
    initialTimeAggregate
}