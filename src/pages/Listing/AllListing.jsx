import React, { useCallback, useEffect, useMemo, useState } from "react";

import Navbar from "../../component/Navbar";
import Footer from "../../component/Footer";

import ListingSearch from "./ListingSearch";
import ListingCard from "./ListingCard";
import Pagination from "./Pagination";

import "./AllListing.css";


const API_URL =
    "https://tinyroomfinder.com/backend/public/api/listings";


const AllListing = () => {

    /*
    |--------------------------------------------------------------------------
    | Listings
    |--------------------------------------------------------------------------
    */

    const [listings, setListings] = useState([]);


    /*
    |--------------------------------------------------------------------------
    | Loading
    |--------------------------------------------------------------------------
    */

    const [loading, setLoading] = useState(true);


    /*
    |--------------------------------------------------------------------------
    | Error
    |--------------------------------------------------------------------------
    */

    const [error, setError] = useState("");


    /*
    |--------------------------------------------------------------------------
    | Pagination
    |--------------------------------------------------------------------------
    */

    const [currentPage, setCurrentPage] = useState(1);

    const [pagination, setPagination] = useState({
        current_page: 1,
        last_page: 1,
        total: 0,
        per_page: 10,
    });


    /*
    |--------------------------------------------------------------------------
    | Filters
    |--------------------------------------------------------------------------
    */

    const [filters, setFilters] = useState({
        location: "",
        minRent: "",
        maxRent: "",
        roomType: "",
        utilitiesIncluded: "",
        moveInDate: null,
    });


    /*
    |--------------------------------------------------------------------------
    | Sorting
    |--------------------------------------------------------------------------
    */

    const [sortBy, setSortBy] = useState("newest");


    /*
    |--------------------------------------------------------------------------
    | Build API URL
    |--------------------------------------------------------------------------
    */

    const buildApiUrl = useCallback(
        (page = 1) => {

            const params = new URLSearchParams();


            /*
            |--------------------------------------------------------------------------
            | Pagination
            |--------------------------------------------------------------------------
            */

            params.append("page", page);
            params.append("per_page", "10");


            /*
            |--------------------------------------------------------------------------
            | Location
            |--------------------------------------------------------------------------
            */

            if (filters.location) {
                params.append(
                    "location",
                    filters.location
                );
            }


            /*
            |--------------------------------------------------------------------------
            | Minimum Rent
            |--------------------------------------------------------------------------
            */

            if (
                filters.minRent !== "" &&
                filters.minRent !== null &&
                filters.minRent !== undefined
            ) {

                params.append(
                    "minRent",
                    String(filters.minRent)
                );
            }


            /*
            |--------------------------------------------------------------------------
            | Maximum Rent
            |--------------------------------------------------------------------------
            */

            if (
                filters.maxRent !== "" &&
                filters.maxRent !== null &&
                filters.maxRent !== undefined
            ) {

                params.append(
                    "maxRent",
                    String(filters.maxRent)
                );
            }


            /*
            |--------------------------------------------------------------------------
            | Room Type
            |--------------------------------------------------------------------------
            */

            if (filters.roomType) {

                params.append(
                    "spaceType",
                    filters.roomType
                );
            }


            /*
            |--------------------------------------------------------------------------
            | Utilities
            |--------------------------------------------------------------------------
            | IMPORTANT:
            |
            | 1 = included
            | 0 = not included
            |
            */

            if (
                filters.utilitiesIncluded !== "" &&
                filters.utilitiesIncluded !== null &&
                filters.utilitiesIncluded !== undefined
            ) {

                params.append(
                    "utilitiesIncluded",
                    String(filters.utilitiesIncluded)
                );
            }


            /*
            |--------------------------------------------------------------------------
            | Move In Date
            |--------------------------------------------------------------------------
            */

            if (filters.moveInDate) {

                const date = filters.moveInDate;

                const year = date.getFullYear();

                const month = String(
                    date.getMonth() + 1
                ).padStart(2, "0");

                const day = String(
                    date.getDate()
                ).padStart(2, "0");


                const formattedDate =
                    `${year}-${month}-${day}`;


                params.append(
                    "moveInDate",
                    formattedDate
                );
            }


            const finalUrl =
                `${API_URL}?${params.toString()}`;


            return finalUrl;
        },
        [filters]
    );


    /*
    |--------------------------------------------------------------------------
    | Fetch Listings
    |--------------------------------------------------------------------------
    */

    const fetchListings = useCallback(
        async (page = 1) => {

            try {

                setLoading(true);

                setError("");


                const url = buildApiUrl(page);


                console.log(
                    "Listing API:",
                    url
                );


                const response = await fetch(url, {
                    method: "GET",
                    headers: {
                        Accept: "application/json",
                    },
                });


                /*
                |--------------------------------------------------------------------------
                | HTTP Error
                |--------------------------------------------------------------------------
                */

                if (!response.ok) {

                    throw new Error(
                        `API request failed: ${response.status}`
                    );
                }


                const data =
                    await response.json();


                console.log(
                    "Listing API response:",
                    data
                );


                /*
                |--------------------------------------------------------------------------
                | API Status
                |--------------------------------------------------------------------------
                */

                if (
                    data?.status === false
                ) {

                    throw new Error(
                        data?.message ||
                        "Unable to load listings."
                    );
                }


                /*
                |--------------------------------------------------------------------------
                | Listings
                |--------------------------------------------------------------------------
                */

                const apiListings =
                    Array.isArray(data?.listings)
                        ? data.listings
                        : [];


                /*
                |--------------------------------------------------------------------------
                | Set Listings
                |--------------------------------------------------------------------------
                */

                setListings(apiListings);


                /*
                |--------------------------------------------------------------------------
                | Pagination
                |--------------------------------------------------------------------------
                */

                if (data?.pagination) {

                    setPagination({
                        current_page:
                            Number(
                                data.pagination.current_page
                            ) || 1,

                        last_page:
                            Number(
                                data.pagination.last_page
                            ) || 1,

                        total:
                            Number(
                                data.pagination.total
                            ) || apiListings.length,

                        per_page:
                            Number(
                                data.pagination.per_page
                            ) || 10,
                    });

                } else {

                    setPagination({
                        current_page: page,
                        last_page: 1,
                        total: apiListings.length,
                        per_page: 10,
                    });
                }


                setCurrentPage(page);

            } catch (err) {

                console.error(
                    "Listing API Error:",
                    err
                );


                setListings([]);


                setPagination({
                    current_page: 1,
                    last_page: 1,
                    total: 0,
                    per_page: 10,
                });


                setError(
                    "Something went wrong while loading listings."
                );

            } finally {

                setLoading(false);
            }

        },
        [buildApiUrl]
    );


    /*
    |--------------------------------------------------------------------------
    | Initial API Request
    |--------------------------------------------------------------------------
    */

    useEffect(() => {

        fetchListings(1);

    }, []);


    /*
    |--------------------------------------------------------------------------
    | Search / Filter Handler
    |--------------------------------------------------------------------------
    */

    const handleSearch = (newFilters) => {

        console.log(
            "Applying filters:",
            newFilters
        );


        setFilters(newFilters);

        setCurrentPage(1);
    };


    /*
    |--------------------------------------------------------------------------
    | Fetch again when filters change
    |--------------------------------------------------------------------------
    */

    useEffect(() => {

        /*
        Don't run the first automatic request twice.
        The initial request is handled above.
        */

        const hasFilters =
            filters.location ||
            filters.minRent !== "" ||
            filters.maxRent !== "" ||
            filters.roomType ||
            filters.utilitiesIncluded !== "" ||
            filters.moveInDate;


        if (!hasFilters) {
            return;
        }


        fetchListings(1);

    }, [filters]);


    /*
    |--------------------------------------------------------------------------
    | Pagination
    |--------------------------------------------------------------------------
    */

    const handlePageChange = (page) => {

        if (
            page < 1 ||
            page > pagination.last_page ||
            loading
        ) {
            return;
        }


        fetchListings(page);


        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };


    /*
    |--------------------------------------------------------------------------
    | Sorting
    |--------------------------------------------------------------------------
    */

    const sortedListings = useMemo(() => {

        const sorted =
            [...listings];


        if (sortBy === "price") {

            sorted.sort(
                (a, b) =>
                    Number(a?.rentMonthly || 0) -
                    Number(b?.rentMonthly || 0)
            );

        }


        if (sortBy === "newest") {

            sorted.sort(
                (a, b) =>
                    Number(b?.id || 0) -
                    Number(a?.id || 0)
            );

        }


        if (sortBy === "popular") {

            /*
            |--------------------------------------------------------------------------
            | There is currently no popularity field in the
            | API response.
            |
            | is_saved is used as the closest available value.
            |--------------------------------------------------------------------------
            */

            sorted.sort(
                (a, b) =>
                    Number(b?.is_saved || 0) -
                    Number(a?.is_saved || 0)
            );
        }


        return sorted;

    }, [listings, sortBy]);


    /*
    |--------------------------------------------------------------------------
    | Skeleton Card
    |--------------------------------------------------------------------------
    */

    const SkeletonCard = () => {

        return (

            <div className="col-lg-4 col-md-6">

                <div className="listing-card skeleton-card">

                    <div className="skeleton-image shimmer"></div>


                    <div className="listing-card-body">

                        <div className="skeleton-line skeleton-title shimmer"></div>

                        <div className="skeleton-line skeleton-price shimmer"></div>

                        <div className="skeleton-line skeleton-location shimmer"></div>


                        <div className="skeleton-info">

                            <div className="skeleton-small shimmer"></div>

                            <div className="skeleton-small shimmer"></div>

                            <div className="skeleton-small shimmer"></div>

                        </div>


                        <div className="skeleton-tags">

                            <div className="skeleton-tag shimmer"></div>

                            <div className="skeleton-tag shimmer"></div>

                        </div>

                    </div>

                </div>

            </div>
        );
    };


    /*
    |--------------------------------------------------------------------------
    | Skeleton List
    |--------------------------------------------------------------------------
    */

    const SkeletonListings = () => {

        return (

            <div className="row g-3">

                {Array.from({
                    length: 6
                }).map((_, index) => (

                    <SkeletonCard
                        key={index}
                    />

                ))}

            </div>
        );
    };


    /*
    |--------------------------------------------------------------------------
    | Render
    |--------------------------------------------------------------------------
    */

    return (

        <>

            <Navbar />


            <section id="mainsearch">

                <div className="container">

                    <div className="row">


                        {/* =================================================
                            MAIN CONTENT
                        ================================================== */}

                        <div className="col-lg-9">


                            {/* =================================================
                                SEARCH
                            ================================================== */}

                            <ListingSearch
                                onSearch={handleSearch}
                            />


                            {/* =================================================
                                TOOLBAR
                            ================================================== */}

                            <div className="listing-toolbar">


                                <h4 className="listing-results">

                                    {loading
                                        ? "Loading..."
                                        : `${pagination.total} Results`
                                    }

                                </h4>


                                <div className="listing-sort">

                                    <span>
                                        Sort by :
                                    </span>


                                    {/* NEWEST */}

                                    <button
                                        className={`sort-btn ${
                                            sortBy === "newest"
                                                ? "active"
                                                : ""
                                        }`}
                                        onClick={() =>
                                            setSortBy("newest")
                                        }
                                        type="button"
                                    >
                                        Newest
                                    </button>


                                    {/* PRICE */}

                                    <button
                                        className={`sort-btn ${
                                            sortBy === "price"
                                                ? "active"
                                                : ""
                                        }`}
                                        onClick={() =>
                                            setSortBy("price")
                                        }
                                        type="button"
                                    >
                                        Price: Low to High
                                    </button>


                                    {/* POPULAR */}

                                    <button
                                        className={`sort-btn ${
                                            sortBy === "popular"
                                                ? "active"
                                                : ""
                                        }`}
                                        onClick={() =>
                                            setSortBy("popular")
                                        }
                                        type="button"
                                    >
                                        Most Popular
                                    </button>

                                </div>

                            </div>


                            {/* =================================================
                                ERROR
                            ================================================== */}

                            {!loading && error && (

                                <div
                                    className="alert alert-danger"
                                    role="alert"
                                >

                                    {error}

                                </div>

                            )}


                            {/* =================================================
                                LOADING SKELETON
                            ================================================== */}

                            {loading && (

                                <SkeletonListings />

                            )}


                            {/* =================================================
                                LISTINGS
                            ================================================== */}

                            {!loading &&
                                !error &&
                                sortedListings.length > 0 && (

                                    <div className="row g-3">

                                        {sortedListings.map(
                                            (room) => (

                                                <div
                                                    className="col-lg-4 col-md-6"
                                                    key={room.id}
                                                >

                                                    <ListingCard
                                                        room={{
                                                            ...room,

                                                            /*
                                                            |--------------------------------------------------------------------------
                                                            | Map API fields to existing ListingCard design
                                                            |--------------------------------------------------------------------------
                                                            */

                                                            image:
                                                                room.image,

                                                            title:
                                                                room.title,

                                                            location:
                                                                `${room.city || ""}${
                                                                    room.state
                                                                        ? `, ${room.state}`
                                                                        : ""
                                                                }`,

                                                            price:
                                                                room.rentMonthly,

                                                            bed:
                                                                room.bedrooms,

                                                            bath:
                                                                room.bathrooms,

                                                            area:
                                                                room.area ||
                                                                room.squareFeet ||
                                                                room.sqft ||
                                                                0,

                                                            isNew:
                                                                Array.isArray(
                                                                    room.verificationBadges
                                                                ) &&
                                                                room.verificationBadges.includes(
                                                                    "New"
                                                                ),

                                                            tags:
                                                                Array.isArray(
                                                                    room.nearbyNeedTags
                                                                )
                                                                    ? room.nearbyNeedTags.slice(
                                                                          0,
                                                                          2
                                                                      )
                                                                    : [],
                                                        }}
                                                    />

                                                </div>

                                            )
                                        )}

                                    </div>

                                )}


                            {/* =================================================
                                NO RESULTS
                            ================================================== */}

                            {!loading &&
                                !error &&
                                sortedListings.length === 0 && (

                                    <div className="no-listings">

                                        <h3>
                                            No listings found
                                        </h3>

                                        <p>
                                            Try changing your search
                                            filters.
                                        </p>

                                    </div>

                                )}


                            {/* =================================================
                                PAGINATION
                            ================================================== */}

                            {!loading &&
                                !error &&
                                pagination.last_page > 1 && (

                                    <Pagination
                                        currentPage={
                                            pagination.current_page
                                        }
                                        totalPages={
                                            pagination.last_page
                                        }
                                        onPageChange={
                                            handlePageChange
                                        }
                                    />

                                )}

                        </div>


                        {/* =================================================
                            MAP
                        ================================================== */}

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


                                    <button
                                        className="map-search-btn"
                                        type="button"
                                    >

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
    );
};


export default AllListing;