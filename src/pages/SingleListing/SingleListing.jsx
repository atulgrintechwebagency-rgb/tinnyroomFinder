import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Navbar from "../../component/Navbar";
import Footer from "../../component/Footer";
import "./SingleListing.css";

import {
  ArrowLeft,
  Share2,
  Heart,
  BadgeCheck,
  MapPin,
  Star,
  BedSingle,
  Bath,
  Ruler,
  Sofa,
  Zap,
  Wifi,
  MessageCircle,
  CalendarDays,
  ShieldCheck,
  FileText,
  Check,
} from "lucide-react";

import Lightbox from "yet-another-react-lightbox";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";

import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";

import { getListingBySlug } from "../../Api/singleListing";

const SingleListing = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [activeTab, setActiveTab] = useState("overview");

  const [activeImage, setActiveImage] = useState("");
  const [open, setOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);

  const [saved, setSaved] = useState(false);

  /*
  ==========================================
  FETCH SINGLE LISTING
  ==========================================
  */

  useEffect(() => {
    const fetchListing = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await getListingBySlug(slug);

        console.log("SINGLE LISTING API RESPONSE:", response);

        /*
          Your API structure is:

          response
            └── data
                └── listing
        */

        const listingData = response?.data?.listing;

        if (!listingData) {
          throw new Error("Listing data was not found.");
        }

        setListing(listingData);

        /*
        ==========================================
        SET PRIMARY IMAGE
        ==========================================
        */

        const apiImages = Array.isArray(listingData.images)
          ? listingData.images
          : [];

        const imageUrls = apiImages
          .map((image) => image?.image_path)
          .filter(Boolean);

        /*
          Prefer primary_image if available.
        */

        const primaryImage =
          listingData?.primary_image?.image_path ||
          imageUrls[0] ||
          "";

        setActiveImage(primaryImage);

        /*
        ==========================================
        SAVED STATUS
        ==========================================
        */

        setSaved(Number(listingData?.is_saved) === 1);
      } catch (err) {
        console.error("Single Listing Error:", err);

        setError(
          err?.message ||
            "Unable to load this listing. Please try again."
        );
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchListing();
    }
  }, [slug]);

  /*
  ==========================================
  LOADING SKELETON
  ==========================================
  */

  if (loading) {
    return (
      <>
        <Navbar />

        <SingleListingSkeleton />

        <Footer />
      </>
    );
  }

  /*
  ==========================================
  ERROR
  ==========================================
  */

  if (error || !listing) {
    return (
      <>
        <Navbar />

        <section className="single-listing-section py-5">
          <div className="container">
            <div
              className="text-center py-5"
              style={{
                minHeight: "400px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <h2>Unable to load listing</h2>

              <p className="text-muted mb-4">
                {error || "The listing could not be found."}
              </p>

              <button
                type="button"
                className="message-btn"
                style={{
                  width: "auto",
                  padding: "0 25px",
                }}
                onClick={() => navigate("/all-listing")}
              >
                <ArrowLeft size={18} />
                Back to Listings
              </button>
            </div>
          </div>
        </section>

        <Footer />
      </>
    );
  }

  /*
  ==========================================
  API DATA
  ==========================================
  */

  const title = listing.title || "Untitled Listing";

  const price =
    listing.price_formatted ||
    `$${Number(listing.price || 0).toLocaleString()}`;

  const location =
    listing.address ||
    [listing.city, listing.state]
      .filter(Boolean)
      .join(", ") ||
    "Location unavailable";

  const bedrooms = listing.bedrooms ?? 0;

  const bathrooms =
    listing.bathrooms ??
    listing.bath ??
    "N/A";

  const area = listing.area_sqft ?? "N/A";

  const spaceType =
    listing.space_type ||
    "Not specified";

  const bathroomType =
    listing.bathroom_type ||
    listing.bath ||
    "Not specified";

  const propertyType =
    listing.property_type ||
    listing.propertyType ||
    "Not specified";

  const neighborhood =
    listing.neighborhood ||
    "Not specified";

  const description =
    listing.description || "";

  const verificationBadges =
    Array.isArray(listing.verification_badges)
      ? listing.verification_badges
      : [];

  const tags =
    Array.isArray(listing.tags)
      ? listing.tags
      : [];

  const includedRent =
    Array.isArray(listing.included_rent)
      ? listing.included_rent
      : [];

  const nearbyPlaces =
    Array.isArray(listing.nearby_places)
      ? listing.nearby_places
      : [];

  const host = listing.host || {};

  const accessibility =
    listing.accessibility || {};

  /*
  ==========================================
  IMAGES
  ==========================================
  */

  const images = Array.isArray(listing.images)
    ? listing.images
        .map((image) => image?.image_path)
        .filter(Boolean)
    : [];

  /*
    If images[] is empty, use primary_image.
  */

  if (
    images.length === 0 &&
    listing?.primary_image?.image_path
  ) {
    images.push(listing.primary_image.image_path);
  }

  /*
  ==========================================
  IMAGE FUNCTIONS
  ==========================================
  */

  const openGallery = (index) => {
    setPhotoIndex(index);

    setActiveImage(images[index]);

    setOpen(true);
  };

  const handleImageClick = (image, index) => {
    setActiveImage(image);
    setPhotoIndex(index);
  };

  /*
  ==========================================
  SAVE
  ==========================================
  */

  const handleSave = () => {
    setSaved((previous) => !previous);

    console.log(
      saved
        ? "Removed from wishlist"
        : "Added to wishlist",
      listing.id
    );

    // Wishlist API can be added here later.
  };

  /*
  ==========================================
  SHARE
  ==========================================
  */

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: title,
          text: `Check out ${title}`,
          url: window.location.href,
        });
      } else {
        await navigator.clipboard.writeText(
          window.location.href
        );

        alert("Listing link copied!");
      }
    } catch (error) {
      console.log("Share cancelled.");
    }
  };

  /*
  ==========================================
  FORMAT DATE
  ==========================================
  */

  const formatDate = (date) => {
    if (!date) return "Not specified";

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return date;
    }

    return parsedDate.toLocaleDateString(
      "en-US",
      {
        year: "numeric",
        month: "long",
        day: "numeric",
      }
    );
  };

  /*
  ==========================================
  BOOLEAN FORMAT
  ==========================================
  */

  const formatBoolean = (value) => {
    if (value === true || Number(value) === 1) {
      return "Yes";
    }

    if (value === false || Number(value) === 0) {
      return "No";
    }

    return "Not specified";
  };

  /*
  ==========================================
  AMENITIES
  ==========================================
  */

  const amenities = [
    ...includedRent,
  ];

  /*
    Add other API fields as amenities
  */

  if (listing.kitchen_access) {
    amenities.push(
      `Kitchen: ${listing.kitchen_access}`
    );
  }

  if (listing.laundry) {
    amenities.push(
      `Laundry: ${listing.laundry}`
    );
  }

  if (listing.parking) {
    amenities.push(
      `Parking: ${listing.parking}`
    );
  }

  if (listing.outdoor_space) {
    amenities.push(
      `Outdoor: ${listing.outdoor_space}`
    );
  }

  /*
  ==========================================
  HOUSE RULES
  ==========================================
  */

  const houseRules = [];

  if (listing.smoking) {
    houseRules.push(
      `Smoking: ${listing.smoking}`
    );
  }

  if (listing.pets) {
    houseRules.push(
      `Pets: ${listing.pets}`
    );
  }

  if (listing.visitors) {
    houseRules.push(
      `Visitors: ${listing.visitors}`
    );
  }

  if (
    listing.quiet_hours_start &&
    listing.quiet_hours_end
  ) {
    houseRules.push(
      `Quiet Hours: ${listing.quiet_hours_start} - ${listing.quiet_hours_end}`
    );
  }

  /*
  ==========================================
  RETURN
  ==========================================
  */

  return (
    <>
      <Navbar />

      <section id="single_listing">

        <div className="container">

          <div className="row">

            {/* ==================================
                LEFT CONTENT
            ================================== */}

            <div className="col-lg-8 col-xl-9">

              <section className="single-listing-section py-0 py-md-1">

                <div className="container">

                  {/* TOP BAR */}

                  <div className="single-top-bar">

                    <button
                      className="back-btn"
                      type="button"
                      onClick={() =>
                        navigate("/all-listing")
                      }
                    >
                      <ArrowLeft size={18} />

                      Back to Listings
                    </button>

                    <div className="top-actions">

                      <button
                        type="button"
                        onClick={handleShare}
                      >
                        <Share2 size={17} />

                        Share
                      </button>

                      <button
                        type="button"
                        onClick={handleSave}
                      >
                        <Heart
                          size={17}
                          fill={
                            saved
                              ? "currentColor"
                              : "none"
                          }
                        />

                        {saved
                          ? "Saved"
                          : "Save"}
                      </button>

                    </div>

                  </div>

                  {/* ==================================
                      GALLERY
                  ================================== */}

                  <div className="listing-gallery">

                    <div className="gallery-main">

                      {activeImage ? (
                        <img
                          src={activeImage}
                          alt={title}
                          onClick={() =>
                            openGallery(
                              Math.max(
                                images.indexOf(
                                  activeImage
                                ),
                                0
                              )
                            )
                          }
                          onError={(e) => {
                            console.error(
                              "Image failed:",
                              e.currentTarget.src
                            );

                            e.currentTarget.style.display =
                              "none";
                          }}
                        />
                      ) : (
                        <div
                          style={{
                            height: "100%",
                            minHeight: "300px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            background: "#f3f4f6",
                            color: "#6b7280",
                          }}
                        >
                          No Image Available
                        </div>
                      )}

                      <button
                        className="gallery-favorite"
                        type="button"
                        onClick={handleSave}
                      >
                        <Heart
                          size={20}
                          fill={
                            saved
                              ? "currentColor"
                              : "none"
                          }
                        />
                      </button>

                    </div>

                    {/* THUMBNAILS */}

                    {images.length > 0 && (
                      <div className="gallery-thumbnails">

                        {images
                          .slice(0, 5)
                          .map(
                            (
                              image,
                              index
                            ) => (
                              <div
                                key={`${image}-${index}`}
                                className={`thumb-item ${
                                  activeImage ===
                                  image
                                    ? "active"
                                    : ""
                                }`}
                                onClick={() =>
                                  handleImageClick(
                                    image,
                                    index
                                  )
                                }
                              >

                                <img
                                  src={image}
                                  alt={`${title} ${
                                    index + 1
                                  }`}
                                />

                                {/* MORE PHOTOS */}

                                {index === 4 &&
                                  images.length >
                                    5 && (
                                    <div
                                      className="thumb-overlay"
                                      onClick={(
                                        e
                                      ) => {
                                        e.stopPropagation();

                                        openGallery(
                                          4
                                        );
                                      }}
                                    >
                                      <strong>
                                        +
                                        {images.length -
                                          5}
                                      </strong>

                                      <span>
                                        More Photos
                                      </span>
                                    </div>
                                  )}

                              </div>
                            )
                          )}

                      </div>
                    )}

                  </div>

                </div>

              </section>

              {/* ==================================
                  LISTING DETAILS
              ================================== */}

              <div className="listing-details">

                <div className="d-flex justify-content-between align-items-start flex-wrap gap-3">

                  <div>

                    <div className="listing-title-wrap">

                      <h2 className="listing-title">
                        {title}
                      </h2>

                      {listing.verified_status && (
                        <BadgeCheck
                          size={22}
                          className="verified-icon"
                        />
                      )}

                    </div>

                    <div className="listing-address">

                      <MapPin size={15} />

                      <span>
                        {location}
                      </span>

                    </div>

                    {/* REVIEW */}

                    <div className="listing-review">

                      <Star
                        size={16}
                        fill="#FDBA12"
                        color="#FDBA12"
                      />

                      <span>
                        {listing.average_rating ||
                          "New"}
                      </span>

                      <a href="#reviews">
                        (
                        {Array.isArray(
                          listing.reviews
                        )
                          ? listing.reviews.length
                          : 0}{" "}
                        reviews)
                      </a>

                    </div>

                  </div>

                  <div className="listing-price">

                    {price}

                    <span>
                      /mo
                    </span>

                  </div>

                </div>

                {/* ==================================
                    PROPERTY FEATURES
                ================================== */}

                <div className="listing-features">

                  <div className="feature">

                    <BedSingle size={18} />

                    <span>
                      {bedrooms} Bed
                    </span>

                  </div>

                  <div className="feature">

                    <Bath size={18} />

                    <span>
                      {bathrooms} Bath
                    </span>

                  </div>

                  <div className="feature">

                    <Ruler size={18} />

                    <span>
                      {area} sqft
                    </span>

                  </div>

                  <div className="feature">

                    <Sofa size={18} />

                    <span>
                      {formatBoolean(
                        accessibility.furnished
                      ) === "Yes"
                        ? "Furnished"
                        : "Unfurnished"}
                    </span>

                  </div>

                  <div className="feature">

                    <Zap size={18} />

                    <span>
                      {formatBoolean(
                        accessibility.utilities_included
                      ) === "Yes"
                        ? "Utilities Included"
                        : "Utilities Not Included"}
                    </span>

                  </div>

                  <div className="feature">

                    <Wifi size={18} />

                    <span>
                      High-Speed Wi-Fi
                    </span>

                  </div>

                </div>

                {/* ==================================
                    TABS
                ================================== */}

                <ul className="listing-tabs nav">

                  <li className="nav-item">

                    <button
                      className={
                        activeTab ===
                        "overview"
                          ? "active"
                          : ""
                      }
                      onClick={() =>
                        setActiveTab(
                          "overview"
                        )
                      }
                    >
                      Overview
                    </button>

                  </li>

                  <li className="nav-item">

                    <button
                      className={
                        activeTab ===
                        "amenities"
                          ? "active"
                          : ""
                      }
                      onClick={() =>
                        setActiveTab(
                          "amenities"
                        )
                      }
                    >
                      Amenities
                    </button>

                  </li>

                  <li className="nav-item">

                    <button
                      className={
                        activeTab ===
                        "rules"
                          ? "active"
                          : ""
                      }
                      onClick={() =>
                        setActiveTab(
                          "rules"
                        )
                      }
                    >
                      House Rules
                    </button>

                  </li>

                  <li className="nav-item">

                    <button
                      className={
                        activeTab ===
                        "availability"
                          ? "active"
                          : ""
                      }
                      onClick={() =>
                        setActiveTab(
                          "availability"
                        )
                      }
                    >
                      Availability
                    </button>

                  </li>

                </ul>

                {/* ==================================
                    TAB CONTENT
                ================================== */}

                <div className="listing-tab-content">

                  {/* OVERVIEW */}

                  {activeTab ===
                    "overview" && (
                    <div className="listing-description">

                      {description ? (
                        <div
                          dangerouslySetInnerHTML={{
                            __html:
                              description,
                          }}
                        />
                      ) : (
                        <p>
                          No description
                          available for
                          this listing.
                        </p>
                      )}

                    </div>
                  )}

                  {/* AMENITIES */}

                  {activeTab ===
                    "amenities" && (
                    <div className="amenities-list">

                      {amenities.length >
                      0 ? (
                        amenities.map(
                          (
                            amenity,
                            index
                          ) => (
                            <div
                              key={`${amenity}-${index}`}
                            >
                              <Check
                                size={16}
                              />

                              {amenity}
                            </div>
                          )
                        )
                      ) : (
                        <p>
                          No amenities
                          specified.
                        </p>
                      )}

                    </div>
                  )}

                  {/* HOUSE RULES */}

                  {activeTab ===
                    "rules" && (
                    <div className="rules-list">

                      {houseRules.length >
                      0 ? (
                        houseRules.map(
                          (
                            rule,
                            index
                          ) => (
                            <p
                              key={index}
                            >
                              • {rule}
                            </p>
                          )
                        )
                      ) : (
                        <p>
                          No house rules
                          specified.
                        </p>
                      )}

                    </div>
                  )}

                  {/* AVAILABILITY */}

                  {activeTab ===
                    "availability" && (
                    <div className="availability-box">

                      <h5>
                        Available From
                      </h5>

                      <p>
                        {formatDate(
                          listing.available_from
                        )}
                      </p>

                      <h5>
                        Minimum Lease
                      </h5>

                      <p>
                        {listing.minimum_stay ||
                          listing.lease_term ||
                          "Not specified"}
                      </p>

                      <h5>
                        Move-in Flexibility
                      </h5>

                      <p>
                        {formatBoolean(
                          listing.flexible_move_in_date
                        ) === "Yes"
                          ? "Flexible move-in date"
                          : "Fixed move-in date"}
                      </p>

                    </div>
                  )}

                </div>

              </div>

              {/* ==================================
                  ADDITIONAL DETAILS
              ================================== */}

              {/* <div className="listing-details mt-4">

                <h4>
                  Property Details
                </h4>

                <div className="amenities-list mt-3">

                  <div>
                    <Check size={16} />
                    Space Type: {spaceType}
                  </div>

                  <div>
                    <Check size={16} />
                    Bathroom: {bathroomType}
                  </div>

                  <div>
                    <Check size={16} />
                    Neighborhood: {neighborhood}
                  </div>

                  <div>
                    <Check size={16} />
                    Lease Term:{" "}
                    {listing.lease_term ||
                      "Not specified"}
                  </div>

                </div>

              </div> */}

            </div>

            {/* ==================================
                RIGHT SIDEBAR
            ================================== */}

            <div className="col-lg-4 col-xl-3">

              <aside className="host-sidebar">

                <div className="host-card">

                  <h5 className="host-heading">
                    Meet your host
                  </h5>

                  <div className="host-profile">

                    <div
                      className="host-avatar"
                      style={{
                        display: "flex",
                        alignItems:
                          "center",
                        justifyContent:
                          "center",
                        background:
                          "#e5f5f4",
                        fontWeight: "600",
                        fontSize: "22px",
                      }}
                    >
                      {host.name
                        ? host.name
                            .charAt(0)
                            .toUpperCase()
                        : "H"}
                    </div>

                    <div>

                      <h6>
                        {host.name ||
                          "TinyRoom Host"}
                      </h6>

                      {verificationBadges.includes(
                        "Superhost"
                      ) && (
                        <div className="superhost">

                          <Star
                            size={14}
                            fill="#FDBA12"
                            color="#FDBA12"
                          />

                          Superhost
                        </div>
                      )}

                      <small>
                        {host.email ||
                          "Verified host"}
                      </small>

                      {host.member_since && (
                        <small>
                          Member since{" "}
                          {formatDate(
                            host.member_since
                          )}
                        </small>
                      )}

                    </div>

                  </div>

                  <button
                    className="message-btn"
                    type="button"
                  >
                    <MessageCircle
                      size={18}
                    />

                    Message Host
                  </button>

                  <hr />

                  {/* MOVE-IN */}

                  <div className="sidebar-item">

                    <CalendarDays
                      size={20}
                    />

                    <div>

                      <strong>
                        Move-in Date
                      </strong>

                      <span>
                        {formatDate(
                          listing.available_from
                        )}

                        {listing.flexible_move_in_date &&
                          " (Flexible)"}
                      </span>

                    </div>

                  </div>

                  {/* SECURITY DEPOSIT */}

                  <div className="sidebar-item">

                    <ShieldCheck
                      size={20}
                    />

                    <div>

                      <strong>
                        Security Deposit
                      </strong>

                      <span>
                        $
                        {Number(
                          listing.security_deposit ||
                            0
                        ).toLocaleString()}
                      </span>

                    </div>

                  </div>

                  {/* LEASE TERM */}

                  <div className="sidebar-item">

                    <FileText
                      size={20}
                    />

                    <div>

                      <strong>
                        Lease Term
                      </strong>

                      <span>
                        {listing.lease_term ||
                          "Not specified"}
                      </span>

                    </div>

                  </div>

                  {/* SECURE BOX */}

                  <div className="secure-box">

                    <ShieldCheck
                      size={26}
                    />

                    <p>
                      All payments are
                      secure and handled
                      through our trusted
                      platform.
                    </p>

                  </div>

                </div>

              </aside>

            </div>

          </div>

        </div>

      </section>

      {/* ==================================
          LIGHTBOX
      ================================== */}

      {images.length > 0 && (
        <Lightbox
          open={open}
          close={() => setOpen(false)}
          index={photoIndex}
          slides={images.map(
            (image) => ({
              src: image,
            })
          )}
          plugins={[Thumbnails]}
        />
      )}

      <Footer />
    </>
  );
};

/*
================================================
SKELETON
================================================
*/

const SingleListingSkeleton = () => {
  return (
    <>
      <section className="single-listing-section py-4">

        <div className="container">

          {/* TOP BAR */}

          <div className="single-top-bar">

            <div
              className="skeleton skeleton-back"
            ></div>

            <div
              className="skeleton skeleton-action"
            ></div>

          </div>

          {/* GALLERY */}

          <div className="listing-gallery">

            <div
              className="skeleton skeleton-gallery"
            ></div>

            <div className="gallery-thumbnails">

              {[1, 2, 3, 4, 5].map(
                (item) => (
                  <div
                    key={item}
                    className="skeleton skeleton-thumb"
                  ></div>
                )
              )}

            </div>

          </div>

          {/* DETAILS */}

          <div className="listing-details">

            <div className="skeleton skeleton-title"></div>

            <div className="skeleton skeleton-line"></div>

            <div className="skeleton skeleton-line short"></div>

            <div className="listing-features">

              {[1, 2, 3, 4, 5, 6].map(
                (item) => (
                  <div
                    key={item}
                    className="skeleton skeleton-feature"
                  ></div>
                )
              )}

            </div>

            <div className="skeleton skeleton-tabs"></div>

            <div className="skeleton skeleton-description"></div>

            <div className="skeleton skeleton-description short"></div>

          </div>

        </div>

      </section>
    </>
  );
};

export default SingleListing;