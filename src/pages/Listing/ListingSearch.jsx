import { useState } from "react";
import {
    MapPin,
    DollarSign,
    CalendarDays,
    BedSingle,
    BadgeCheck,
    Search,
    ChevronDown,
    SlidersHorizontal,
} from "lucide-react";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


const ListingSearch = ({ onSearch }) => {

    const [searchData, setSearchData] = useState({
        location: "",
        budget: "",
        moveInDate: null,
        roomType: "",
        utilities: "",
    });


    /*
    |--------------------------------------------------------------------------
    | Location
    |--------------------------------------------------------------------------
    | These values match the API data.
    */

    const locations = [
        "Chandigarh",
        "Sahibzada Ajit Singh Nagar",
        "Delhi",
        "Mumbai",
        "New York",
        "Los Angeles",
        "Seattle",
        "Portland",
        "Austin",
    ];


    /*
    |--------------------------------------------------------------------------
    | Budget
    |--------------------------------------------------------------------------
    | The value is kept in API-friendly format.
    */

    const budgets = [
        {
            label: "$100 - $500",
            minRent: 100,
            maxRent: 500,
        },
        {
            label: "$500 - $1,000",
            minRent: 500,
            maxRent: 1000,
        },
        {
            label: "$1,000 - $1,500",
            minRent: 1000,
            maxRent: 1500,
        },
        {
            label: "$1,500 - $2,000",
            minRent: 1500,
            maxRent: 2000,
        },
    ];


    /*
    |--------------------------------------------------------------------------
    | Room Types
    |--------------------------------------------------------------------------
    | IMPORTANT:
    | These values must match API values exactly.
    */

    const roomTypes = [
        "Private Room",
        "Studio/Loft",
        "Guest Suite",
        "Tiny Home",
        "Shared Space",
    ];


    /*
    |--------------------------------------------------------------------------
    | Utilities
    |--------------------------------------------------------------------------
    | API expects:
    |
    | 1 = Utilities Included
    | 0 = Utilities Not Included
    */

    const utilitiesOptions = [
        {
            label: "Utilities Included",
            value: "1",
        },
        {
            label: "Utilities Not Included",
            value: "0",
        },
    ];


    /*
    |--------------------------------------------------------------------------
    | Handle Select Change
    |--------------------------------------------------------------------------
    */

    const handleChange = (e) => {

        const { name, value } = e.target;

        setSearchData((previous) => ({
            ...previous,
            [name]: value,
        }));
    };


    /*
    |--------------------------------------------------------------------------
    | Date Change
    |--------------------------------------------------------------------------
    */

    const handleDateChange = (date) => {

        setSearchData((previous) => ({
            ...previous,
            moveInDate: date,
        }));
    };


    /*
    |--------------------------------------------------------------------------
    | Search
    |--------------------------------------------------------------------------
    */

    const handleSearch = () => {

        const selectedBudget = budgets.find(
            (budget) => budget.label === searchData.budget
        );


        const filters = {

            location: searchData.location || "",

            minRent: selectedBudget
                ? selectedBudget.minRent
                : "",

            maxRent: selectedBudget
                ? selectedBudget.maxRent
                : "",

            roomType: searchData.roomType || "",

            utilitiesIncluded:
                searchData.utilities !== ""
                    ? Number(searchData.utilities)
                    : "",

            moveInDate: searchData.moveInDate || null,
        };


        console.log("Applying filters:", filters);


        if (typeof onSearch === "function") {
            onSearch(filters);
        }
    };


    /*
    |--------------------------------------------------------------------------
    | Clear Filters
    |--------------------------------------------------------------------------
    */

    const handleClear = () => {

        const emptyFilters = {
            location: "",
            minRent: "",
            maxRent: "",
            roomType: "",
            utilitiesIncluded: "",
            moveInDate: null,
        };


        setSearchData({
            location: "",
            budget: "",
            moveInDate: null,
            roomType: "",
            utilities: "",
        });


        if (typeof onSearch === "function") {
            onSearch(emptyFilters);
        }
    };


    /*
    |--------------------------------------------------------------------------
    | Render
    |--------------------------------------------------------------------------
    */

    return (

        <div className="container">

            <h1 className="search_heading">
                Browse Tiny Rooms & Small Spaces
            </h1>

            <p>
                Find the perfect space that fits your lifestyle and budget.
            </p>


            {/* =========================================================
                DESKTOP SEARCH
            ========================================================== */}

            <div className="listing-search d-none d-lg-block">

                <div className="row g-3 align-items-center">


                    {/* =====================================================
                        LOCATION
                    ====================================================== */}

                    <div className="col-xl col-lg-6">

                        <div className="search-field">

                            <MapPin size={18} />

                            <select
                                className="form-select"
                                name="location"
                                value={searchData.location}
                                onChange={handleChange}
                            >

                                <option value="">
                                    Location
                                </option>

                                {locations.map((location) => (

                                    <option
                                        key={location}
                                        value={location}
                                    >
                                        {location}
                                    </option>

                                ))}

                            </select>

                            <ChevronDown
                                size={18}
                                className="select-arrow"
                            />

                        </div>

                    </div>


                    {/* =====================================================
                        BUDGET
                    ====================================================== */}

                    <div className="col-xl col-lg-6">

                        <div className="search-field">

                            <DollarSign size={18} />

                            <select
                                className="form-select"
                                name="budget"
                                value={searchData.budget}
                                onChange={handleChange}
                            >

                                <option value="">
                                    Budget
                                </option>

                                {budgets.map((budget) => (

                                    <option
                                        key={budget.label}
                                        value={budget.label}
                                    >
                                        {budget.label}
                                    </option>

                                ))}

                            </select>

                            <ChevronDown
                                size={18}
                                className="select-arrow"
                            />

                        </div>

                    </div>


                    {/* =====================================================
                        MOVE IN DATE
                    ====================================================== */}

                    <div className="col-xl col-lg-6">

                        <div className="search-field">

                            <CalendarDays size={18} />

                            <DatePicker
                                selected={searchData.moveInDate}
                                onChange={handleDateChange}
                                placeholderText="Move In Date"
                                className="form-control"
                                dateFormat="dd/MM/yyyy"
                                minDate={new Date()}
                            />

                        </div>

                    </div>


                    {/* =====================================================
                        ROOM TYPE
                    ====================================================== */}

                    <div className="col-xl col-lg-6">

                        <div className="search-field">

                            <BedSingle size={18} />

                            <select
                                className="form-select"
                                name="roomType"
                                value={searchData.roomType}
                                onChange={handleChange}
                            >

                                <option value="">
                                    Room Type
                                </option>

                                {roomTypes.map((roomType) => (

                                    <option
                                        key={roomType}
                                        value={roomType}
                                    >
                                        {roomType}
                                    </option>

                                ))}

                            </select>

                            <ChevronDown
                                size={18}
                                className="select-arrow"
                            />

                        </div>

                    </div>


                    {/* =====================================================
                        UTILITIES
                    ====================================================== */}

                    <div className="col-xl col-lg-6">

                        <div className="search-field">

                            <BadgeCheck size={18} />

                            <select
                                className="form-select"
                                name="utilities"
                                value={searchData.utilities}
                                onChange={handleChange}
                            >

                                <option value="">
                                    Utilities
                                </option>

                                {utilitiesOptions.map((utility) => (

                                    <option
                                        key={utility.value}
                                        value={utility.value}
                                    >
                                        {utility.label}
                                    </option>

                                ))}

                            </select>

                            <ChevronDown
                                size={18}
                                className="select-arrow"
                            />

                        </div>

                    </div>


                    {/* =====================================================
                        SEARCH BUTTON
                    ====================================================== */}

                    <div className="col-xl-auto col-lg-12">

                        <button
                            className="btn search-btn w-100"
                            onClick={handleSearch}
                            type="button"
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
                        type="button"
                    >

                        <SlidersHorizontal size={18} />

                        Filter Properties

                    </button>

                </div>

            </div>


            {/* =========================================================
                MOBILE FLOATING FILTER
            ========================================================== */}

            <div className="mobile-filter-btn d-lg-none">

                <button
                    className="floating-circle-btn"
                    data-bs-toggle="offcanvas"
                    data-bs-target="#mobileFilter"
                    type="button"
                >

                    <SlidersHorizontal size={22} />

                    Filter

                </button>

            </div>


            {/* =========================================================
                MOBILE OFFCANVAS
            ========================================================== */}

            <div
                className="offcanvas offcanvas-bottom mobile-filter-offcanvas"
                tabIndex="-1"
                id="mobileFilter"
            >

                <div className="offcanvas-header">

                    <h5>
                        Filter Properties
                    </h5>

                    <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="offcanvas"
                        aria-label="Close"
                    />

                </div>


                <div className="offcanvas-body">

                    <div className="row g-3">


                        {/* =================================================
                            LOCATION
                        ================================================== */}

                        <div className="col-12">

                            <div className="search-field">

                                <MapPin size={18} />

                                <select
                                    className="form-select"
                                    name="location"
                                    value={searchData.location}
                                    onChange={handleChange}
                                >

                                    <option value="">
                                        Location
                                    </option>

                                    {locations.map((location) => (

                                        <option
                                            key={location}
                                            value={location}
                                        >
                                            {location}
                                        </option>

                                    ))}

                                </select>

                                <ChevronDown
                                    size={18}
                                    className="select-arrow"
                                />

                            </div>

                        </div>


                        {/* =================================================
                            BUDGET
                        ================================================== */}

                        <div className="col-6">

                            <div className="search-field">

                                <DollarSign size={18} />

                                <select
                                    className="form-select"
                                    name="budget"
                                    value={searchData.budget}
                                    onChange={handleChange}
                                >

                                    <option value="">
                                        Budget
                                    </option>

                                    {budgets.map((budget) => (

                                        <option
                                            key={budget.label}
                                            value={budget.label}
                                        >
                                            {budget.label}
                                        </option>

                                    ))}

                                </select>

                                <ChevronDown
                                    size={18}
                                    className="select-arrow"
                                />

                            </div>

                        </div>


                        {/* =================================================
                            ROOM TYPE
                        ================================================== */}

                        <div className="col-6">

                            <div className="search-field">

                                <BedSingle size={18} />

                                <select
                                    className="form-select"
                                    name="roomType"
                                    value={searchData.roomType}
                                    onChange={handleChange}
                                >

                                    <option value="">
                                        Room Type
                                    </option>

                                    {roomTypes.map((roomType) => (

                                        <option
                                            key={roomType}
                                            value={roomType}
                                        >
                                            {roomType}
                                        </option>

                                    ))}

                                </select>

                                <ChevronDown
                                    size={18}
                                    className="select-arrow"
                                />

                            </div>

                        </div>


                        {/* =================================================
                            DATE
                        ================================================== */}

                        <div className="col-6">

                            <div className="search-field">

                                <CalendarDays size={18} />

                                <DatePicker
                                    selected={searchData.moveInDate}
                                    onChange={handleDateChange}
                                    placeholderText="Move In Date"
                                    className="form-control"
                                    dateFormat="dd/MM/yyyy"
                                    minDate={new Date()}
                                    popperPlacement="top-start"
                                />

                            </div>

                        </div>


                        {/* =================================================
                            UTILITIES
                        ================================================== */}

                        <div className="col-6">

                            <div className="search-field">

                                <BadgeCheck size={18} />

                                <select
                                    className="form-select"
                                    name="utilities"
                                    value={searchData.utilities}
                                    onChange={handleChange}
                                >

                                    <option value="">
                                        Utilities
                                    </option>

                                    {utilitiesOptions.map((utility) => (

                                        <option
                                            key={utility.value}
                                            value={utility.value}
                                        >
                                            {utility.label}
                                        </option>

                                    ))}

                                </select>

                                <ChevronDown
                                    size={18}
                                    className="select-arrow"
                                />

                            </div>

                        </div>

                    </div>


                    {/* =====================================================
                        MOBILE FOOTER
                    ====================================================== */}

                    <div className="filter-footer">

                        <button
                            className="btn btn-clear"
                            type="button"
                            onClick={handleClear}
                        >
                            Clear All
                        </button>


                        <button
                            className="btn search-btn"
                            type="button"
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