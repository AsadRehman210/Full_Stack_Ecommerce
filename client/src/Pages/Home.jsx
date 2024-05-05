import React from 'react'
import HeroSection from '../Components/HeroSection';
import Services from '../Components/Services';
import Trusted from '../Components/Trusted';
import FeatureProducts from '../Components/FeatureProducts';
// import { useAuth } from '../Context/store';
const Home = () => {
  return (
    <>
      <main>
        <HeroSection 
          heading="Asad Ecommerce"
        />
        <FeatureProducts />
        <Services />

        <Trusted />
      </main>
    </>
  )
}

export default Home
