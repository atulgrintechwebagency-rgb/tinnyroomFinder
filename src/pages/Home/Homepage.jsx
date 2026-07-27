import React from 'react'
import './Homepage.css'
import Navbar from '../../component/Navbar'
import Footer from '../../component/Footer'
import Hero from '../../pages/Home/Hero'
import Offer from '../../pages/Home/Offer'
import HomeListing from './HomeListing'


const Homepage = () => {
    return (
        <>
            <Navbar />
            <Hero />
            <HomeListing/>
            <Offer />
            <Footer />
        </>
    )
}

export default Homepage