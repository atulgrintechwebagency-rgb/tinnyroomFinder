import React, { useEffect, useState } from "react";
import {
  BedSingle,
  Bath,
  Ruler,
  Heart,
  MapPin,
  ArrowRight,
  ShieldCheck,
  DollarSign,
  MessageCircleMore,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import { getListings } from "../../Api/listingApi";

const HomeListing = () => {
  const navigate = useNavigate();

  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  /*
   * ==========================================
   * FETCH FEATURED LISTINGS
   * ==========================================
   */

  useEffect(() => {
    const fetchListings = async () => {
      try {
        setLoading(true);

        const response = await getListings({
          page: 1,
          per_page: 3,
          sort: "created_at",
          order: "asc",
        });

        console.log("Home Listings API Response:", response);

        /*
         * API may return:
         *
         * response.data.listings
         *
         * OR
         *
         * response.listings
         */

        const listingData =
          response?.data?.listings ||
          response?.listings ||
          response?.data ||
          [];

        /*
         * Make sure we always have an array
         */

        setListings(
          Array.isArray(listingData)
            ? listingData
            : []
        );

      } catch (error) {
        console.error(
          "Home listings error:",
          error
        );

        setListings([]);

      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, []);

  /*
   * ==========================================
   * OPEN SINGLE LISTING
   * ==========================================
   */

  const handleListingClick = (slug) => {
    if (!slug) {
      console.warn(
        "Listing slug is missing."
      );

      return;
    }

    navigate(
      `/single-listing/${encodeURIComponent(slug)}`
    );
  };

  /*
   * ==========================================
   * GET LISTING IMAGE
   * ==========================================
   */

  const getListingImage = (item) => {
    /*
     * First possibility:
     * Already transformed image
     */

    if (item?.image) {
      return item.image;
    }

    /*
     * API primary image
     */

    if (
      item?.primary_image?.image_path
    ) {
      return item.primary_image.image_path;
    }

    /*
     * API images array
     */

    if (
      Array.isArray(item?.images) &&
      item.images.length > 0
    ) {
      return (
        item.images[0]?.image_path ||
        item.images[0]?.thumbnail_path ||
        ""
      );
    }

    return "";
  };

  /*
   * ==========================================
   * GET PRICE
   * ==========================================
   */

  const getListingPrice = (item) => {
    return (
      item?.rentMonthly ??
      item?.rent_monthly ??
      item?.price ??
      0
    );
  };

  /*
   * ==========================================
   * GET SPACE TYPE
   * ==========================================
   */

  const getSpaceType = (item) => {
    return (
      item?.spaceType ||
      item?.space_type ||
      "Space"
    );
  };

  /*
   * ==========================================
   * GET TAGS
   * ==========================================
   */

  const getListingTags = (item) => {
    if (
      Array.isArray(item?.nearbyNeedTags)
    ) {
      return item.nearbyNeedTags;
    }

    if (
      Array.isArray(item?.nearby_need_tags)
    ) {
      return item.nearby_need_tags;
    }

    if (Array.isArray(item?.tags)) {
      return item.tags;
    }

    return [];
  };

  /*
   * ==========================================
   * RENDER
   * ==========================================
   */

  return (
    <section className="home-listing py-5">

      <div className="container">

        <div className="row lg-g-3 g-5">

          {/* ====================================
              LEFT SIDE
          ==================================== */}

          <div className="col-lg-8">

            {/* Heading */}

            <div className="d-flex justify-content-between align-items-center mb-4">

              <h2 className="section-title">
                Featured Tiny Spaces
              </h2>

              <button
                type="button"
                className="view-btn"
                onClick={() =>
                  navigate("/all-listing")
                }
              >
                View all listings

                <ArrowRight size={16} />

              </button>

            </div>

            {/* ====================================
                LISTING GRID
            ==================================== */}

            <div className="row">

              {/* ==================================
                  LOADING SKELETON
              ================================== */}

              {loading && (
                <>
                  {[1, 2, 3].map(
                    (item) => (
                      <div
                        className="col-lg-4 col-md-6 mb-4"
                        key={item}
                      >

                        <div className="listing-card">

                          {/* Image Skeleton */}

                          <div
                            className="listing-image skeleton"
                            style={{
                              minHeight:
                                "220px",
                            }}
                          >
                          </div>

                          {/* Content Skeleton */}

                          <div className="listing-content">

                            <div className="skeleton skeleton-title">
                            </div>

                            <div className="skeleton skeleton-text">
                            </div>

                            <div className="skeleton skeleton-text">
                            </div>

                            <div className="skeleton skeleton-tag">
                            </div>

                          </div>

                        </div>

                      </div>
                    )
                  )}
                </>
              )}

              {/* ==================================
                  LISTINGS
              ================================== */}

              {!loading &&
                listings.map(
                  (item) => {

                    const image =
                      getListingImage(
                        item
                      );

                    const price =
                      getListingPrice(
                        item
                      );

                    const tags =
                      getListingTags(
                        item
                      );

                    const spaceType =
                      getSpaceType(
                        item
                      );

                    return (
                      <div
                        className="col-lg-4 col-md-6 mb-4"
                        key={item.id}
                      >

                        <div
                          className="listing-card"
                          onClick={() =>
                            handleListingClick(
                              item.slug
                            )
                          }
                          role="button"
                          tabIndex={0}
                          style={{
                            cursor:
                              "pointer",
                          }}
                          onKeyDown={(e) => {

                            if (
                              e.key ===
                                "Enter" ||
                              e.key ===
                                " "
                            ) {
                              handleListingClick(
                                item.slug
                              );
                            }

                          }}
                        >

                          {/* ==================================
                              IMAGE
                          ================================== */}

                          <div className="listing-image">

                            {image ? (

                              <img
                                src={image}
                                alt={
                                  item.title ||
                                  "Tiny space"
                                }
                                onError={(
                                  e
                                ) => {

                                  /*
                                   * Prevent broken image
                                   * from repeatedly loading.
                                   */

                                  e.currentTarget.style.display =
                                    "none";

                                }}
                              />

                            ) : (

                              <div
                                className="d-flex align-items-center justify-content-center w-100 h-100"
                                style={{
                                  minHeight:
                                    "220px",
                                  background:
                                    "#f1f5f9",
                                  color:
                                    "#64748b",
                                }}
                              >
                                No Image
                              </div>

                            )}

                            {/* New Badge */}

                            {(
                              item?.verificationBadges ||
                              item?.verification_badges ||
                              []
                            ).includes(
                              "New"
                            ) && (

                              <span className="new-badge">
                                New
                              </span>

                            )}

                            {/* Wishlist */}

                            <button
                              type="button"
                              className="wishlist-btn"
                              onClick={(
                                e
                              ) => {

                                /*
                                 * IMPORTANT:
                                 * Prevent card click.
                                 */

                                e.stopPropagation();

                              }}
                              aria-label="Save listing"
                            >
                              <Heart
                                size={
                                  18
                                }
                              />
                            </button>

                          </div>

                          {/* ==================================
                              CONTENT
                          ================================== */}

                          <div className="listing-content">

                            <div className="d-flex justify-content-between md-g-5 g-1">

                              <div>

                                <h5>
                                  {
                                    item.title
                                  }
                                </h5>

                                <p>

                                  {item.city ||
                                    ""}

                                  {item.state
                                    ? `, ${item.state}`
                                    : ""}

                                </p>

                              </div>

                              {/* Price */}

                              <div className="price">

                                $
                                {Number(
                                  price
                                ).toLocaleString()}

                                <span>
                                  /mo
                                </span>

                              </div>

                            </div>

                            {/* ==================================
                                LISTING INFO
                            ================================== */}

                            <div className="listing-info">

                              <span>

                                <BedSingle
                                  size={
                                    12
                                  }
                                />

                                {item.bedrooms ??
                                  0}

                                {" "}
                                Bed

                              </span>

                              <span>

                                <Bath
                                  size={
                                    12
                                  }
                                />

                                {item.bathrooms ??
                                  item.bath ??
                                  0}

                                {" "}
                                Bath

                              </span>

                              <span>

                                <Ruler
                                  size={
                                    12
                                  }
                                />

                                {spaceType}

                              </span>

                            </div>

                            {/* ==================================
                                TAGS
                            ================================== */}

                            <div className="listing-tags">

                              {tags
                                .slice(
                                  0,
                                  2
                                )
                                .map(
                                  (
                                    tag,
                                    index
                                  ) => (

                                    <span
                                      key={`${tag}-${index}`}
                                    >
                                      {
                                        tag
                                      }
                                    </span>

                                  )
                                )}

                            </div>

                          </div>

                        </div>

                      </div>
                    );
                  }
                )}

              {/* ==================================
                  NO DATA
              ================================== */}

              {!loading &&
                listings.length ===
                  0 && (

                  <div className="col-12">

                    <div className="text-center py-4">

                      <p>
                        No listings
                        available at
                        the moment.
                      </p>

                    </div>

                  </div>

                )}

            </div>

            {/* ====================================
                FEATURES
            ==================================== */}

            <div className="row">

              <div className="features-wrapper">

                <div className="row g-4 align-items-center">

                  {/* Verified */}

                  <div className="col-lg-4 col-md-4">

                    <div className="feature-item">

                      <div
                        className="feature-icon"
                        style={{
                          backgroundColor:
                            "#009f9c",
                        }}
                      >

                        <ShieldCheck
                          size={
                            26
                          }
                          strokeWidth={
                            2
                          }
                          color="#fff"
                        />

                      </div>

                      <div className="feature-content">

                        <h5>
                          Verified
                          Listings
                        </h5>

                        <p>
                          Every
                          listing is
                          reviewed
                          for quality
                          and
                          authenticity.
                        </p>

                      </div>

                    </div>

                  </div>

                  {/* Budget */}

                  <div className="col-lg-4 col-md-4">

                    <div className="feature-item">

                      <div
                        className="feature-icon"
                        style={{
                          backgroundColor:
                            "#feb53a",
                        }}
                      >

                        <DollarSign
                          size={
                            28
                          }
                          strokeWidth={
                            2
                          }
                          style={{
                            backgroundColor:
                              "#fff",
                            borderRadius:
                              "50px",
                            padding:
                              "5px",
                          }}
                        />

                      </div>

                      <div className="feature-content">

                        <h5>
                          Flexible
                          Budget
                          Options
                        </h5>

                        <p>
                          Find spaces
                          that fit
                          your budget
                          with
                          transparent
                          pricing.
                        </p>

                      </div>

                    </div>

                  </div>

                  {/* Contact */}

                  <div className="col-lg-4 col-md-4">

                    <div className="feature-item">

                      <div
                        className="feature-icon"
                        style={{
                          backgroundColor:
                            "#00a29e",
                        }}
                      >

                        <MessageCircleMore
                          size={
                            26
                          }
                          strokeWidth={
                            2
                          }
                          color="#fff"
                        />

                      </div>

                      <div className="feature-content">

                        <h5>
                          Direct
                          Contact
                        </h5>

                        <p>
                          Connect
                          directly
                          with hosts
                          -no middle
                          fees.
                        </p>

                      </div>

                    </div>

                  </div>

                </div>

              </div>

            </div>

          </div>

          {/* ====================================
              RIGHT SIDE MAP
          ==================================== */}

          <div className="col-lg-4">

            <div className="map_box">

              <h4>
                Explore Tiny Spaces
                Near You
              </h4>

              <div className="map-image">

                <iframe
                  title="California Map"
                  src="https://www.google.com/maps?q=Los+Angeles,+California&z=10&output=embed"
                  width="100%"
                  height="100%"
                  style={{
                    border: 0,
                    borderRadius:
                      "16px",
                  }}
                  loading="lazy"
                  allowFullScreen
                  referrerPolicy="no-referrer-when-downgrade"
                >
                </iframe>

                <button
                  type="button"
                  className="map-search-btn"
                  onClick={() =>
                    navigate(
                      "/all-listing"
                    )
                  }
                >

                  <MapPin
                    size={18}
                  />

                  Search This Area

                </button>

              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
};

export default HomeListing;