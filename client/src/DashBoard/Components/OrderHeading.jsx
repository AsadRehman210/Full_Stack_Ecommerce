import React from 'react'



const OrderHeading = ({heading}) => {
 
  return (
    <div className='row order_heading mx-0'>
    <div className='col-12 order_heading_content'>
        <h3>{heading}</h3>
    </div>
      
    </div>
  )
}

export default OrderHeading
