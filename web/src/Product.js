import React from 'react'
import {useStateValue} from './StateProvider'
import "./Product.css"
import { Link } from 'react-router-dom';

function Product({id, title, image, price, rating}) {

  const [{ basket }, dispatch] = useStateValue();

  const addToBasket = (e) => {
      // dispatch item to data layer
      e.preventDefault();
      dispatch({
          type: 'ADD_TO_BASKET',
          item: {
              id: id,
              title: title,
              image: image,
              price: price,
              rating: rating,
          }
      })
  }
  
  return (
    <div className='product'>
        <div className='product__info'>
            <p>{title}</p>
            <p className='product__price'>
                <small>$</small>
                <strong>{price}</strong>
            </p>
            <div className='product__rating'>
              {Array(rating).fill().map((_, i) => (<p key={i}>⭐</p>))}
            </div>

        </div>
        
        <Link to={`product_page?id=${id}`}>
          <img src={image} alt='' />
        </Link>
        <button onClick={addToBasket}>Add to Basket</button>
    </div>
  )
}

export default Product