import React from 'react'
import ProductFilter from '../Components/ProductFilter'
import ProductList from '../Components/ProductList'

const Products = () => {
  return (
    <main className='products_section'>
      <div className='container'>
        <div className='row'>
          <div className='col-3'>
            <ProductFilter />

          </div>
          <div className='col-9'>
            <ProductList />

          </div>
        </div>

      </div>

    </main>
  )
}

export default Products
