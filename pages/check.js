import React, { useState, useEffect, useRef } from 'react';
import swell from '../swell/swell';




  const Check = ({
  
}) => {








    const cart = async () => {
        // await swell.cart.addItem({
        //     product_id: '620bd3282007783876e1b116',
           
        //   })
        const cart = await swell.cart.get();

        console.log(cart)
        swell.payment.createElements({
            card: {
              elementId: '#card-element-id', // default: #card-element
              options: {
                // options are passed as a direct argument to stripe.js
                style: {
                  base: {
                    fontWeight: 500,
                    fontSize: '8px'
                  }
                }
              },
              onChange: event => {
                   console.log('cahnged')
                // optional, called when the Element value changes
              },
              onReady: event => {
                // optional, called when the Element is fully rendered
              },
              onFocus: event => {
                  console.log(1)
                // optional, called when the Element gains focus
              },
              onBlur: event => {
                console.log(2)
                // optional, called when the Element loses focus
              },
              onEscape: event => {
                // optional, called when the escape key is pressed within an Element
              },
              onClick: event => {
                console.log(3)                // optional, called when the Element is clicked
              },
              onSuccess: result => {
                // optional, called on card payment success
              },
              onError: error => {
                // optional, called on card payment error
              }
            }
          })
    }






    useEffect(() => {
        
       cart();
       
    }, []);

    return (
        <div id="card-element-id">
            <input  type="text"/>
        </div>
    );
};

export default Check;
