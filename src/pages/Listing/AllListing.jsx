import React, {
    useCallback,
    useEffect,
    useMemo,
    useState,
} from "react";

import {
    useSearchParams,
} from "react-router-dom";

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
    | URL SEARCH PARAMS
    |--------------------------------------------------------------------------
    */

    const [searchParams] = useSearchParams();


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
    |
    | These filters can come from:
    |
    | 1. Home page URL
    | 2. ListingSearch component
    |
    */

    const [filters, setFilters] = useState(() => {

        const urlMoveInDate =
            searchParams.get("moveInDate");


        let parsedDate = null;

        if (urlMoveInDate) {

            const parts =
                urlMoveInDate.split("-");

            if (parts.length === 3) {

                const year =
                    Number(parts[0]);

                const month =
                    Number(parts[1]) - 1;

                const day =
                    Number(parts[2]);

                parsedDate =
                    new Date(
                        year,
                        month,
                        day
                    );
            }
        }


        return {

            location:
                searchParams.get("location") || "",

            minRent:
                searchParams.get("minRent") || "",

            maxRent:
                searchParams.get("maxRent") || "",

            roomType:
                searchParams.get("spaceType") || "",

            utilitiesIncluded:
                searchParams.get("utilitiesIncluded") || "",

            moveInDate:
                parsedDate,
        };

    });


    /*
    |--------------------------------------------------------------------------
    | Sorting
    |--------------------------------------------------------------------------
    */

    const [sortBy, setSortBy] =
        useState("newest");


    /*
    |--------------------------------------------------------------------------
    | Build API URL
    |--------------------------------------------------------------------------
    */

    const buildApiUrl = useCallback(
        (page = 1) => {

            const params =
                new URLSearchParams();


            /*
            |--------------------------------------------------------------------------
            | Pagination
            |--------------------------------------------------------------------------
            */

            params.append(
                "page",
                String(page)
            );

            params.append(
                "per_page",
                "10"
            );


            /*
            |--------------------------------------------------------------------------
            | Location
            |--------------------------------------------------------------------------
            */

            if (
                filters.location &&
                filters.location.trim() !== ""
            ) {

                params.append(
                    "location",
                    filters.location.trim()
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

            if (
                filters.roomType &&
                filters.roomType !== ""
            ) {

                params.append(
                    "spaceType",
                    filters.roomType
                );
            }


            /*
            |--------------------------------------------------------------------------
            | Utilities
            |--------------------------------------------------------------------------
            |
            | IMPORTANT:
            |
            | Included     = 1
            | Not Included = 0
            |
            */

            if (
                filters.utilitiesIncluded !== "" &&
                filters.utilitiesIncluded !== null &&
                filters.utilitiesIncluded !== undefined
            ) {

                params.append(
                    "utilitiesIncluded",
                    String(
                        filters.utilitiesIncluded
                    )
                );
            }


            /*
            |--------------------------------------------------------------------------
            | Move In Date
            |--------------------------------------------------------------------------
            */

            if (filters.moveInDate) {

                const date =
                    filters.moveInDate;


                const year =
                    date.getFullYear();


                const month =
                    String(
                        date.getMonth() + 1
                    ).padStart(2, "0");


                const day =
                    String(
                        date.getDate()
                    ).padStart(2, "0");


                const formattedDate =
                    `${year}-${month}-${day}`;


                params.append(
                    "moveInDate",
                    formattedDate
                );
            }


            /*
            |--------------------------------------------------------------------------
            | SORTING
            |--------------------------------------------------------------------------
            |
            | Pass API sorting as well.
            |
            */

            if (sortBy === "newest") {

                params.append(
                    "sort",
                    "created_at"
                );

                params.append(
                    "order",
                    "desc"
                );
            }


            if (sortBy === "price") {

                params.append(
                    "sort",
                    "rentMonthly"
                );

                params.append(
                    "order",
                    "asc"
                );
            }


            if (sortBy === "popular") {

                /*
                 * There is currently no dedicated
                 * popularity field in the API.
                 *
                 * Keep the frontend fallback sorting.
                 */

                params.append(
                    "sort",
                    "created_at"
                );

                params.append(
                    "order",
                    "desc"
                );
            }


            const finalUrl =
                `${API_URL}?${params.toString()}`;


            return finalUrl;

        },
        [
            filters,
            sortBy,
        ]
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


                const url =
                    buildApiUrl(page);


                console.log(
                    "Listing API:",
                    url
                );


                const response =
                    await fetch(
                        url,
                        {
                            method: "GET",

                            headers: {
                                Accept:
                                    "application/json",
                            },
                        }
                    );


                /*
                |--------------------------------------------------------------------------
                | HTTP ERROR
                |--------------------------------------------------------------------------
                */

                if (!response.ok) {

                    throw new Error(
                        `API request failed: ${response.status}`
                    );
                }


                /*
                |--------------------------------------------------------------------------
                | JSON
                |--------------------------------------------------------------------------
                */

                const data =
                    await response.json();


                console.log(
                    "Listing API response:",
                    data
                );


                /*
                |--------------------------------------------------------------------------
                | API STATUS
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
                    Array.isArray(
                        data?.listings
                    )
                        ? data.listings
                        : [];


                setListings(
                    apiListings
                );


                /*
                |--------------------------------------------------------------------------
                | Pagination
                |--------------------------------------------------------------------------
                */

                if (
                    data?.pagination
                ) {

                    setPagination({

                        current_page:
                            Number(
                                data.pagination
                                    .current_page
                            ) || 1,

                        last_page:
                            Number(
                                data.pagination
                                    .last_page
                            ) || 1,

                        total:
                            Number(
                                data.pagination
                                    .total
                            ) ||
                            apiListings.length,

                        per_page:
                            Number(
                                data.pagination
                                    .per_page
                            ) || 10,

                    });

                } else {

                    setPagination({

                        current_page:
                            page,

                        last_page:
                            1,

                        total:
                            apiListings.length,

                        per_page:
                            10,

                    });
                }


                setCurrentPage(
                    page
                );

            } catch (err) {

                console.error(
                    "Listing API Error:",
                    err
                );


                setListings([]);


                setPagination({

                    current_page:
                        1,

                    last_page:
                        1,

                    total:
                        0,

                    per_page:
                        10,

                });


                setError(
                    "Unable to load listings. Please try again."
                );

            } finally {

                setLoading(false);

            }

        },
        [
            buildApiUrl
        ]
    );


    /*
    |--------------------------------------------------------------------------
    | INITIAL LOAD
    |--------------------------------------------------------------------------
    |
    | This loads:
    |
    | /all-listing
    |
    | OR
    |
    | /all-listing?location=...
    |
    */

    useEffect(() => {

        fetchListings(1);

    }, [fetchListings]);


    /*
    |--------------------------------------------------------------------------
    | HANDLE SEARCH FROM LISTING SEARCH
    |--------------------------------------------------------------------------
    */

    const handleSearch = (
        newFilters
    ) => {

        console.log(
            "Applying filters:",
            newFilters
        );


        setFilters({

            location:
                newFilters?.location ||
                "",

            minRent:
                newFilters?.minRent ??
                "",

            maxRent:
                newFilters?.maxRent ??
                "",

            roomType:
                newFilters?.roomType ||
                "",

            utilitiesIncluded:
                newFilters?.utilitiesIncluded ??
                "",

            moveInDate:
                newFilters?.moveInDate ||
                null,

        });


        setCurrentPage(1);

    };


    /*
    |--------------------------------------------------------------------------
    | HANDLE SORT
    |--------------------------------------------------------------------------
    */

    const handleSort = (
        sort
    ) => {

        setSortBy(sort);

        setCurrentPage(1);

    };


    /*
    |--------------------------------------------------------------------------
    | PAGINATION
    |--------------------------------------------------------------------------
    */

    const handlePageChange =
        (page) => {

            if (
                page < 1 ||
                page >
                    pagination.last_page ||
                loading
            ) {

                return;
            }


            fetchListings(
                page
            );


            window.scrollTo({

                top: 0,

                behavior:
                    "smooth",

            });

        };


    /*
    |--------------------------------------------------------------------------
    | FRONTEND SORTING
    |--------------------------------------------------------------------------
    |
    | We keep this because the API may not support
    | the sort field exactly as expected.
    |
    */

    const sortedListings =
        useMemo(() => {

            const sorted =
                [...listings];


            /*
            |--------------------------------------------------------------------------
            | PRICE
            |--------------------------------------------------------------------------
            */

            if (
                sortBy === "price"
            ) {

                sorted.sort(
                    (a, b) =>
                        Number(
                            a?.rentMonthly ||
                            0
                        ) -
                        Number(
                            b?.rentMonthly ||
                            0
                        )
                );

            }


            /*
            |--------------------------------------------------------------------------
            | NEWEST
            |--------------------------------------------------------------------------
            */

            if (
                sortBy === "newest"
            ) {

                sorted.sort(
                    (a, b) =>
                        Number(
                            b?.id ||
                            0
                        ) -
                        Number(
                            a?.id ||
                            0
                        )
                );

            }


            /*
            |--------------------------------------------------------------------------
            | POPULAR
            |--------------------------------------------------------------------------
            */

            if (
                sortBy === "popular"
            ) {

                sorted.sort(
                    (a, b) =>
                        Number(
                            b?.is_saved ||
                            0
                        ) -
                        Number(
                            a?.is_saved ||
                            0
                        )
                );

            }


            return sorted;

        }, [
            listings,
            sortBy,
        ]);


    /*
    |--------------------------------------------------------------------------
    | SKELETON CARD
    |--------------------------------------------------------------------------
    */

    const SkeletonCard =
        () => {

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
    | SKELETON LIST
    |--------------------------------------------------------------------------
    */

    const SkeletonListings =
        () => {

            return (

                <div className="row g-3">

                    {Array.from({
                        length: 6,
                    }).map(
                        (_, index) => (

                            <SkeletonCard
                                key={index}
                            />

                        )
                    )}

                </div>

            );

        };


    /*
    |--------------------------------------------------------------------------
    | RENDER
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
                        ================================================= */}

                        <div className="col-lg-9">


                            {/* SEARCH */}

                            <ListingSearch
                                onSearch={
                                    handleSearch
                                }
                            />


                            {/* TOOLBAR */}

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
                                        type="button"
                                        className={`sort-btn ${
                                            sortBy === "newest"
                                                ? "active"
                                                : ""
                                        }`}
                                        onClick={() =>
                                            handleSort(
                                                "newest"
                                            )
                                        }
                                    >
                                        Newest
                                    </button>


                                    {/* PRICE */}

                                    <button
                                        type="button"
                                        className={`sort-btn ${
                                            sortBy === "price"
                                                ? "active"
                                                : ""
                                        }`}
                                        onClick={() =>
                                            handleSort(
                                                "price"
                                            )
                                        }
                                    >
                                        Price: Low to High
                                    </button>


                                    {/* POPULAR */}

                                    <button
                                        type="button"
                                        className={`sort-btn ${
                                            sortBy === "popular"
                                                ? "active"
                                                : ""
                                        }`}
                                        onClick={() =>
                                            handleSort(
                                                "popular"
                                            )
                                        }
                                    >
                                        Most Popular
                                    </button>

                                </div>

                            </div>


                            {/* ERROR */}

                            {!loading &&
                                error && (

                                    <div
                                        className="alert alert-danger"
                                        role="alert"
                                    >
                                        {error}
                                    </div>

                                )}


                            {/* SKELETON */}

                            {loading && (

                                <SkeletonListings />

                            )}


                            {/* LISTINGS */}

                            {!loading &&
                                !error &&
                                sortedListings.length >
                                    0 && (

                                    <div className="row g-3">

                                        {sortedListings.map(
                                            (room) => (

                                                <div
                                                    className="col-lg-4 col-md-6"
                                                    key={
                                                        room.id
                                                    }
                                                >

                                                    <ListingCard
                                                        room={{

                                                            ...room,


                                                            /*
                                                            |--------------------------------------------------------------------------
                                                            | IMAGE
                                                            |--------------------------------------------------------------------------
                                                            */

                                                            image:
                                                                room.image,


                                                            /*
                                                            |--------------------------------------------------------------------------
                                                            | TITLE
                                                            |--------------------------------------------------------------------------
                                                            */

                                                            title:
                                                                room.title,


                                                            /*
                                                            |--------------------------------------------------------------------------
                                                            | LOCATION
                                                            |--------------------------------------------------------------------------
                                                            */

                                                            location:
                                                                `${room.city || ""}${
                                                                    room.state
                                                                        ? `, ${room.state}`
                                                                        : ""
                                                                }`,


                                                            /*
                                                            |--------------------------------------------------------------------------
                                                            | PRICE
                                                            |--------------------------------------------------------------------------
                                                            */

                                                            price:
                                                                room.rentMonthly,


                                                            /*
                                                            |--------------------------------------------------------------------------
                                                            | BED
                                                            |--------------------------------------------------------------------------
                                                            */

                                                            bed:
                                                                room.bedrooms,


                                                            /*
                                                            |--------------------------------------------------------------------------
                                                            | BATH
                                                            |--------------------------------------------------------------------------
                                                            */

                                                            bath:
                                                                room.bathrooms,


                                                            /*
                                                            |--------------------------------------------------------------------------
                                                            | AREA
                                                            |--------------------------------------------------------------------------
                                                            */

                                                            area:
                                                                room.area ||
                                                                room.squareFeet ||
                                                                room.sqft ||
                                                                0,


                                                            /*
                                                            |--------------------------------------------------------------------------
                                                            | NEW
                                                            |--------------------------------------------------------------------------
                                                            */

                                                            isNew:
                                                                Array.isArray(
                                                                    room.verificationBadges
                                                                ) &&
                                                                room.verificationBadges.includes(
                                                                    "New"
                                                                ),


                                                            /*
                                                            |--------------------------------------------------------------------------
                                                            | TAGS
                                                            |--------------------------------------------------------------------------
                                                            */

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


                            {/* NO RESULTS */}

                            {!loading &&
                                !error &&
                                sortedListings.length ===
                                    0 && (

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


                            {/* PAGINATION */}

                            {!loading &&
                                !error &&
                                pagination.last_page >
                                    1 && (

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
                        ================================================= */}

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