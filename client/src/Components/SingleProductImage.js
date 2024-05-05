import React, { useState } from 'react'

const SingleProductImage = ({ imgs = [{url:""}] }) => {
    const [largeImage, setLargeImage] = useState(imgs[0])
    const API = process.env.REACT_APP_API;
    return (
        <div className='row single_product_image_row m-auto'>
            <div className='col-lg-3 col-3 m-auto single_product_image_small'>
                {imgs.map((ProImage) => {
                    return (
                        <div key={ProImage._id}>
                            <img src={`${API}/${ProImage}`} alt={ProImage} onClick={()=>setLargeImage(ProImage)}/>
                        </div>
                    )

                })}

            </div>
            <div className='col-lg-9 col-6 m-auto single_product_image_large'>
                <div>
                <img src={`${API}/${largeImage}`} alt='Single Product large' />
                </div>

            </div>
        </div>
    )
}

export default SingleProductImage
