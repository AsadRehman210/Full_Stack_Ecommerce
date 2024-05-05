import React from 'react'
import { NavLink } from 'react-router-dom';
import heroImage from "../images/heroImage.png"

const HeroSection = ({heading}) => {
 
  return (
    <section className='hero_section'>
      <div className='container'>
        <div className='row gy-5 m-auto'>
          <div className='col-lg-6 col-8 hero_content m-auto'>
            <p className='hero_small_Heading'>welcome To</p>
            <h1>{heading}</h1>
            <p className='hero_para'>Step into our online marketplace, where convenience meets quality! Explore our wide selection of products ranging from fashion and electronics to home essentials. Enjoy seamless shopping with secure transactions and fast delivery. Begin your exploration now to discover your next must-have item!</p>

            <NavLink to="/products" className="btn btn-primary w-25 hero_btn">Shop Now</NavLink>

          </div>
          <div className='col-lg-6 col-12 hero_image'>
            <div className='hero_img_bg'></div>
            <img src={heroImage} alt="Hero section background" />

          </div>
        </div>
      </div>

    </section>
  )
}

export default HeroSection;
