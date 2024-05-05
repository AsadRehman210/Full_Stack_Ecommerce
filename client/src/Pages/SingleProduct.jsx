import React, { useEffect } from 'react'
import { useAuth } from '../Context/store';
import { NavLink, useParams } from 'react-router-dom';
import { TbReplace, TbTruckDelivery } from "react-icons/tb";
import { MdOutlineSecurity } from "react-icons/md";
import SingleProductImage from '../Components/SingleProductImage';
import Stars from '../Components/Stars';
import PriceFormate from '../Helper/PriceFormate';
import ColorBtn from '../Components/ColorBtn';


const SingleProduct = () => {
  const { id } = useParams();
  const { singleProduct, isSingleProductLoading, SingleProductData } = useAuth();
  const API = process.env.REACT_APP_API;

  useEffect(() => {
    singleProduct(`${API}/DBproducts/product_Data/Single_Product/get/${id}`)
    
  }, [id]);

  if (isSingleProductLoading) {
    return <div>Loading ...</div>
  }
  const { _id:ID, productName, brandName,previousPrice, currentPrice, description, stock, customerReviews, starRating, galleryImages } = SingleProductData;

  return (
    <main className='singleProduct_section'>
      <div className='mainHeading_div'>
        <div className='container'>
          <div className='Main_Heading'>
            <NavLink to="/">Home</NavLink> / {productName}
          </div>
        </div>
      </div>
      <div className='container'>

        <div className='row single_Product_row gx-3'>
          <div className='col-lg-6 col-8 m-auto single_Product_ImagePortion'>
            <SingleProductImage
              imgs={galleryImages} />

          </div>
          <div className='col-lg-6 col-8 m-auto single_Product_content'>
            <h3>{productName}</h3>
            <Stars star={starRating} review={customerReviews}/>
            <p className='previous_price'>MRP :
              <strong>
                <del> <PriceFormate price={previousPrice} /> </del>
              </strong>
            </p>
            <p className='current_price'>Deal of the Day : <PriceFormate price={currentPrice} /> </p>
            <p className='single_description'>{description}</p>

            <div className='company_services'>
              <div className='services'>
                <div className='service_img'>
                  <TbTruckDelivery />
                </div>

                <p>Free Delivery</p>

              </div>
              <div className='services'>
                <div className='service_img'>
                  <TbReplace />
                </div>

                <p>30 Days Replacement</p>

              </div>
              <div className='services'>
                <div className='service_img'>
                  <TbTruckDelivery />
                </div>

                <p>Delivery within 7 Days</p>

              </div>
              <div className='services'>
                <div className='service_img'>
                  <MdOutlineSecurity />
                </div>

                <p>2 Year Warranty</p>

              </div>


            </div>

            <p className='single_para mt-4'>Available : <strong className='text-black'>{stock > 0 ? "In Stock" : "Out of Stock"}</strong></p>

            <p className='single_para'>ID : <strong className='text-black'>{ID}</strong></p>

            <p className='single_para'>Brand : <strong className='text-black'>{brandName}</strong></p>

            <hr />

            <ColorBtn 
            productDetail={SingleProductData} />

          </div>
        </div>
      </div>

    </main>
  )
}

export default SingleProduct
