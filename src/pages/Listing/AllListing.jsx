import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import { useSearchParams } from "react-router-dom";

import Navbar from "../../component/Navbar";
import Footer from "../../component/Footer";

import ListingSearch from "./ListingSearch";
import ListingCard from "./ListingCard";
import Pagination from "./Pagination";

import "./AllListing.css";

const API_URL =
  "https://tinyroomfinder.com/backend/public/api/listings";

const AllListing = () => {
  const [searchParams] = useSearchParams();

  /* =========================================================
     LISTINGS
  ========================================================= */

  const [listings, setListings] = useState([]);

  /* =========================================================
     LOADING
  ========================================================= */

  const [loading, setLoading] = useState(true);

  /* =========================================================
     ERROR
  ========================================================= */

  const [error, setError] = useState("");

  /* =========================================================
     PAGINATION
  ========================================================= */

  const [pagination, setPagination] = useState({
    current_page: 1,
    last_page: 1,
    total: 0,
    per_page: 10,
  });

  const [currentPage, setCurrentPage] = useState(1);

  /* =========================================================
     FILTERS
  ========================================================= */

  const [filters, setFilters] = useState(() => {
    const urlMoveInDate =
      searchParams.get("moveInDate");

    let parsedDate = null;

    if (urlMoveInDate) {
      const parts = urlMoveInDate.split("-");

      if (parts.length === 3) {
        const year = Number(parts[0]);
        const month = Number(parts[1]) - 1;
        const day = Number(parts[2]);

        parsedDate = new Date(
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

      moveInDate: parsedDate,
    };
  });

  /* =========================================================
     SORTING
     
     newest
     price
     popular
  ========================================================= */

  const [sortBy, setSortBy] =
    useState("newest");

  /* =========================================================
     BUILD API URL
     
     IMPORTANT:
     We don't depend on API sorting for the frontend display.
     ========================================================= */

  const buildApiUrl = useCallback(
    (page = 1) => {
      const params =
        new URLSearchParams();

      /* Pagination */

      params.append(
        "page",
        String(page)
      );

      params.append(
        "per_page",
        "10"
      );

      /* Location */

      if (
        filters.location &&
        filters.location.trim() !== ""
      ) {
        params.append(
          "location",
          filters.location.trim()
        );
      }

      /* Minimum rent */

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

      /* Maximum rent */

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

      /* Room type */

      if (
        filters.roomType &&
        filters.roomType !== ""
      ) {
        params.append(
          "spaceType",
          filters.roomType
        );
      }

      /* Utilities */

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

      /* Move in date */

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

        params.append(
          "moveInDate",
          `${year}-${month}-${day}`
        );
      }

      /*
       * Don't send frontend sort here.
       *
       * We sort the returned listings
       * ourselves below.
       */

      return `${API_URL}?${params.toString()}`;
    },
    [filters]
  );

  /* =========================================================
     FETCH LISTINGS
  ========================================================= */

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
          await fetch(url, {
            method: "GET",

            headers: {
              Accept:
                "application/json",
            },
          });

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

        if (
          data?.status === false
        ) {
          throw new Error(
            data?.message ||
              "Unable to load listings."
          );
        }

        /*
         * API response:
         *
         * {
         *   status: true,
         *   listings: [...]
         * }
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

        /* Pagination */

        if (
          data?.pagination
        ) {
          setPagination({
            current_page:
              Number(
                data.pagination
                  .current_page
              ) || page,

            last_page:
              Number(
                data.pagination
                  .last_page
              ) || 1,

            total:
              Number(
                data.pagination.total
              ) ||
              apiListings.length,

            per_page:
              Number(
                data.pagination.per_page
              ) || 10,
          });
        } else {
          setPagination({
            current_page: page,
            last_page: 1,
            total:
              apiListings.length,
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
          "Unable to load listings. Please try again."
        );
      } finally {
        setLoading(false);
      }
    },
    [buildApiUrl]
  );

  /* =========================================================
     INITIAL LOAD
  ========================================================= */

  useEffect(() => {
    fetchListings(1);
  }, [fetchListings]);

  /* =========================================================
     SEARCH
  ========================================================= */

  const handleSearch = (
    newFilters
  ) => {
    console.log(
      "Applying filters:",
      newFilters
    );

    setFilters({
      location:
        newFilters?.location || "",

      minRent:
        newFilters?.minRent ?? "",

      maxRent:
        newFilters?.maxRent ?? "",

      roomType:
        newFilters?.roomType || "",

      utilitiesIncluded:
        newFilters?.utilitiesIncluded ?? "",

      moveInDate:
        newFilters?.moveInDate ||
        null,
    });

    setCurrentPage(1);
  };

  /* =========================================================
     SORT
     
     IMPORTANT:
     Only change sort state.
     
     We don't call API again here.
     ========================================================= */

  const handleSort = (
    sort
  ) => {
    console.log(
      "Sorting by:",
      sort
    );

    setSortBy(sort);
  };

  /* =========================================================
     GET PRICE
     
     Supports:
     
     rentMonthly
     price
     discounted_price
     ========================================================= */

  const getListingPrice = (
    listing
  ) => {
    const price =
      listing?.rentMonthly ??
      listing?.price ??
      listing?.discounted_price ??
      0;

    return Number(
      String(price).replace(
        /[^0-9.-]+/g,
        ""
      )
    ) || 0;
  };

  /* =========================================================
     GET CREATED DATE
  ========================================================= */

  const getCreatedDate = (
    listing
  ) => {
    if (
      !listing?.created_at
    ) {
      return 0;
    }

    const time =
      new Date(
        listing.created_at
      ).getTime();

    return Number.isNaN(time)
      ? 0
      : time;
  };

  /* =========================================================
     POPULARITY SCORE
     
     Your current API doesn't appear to have
     a dedicated popularity field.
     
     Therefore:
     
     reviews > saved > rating
     
     are used as a reasonable frontend fallback.
  ========================================================= */

  const getPopularityScore = (
    listing
  ) => {
    const reviews =
      Array.isArray(
        listing?.reviews
      )
        ? listing.reviews.length
        : Number(
            listing?.review_count ||
              listing?.reviews_count ||
              0
          );

    const saved =
      Number(
        listing?.saved_count ||
          listing?.favorites_count ||
          listing?.favorites ||
          0
      );

    const rating =
      Number(
        listing?.rating ||
          listing?.average_rating ||
          0
      );

    return (
      reviews * 100 +
      saved * 10 +
      rating
    );
  };

  /* =========================================================
     SORTED LISTINGS
  ========================================================= */

  const sortedListings =
    useMemo(() => {
      const sorted =
        [...listings];

      /* NEWEST */

      if (
        sortBy === "newest"
      ) {
        sorted.sort(
          (a, b) => {
            const dateA =
              getCreatedDate(a);

            const dateB =
              getCreatedDate(b);

            /*
             * If created_at doesn't exist,
             * use ID as fallback.
             */

            if (
              dateA === 0 &&
              dateB === 0
            ) {
              return (
                Number(
                  b?.id || 0
                ) -
                Number(
                  a?.id || 0
                )
              );
            }

            return (
              dateB - dateA
            );
          }
        );
      }

      /* PRICE LOW TO HIGH */

      if (
        sortBy === "price"
      ) {
        sorted.sort(
          (a, b) =>
            getListingPrice(a) -
            getListingPrice(b)
        );
      }

      /* POPULAR */

      if (
        sortBy === "popular"
      ) {
        sorted.sort(
          (a, b) =>
            getPopularityScore(
              b
            ) -
            getPopularityScore(
              a
            )
        );
      }

      return sorted;
    }, [
      listings,
      sortBy,
    ]);

  /* =========================================================
     PAGINATION
  ========================================================= */

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

      fetchListings(page);

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    };

  /* =========================================================
     SKELETON CARD
  ========================================================= */

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

  /* =========================================================
     SKELETON LIST
  ========================================================= */

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

  /* =========================================================
     RENDER
  ========================================================= */

  return (
    <>
      <Navbar />

      <section id="mainsearch">

        <div className="container">

          <div className="row">

            {/* =====================================================
                MAIN CONTENT
            ===================================================== */}

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
                    : `${pagination.total} Results`}
                </h4>

                <div className="listing-sort">

                  <span>
                    Sort by :
                  </span>

                  {/* NEWEST */}

                  <button
                    type="button"
                    className={`sort-btn ${
                      sortBy ===
                      "newest"
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
                      sortBy ===
                      "price"
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
                      sortBy ===
                      "popular"
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
                      (room) => {

                        /*
                         * Normalize image.
                         *
                         * This also supports the API
                         * structure you showed earlier.
                         */

                        const image =
                          room?.image ||
                          room?.primary_image?.image_path ||
                          room?.primary_image?.thumbnail_path ||
                          room?.images?.[0]?.image_path ||
                          room?.images?.[0]?.thumbnail_path ||
                          "";

                        /*
                         * Normalize price.
                         */

                        const price =
                          room?.rentMonthly ??
                          room?.price ??
                          room?.discounted_price ??
                          0;

                        /*
                         * Normalize area.
                         */

                        const area =
                          room?.area_sqft ??
                          room?.area ??
                          room?.squareFeet ??
                          room?.sqft ??
                          0;

                        /*
                         * Normalize tags.
                         */

                        const tags =
                          Array.isArray(
                            room?.nearbyNeedTags
                          )
                            ? room.nearbyNeedTags.slice(
                                0,
                                2
                              )
                            : Array.isArray(
                                room?.tags
                              )
                            ? room.tags.slice(
                                0,
                                2
                              )
                            : [];

                        /*
                         * Normalize new badge.
                         */

                        const isNew =
                          Array.isArray(
                            room?.verificationBadges
                          ) &&
                          room.verificationBadges.includes(
                            "New"
                          );

                        return (
                          <div
                            className="col-lg-4 col-md-6"
                            key={
                              room.id
                            }
                          >

                            <ListingCard
                              room={{
                                ...room,

                                image,

                                title:
                                  room?.title ||
                                  "Untitled Listing",

                                location:
                                  `${room?.city || ""}${
                                    room?.state
                                      ? `, ${room.state}`
                                      : ""
                                  }`,

                                price,

                                bed:
                                  room?.bedrooms ||
                                  0,

                                bath:
                                  room?.bathrooms ||
                                  0,

                                area,

                                isNew,

                                tags,
                              }}
                            />

                          </div>
                        );
                      }
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
                      Try changing your
                      search filters.
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

            {/* =====================================================
                MAP
            ===================================================== */}

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