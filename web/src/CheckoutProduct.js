import React, { useState } from 'react'
import "./CheckoutProduct.css"
import { useStateValue } from './StateProvider';

function CheckoutProduct({id, image, title, price, rating, quantity}) {
    const [{}, dispatch] = useStateValue();
    const [q, setQ] = useState(quantity); 

    const removeFromBasket = () => {
        //remove item from basket
        dispatch({
            type: 'REMOVE_FROM_BASKET',
            id: id,
        })
    }

    const reduceQuantity = () => {
        //remove item from basket
        setQ(q-1);
        dispatch({
            type: 'REDUCE_QUANTITY',
            id: id,
        })
    }

    const increaseQuantity = () => {
        //remove item from basket
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
                    <button onClick={reduceQuantity}>-</button>
                    <p> {q} </p>
                    <button onClick={increaseQuantity}>+</button>
                </div>
                <button onClick={removeFromBasket}>Remove from Basket</button>
            </div>
        </div>
    )
}

export default CheckoutProduct