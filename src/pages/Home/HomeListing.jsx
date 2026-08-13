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

  useEffect(() => {
    const fetchListings = async () => {
      try {
        setLoading(true);

        const data = await getListings({
          page: 1,
          per_page: 3,
          sort: "created_at",
          order: "asc",
        });

        console.log("Home Listings API:", data);

        setListings(data?.listings || []);

      } catch (error) {
        console.error("Home listings error:", error);
        setListings([]);
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, []);

  const handleListingClick = (slug) => {
    if (!slug) return;

    navigate(`/listing/${slug}`);
  };

  return (
    <section className="home-listing py-5">
      <div className="container">

        <div className="row lg-g-3 g-5">

          {/* LEFT */}
          <div className="col-lg-8">

            <div className="d-flex justify-content-between align-items-center mb-4">

              <h2 className="section-title">
                Featured Tiny Spaces
              </h2>

              <button
                className="view-btn"
                onClick={() => navigate("/all-listing")}
              >
                View all listings
                <ArrowRight size={16} />
              </button>

            </div>

            <div className="row">

              {/* LOADING */}
              {loading && (
                <>
                  {[1, 2, 3].map((item) => (
                    <div
                      className="col-lg-4 col-md-6 mb-4"
                      key={item}
                    >
                      <div className="listing-card">

                        <div
                          className="listing-image skeleton"
                          style={{ minHeight: "220px" }}
                        ></div>

                        <div className="listing-content">

                          <div className="skeleton skeleton-title"></div>

                          <div className="skeleton skeleton-text"></div>

                          <div className="skeleton skeleton-text"></div>

                          <div className="skeleton skeleton-tag"></div>

                        </div>

                      </div>
                    </div>
                  ))}
                </>
              )}

              {/* LISTINGS */}
              {!loading &&
                listings.map((item) => (

                  <div
                    className="col-lg-4 col-md-6 mb-4"
                    key={item.id}
                  >

                    <div
                      className="listing-card"
                      onClick={() =>
                        handleListingClick(item.slug)
                      }
                      style={{ cursor: "pointer" }}
                    >

                      <div className="listing-image">

                        <img
                          src={item.image}
                          alt={item.title}
                        />

                        {item.verificationBadges?.includes("New") && (
                          <span className="new-badge">
                            New
                          </span>
                        )}

                        <button
                          className="wishlist-btn"
                          onClick={(e) => {
                            e.stopPropagation();
                          }}
                        >
                          <Heart size={18} />
                        </button>

                      </div>

                      <div className="listing-content">

                        <div className="d-flex justify-content-between md-g-5 g-1">

                          <div>

                            <h5>
                              {item.title}
                            </h5>

                            <p>
                              {item.city}
                              {item.state
                                ? `, ${item.state}`
                                : ""}
                            </p>

                          </div>

                          <div className="price">

                            ${item.rentMonthly}

                            <span>/mo</span>

                          </div>

                        </div>

                        <div className="listing-info">

                          <span>
                            <BedSingle size={12} />
                            {item.bedrooms} Bed
                          </span>

                          <span>
                            <Bath size={12} />
                            {item.bathrooms} Bath
                          </span>

                          <span>
                            <Ruler size={12} />
                            {item.spaceType}
                          </span>

                        </div>

                        <div className="listing-tags">

                          {item.nearbyNeedTags
                            ?.slice(0, 2)
                            .map((tag, index) => (

                              <span key={index}>
                                {tag}
                              </span>

                            ))}

                        </div>

                      </div>

                    </div>

                  </div>

                ))}

              {/* NO DATA */}
              {!loading && listings.length === 0 && (

                <div className="col-12">

                  <div className="text-center py-4">

                    <p>
                      No listings available at the moment.
                    </p>

                  </div>

                </div>

              )}

            </div>


            {/* FEATURES */}

            <div className="row">

              <div className="features-wrapper">

                <div className="row g-4 align-items-center">

                  <div className="col-lg-4 col-md-4">

                    <div className="feature-item">

                      <div
                        className="feature-icon"
                        style={{
                          backgroundColor: "#009f9c",
                        }}
                      >
                        <ShieldCheck
                          size={26}
                          strokeWidth={2}
                          color="#fff"
                        />
                      </div>

                      <div className="feature-content">

                        <h5>
                          Verified Listings
                        </h5>

                        <p>
                          Every listing is reviewed for quality
                          and authenticity.
                        </p>

                      </div>

                    </div>

                  </div>


                  <div className="col-lg-4 col-md-4">

                    <div className="feature-item">

                      <div
                        className="feature-icon"
                        style={{
                          backgroundColor: "#feb53a",
                        }}
                      >

                        <DollarSign
                          size={28}
                          strokeWidth={2}
                          style={{
                            backgroundColor: "#fff",
                            borderRadius: "50px",
                            padding: "5px",
                          }}
                        />

                      </div>

                      <div className="feature-content">

                        <h5>
                          Flexible Budget Options
                        </h5>

                        <p>
                          Find spaces that fit your budget
                          with transparent pricing.
                        </p>

                      </div>

                    </div>

                  </div>


                  <div className="col-lg-4 col-md-4">

                    <div className="feature-item">

                      <div
                        className="feature-icon"
                        style={{
                          backgroundColor: "#00a29e",
                        }}
                      >

                        <MessageCircleMore
                          size={26}
                          strokeWidth={2}
                          color="#fff"
                        />

                      </div>

                      <div className="feature-content">

                        <h5>
                          Direct Contact
                        </h5>

                        <p>
                          Connect directly with hosts -no
                          middle fees.
                        </p>

                      </div>

                    </div>

                  </div>

                </div>

              </div>

            </div>

          </div>


          {/* RIGHT */}

          <div className="col-lg-4">

            <div className="map_box">

              <h4>
                Explore Tiny Spaces Near You
              </h4>

              <div className="map-image">

                <iframe
                  title="California Map"
                  src="https://www.google.com/maps?q=Los+Angeles,+California&z=10&output=embed"
                  width="100%"
                  height="100%"
                  style={{
                    border: 0,
                    borderRadius: "16px",
                  }}
                  loading="lazy"
                  allowFullScreen
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>

                <button className="map-search-btn">

                  <MapPin size={18} />

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