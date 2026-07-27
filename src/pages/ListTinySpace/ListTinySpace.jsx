import React from 'react'
import './ListTinySpace.css'
import Navbar from '../../component/Navbar'
import Footer from '../../component/Footer'
import Hero from './Hero'
import TinyForm from './TinyForm'
import {
  CircleCheck,
  ShieldCheck,
  MapPin,
  BedDouble,
  DollarSign,
  Camera,
  ArrowRight,
} from "lucide-react";
import HostLove from './HostLove'


const ListTinySpace = () => {
    return (
        <>
            <Navbar />
            <Hero />
            <section className="tinny_form">
                <div className="container-xxl">
                    <div className="row">
                        <div className="col-lg-9">
                            <TinyForm />
                            <HostLove />
                        </div>
                        <div className="col-lg-3 mt-4 mt-lg-0">
                            <div className="earnings-wrapper">

                                {/* Earnings Card */}

                                <div className="earnings-card">

                                    <div className="earnings-head">

                                        <div>
                                            <h3>Your Earnings Estimate</h3>
                                            <p>Based on similar listings in your area</p>
                                        </div>

                                        <span className="example-tag">
                                            Example
                                        </span>

                                    </div>

                                    <div className="earning-price">

                                        <h2>
                                            $1,150
                                            <span>/ month</span>
                                        </h2>

                                        <p>Estimated Monthly Revenue</p>

                                    </div>

                                    <div className="earning-stats">

                                        <div className="stat-box">
                                            <h4>72%</h4>
                                            <span>Avg. Occupancy Rate</span>
                                        </div>

                                        <div className="stat-box">
                                            <h4>$1,050 - $1,300</h4>
                                            <span>Typical Price Range</span>
                                        </div>

                                    </div>

                                    <div className="earning-features">

                                        <h5>What affects your earnings?</h5>

                                        <ul>

                                            <li>
                                                <CircleCheck size={18} />
                                                Location and demand
                                            </li>

                                            <li>
                                                <CircleCheck size={18} />
                                                Amenities and space type
                                            </li>

                                            <li>
                                                <CircleCheck size={18} />
                                                Price and availability
                                            </li>

                                            <li>
                                                <CircleCheck size={18} />
                                                Photos and listing quality
                                            </li>

                                        </ul>

                                    </div>

                                </div>

                                {/* Confidence Card */}

                                <div className="confidence-card">

                                    <div className="confidence-icon">

                                        <ShieldCheck size={25} />

                                    </div>

                                    <div className="confidence-content">

                                        <h4>List with Confidence</h4>

                                        <p>
                                           Every renter is verified and goes through our screening process. You set the rules. You stay in control.
                                        </p>

                                        <a href="#">

                                            Learn how we keep hosts safe 

                                            <ArrowRight size={15} />

                                        </a>

                                    </div>

                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    )
}

export default ListTinySpace