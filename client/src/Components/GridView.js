import React from 'react'
import ProductCard from './ProductCard'

const GridView = ({productDetail}) => {
  const API = process.env.REACT_APP_API;
  return (
    <>
     {productDetail.map((ele) => {
          return (
            <ProductCard
              key={ele._id}
              id={ele._id}
              image={`${API}/${ele.FeaturedImage}`}
              name={ele.productName}
              price={ele.currentPrice}
              category={ele.category}
              background="rgb(240, 232, 232)"
            />
          )
        })}
      
    </>
  )
}

export default GridView
