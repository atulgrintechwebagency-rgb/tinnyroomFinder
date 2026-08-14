import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Hero.css";

import {
    MapPin,
    CalendarDays,
    ChevronDown,
    Tag,
} from "lucide-react";

const Hero = () => {

    const navigate = useNavigate();

    const [activeTab, setActiveTab] = useState("rooms");

    const [moveInDate, setMoveInDate] = useState(null);

    const [location, setLocation] = useState("");

    const [budget, setBudget] = useState("");

    /*------SEARCH------------*/

    const handleSearch = () => {

        const params = new URLSearchParams();


        /*|------ LOCATION|-------------*/

        if (location.trim()) {

            params.set(
                "location",
                location.trim()
            );

        }


        /*-------- MOVE-IN DATE--------------*/

        if (moveInDate) {

            const year =
                moveInDate.getFullYear();

            const month =
                String(
                    moveInDate.getMonth() + 1
                ).padStart(2, "0");

            const day =
                String(
                    moveInDate.getDate()
                ).padStart(2, "0");


            params.set(
                "moveInDate",
                `${year}-${month}-${day}`
            );

        }


        /*--------- BUDGET-------*/

        if (budget === "500") {

            params.set(
                "minRent",
                "0"
            );

            params.set(
                "maxRent",
                "500"
            );

        }


        if (budget === "1000") {

            params.set(
                "minRent",
                "500"
            );

            params.set(
                "maxRent",
                "1000"
            );

        }


        if (budget === "1500") {

            params.set(
                "minRent",
                "1000"
            );

            params.set(
                "maxRent",
                "1500"
            );

        }


        if (budget === "2000") {

            params.set(
                "minRent",
                "1500"
            );

            params.set(
                "maxRent",
                "2000"
            );

        }


        if (budget === "2000+") {

            params.set(
                "minRent",
                "2000"
            );

        }

        /*|----- FINAL URL-- */

        const queryString =
            params.toString();


        console.log(
            "Hero Search URL:",
            queryString
                ? `/all-listing?${queryString}`
                : "/all-listing"
        );


        navigate(
            queryString
                ? `/all-listing?${queryString}`
                : "/all-listing"
        );

    };


    return (

        <section className="hero-section py-3 py-md-5">

            <div className="container">

                <div className="hero-wrapper">

                    <div className="row align-items-left g-0">

                        <div className="col-lg-12">

                            <div className="hero-content py-3 py-md-3">

                                <h1>

                                    Find Small Spaces. <br />

                                    <span>
                                        Live Smart.
                                    </span>

                                </h1>


                                <p>

                                    Affordable tiny rooms, lofts,
                                    micro-apartments, guest suites,
                                    and compact living options-perfect
                                    for your lifestyle and budget.

                                </p>

                            </div>


                            <div className="search-wrapper">


                                {/* === TABS=== */}

                                <div className="room-tabs">


                                    <button
                                        type="button"
                                        className={`tab-btn ${activeTab === "rooms"
                                            ? "active"
                                            : ""
                                            }`}
                                        onClick={() =>
                                            setActiveTab("rooms")
                                        }
                                    >

                                        Rooms

                                    </button>


                                    <button
                                        type="button"
                                        className={`tab-btn ${activeTab === "tiny"
                                            ? "active"
                                            : ""
                                            }`}
                                        onClick={() =>
                                            setActiveTab("tiny")
                                        }
                                    >

                                        Tiny Homes

                                    </button>
                                    <button
                                        type="button"
                                        className={`tab-btn ${activeTab === "shared"
                                            ? "active"
                                            : ""
                                            }`}
                                        onClick={() =>
                                            setActiveTab("shared")} > Shared Spaces

                                    </button>
                                </div>

                                {/* === SEARCH BOX=== */}

                                <div className="search-box">

                                    <div className="row g-3 align-items-center">


                                        {/* === LOCATION==== */}

                                        <div className="col-lg-4">

                                            <div className="input-icon">

                                                <MapPin
                                                    size={18}
                                                    className="left-icon"
                                                />


                                                <input
                                                    type="text"
                                                    placeholder="City, State or Zip"
                                                    value={location}
                                                    onChange={(e) =>
                                                        setLocation(
                                                            e.target.value
                                                        )
                                                    }
                                                />

                                            </div>

                                        </div>
                                        {/* ===== MOVE IN DATE======= */}

                                        <div className="col-lg-3">
                                            <div className="input-icon date-picker-box">
                                                <CalendarDays size={18} className="left-icon" />


                                                <DatePicker
                                                    selected={
                                                        moveInDate
                                                    }
                                                    onChange={(date) =>
                                                        setMoveInDate(
                                                            date
                                                        )
                                                    }
                                                    placeholderText="Move-in Date"
                                                    dateFormat="MMM dd, yyyy"
                                                    className="date-input"
                                                    minDate={
                                                        new Date()
                                                    }
                                                />
                                                <ChevronDown size={18} className="dropdown-icon" />
                                            </div>

                                        </div>


                                        {/* ======= BUDGET======== */}

                                        <div className="col-lg-2">
                                            <div className="select-box">

                                                <Tag size={18} className="left-icon" />
                                                <select value={budget} onChange={(e) =>
                                                    setBudget(
                                                        e.target.value)}  >
                                                    <option value="">   Budget  </option>
                                                    <option value="500">  $0 - $500 </option>
                                                    <option value="1000"> $500 - $1,000 </option>
                                                    <option value="1500">  $1,000 - $1,500 </option>
                                                    <option value="2000"> $1,500 - $2,000</option>
                                                    <option value="2000+">  $2,000+ </option>

                                                </select>
                                                <ChevronDown size={18} className="dropdown-icon" />
                                            </div>

                                        </div>


                                        {/* == SEARCH BUTTON====== */}

                                        <div className="col-lg-3">

                                            <button
                                                type="button"
                                                className="search-btn w-100"
                                                onClick={
                                                    handleSearch
                                                }
                                            >
                                                {activeTab ===
                                                    "rooms"
                                                    ? "Search Rooms"
                                                    : activeTab ===
                                                        "tiny"
                                                        ? "Search Tiny Homes"  : "Search Shared Spaces"}
                                            </button>

                                        </div>
                                        {/* =====POPULAR SEARCHES=== */}

                                        <div className="popular-searches">

                                            <span className="title">
                                                Popular searches:

                                            </span>

                                            {/* UNDER $1,000 */}

                                            <button
                                                type="button"
                                                onClick={() => {

                                                    setLocation("");

                                                    setBudget(
                                                        "1000"
                                                    ); setMoveInDate( null ); }}> Under $1,000
                                            </button>


                                            {/* NEAR ME */}

                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setLocation("");
                                                    setBudget("");
                                                    setMoveInDate(
                                                        null
                                                    ); }} >
                                                Near Me
                                            </button>

                                            {/* UTILITIES */}

                                            <button
                                                type="button"
                                                onClick={() => {

                                                    setBudget("");    }} >
                                                Utilities Included
                                            </button>

                                            {/* FURNISHED */}

                                            <button
                                                type="button"
                                                onClick={() => { setBudget(""); }} >
                                                Furnished
                                            </button>

                                            {/* SHORT TERM */}
                                            <button
                                                type="button" onClick={() => { setBudget("");  }}>
                                                Short Term
                                            </button>
                                        </div>

                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </section>

    );

};

export default Hero;