import React from 'react'
import "./Home.css"
import Product from  "./Product.js"

function Home() {
  return (
    <div className='home'>
        <div className='home__container'> 
            <img src='https://images-eu.ssl-images-amazon.com/images/G/02/digital/video/merch2016/Hero/Covid19/Generic/GWBleedingHero_ENG_COVIDUPDATE__XSite_1500x600_PV_en-GB._CB428684220'
             alt='' className='home__image'/>

            <div className='home__row'>
                <Product 
                    id='152395'
                    title='The lean startup'
                    price={29.99}
                    image='https://images-na.ssl-images-amazon.com/images/I/51Zymoq7UnL._AC_SY400_.jpg'
                    rating={5}/>
                <Product 
                    id='152395'
                    title='The lean startup'
                    price={29.99}
                    image='https://images-na.ssl-images-amazon.com/images/I/51Zymoq7UnL._AC_SY400_.jpg'
                    rating={5}/>
            </div>

            <div className='home__row'>
                <Product 
                    id='152395'
                    title='The lean startup'
                    price={29.99}
                    image='https://images-na.ssl-images-amazon.com/images/I/51Zymoq7UnL._AC_SY400_.jpg'
                    rating={3}/>
                <Product 
                    id='152395'
                    title='The lean startup'
                    price={29.99}
                    image='https://images-na.ssl-images-amazon.com/images/I/51Zymoq7UnL._AC_SY400_.jpg'
                    rating={5}/>                
                <Product 
                    id='152395'
                    title='The lean startup'
                    price={29.99}
                    image='https://images-na.ssl-images-amazon.com/images/I/51Zymoq7UnL._AC_SY400_.jpg'
                    rating={4}/>
            </div>

            <div className='home__row'>
                <Product 
                    id='152378'
                    title='The lean startup'
                    price={59.99}
                    image='https://images-na.ssl-images-amazon.com/images/I/51Zymoq7UnL._AC_SY400_.jpg'
                    rating={5}/>
            </div>
        </div>
    </div>
  )
}

export default Home