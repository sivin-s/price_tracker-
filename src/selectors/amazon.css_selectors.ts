const css_selectors={ // readonly, not type
   asin: 'data-csa-c-asin', // asin -> attr selector
   product_name:  '#productTitle', //  product name -> id selector
   price: '.priceToPay .a-price-whole', // product price -> class selector
   rating: '#acrPopover [aria-hidden="true"]' 
}  as const


export {
    css_selectors
}
