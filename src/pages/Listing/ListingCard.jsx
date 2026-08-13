import React from "react";
import { Heart, BedSingle, Bath, Ruler, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ListingCard = ({ room }) => {
  const navigate = useNavigate();

  if (!room) return null;

  const handleCardClick = () => {
    // Prefer slug because it is SEO-friendly
    if (room.slug) {
      navigate(`/single-listing/${room.slug}`);
    } else {
      navigate(`/single-listing/${room.id}`);
    }
  };

  const handleWishlistClick = (e) => {
    // Don't open the single listing when clicking wishlist
    e.stopPropagation();
  };

  return (
    <div
      className="listing-card"
      onClick={handleCardClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          handleCardClick();
        }
      }}
    >
      {/* Image */}
      <div className="listing-card-image">
        <img
          src={room.image}
          alt={room.title}
          className="img-fluid"
        />

        {room.isNew && (
          <span className="listing-badge">
            NEW
          </span>
        )}

        <button
          className="wishlist-btn"
          onClick={handleWishlistClick}
          type="button"
        >
          <Heart size={18} />
        </button>
      </div>

      {/* Content */}
      <div className="listing-card-body">

        <div className="d-flex justify-content-between align-items-start gap-2">

          <h5 className="listing-title">
            {room.title}
          </h5>

          <h4 className="listing-price">
            ${room.price}
            <span>/mo</span>
          </h4>

        </div>

        <div className="listing-location">

          <MapPin size={14} />

          <span>{room.location}</span>

        </div>

        <div className="listing-info">

          <span>
            <BedSingle size={15} />
            {room.bed} Bed
          </span>

          <span>
            <Bath size={15} />
            {room.bath} Bath
          </span>

          <span>
            <Ruler size={15} />
            {room.area} sqft
          </span>

        </div>

        <div className="listing-tags">

          {room.tags?.map((tag, index) => (
            <span key={index}>
              {tag}
            </span>
          ))}

        </div>

      </div>
    </div>
  );
};

export default ListingCard;