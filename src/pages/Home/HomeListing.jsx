import React from "react";
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



const listings = [
  {
    id: 1,
    image: "/images/listing1.jpg",
    title: "Cozy Loft Studio",
    location: "Portland, OR",
    price: "$875",
    bed: 1,
    bath: 1,
    sqft: 150,
    tags: ["Furnished", "Utilities Included"],
  },
  {
    id: 2,
    image:"/images/listing2.jpg",
    title: "Modern Tiny Home",
    location: "Austin, TX",
    price: "$1,150",
    bed: 1,
    bath: 1,
    sqft: 240,
    tags: ["Pet Friendly", "Private Entrance"],
  },
  {
    id: 3,
    image: "/images/listing3.jpg",
    title: "Garden Guest Suite",
    location: "Seattle, WA",
    price: "$950",
    bed: 1,
    bath: 1,
    sqft: 180,
    tags: ["Quiet Area", "Utilities Included"],
  },
];

const HomeListing = () => {
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

              <button className="view-btn">
                View all listings
                <ArrowRight size={16} />
              </button>

            </div>

            <div className="row">

              {listings.map((item) => (

                <div className="col-lg-4 col-md-6 mb-4" key={item.id}>

                  <div className="listing-card">

                    <div className="listing-image">

                      <img
                        src={item.image}
                        alt={item.title}
                      />

                      <span className="new-badge">
                        New
                      </span>

                      <button className="wishlist-btn">
                        <Heart size={18} />
                      </button>

                    </div>

                    <div className="listing-content">

                      <div className="d-flex justify-content-between md-g-5 g-1">

                        <div>
                          <h5>{item.title}</h5>

                          <p>{item.location}</p>
                        </div>

                        <div className="price">
                          {item.price}
                          <span>/mo</span>
                        </div>

                      </div>

                      <div className="listing-info">

                        <span>
                          <BedSingle size={12} />
                          {item.bed} Bed
                        </span>

                        <span>
                          <Bath size={12} />
                          {item.bath} Bath
                        </span>

                        <span>
                          <Ruler size={12} />
                          {item.sqft} sqft
                        </span>

                      </div>

                      <div className="listing-tags">

                        {item.tags.map((tag, index) => (
                          <span key={index}>
                            {tag}
                          </span>
                        ))}

                      </div>

                    </div>

                  </div>

                </div>

              ))}

            </div>
            <div className="row">
              <div className="features-wrapper">
                <div className="row g-4 align-items-center">

                  <div className="col-lg-4 col-md-4">
                    <div className="feature-item">
                      <div className="feature-icon" style={{backgroundColor: "#009f9c"}}>
                        <ShieldCheck size={26} strokeWidth={2} color="#fff"/>
                      </div>

                      <div className="feature-content">
                        <h5>Verified Listings</h5>
                        <p>Every listing is reviewed for quality and authenticity.</p>
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-4 col-md-4">
                    <div className="feature-item">
                      <div className="feature-icon" style={{ backgroundColor: "#feb53a" }}>
                        <DollarSign size={28} strokeWidth={2} style={{backgroundColor:"#fff", borderRadius: "50px", padding: "5px"}} /> 
                      </div>

                      <div className="feature-content">
                        <h5>Flexible Budget Options</h5>
                        <p>Find spaces that fit your budget with transparent pricing.</p>
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-4 col-md-4">
                    <div className="feature-item">
                      <div className="feature-icon" style={{backgroundColor: "#00a29e" }}>
                        <MessageCircleMore size={26} strokeWidth={2} color="#fff" /> 
                      </div>

                      <div className="feature-content">
                        <h5>Direct Contact </h5>
                        <p>Connect directly with hosts -no middle fees.</p>
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
                    borderRadius: "16px"
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