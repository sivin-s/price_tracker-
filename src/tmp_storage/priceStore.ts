const priceList = new Map<string,number>()

const priceStore  = {
     /** 
     * @param key - asin
     * @param value - price
    */
   add(key:string,value:number){
    priceList.set(key,value)
    /** 
     * @param key - asin
    */
}, get(key:string){
    return priceList.get(key);
     /** 
     * @param key - asin
    */
}, has(key:string){
    return priceList.has(key)
},
 keys(){
    return priceList.keys()
 },
 entries(){
    return priceList.entries()
 }
} 

export{
    priceStore
}

