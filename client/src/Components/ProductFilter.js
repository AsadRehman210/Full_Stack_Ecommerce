import React from 'react'
import { useFilter } from '../Context/FilterContext'
import ProductCategory from './ProductCategory';

const ProductFilter = () => {
  const { searchValue, Search_Filter: { inputText } } = useFilter();



  return (
    <div className='row product_Filter_Section'>
      <div className='col-12 Product_search'>
        <form onSubmit={(e) => e.defaultPrevented()}>
          <input
            type="text"
            name='inputText'
            value={inputText}
            onChange={searchValue}
            placeholder='Search Your Product' />
        </form>
      </div>
      <ProductCategory />

    </div>
  )
}

export default ProductFilter
