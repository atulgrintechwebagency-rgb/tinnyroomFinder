import React from "react";
import { Heart, BedSingle, Bath, Ruler, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ListingCard = ({ room }) => {
  const navigate = useNavigate();

  if (!room) return null;

  /*
   * API fields are different from the old static data:
   *
   * API:
   * rentMonthly
   * bedrooms
   * bathrooms
   * city
   * state
   * nearbyNeedTags
   *
   * UI:
   * price
   * bed
   * bath
   * location
   * tags
   */

  const price = room.rentMonthly ?? room.price ?? 0;

  const bedrooms = room.bedrooms ?? room.bed ?? 0;

  const bathrooms =
    room.bathrooms ??
    room.bath ??
    0;

  const location =
    room.city && room.state
      ? `${room.city}, ${room.state}`
      : room.location || "";

  const tags =
    room.nearbyNeedTags ||
    room.tags ||
    [];

  const isNew =
    room.verificationBadges?.some(
      (badge) => badge.toLowerCase() === "new"
    ) || room.isNew;

  /**
   * Open single listing
   */
  const handleCardClick = () => {
    if (!room.slug) {
      console.error("Listing slug is missing:", room);
      return;
    }

    navigate(`/single-listing/${room.slug}`);
  };

  /**
   * Prevent wishlist click from opening listing
   */
  const handleWishlistClick = (e) => {
    e.stopPropagation();

    // Wishlist API can be added here later
    console.log("Wishlist clicked:", room.id);
  };

  /**
   * Keyboard accessibility
   */
  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleCardClick();
    }
  };

  return (
    <div
      className="listing-card"
      onClick={handleCardClick}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
    >
      {/* ================= IMAGE ================= */}

      <div className="listing-card-image">

        <img
          src={room.image}
          alt={room.title || "Tiny room listing"}
          className="img-fluid"
          loading="lazy"
        />

        {/* NEW Badge */}

        {isNew && (
          <span className="listing-badge">
            NEW
          </span>
        )}

        {/* Wishlist */}

        <button
          type="button"
          className="wishlist-btn"
          onClick={handleWishlistClick}
          aria-label="Save listing"
        >
          <Heart size={18} />
        </button>

      </div>

      {/* ================= CONTENT ================= */}

      <div className="listing-card-body">

        {/* Title + Price */}

        <div className="d-flex justify-content-between align-items-start gap-2">

          <h5 className="listing-title">
            {room.title || "Untitled Listing"}
          </h5>

          <h4 className="listing-price">
            ${Number(price).toLocaleString()}
            <span>/mo</span>
          </h4>

        </div>

        {/* Location */}

        <div className="listing-location">

          <MapPin size={14} />

          <span>
            {location || "Location unavailable"}
          </span>

        </div>

        {/* Room Information */}

        <div className="listing-info">

          <span>
            <BedSingle size={15} />
            {bedrooms} Bed
          </span>

          <span>
            <Bath size={15} />
            {bathrooms} Bath
          </span>

          {/* Your current API does NOT provide area/sqft.
              Keeping the existing design, but don't show fake data. */}

          {room.area !== undefined && (
            <span>
              <Ruler size={15} />
              {room.area} sqft
            </span>
          )}

        </div>

        {/* Tags */}

        {tags.length > 0 && (
          <div className="listing-tags">

            {tags.slice(0, 3).map((tag, index) => (
              <span key={`${tag}-${index}`}>
                {tag}
              </span>
            ))}

          </div>
        )}

      </div>

    </div>
  );
};

export default ListingCard;