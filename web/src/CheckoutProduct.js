import React, { useState } from 'react'
import "./CheckoutProduct.css"
import { useStateValue } from './StateProvider';

function CheckoutProduct({id, image, title, price, rating, quantity}) {
    const [{}, dispatch] = useStateValue();
    const [q, setQ] = useState(quantity); 

    const removeFromBasket = (e) => {
        //remove item from basket
        e.preventDefault();
        dispatch({
            type: 'REMOVE_FROM_BASKET',
            id: id,
        })
    }

    const decreaseQuantity = (e) => {
        //remove item from basket
        e.preventDefault();

        if(q > 1){
            setQ(q-1);
            dispatch({
                type: 'DECREASE_QUANTITY',
                id: id,
            })
        }
    }

    const increaseQuantity = (e) => {
        //remove item from basket
        e.preventDefault();
        setQ(q+1);
        dispatch({
            type: 'INCREASE_QUANTITY',
            id: id,
        })
    }

    return (
        <div className='checkoutProduct'>
            <img className='checkoutProduct__image' src={image} alt=''/>

            <div className='checkoutProduct__info'>
                <p className='checkoutProduct__title'>{title}</p>
                <p className='checkoutProduct__price'>
                    <small>$</small>
                    <strong>{price}</strong>
                </p>
                <div className='checkoutProduct__rating'>
                    {Array(rating).fill().map((_, i) => (
                        <p>⭐</p>
                    ))}
                </div>
                <div className='checkoutProduct__quantity'>
                    <button onClick={decreaseQuantity} disabled={!(q > 1)}>-</button>
                    <p>{q}</p>
                    <button onClick={increaseQuantity}>+</button>
                </div>
                <button onClick={removeFromBasket}>Remove from Basket</button>
            </div>
        </div>
    )
}

export default CheckoutProduct