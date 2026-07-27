import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
import "./Hero.css";
import { MapPin, CalendarDays, ChevronDown, Tag, ShieldCheck, Heart } from "lucide-react";

const Hero = () => {
  const [activeTab, setActiveTab] = useState("rooms");
  const [moveInDate, setMoveInDate] = useState(null);

    return (
        <section className="hero-section py-3 py-md-5 " >
            <div className="container">

                <div className="hero-wrapper">

                    {/* Hero Content */}
                    <div className="row align-items-left g-0">

                        <div className="col-lg-12">
                            <div className="hero-content py-3 py-md-3">

                                <h1>
                                    Find Small Spaces. <br></br>
                                    <span> Live Smart.</span>
                                </h1>

                                <p>
                                    Affordable tiny rooms, lofts, micro-apartments, guest suites,
                                    and compact living options-perfect for your lifestyle and budget.
                                </p>

                            </div>
                            {/* Search Box */}

                            <div className="search-wrapper">

                                {/* Tabs */}
                                <div className="room-tabs">

                                    <button
                                        className={`tab-btn ${activeTab === "rooms" ? "active" : ""}`}
                                        onClick={() => setActiveTab("rooms")}
                                    >
                                        Rooms
                                    </button>

                                    <button
                                        className={`tab-btn ${activeTab === "tiny" ? "active" : ""}`}
                                        onClick={() => setActiveTab("tiny")}
                                    >
                                        Tiny Homes
                                    </button>

                                    <button
                                        className={`tab-btn ${activeTab === "shared" ? "active" : ""}`}
                                        onClick={() => setActiveTab("shared")}
                                    >
                                        Shared Spaces
                                    </button>

                                </div>

                                {/* Search Form */}
                                <div className="search-box">

                                    <div className="row g-3 align-items-center">

                                        {/* Location */}
                                        <div className="col-lg-4">
                                            <div className="input-icon">

                                                <MapPin size={18} className="left-icon" />

                                                <input
                                                    type="text"
                                                    placeholder="City, State or Zip"
                                                />

                                            </div>
                                        </div>

                                        {/* Move-in Date */}
                                        <div className="col-lg-3">

                                            <div className="input-icon date-picker-box">

                                                <CalendarDays size={18} className="left-icon" />

                                                <DatePicker
                                                    selected={moveInDate}
                                                    onChange={(date) => setMoveInDate(date)}
                                                    placeholderText="Move-in Date"
                                                    dateFormat="MMM dd, yyyy"
                                                    className="date-input"
                                                />

                                                <ChevronDown
                                                    size={18}
                                                    className="dropdown-icon"
                                                />

                                            </div>

                                        </div>

                                        {/* Budget */}
                                        <div className="col-lg-2">

                                            <div className="select-box">
                                               <Tag  size={18} className="left-icon" />
                                                <select defaultValue="">
                                                    <option value="" disabled>
                                                        Budget
                                                    </option>
                                                    <option>$500</option>
                                                    <option>$1000</option>
                                                    <option>$1500</option>
                                                    <option>$2000+</option>
                                                </select>

                                                <ChevronDown
                                                    size={18}
                                                    className="dropdown-icon"
                                                />

                                            </div>

                                        </div>

                                        {/* Search Button */}
                                        <div className="col-lg-3">

                                            <button className="search-btn w-100">

                                                {activeTab === "rooms"
                                                    ? "Search Rooms"
                                                    : activeTab === "tiny"
                                                        ? "Search Tiny Homes"
                                                        : "Search Shared Spaces"}

                                            </button>

                                        </div>
                                                                        <div className="popular-searches">

                                    <span className="title">
                                        Popular searches:
                                    </span>

                                    <button>Near Me</button>

                                    <button>Under $1,000</button>

                                    <button>Utilities Included</button>

                                    <button>Furnished</button>

                                    <button>Short Term</button>

                                </div>

                                    </div>

                                </div>

                                {/* Popular Searches */}

                            </div>


                        </div>

                        {/* <div className="col-lg-7">
              <img
                src={heroImage}
                alt="Tiny Room"
                className="img-fluid hero-image"
              />
            </div> */}

                    </div>
                </div>
                {/* <div className="features-wrapper">
                    <div className="row g-2 g-lg-5 align-items-center">

                        <div className="col-lg-4 col-md-4">
                            <div className="feature-item">
                                <div className="feature-icon" style={{ backgroundColor: "#daf2ef" }}>
                                    <Tag size={50} strokeWidth={2} />
                                </div>

                                <div className="feature-content">
                                    <h5>Affordable Living</h5>
                                    <p>Great spaces at prices that make sense.</p>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-4 col-md-4">
                            <div className="feature-item">
                                <div className="feature-icon" style={{ backgroundColor: "#fdedd0" }}>
                                    <ShieldCheck size={50} strokeWidth={2} />
                                </div>

                                <div className="feature-content">
                                    <h5>Safe & Trusted</h5>
                                    <p>Verified listings and secure connections.</p>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-4 col-md-4">
                            <div className="feature-item" >
                                <div className="feature-icon" style={{ backgroundColor: "#dbf2f0" }}>
                                    <Heart size={50} strokeWidth={2} />
                                </div>

                                <div className="feature-content">
                                    <h5>Built for You</h5>
                                    <p>Perfect for students, travelers & minimalists.</p>
                                </div>
                            </div>
                        </div>

                    </div>
                </div> */}
            </div>
        </section>
    );
};

export default Hero;