import React, { useState } from "react";
import Navbar from '../../component/Navbar';
import Footer from '../../component/Footer';
import ListingSearch from './ListingSearch';
import ListingCard from './ListingCard';
import './AllListing.css';
import { MapPin, } from "lucide-react";
import Pagination from "./Pagination";




const listings = [
    {
        id: 1,
        image: "/images/listing1.jpg",
        title: "Cozy Loft Studio",
        location: "Portland, OR",
        price: 875,
        bed: 1,
        bath: 1,
        area: 150,
        isNew: true,
        tags: ["Furnished", "Utilities Included"],
    },
    {
        id: 2,
        image: "/images/listing2.jpg",
        title: "Modern Tiny Home",
        location: "Austin, TX",
        price: 1150,
        bed: 1,
        bath: 1,
        area: 240,
        isNew: false,
        tags: ["Pet Friendly", "Private Entrance"],
    },
    {
        id: 3,
        image: "/images/listing3.jpg",
        title: "Garden Guest Suite",
        location: "Seattle, WA",
        price: 950,
        bed: 1,
        bath: 1,
        area: 180,
        isNew: true,
        tags: ["Quiet Area", "Utilities Included"],
    },
    {
        id: 4,
        image: "/images/listing3.jpg",
        title: "Garden Guest Suite",
        location: "Seattle, WA",
        price: 950,
        bed: 1,
        bath: 1,
        area: 180,
        isNew: true,
        tags: ["Quiet Area", "Utilities Included"],
    },
    {
        id: 5,
        image: "/images/listing3.jpg",
        title: "Garden Guest Suite",
        location: "Seattle, WA",
        price: 950,
        bed: 1,
        bath: 1,
        area: 180,
        isNew: true,
        tags: ["Quiet Area", "Utilities Included"],
    },
    {
        id: 7,
        image: "/images/listing2.jpg",
        title: "Modern Tiny Home",
        location: "Austin, TX",
        price: 1150,
        bed: 1,
        bath: 1,
        area: 240,
        isNew: false,
        tags: ["Pet Friendly", "Private Entrance"],
    },
];


const AllListing = () => {

    const [sortBy, setSortBy] = useState("newest");
    const [currentPage, setCurrentPage] = useState(1);
    return (
        <>
            <Navbar />
            <section id="mainsearch">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-9">
                            < ListingSearch />
                            <div className="listing-toolbar">

                                <h4 className="listing-results">
                                    134 Results
                                </h4>

                                <div className="listing-sort">

                                    <span>Sort by :</span>

                                    <button
                                        className={`sort-btn ${sortBy === "newest" ? "active" : ""
                                            }`}
                                        onClick={() => setSortBy("newest")}
                                    >
                                        Newest
                                    </button>

                                    <button
                                        className={`sort-btn ${sortBy === "price" ? "active" : ""
                                            }`}
                                        onClick={() => setSortBy("price")}
                                    >
                                        Price: Low to High
                                    </button>

                                    <button
                                        className={`sort-btn ${sortBy === "popular" ? "active" : ""
                                            }`}
                                        onClick={() => setSortBy("popular")}
                                    >
                                        Most Popular
                                    </button>

                                </div>

                            </div>

                            <div className="row g-3">

                                {listings.map((room) => (

                                    <div
                                        className="col-lg-4 col-md-6"
                                        key={room.id}
                                    >

                                        <ListingCard room={room} />

                                    </div>

                                ))}

                            </div>
                            <Pagination
                                currentPage={currentPage}
                                totalPages={9}
                                onPageChange={setCurrentPage}
                            />
                        </div>
                        <div className="col-lg-3">
                            <div className="map-image">

                                <div className="map-card">

                                    <iframe
                                        title="California Map"
                                        src="https://www.google.com/maps?q=Los+Angeles,+California&z=11&output=embed"
                                        loading="lazy"
                                        allowFullScreen
                                        referrerPolicy="no-referrer-when-downgrade"
                                    ></iframe>

                                    <button className="map-search-btn">

                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="18"
                                            height="18"
                                            fill="currentColor"
                                            viewBox="0 0 16 16"
                                        >
                                            <path d="M15.854.146a.5.5 0 0 0-.53-.11l-15 6a.5.5 0 0 0 .03.938l5.5 1.833 1.833 5.5a.5.5 0 0 0 .938.03l6-15a.5.5 0 0 0-.11-.53z" />
                                        </svg>

                                        Search This Area

                                    </button>

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

export default AllListing