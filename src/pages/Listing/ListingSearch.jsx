import { useState } from "react";
import {
    MapPin,
    DollarSign,
    CalendarDays,
    BedSingle,
    BadgeCheck,
    Search, ChevronDown, SlidersHorizontal, X
} from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const ListingSearch = () => {
    const [searchData, setSearchData] = useState({
        location: "",
        budget: "",
        moveInDate: null,
        roomType: "",
        utilities: "",
    });

    const locations = [
        "Portland, OR",
        "New York, NY",
        "Los Angeles, CA",
        "Seattle, WA",
    ];

    const budgets = [
        "$0 - $1,500",
        "$1,500 - $2,500",
        "$2,500 - $4,000",
        "$4,000+",
    ];

    const roomTypes = [
        "Private Room",
        "Studio / Loft",
        "Guest Suite",
        "Tiny Home",
        "Shared Space",
    ];

    const utilitiesOptions = [
        "Utilities Included",
        "Utilities Not Included",
    ];

    const handleChange = (e) => {
        setSearchData({
            ...searchData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSearch = () => {
        console.log(searchData);


    };

    return (
        <div className="container">
            <h1 className="search_heading">
                Browse Tiny Rooms & Small Spaces
            </h1>
            <p>Find the perfect space that fits your lifestyle and budget. </p>
            <div className="listing-search d-none d-lg-block">
                <div className="row g-3 align-items-center">

                    {/* Location */}

                    <div className="col-xl col-lg-6">

                        <div className="search-field">

                            <MapPin size={18} />

                            <select
                                className="form-select"
                                name="location"
                                value={searchData.location}
                                onChange={handleChange}
                            >
                                <option value="">Location</option>

                                {locations.map((item) => (
                                    <option key={item} value={item}>
                                        {item}
                                    </option>
                                ))}

                            </select>

                            <ChevronDown size={18} className="select-arrow" />

                        </div>

                    </div>

                    {/* Budget */}

                    <div className="col-xl col-lg-6">

                        <div className="search-field">

                            <DollarSign size={18} />

                            <select
                                className="form-select"
                                name="budget"
                                value={searchData.budget}
                                onChange={handleChange}
                            >
                                <option value="">Budget</option>

                                {budgets.map((item) => (
                                    <option key={item} value={item}>
                                        {item}
                                    </option>
                                ))}

                            </select>
                            <ChevronDown size={18} className="select-arrow" />
                        </div>

                    </div>

                    {/* Date */}

                    <div className="col-xl col-lg-6">

                        <div className="search-field">

                            <CalendarDays size={18} />
                            <DatePicker
                                selected={searchData.moveInDate}
                                onChange={(date) =>
                                    setSearchData({
                                        ...searchData,
                                        moveInDate: date,
                                    })
                                }
                                placeholderText="Move In Date"
                                className="form-control"
                                dateFormat="dd/MM/yyyy"
                            />
                        </div>

                    </div>

                    {/* Room */}

                    <div className="col-xl col-lg-6">

                        <div className="search-field">

                            <BedSingle size={18} />

                            <select
                                className="form-select"
                                name="roomType"
                                value={searchData.roomType}
                                onChange={handleChange}
                            >
                                <option value="">Room Type</option>

                                {roomTypes.map((item) => (
                                    <option key={item} value={item}>
                                        {item}
                                    </option>
                                ))}

                            </select>
                            <ChevronDown size={18} className="select-arrow" />

                        </div>

                    </div>

                    {/* Utilities */}

                    <div className="col-xl col-lg-6">

                        <div className="search-field">

                            <BadgeCheck size={18} />

                            <select
                                className="form-select"
                                name="utilities"
                                value={searchData.utilities}
                                onChange={handleChange}
                            >
                                <option value="">Utilities</option>

                                {utilitiesOptions.map((item) => (
                                    <option key={item} value={item}>
                                        {item}
                                    </option>
                                ))}

                            </select>
                            <ChevronDown size={18} className="select-arrow" />
                        </div>

                    </div>

                    {/* Button */}

                    <div className="col-xl-auto col-lg-12">

                        <button
                            className="btn search-btn w-100"
                            onClick={handleSearch}
                        >
                            <Search size={18} />

                            Search

                        </button>

                    </div>

                </div>
                {/* Mobile Filter Button */}

                <div className="mobile-filter-btn d-lg-none">

                    <button
                        className="btn btn-filter"
                        data-bs-toggle="offcanvas"
                        data-bs-target="#mobileFilter"
                    >

                        <SlidersHorizontal size={18} />

                        Filter Properties

                    </button>

                </div>

            </div>
            {/* Mobile Floating Filter Button */}

            <div className="mobile-filter-btn d-lg-none">

                <button
                    className="floating-circle-btn"
                    data-bs-toggle="offcanvas"
                    data-bs-target="#mobileFilter"
                >
                    <SlidersHorizontal size={22} /> Filter
                </button>

            </div>
            <div
                className="offcanvas offcanvas-bottom mobile-filter-offcanvas"
                tabIndex="-1"
                id="mobileFilter"
            >

                <div className="offcanvas-header">

                    <h5>Filter Properties</h5>

                    <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="offcanvas"
                    ></button>

                </div>

                <div className="offcanvas-body">

                    <div className="row g-3">

                        {/* Location */}

                        <div className="col-12">

                            <div className="search-field">

                                <MapPin size={18} />

                                <select
                                    className="form-select"
                                    name="location"
                                    value={searchData.location}
                                    onChange={handleChange}
                                >

                                    <option value="">Location</option>

                                    {locations.map((item) => (

                                        <option key={item} value={item}>
                                            {item}
                                        </option>

                                    ))}

                                </select>

                                <ChevronDown className="select-arrow" />

                            </div>

                        </div>

                        {/* Budget */}

                        <div className="col-6">

                            <div className="search-field">

                                <DollarSign size={18} />

                                <select
                                    className="form-select"
                                    name="budget"
                                    value={searchData.budget}
                                    onChange={handleChange}
                                >

                                    <option value="">Budget</option>

                                    {budgets.map((item) => (

                                        <option key={item} value={item}>
                                            {item}
                                        </option>

                                    ))}

                                </select>

                                <ChevronDown className="select-arrow" />

                            </div>

                        </div>

                        {/* Room */}

                        <div className="col-6">

                            <div className="search-field">

                                <BedSingle size={18} />

                                <select
                                    className="form-select"
                                    name="roomType"
                                    value={searchData.roomType}
                                    onChange={handleChange}
                                >

                                    <option value="">Room Type</option>

                                    {roomTypes.map((item) => (

                                        <option key={item} value={item}>
                                            {item}
                                        </option>

                                    ))}

                                </select>

                                <ChevronDown className="select-arrow" />

                            </div>

                        </div>

                        {/* Date */}

                        <div className="col-6">

                            <div className="search-field">

                                <CalendarDays size={18} />

                                <DatePicker
                                    selected={searchData.moveInDate}
                                    onChange={(date) =>
                                        setSearchData({
                                            ...searchData,
                                            moveInDate: date,
                                        })
                                    }
                                    placeholderText="Move In Date"
                                    className="form-control"
                                    popperPlacement="top-start"
                                />

                            </div>

                        </div>

                        {/* Utilities */}

                        <div className="col-6">

                            <div className="search-field">

                                <BadgeCheck size={18} />

                                <select
                                    className="form-select"
                                    name="utilities"
                                    value={searchData.utilities}
                                    onChange={handleChange}
                                >

                                    <option value="">Utilities</option>

                                    {utilitiesOptions.map((item) => (

                                        <option key={item} value={item}>
                                            {item}
                                        </option>

                                    ))}

                                </select>

                                <ChevronDown className="select-arrow" />

                            </div>

                        </div>

                    </div>

                    <div className="filter-footer">

                        <button
                            className="btn btn-clear"
                        >
                            Clear All
                        </button>

                        <button
                            className="btn search-btn"
                            onClick={handleSearch}
                            data-bs-dismiss="offcanvas"
                        >
                            Apply Filters
                        </button>

                    </div>

                </div>

            </div>

        </div>

    );
};

export default ListingSearch;