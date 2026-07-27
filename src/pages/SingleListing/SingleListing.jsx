import React, { useState } from "react";
import Navbar from "../../component/Navbar";
import Footer from "../../component/Footer";
import "./SingleListing.css";

import { ArrowLeft, Share2, Heart, BadgeCheck, MapPin, Star, BedSingle, Bath, Ruler, Sofa, Zap, Wifi,MessageCircle,CalendarDays,ShieldCheck,FileText, Check, } from "lucide-react";

import Lightbox from "yet-another-react-lightbox";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";

import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";

const SingleListing = () => {

    const host = {
        name: "Maya Thompson",
        image: "/images/host.webp",
        badge: "Superhost",
        responseRate: "100% response rate",
        responseTime: "Responds within a few hours",
        moveInDate: "Jun 1, 2024 (Flexible)",
        securityDeposit: "$875",
        leaseTerm: "3 – 12 months",
    };

    // tab listing
    const [activeTab, setActiveTab] = useState("overview");

    // Later replace this with API response

    const listing = {

        title: "Cozy Loft Studio",

        images: [

            "/images/listing1.jpg",

            "/images/listing1.jpg",

            "/images/listing2.jpg",

            "/images/listing3.jpg",

            "/images/listing3.jpg",

            "/images/listing2.jpg",

            "/images/listing1.jpg",

            "/images/listing3.jpg",

            "/images/listing2.jpg",

            "/images/listing3.jpg",

        ],

    };

    const [activeImage, setActiveImage] = useState(
        listing.images[0]
    );

    const [open, setOpen] = useState(false);

    const [photoIndex, setPhotoIndex] = useState(0);

    const openGallery = (index) => {

        setPhotoIndex(index);

        setActiveImage(listing.images[index]);

        setOpen(true);

    };

    const amenities = [
        "Furnished",
        "Utilities Included",
        "WiFi Included",
        "Private Entrance",
    ];

    return (
        <>

            <Navbar />
            <section id="single_listing">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8 col-xl-9">
                            <section className="single-listing-section py-0 py-md-1">

                                <div className="container">

                                    {/* Top Bar */}

                                    <div className="single-top-bar">

                                        <button className="back-btn">

                                            <ArrowLeft size={18} />

                                            Back to Listings

                                        </button>

                                        <div className="top-actions">

                                            <button>

                                                <Share2 size={17} />

                                                Share

                                            </button>

                                            <button>

                                                <Heart size={17} />

                                                Save

                                            </button>

                                        </div>

                                    </div>

                                    {/* Gallery */}

                                    <div className="listing-gallery">

                                        {/* Main Image */}

                                        <div className="gallery-main">

                                            <img
                                                src={activeImage}
                                                alt="Listing"
                                                onClick={() =>
                                                    openGallery(
                                                        listing.images.indexOf(activeImage)
                                                    )
                                                }
                                            />

                                            <button className="gallery-favorite">

                                                <Heart size={20} />

                                            </button>

                                        </div>

                                        {/* Thumbnail Images */}

                                        <div className="gallery-thumbnails">

                                            {listing.images.slice(0, 5).map((image, index) => (

                                                <div
                                                    key={index}
                                                    className={`thumb-item ${activeImage === image ? "active" : ""
                                                        }`}
                                                    onClick={() => {

                                                        setActiveImage(image);

                                                    }}
                                                >

                                                    <img
                                                        src={image}
                                                        alt=""
                                                    />

                                                    {index === 4 && (

                                                        <div
                                                            className="thumb-overlay"
                                                            onClick={(e) => {

                                                                e.stopPropagation();

                                                                openGallery(4);

                                                            }}
                                                        >

                                                            +{listing.images.length - 5}

                                                            <span>

                                                                More Photos

                                                            </span>

                                                        </div>

                                                    )}

                                                </div>

                                            ))}

                                        </div>

                                    </div>

                                </div>

                            </section>
                            {/*  Listing Header */}

                            <div className="listing-details">

                                <div className="d-flex justify-content-between align-items-start flex-wrap gap-3">

                                    <div>

                                        <div className="listing-title-wrap">

                                            <h2 className="listing-title">

                                                Cozy Loft Studio

                                            </h2>

                                            <BadgeCheck
                                                size={22}
                                                className="verified-icon"
                                            />

                                        </div>

                                        <div className="listing-address">

                                            <MapPin size={15} />

                                            <span>

                                                Portland, OR 97214 – Buckman Neighborhood

                                            </span>

                                        </div>

                                        <div className="listing-review">

                                            <Star
                                                size={16}
                                                fill="#FDBA12"
                                                color="#FDBA12"
                                            />

                                            <span>

                                                4.9

                                            </span>

                                            <a href="#">

                                                (24 reviews)

                                            </a>

                                        </div>

                                    </div>

                                    <div className="listing-price">

                                        $875

                                        <span>/mo</span>

                                    </div>

                                </div>

                                {/* Property Features */}

                                <div className="listing-features">

                                    <div className="feature">

                                        <BedSingle size={18} />

                                        <span>1 Bed</span>

                                    </div>

                                    <div className="feature">

                                        <Bath size={18} />

                                        <span>1 Bath</span>

                                    </div>

                                    <div className="feature">

                                        <Ruler size={18} />

                                        <span>150 sqft</span>

                                    </div>

                                    <div className="feature">

                                        <Sofa size={18} />

                                        <span>Furnished</span>

                                    </div>

                                    <div className="feature">

                                        <Zap size={18} />

                                        <span>Utilities Included</span>

                                    </div>

                                    <div className="feature">

                                        <Wifi size={18} />

                                        <span>Wi-Fi Included</span>

                                    </div>

                                </div>

                                {/* Tabs */}

                                <ul className="listing-tabs nav">

                                    <li className="nav-item">

                                        <button
                                            className={activeTab === "overview" ? "active" : ""}
                                            onClick={() => setActiveTab("overview")}
                                        >
                                            Overview
                                        </button>

                                    </li>

                                    <li className="nav-item">

                                        <button
                                            className={activeTab === "amenities" ? "active" : ""}
                                            onClick={() => setActiveTab("amenities")}
                                        >
                                            Amenities
                                        </button>

                                    </li>

                                    <li className="nav-item">

                                        <button
                                            className={activeTab === "rules" ? "active" : ""}
                                            onClick={() => setActiveTab("rules")}
                                        >
                                            House Rules
                                        </button>

                                    </li>

                                    <li className="nav-item">

                                        <button
                                            className={activeTab === "availability" ? "active" : ""}
                                            onClick={() => setActiveTab("availability")}
                                        >
                                            Availability
                                        </button>

                                    </li>

                                </ul>

                                {/* Description */}

                                <div className="listing-tab-content">

                                    {activeTab === "overview" && (

                                        <div className="listing-description">

                                            <p>

                                                Charming loft studio in the heart of Buckman! This bright and
                                                cozy space features a comfortable living area, a lofted sleeping
                                                nook, and a modern kitchenette.

                                            </p>

                                            <p>

                                                Located on a quiet street just blocks from cafes, parks and
                                                public transit.

                                            </p>

                                        </div>

                                    )}

                                    {activeTab === "amenities" && (

                                        <div className="amenities-list">

                                            <div><Check size={16} /> Furnished</div>

                                            <div><Check size={16} /> Utilities Included</div>

                                            <div><Check size={16} /> WiFi Included</div>

                                            <div><Check size={16} /> Kitchen</div>

                                            <div><Check size={16} /> Air Conditioning</div>

                                            <div><Check size={16} /> Washer</div>

                                        </div>

                                    )}

                                    {activeTab === "rules" && (

                                        <div className="rules-list">

                                            <p>• No Smoking</p>

                                            <p>• No Parties</p>

                                            <p>• No Pets</p>

                                            <p>• Quiet Hours: 10 PM - 7 AM</p>

                                        </div>

                                    )}

                                    {activeTab === "availability" && (

                                        <div className="availability-box">

                                            <h5>Available From</h5>

                                            <p>July 20, 2026</p>

                                            <h5>Minimum Lease</h5>

                                            <p>3 Months</p>

                                        </div>

                                    )}

                                </div>

                            </div>

                        </div>
                        <div className="col-lg-4 col-xl-3">

                            <aside className="host-sidebar">

                                {/* Host Card */}

                                <div className="host-card">

                                    <h5 className="host-heading">
                                        Meet your host
                                    </h5>

                                    <div className="host-profile">

                                        <img
                                            src={host.image}
                                            alt={host.name}
                                            className="host-avatar"
                                        />

                                        <div>

                                            <h6>{host.name}</h6>

                                            <div className="superhost">

                                                <Star
                                                    size={14}
                                                    fill="#FDBA12"
                                                    color="#FDBA12"
                                                />

                                                {host.badge}

                                            </div>

                                            <small>{host.responseRate}</small>

                                            <small>{host.responseTime}</small>

                                        </div>

                                    </div>

                                    <button className="message-btn">

                                        <MessageCircle size={18} />

                                        Message Maya

                                    </button>

                                    <hr />

                                    {/* Details */}

                                    <div className="sidebar-item">

                                        <CalendarDays size={20} />

                                        <div>

                                            <strong>Move-in Date</strong>

                                            <span>{host.moveInDate}</span>

                                        </div>

                                    </div>

                                    <div className="sidebar-item">

                                        <ShieldCheck size={20} />

                                        <div>

                                            <strong>Security Deposit</strong>

                                            <span>{host.securityDeposit}</span>

                                        </div>

                                    </div>

                                    <div className="sidebar-item">

                                        <FileText size={20} />

                                        <div>

                                            <strong>Lease Term</strong>

                                            <span>{host.leaseTerm}</span>

                                        </div>

                                    </div>

                                    {/* Notice */}

                                    <div className="secure-box">

                                        <ShieldCheck size={26} />

                                        <p>

                                            All payments are secure and handled
                                            through our trusted platform.

                                        </p>

                                    </div>

                                </div>

                            </aside>

                        </div>
                    </div>
                </div>
            </section>

            {/* Lightbox */}

            <Lightbox
                open={open}
                close={() => setOpen(false)}
                index={photoIndex}
                slides={listing.images.map((img) => ({
                    src: img,
                }))}
                plugins={[Thumbnails]}
            />

            <Footer />

        </>
    );
};

export default SingleListing;