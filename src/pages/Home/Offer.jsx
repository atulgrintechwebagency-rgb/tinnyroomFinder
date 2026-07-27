import searchImg from "/images/search.png";
import listingImg from "/images/verified-listing.png";
import contactImg from "/images/direct-contact.png";
import secureImg from "/images/safe-secure.png";
import tipsImg from "/images/tiny-living-tips.png";
import signboard from "/images/signboard.png";



const offers = [
  {
    image: searchImg,
    title: "Easy Search",
    desc: "Find tiny rooms near you in seconds.",
  },
  {
    image: listingImg,
    title: "Verified Listings",
    desc: "Quality rooms from trusted hosts.",
  },
  {
    image: contactImg,
    title: "Direct Contact",
    desc: "Chat directly with hosts easily.",
  },
  {
    image: secureImg,
    title: "Safe & Secure",
    desc: "Your safety and privacy are our priority.",
  },
  {
    image: tipsImg,
    title: "Tiny Living Tips",
    desc: "Resources to help you live simply & smart.",
  },
];

const OfferSection = () => {
  return (
    <section className="offer-section">

      <div className="container">

        <div className="row g-4 align-items-stretch">

          {/* Left */}

          <div className="col-lg-9">

            <div className="offer-card">

              <span className="offer-label">
                What We Offer
              </span>

              <div className="row g-0">

                {offers.map((item, index) => (
                  <div className="col-lg col-md-4 col-12" key={index}>

                    <div className="offer-item">

                        <div className="offer-icon">
                        <img src={item.image} alt={item.title} />
                        </div>

                      <h4>{item.title}</h4>

                      <p>{item.desc}</p>

                    </div>

                  </div>
                ))}

              </div>

            </div>

          </div>

          {/* Right */}

          <div className="col-lg-3">

            <div className="offer-banner">

              <img
                src={signboard}
                alt="Tiny Room Finder"
              />

            </div>

          </div>

        </div>

      </div>

    </section>
  );
};

export default OfferSection;