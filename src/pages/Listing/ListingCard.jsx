import React from "react";
import {
    Heart,
    BedSingle,
    Bath,
    Ruler,
    MapPin
} from "lucide-react";


const ListingCard = ({ room }) => {

    if (!room) return null;


    return (

        <div className="listing-card">


            {/* IMAGE */}

            <div className="listing-card-image">

                <img
                    src={room.image}
                    alt={room.title}
                    className="img-fluid"
                />


                {room.verificationBadges?.includes(
                    "New"
                ) && (

                    <span className="listing-badge">
                        NEW
                    </span>

                )}


                <button
                    className="wishlist-btn"
                    type="button"
                >

                    <Heart size={18} />

                </button>

            </div>


            {/* CONTENT */}

            <div className="listing-card-body">


                <div className="d-flex justify-content-between align-items-start gap-2">


                    <h5 className="listing-title">
                        {room.title}
                    </h5>


                    <h4 className="listing-price">

                        ${room.rentMonthly}

                        <span>
                            /mo
                        </span>

                    </h4>

                </div>


                {/* LOCATION */}

                <div className="listing-location">

                    <MapPin size={14} />

                    <span>
                        {room.city}, {room.state}
                    </span>

                </div>


                {/* INFO */}

                <div className="listing-info">

                    <span>

                        <BedSingle size={15} />

                        {room.bedrooms} Bed

                    </span>


                    <span>

                        <Bath size={15} />

                        {room.bathrooms} Bath

                    </span>


                    {room.spaceType && (

                        <span>

                            <Ruler size={15} />

                            {room.spaceType}

                        </span>

                    )}

                </div>


                {/* TAGS */}

                <div className="listing-tags">

                    {room.nearbyNeedTags
                        ?.slice(0, 2)
                        .map(
                            (tag, index) => (

                                <span
                                    key={index}
                                >
                                    {tag}
                                </span>

                            )
                        )}

                </div>

            </div>

        </div>

    );

};


export default ListingCard;