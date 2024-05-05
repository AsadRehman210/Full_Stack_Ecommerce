import React from 'react'
// import card1 from "../images/image7.webp"
import { useAuth } from '../Context/store';
import ProductCard from './ProductCard';

const FeatureProducts = () => {
    const { isLoading, FeatureProducts } = useAuth();
    const API = process.env.REACT_APP_API;
    if (isLoading) {
        return <div>Loading...</div>
    }
    return (
        <section className='FeatureProducts_section'>
            <div className='container'>
                <p className='feature_smallHeading'>Click Now</p>
                <h2 className='feature_mainHeading'>Our Feature Services</h2>
                <div className='row FeatureProducts_row '>
                    {FeatureProducts.map((product) => {
                        return (
                            <ProductCard
                                key={product._id}
                                id={product._id}
                                image={`${API}/${product.FeaturedImage}`}
                                name={product.productName}
                                price={product.currentPrice}
                                category={product.category}
                            />
                        )
                    })}


                </div>
            </div>
        </section>
    )
}

export default FeatureProducts
