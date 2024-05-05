import React from 'react'
import AllProductFilter from '../Components/AllProductFilter'
import AllProductShow from '../Components/AllProductShow'

const DBAllProducts = () => {
  return (
    <section className='All_Product_view m-0'>
      <div className='All_Product_view_content m-0'>
              
          <AllProductFilter />
          <AllProductShow />

      </div>
    </section>
  )
}

export default DBAllProducts
