import React, { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom';
import "./ProductPage.css"

function ProductPage() {
  const [searchParams] = useSearchParams();
  console.log(searchParams.get('sort')); // 'name'

  useEffect(() => {
        
    }, [])

  return (
    <div className='productPage'>
        ProductPage
    </div>
  )
}

export default ProductPage