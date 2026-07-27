import React, { useState } from "react";
import "./TinnyForm.css";
import {
    BedSingle,
    Building2,
    Home,
    Users,
    Building,
    CheckCircle,
    Check,
    MapPin,
    Calendar,
    DollarSign,
    Upload,
    Image as ImageIcon,
    ShieldCheck,
    ArrowRight,
    ArrowLeft,
    Save,
    Wifi,
    ParkingCircle,
    Laptop,
    Tv,
    Coffee,
    Dumbbell,
    Wind,
    Flame,
    PawPrint,
    Cigarette,
    Waves,
    Bath,
    Trees,
    DoorOpen,
    Microwave,
    Refrigerator,
    Zap,
    X,
    Globe,
    WashingMachine,
    VolumeX, FileText, Ban,
} from "lucide-react";
import "./ListTinySpace.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const ListTinySpace = () => {
    /* ------------------------------------------------------------
       STEPPER CONFIG
    ------------------------------------------------------------ */
    const STEPS = [
        "Property Type",
        "Address",
        "Photos",
        "Price",
        "Amenities",
        "Availability",
        "House Rules",
        "Review",
    ];

    /* ------------------------------------------------------------
       PROPERTY TYPE OPTIONS
    ------------------------------------------------------------ */
    const PROPERTY_TYPES = [
        {
            id: "private-room",
            title: "Private Room",
            description: "A private room inside a larger home",
            icon: BedSingle,
        },
        {
            id: "studio-loft",
            title: "Studio / Loft",
            description: "An open-concept standalone studio",
            icon: Building2,
        },
        {
            id: "guest-suite",
            title: "Guest Suite",
            description: "A self-contained suite with its own entrance",
            icon: Home,
        },
        {
            id: "tiny-home",
            title: "Tiny Home",
            description: "A compact, fully independent tiny house",
            icon: Building,
        },
        {
            id: "shared-space",
            title: "Shared Space",
            description: "A space shared with the host or other guests",
            icon: Users,
        },
    ];

    /* ------------------------------------------------------------
       SPACE INCLUDES OPTIONS
    ------------------------------------------------------------ */
    const SPACE_INCLUDES_OPTIONS = [
        "Private Bedroom",
        "Private Bathroom",
        "Private Entrance",
        "Kitchen Access",
        "Dedicated Workspace",
        "Parking",
    ];

    /* ------------------------------------------------------------
       ACCESS OPTIONS
    ------------------------------------------------------------ */
    const ACCESS_OPTIONS = [
        {
            value: "entire-space",
            label: "Renters will have entire space to themselves",
        },
        { value: "shared-spaces", label: "Shared spaces" },
        { value: "shared-bedroom", label: "Shared bedroom" },
    ];

    /* ------------------------------------------------------------
       AMENITIES (≈20 items)
    ------------------------------------------------------------ */
    const AMENITIES_LIST = [
        { id: "wifi", label: "Wifi", icon: Wifi },
        { id: "kitchen", label: "Kitchen", icon: Coffee },
        { id: "tv", label: "TV", icon: Tv },
        { id: "ac", label: "Air Conditioning", icon: Wind },
        { id: "heating", label: "Heating", icon: Flame },
        { id: "parking", label: "Parking", icon: ParkingCircle },
        { id: "washer", label: "Washer", icon: WashingMachine },
        { id: "dryer", label: "Dryer", icon: WashingMachine },
        { id: "pets", label: "Pets Allowed", icon: PawPrint },
        { id: "smoking", label: "Smoking Allowed", icon: Cigarette },
        { id: "workspace", label: "Workspace", icon: Laptop },
        { id: "pool", label: "Pool", icon: Waves },
        { id: "hottub", label: "Hot Tub", icon: Bath },
        { id: "gym", label: "Gym", icon: Dumbbell },
        { id: "garden", label: "Garden", icon: Trees },
        { id: "balcony", label: "Balcony", icon: DoorOpen },
        { id: "coffeemaker", label: "Coffee Maker", icon: Coffee },
        { id: "microwave", label: "Microwave", icon: Microwave },
        { id: "refrigerator", label: "Refrigerator", icon: Refrigerator },
        { id: "fastinternet", label: "Fast Internet", icon: Zap },
    ];

    /* ------------------------------------------------------------
       AVAILABLE DAYS
    ------------------------------------------------------------ */
    const WEEK_DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

    /* ------------------------------------------------------------
       CURRENCY OPTIONS
    ------------------------------------------------------------ */
    const CURRENCIES = ["USD", "EUR", "GBP", "INR", "CAD", "AUD"];

    /* ------------------------------------------------------------
       STATE — current step
    ------------------------------------------------------------ */
    const [currentStep, setCurrentStep] = useState(1);

    /* ------------------------------------------------------------
       STATE — single form data object (per brief requirement)
    ------------------------------------------------------------ */
    const [formData, setFormData] = useState({
        propertyType: "",
        spaceIncludes: [],
        access: "",
        address: {
            street: "",
            apartment: "",
            city: "",
            state: "",
            zip: "",
            country: "",
        },
        photos: [],
        price: {
            nightly: "",
            weekly: "",
            monthly: "",
            cleaningFee: "",
            securityDeposit: "",
            currency: "USD",
        },
        amenities: [],
        availability: {
            startDate: "",
            endDate: "",
            minStay: "",
            maxStay: "",
            instantBooking: false,
            availableDays: [],
        },
        houseRules: {
            noSmoking: false,
            noPets: false,
            noParties: false,
            quietHours: false,
            customRules: "",
        },
    });

    /* ------------------------------------------------------------
       STATE — validation errors (UI concern, kept separate)
    ------------------------------------------------------------ */
    const [errors, setErrors] = useState({});

    /* ------------------------------------------------------------
       GENERIC FIELD UPDATE HELPERS
    ------------------------------------------------------------ */
    const updateField = (field, value) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const updateNestedField = (section, field, value) => {
        setFormData((prev) => ({
            ...prev,
            [section]: { ...prev[section], [field]: value },
        }));
    };

    const toggleArrayValue = (field, value) => {
        setFormData((prev) => {
            const list = prev[field];
            const exists = list.includes(value);
            return {
                ...prev,
                [field]: exists ? list.filter((v) => v !== value) : [...list, value],
            };
        });
    };

    const toggleNestedArrayValue = (section, field, value) => {
        setFormData((prev) => {
            const list = prev[section][field];
            const exists = list.includes(value);
            return {
                ...prev,
                [section]: {
                    ...prev[section],
                    [field]: exists ? list.filter((v) => v !== value) : [...list, value],
                },
            };
        });
    };

    //  validation Step
    const validateStep = (step) => {
        const newErrors = {};

        if (step === 1) {
            if (!formData.propertyType) newErrors.propertyType = "Please select a property type.";
            if (!formData.access) newErrors.access = "Please choose who will have access.";
        }

        if (step === 2) {
            const { street, city, state, zip, country } = formData.address;
            if (!street.trim()) newErrors.street = "Street address is required.";
            if (!city.trim()) newErrors.city = "City is required.";
            if (!state.trim()) newErrors.state = "State is required.";
            if (!zip.trim()) newErrors.zip = "Zip code is required.";
            if (!country.trim()) newErrors.country = "Country is required.";
        }

        if (step === 4) {
            if (!formData.price.nightly) newErrors.nightly = "Nightly price is required.";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    /* ------------------------------------------------------------
       NAVIGATION
    ------------------------------------------------------------ */
    const goNext = () => {
        if (!validateStep(currentStep)) return;
        setCurrentStep((prev) => Math.min(prev + 1, STEPS.length));
    };

    const goPrev = () => {
        setErrors({});
        setCurrentStep((prev) => Math.max(prev - 1, 1));
    };

    const goToStep = (stepNumber) => {
        // Allow free navigation only to already-visited (completed) steps
        if (stepNumber < currentStep) {
            setErrors({});
            setCurrentStep(stepNumber);
        }
    };

    /* ------------------------------------------------------------
       PHOTOS — upload / remove
    ------------------------------------------------------------ */
    const MAX_PHOTOS = 12;

    const handlePhotoUpload = (fileList) => {
        const files = Array.from(fileList).slice(0, MAX_PHOTOS - formData.photos.length);
        const newPhotos = files.map((file) => ({
            id: `${file.name}-${Date.now()}-${Math.random().toString(16).slice(2)}`,
            url: URL.createObjectURL(file),
            name: file.name,
        }));
        setFormData((prev) => ({ ...prev, photos: [...prev.photos, ...newPhotos] }));
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.currentTarget.classList.remove("ltns-dropzone--active");
        if (e.dataTransfer.files?.length) handlePhotoUpload(e.dataTransfer.files);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        e.currentTarget.classList.add("ltns-dropzone--active");
    };

    const handleDragLeave = (e) => {
        e.currentTarget.classList.remove("ltns-dropzone--active");
    };

    const removePhoto = (id) => {
        setFormData((prev) => ({
            ...prev,
            photos: prev.photos.filter((photo) => photo.id !== id),
        }));
    };

    /* ------------------------------------------------------------
       SUBMIT
    ------------------------------------------------------------ */
    const handleSubmit = () => {
        if (!validateStep(currentStep)) return;
        // In a production app this would POST formData to an API.
        console.log("Submitting listing:", formData);
        alert("Listing submitted successfully!");
    };

    const handleSaveDraft = () => {
        console.log("Draft saved:", formData);
        alert("Draft saved!");
    };

    /* ============================================================
       RENDER
       ============================================================ */
    return (
        <div className="ltns-wrapper">
            <div className="ltns-card">
                {/* ---------------------------------------------------
              TOP STEPPER
          --------------------------------------------------- */}
                <div className="ltns-stepper-scroll">
                    <ol className="ltns-stepper">
                        {STEPS.map((label, index) => {
                            const stepNumber = index + 1;
                            const isCompleted = stepNumber < currentStep;
                            const isActive = stepNumber === currentStep;

                            return (
                                <li
                                    key={label}
                                    className={`ltns-step ${isActive ? "ltns-step--active" : ""} ${isCompleted ? "ltns-step--completed" : ""
                                        }`}
                                    onClick={() => goToStep(stepNumber)}
                                >
                                    <div className="ltns-step__circle">
                                        {isCompleted ? <Check size={16} /> : stepNumber}
                                    </div>
                                    <span className="ltns-step__title">{label}</span>
                                    {stepNumber !== STEPS.length && <span className="ltns-step__line" />}
                                </li>
                            );
                        })}
                    </ol>
                </div>

                <div className="step_card_wrapper">

                    {/* ---------------------------------------------------
                STEP 1 — PROPERTY TYPE
            --------------------------------------------------- */}
                    {currentStep === 1 && (
                        <div className="ltns-step-panel">
                            <h2 className="ltns-title">What type of space are you listing?</h2>
                            <p className="ltns-subtitle">Choose the option that best describes your space.</p>

                            <div className="main_card g-3 mb-4">
                                {PROPERTY_TYPES.map((type) => {
                                    const Icon = type.icon;
                                    const isSelected = formData.propertyType === type.id;
                                    return (
                                        <div className="ltns_card" key={type.id}>
                                            <div
                                                className={`ltns-option-card ${isSelected ? "ltns-option-card--selected" : ""}`}
                                                onClick={() => updateField("propertyType", type.id)}
                                                role="button"
                                                tabIndex={0}
                                            >
                                                {isSelected && (
                                                    <span className="ltns-option-card__check">
                                                        <CheckCircle size={18} />
                                                    </span>
                                                )}
                                                <div className="ltns-option-card__icon">
                                                    <Icon size={24} />
                                                </div>
                                                <h6 className="ltns-option-card__title">{type.title}</h6>
                                                <p className="ltns-option-card__desc">{type.description}</p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                            {errors.propertyType && (
                                <div className="ltns-error mb-3">{errors.propertyType}</div>
                            )}


                            <div className="row g-3 mb-4">
                                <div className="col-md-6">

                                    <div className="left_option">
                                        <h4>What's included in your space? </h4>
                                        <h6 className="ltns-section-label">Select all that apply.</h6>
                                        <div className="check">
                                            {SPACE_INCLUDES_OPTIONS.map((item) => (
                                                <div className="form-check ltns-checkbox" key={item}>
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        id={`include-${item}`}
                                                        checked={formData.spaceIncludes.includes(item)}
                                                        onChange={() => toggleArrayValue("spaceIncludes", item)}
                                                    />
                                                    <label className="form-check-label" htmlFor={`include-${item}`}>
                                                        {item}
                                                    </label>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="right_space">
                                        <h4>Who will have access? </h4>
                                        <h6 className="ltns-section-label">Select all that apply.</h6>

                                        <div className="checkoption_right">
                                            {ACCESS_OPTIONS.map((option) => (
                                                <div className="form-check ltns-radio" key={option.value}>
                                                    <input
                                                        className="form-check-input"
                                                        type="radio"
                                                        name="access"
                                                        id={`access-${option.value}`}
                                                        checked={formData.access === option.value}
                                                        onChange={() => updateField("access", option.value)}
                                                    />
                                                    <label className="form-check-label" htmlFor={`access-${option.value}`}>
                                                        {option.label}
                                                    </label>
                                                </div>
                                            ))}
                                        </div>
                                        {errors.access && <div className="ltns-error">{errors.access}</div>}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* ---------------------------------------------------
                STEP 2 — ADDRESS
            --------------------------------------------------- */}
                    {currentStep === 2 && (
                        <div className="ltns-step-panel">
                            <h2 className="ltns-title">Where is your space located?</h2>
                            <p className="ltns-subtitle">Guests will only get your exact address after booking.</p>

                            <div className="row g-3">
                                <div className="col-12">
                                    <label className="form-label ltns-label">Street Address</label>
                                    <input
                                        type="text"
                                        className={`form-control ltns-input ${errors.street ? "is-invalid" : ""}`}
                                        placeholder="123 Maple Street"
                                        value={formData.address.street}
                                        onChange={(e) => updateNestedField("address", "street", e.target.value)}
                                    />
                                    {errors.street && <div className="invalid-feedback">{errors.street}</div>}
                                </div>

                                <div className="col-12">
                                    <label className="form-label ltns-label">Apartment / Suite (optional)</label>
                                    <input
                                        type="text"
                                        className="form-control ltns-input"
                                        placeholder="Apt, suite, unit"
                                        value={formData.address.apartment}
                                        onChange={(e) => updateNestedField("address", "apartment", e.target.value)}
                                    />
                                </div>

                                <div className="col-12 col-md-6">
                                    <label className="form-label ltns-label">City</label>
                                    <input
                                        type="text"
                                        className={`form-control ltns-input ${errors.city ? "is-invalid" : ""}`}
                                        placeholder="City"
                                        value={formData.address.city}
                                        onChange={(e) => updateNestedField("address", "city", e.target.value)}
                                    />
                                    {errors.city && <div className="invalid-feedback">{errors.city}</div>}
                                </div>

                                <div className="col-12 col-md-6">
                                    <label className="form-label ltns-label">State</label>
                                    <input
                                        type="text"
                                        className={`form-control ltns-input ${errors.state ? "is-invalid" : ""}`}
                                        placeholder="State"
                                        value={formData.address.state}
                                        onChange={(e) => updateNestedField("address", "state", e.target.value)}
                                    />
                                    {errors.state && <div className="invalid-feedback">{errors.state}</div>}
                                </div>

                                <div className="col-12 col-md-6">
                                    <label className="form-label ltns-label">Zip Code</label>
                                    <input
                                        type="text"
                                        className={`form-control ltns-input ${errors.zip ? "is-invalid" : ""}`}
                                        placeholder="Zip Code"
                                        value={formData.address.zip}
                                        onChange={(e) => updateNestedField("address", "zip", e.target.value)}
                                    />
                                    {errors.zip && <div className="invalid-feedback">{errors.zip}</div>}
                                </div>

                                <div className="col-12 col-md-6">
                                    <label className="form-label ltns-label">Country</label>
                                    <input
                                        type="text"
                                        className={`form-control ltns-input ${errors.country ? "is-invalid" : ""}`}
                                        placeholder="Country"
                                        value={formData.address.country}
                                        onChange={(e) => updateNestedField("address", "country", e.target.value)}
                                    />
                                    {errors.country && <div className="invalid-feedback">{errors.country}</div>}
                                </div>
                            </div>

                            {/* <div className="ltns-map-placeholder mt-4">
                                <MapPin size={28} />
                                <p>Map preview will appear here once the address is complete</p>
                            </div> */}
                        </div>
                    )}

                    {/* ---------------------------------------------------
                STEP 3 — PHOTOS
            --------------------------------------------------- */}
                    {currentStep === 3 && (
                        <div className="ltns-step-panel">
                            <h2 className="ltns-title">Add some photos of your space</h2>
                            <p className="ltns-subtitle">Upload at least a few photos to help guests picture your place.</p>

                            <div
                                className="ltns-dropzone"
                                onDrop={handleDrop}
                                onDragOver={handleDragOver}
                                onDragLeave={handleDragLeave}
                                onClick={() => document.getElementById("ltns-file-input").click()}
                                role="button"
                                tabIndex={0}
                            >
                                <Upload size={30} />
                                <h6>Drag and drop your photos here</h6>
                                <p>or click to browse from your device</p>
                                <button type="button" className="btn ltns-btn-outline mt-2">
                                    <ImageIcon size={16} className="me-2" />
                                    Browse Files
                                </button>
                                <input
                                    id="ltns-file-input"
                                    type="file"
                                    accept="image/*"
                                    multiple
                                    hidden
                                    onChange={(e) => handlePhotoUpload(e.target.files)}
                                />
                            </div>

                            <div className="d-flex justify-content-between align-items-center mt-3 mb-2">
                                <span className="ltns-section-label mb-0">Preview</span>
                                <span className="ltns-photo-count">
                                    {formData.photos.length} / {MAX_PHOTOS} photos
                                </span>
                            </div>

                            <div className="row g-3">
                                <div className="photo_grid">
                                    {formData.photos.map((photo) => (
                                        <div className="ltns-photo-card" key={photo.id}>
                                            <img src={photo.url} alt={photo.name} />
                                            <button
                                                type="button"
                                                className="ltns-photo-remove"
                                                onClick={() => removePhoto(photo.id)}
                                                aria-label="Remove photo"
                                            >
                                                <X size={14} />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* ---------------------------------------------------
                STEP 4 — PRICE
            --------------------------------------------------- */}
                    {currentStep === 4 && (
                        <div className="ltns-step-panel">
                            <h2 className="ltns-title">Set your pricing</h2>
                            <p className="ltns-subtitle">You can always change this later.</p>

                            <div className="row g-3">
                                <div className="col-12 col-md-4">
                                    <label className="form-label ltns-label">Currency</label>
                                    <select
                                        className="form-select ltns-input"
                                        value={formData.price.currency}
                                        onChange={(e) => updateNestedField("price", "currency", e.target.value)}
                                    >
                                        {CURRENCIES.map((currency) => (
                                            <option key={currency} value={currency}>
                                                {currency}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="col-12 col-md-4">
                                    <label className="form-label ltns-label">Nightly Price</label>
                                    <div className="input-group">
                                        <span className="input-group-text ltns-input-icon">
                                            <DollarSign size={16} />
                                        </span>
                                        <input
                                            type="number"
                                            className={`form-control ltns-input ${errors.nightly ? "is-invalid" : ""}`}
                                            placeholder="0.00"
                                            value={formData.price.nightly}
                                            onChange={(e) => updateNestedField("price", "nightly", e.target.value)}
                                        />
                                    </div>
                                    {errors.nightly && <div className="ltns-error">{errors.nightly}</div>}
                                </div>

                                <div className="col-12 col-md-4">
                                    <label className="form-label ltns-label">Weekly Price</label>
                                    <div className="input-group">
                                        <span className="input-group-text ltns-input-icon">
                                            <DollarSign size={16} />
                                        </span>
                                        <input
                                            type="number"
                                            className="form-control ltns-input"
                                            placeholder="0.00"
                                            value={formData.price.weekly}
                                            onChange={(e) => updateNestedField("price", "weekly", e.target.value)}
                                        />
                                    </div>
                                </div>

                                <div className="col-12 col-md-4">
                                    <label className="form-label ltns-label">Monthly Price</label>
                                    <div className="input-group">
                                        <span className="input-group-text ltns-input-icon">
                                            <DollarSign size={16} />
                                        </span>
                                        <input
                                            type="number"
                                            className="form-control ltns-input"
                                            placeholder="0.00"
                                            value={formData.price.monthly}
                                            onChange={(e) => updateNestedField("price", "monthly", e.target.value)}
                                        />
                                    </div>
                                </div>

                                <div className="col-12 col-md-4">
                                    <label className="form-label ltns-label">Cleaning Fee</label>
                                    <div className="input-group">
                                        <span className="input-group-text ltns-input-icon">
                                            <DollarSign size={16} />
                                        </span>
                                        <input
                                            type="number"
                                            className="form-control ltns-input"
                                            placeholder="0.00"
                                            value={formData.price.cleaningFee}
                                            onChange={(e) => updateNestedField("price", "cleaningFee", e.target.value)}
                                        />
                                    </div>
                                </div>

                                <div className="col-12 col-md-4">
                                    <label className="form-label ltns-label">Security Deposit</label>
                                    <div className="input-group">
                                        <span className="input-group-text ltns-input-icon">
                                            <DollarSign size={16} />
                                        </span>
                                        <input
                                            type="number"
                                            className="form-control ltns-input"
                                            placeholder="0.00"
                                            value={formData.price.securityDeposit}
                                            onChange={(e) =>
                                                updateNestedField("price", "securityDeposit", e.target.value)
                                            }
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* ---------------------------------------------------
                STEP 5 — AMENITIES
            --------------------------------------------------- */}
                    {currentStep === 5 && (
                        <div className="ltns-step-panel">
                            <h2 className="ltns-title">What amenities do you offer?</h2>
                            <p className="ltns-subtitle">Select everything that applies to your space.</p>

                            <div className="row g-2">
                                {AMENITIES_LIST.map((amenity) => {
                                    const Icon = amenity.icon;
                                    const isChecked = formData.amenities.includes(amenity.id);
                                    return (
                                        <div className="col-6 col-sm-4 col-lg-3" key={amenity.id}>
                                            <div
                                                className={`ltns-amenity-card ${isChecked ? "ltns-amenity-card--selected" : ""}`}
                                                onClick={() => toggleArrayValue("amenities", amenity.id)}
                                                role="button"
                                                tabIndex={0}
                                            >
                                                <Icon size={18} />
                                                <span>{amenity.label}</span>
                                                {isChecked && <Check size={14} className="ltns-amenity-card__check" />}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}

                    {/* ---------------------------------------------------
                STEP 6 — AVAILABILITY
            --------------------------------------------------- */}
                    {currentStep === 6 && (
                        <div className="ltns-step-panel">
                            <h2 className="ltns-title">When is your space available?</h2>
                            <p className="ltns-subtitle">Set your availability window and stay requirements.</p>

                            <div className="row g-3 mb-4">
                                <div className="col-12 col-md-6">
                                    <label className="form-label ltns-label">
                                    <Calendar size={14} className="me-1" />
                                        Available From
                                    </label>
                                    <DatePicker
                                    selected={formData.availability.startDate}
                                    onChange={(date) =>
                                        updateNestedField("availability", "startDate", date)
                                    }
                                    className="form-control ltns-input"
                                    dateFormat="dd/MM/yyyy"
                                    placeholderText="Select Date" isClearable
                                    />
                                </div>
                                <div className="col-12 col-md-6">
                                    <label className="form-label ltns-label">
                                        <Calendar size={14} className="me-1" />
                                        Available Until
                                    </label>
                                <DatePicker
                                    selected={formData.availability.endDate}
                                    onChange={(date) =>
                                    updateNestedField("availability", "endDate", date)
                                    }
                                    minDate={formData.availability.startDate} // Prevent selecting a date before the start date
                                    className="form-control ltns-input"
                                    dateFormat="dd/MM/yyyy"
                                    placeholderText="Select End Date"
                                    isClearable
                                />
                                                                </div>

                                <div className="col-12 col-md-6">
                                    <label className="form-label ltns-label">Minimum Stay (nights)</label>
                                    <input
                                        type="number"
                                        min="1"
                                        className="form-control ltns-input"
                                        placeholder="e.g. 2"
                                        value={formData.availability.minStay}
                                        onChange={(e) => updateNestedField("availability", "minStay", e.target.value)}
                                    />
                                </div>
                                <div className="col-12 col-md-6">
                                    <label className="form-label ltns-label">Maximum Stay (nights)</label>
                                    <input
                                        type="number"
                                        min="1"
                                        className="form-control ltns-input"
                                        placeholder="e.g. 30"
                                        value={formData.availability.maxStay}
                                        onChange={(e) => updateNestedField("availability", "maxStay", e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="ltns-toggle-row mb-4">
                                <div>
                                    <h6 className="ltns-section-label mb-0">Instant Booking</h6>
                                    <p className="ltns-toggle-desc">Allow guests to book without approval</p>
                                </div>
                                <div
                                    className={`ltns-switch ${formData.availability.instantBooking ? "ltns-switch--on" : ""}`}
                                    onClick={() =>
                                        updateNestedField(
                                            "availability",
                                            "instantBooking",
                                            !formData.availability.instantBooking
                                        )
                                    }
                                    role="switch"
                                    aria-checked={formData.availability.instantBooking}
                                    tabIndex={0}
                                >
                                    <span className="ltns-switch__knob" />
                                </div>
                            </div>

                            <h6 className="ltns-section-label">Available Days</h6>
                            <div className="d-flex flex-wrap gap-2">
                                {WEEK_DAYS.map((day) => {
                                    const isSelected = formData.availability.availableDays.includes(day);
                                    return (
                                        <button
                                            type="button"
                                            key={day}
                                            className={`ltns-day-pill ${isSelected ? "ltns-day-pill--selected" : ""}`}
                                            onClick={() => toggleNestedArrayValue("availability", "availableDays", day)}
                                        >
                                            {day}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    )}

                    {/* ---------------------------------------------------
                STEP 7 — HOUSE RULES
            --------------------------------------------------- */}
                    {currentStep === 7 && (
                        <div className="ltns-step-panel">
                            <h2 className="ltns-title">Set your house rules</h2>
                            <p className="ltns-subtitle">Let guests know what to expect before they book.</p>

                            <div className="row g-3 mb-4">
                                {[
                                    { key: "noSmoking", label: "No Smoking", icon: Cigarette },
                                    { key: "noPets", label: "No Pets", icon: PawPrint },
                                    { key: "noParties", label: "No Parties", icon: Ban },
                                    { key: "quietHours", label: "Quiet Hours", icon: VolumeX },
                                ].map((rule) => {
                                    const Icon = rule.icon;
                                    return (
                                        <div className="col-12 col-sm-6" key={rule.key}>
                                            <div className="ltns-toggle-row ltns-toggle-row--card">
                                                <div className="d-flex align-items-center gap-2">
                                                    <Icon size={18} />
                                                    <span>{rule.label}</span>
                                                </div>
                                                <div
                                                    className={`ltns-switch ${formData.houseRules[rule.key] ? "ltns-switch--on" : ""}`}
                                                    onClick={() =>
                                                        updateNestedField("houseRules", rule.key, !formData.houseRules[rule.key])
                                                    }
                                                    role="switch"
                                                    aria-checked={formData.houseRules[rule.key]}
                                                    tabIndex={0}
                                                >
                                                    <span className="ltns-switch__knob" />
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            <label className="form-label ltns-label">
                                <FileText size={14} className="me-1" />
                                Custom Rules (optional)
                            </label>
                            <textarea
                                className="form-control ltns-input"
                                rows="4"
                                placeholder="Add any additional house rules for your guests..."
                                value={formData.houseRules.customRules}
                                onChange={(e) => updateNestedField("houseRules", "customRules", e.target.value)}
                            />
                        </div>
                    )}

                    {/* ------------\ STEP 8 — REVIEW ------------------- */}
                    {currentStep === 8 && (
                        <div className="ltns-step-panel">
                            <h2 className="ltns-title">Review your listing</h2>
                            <p className="ltns-subtitle">Take a final look before you publish.</p>

                            <div className="ltns-review-card mb-3">
                                <h6 className="ltns-review-card__heading">
                                    <Home size={16} className="me-2" />
                                    Property
                                </h6>
                                <p className="mb-1">
                                    <strong>Type:</strong>{" "}
                                    {PROPERTY_TYPES.find((t) => t.id === formData.propertyType)?.title || "—"}
                                </p>
                                <p className="mb-1">
                                    <strong>Includes:</strong>{" "}
                                    {formData.spaceIncludes.length ? formData.spaceIncludes.join(", ") : "—"}
                                </p>
                                <p className="mb-0">
                                    <strong>Access:</strong>{" "}
                                    {ACCESS_OPTIONS.find((a) => a.value === formData.access)?.label || "—"}
                                </p>
                            </div>

                            <div className="ltns-review-card mb-3">
                                <h6 className="ltns-review-card__heading">
                                    <MapPin size={16} className="me-2" />
                                    Address
                                </h6>
                                <p className="mb-0">
                                    {[
                                        formData.address.street,
                                        formData.address.apartment,
                                        formData.address.city,
                                        formData.address.state,
                                        formData.address.zip,
                                        formData.address.country,
                                    ]
                                        .filter(Boolean)
                                        .join(", ") || "—"}
                                </p>
                            </div>

                            <div className="ltns-review-card mb-3">
                                <h6 className="ltns-review-card__heading">
                                    <ImageIcon size={16} className="me-2" />
                                    Photos
                                </h6>
                                {formData.photos.length ? (
                                    <div className="row g-2">
                                        {formData.photos.map((photo) => (
                                            <div className="col-4 col-sm-3 col-lg-2" key={photo.id}>
                                                <img className="ltns-review-photo" src={photo.url} alt={photo.name} />
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="mb-0">No photos uploaded.</p>
                                )}
                            </div>

                            <div className="ltns-review-card mb-3">
                                <h6 className="ltns-review-card__heading">
                                    <DollarSign size={16} className="me-2" />
                                    Price
                                </h6>
                                <p className="mb-0">
                                    {formData.price.currency} {formData.price.nightly || "0"} / night
                                    {formData.price.weekly && ` · ${formData.price.weekly} / week`}
                                    {formData.price.monthly && ` · ${formData.price.monthly} / month`}
                                </p>
                            </div>

                            <div className="ltns-review-card mb-3">
                                <h6 className="ltns-review-card__heading">
                                    <ShieldCheck size={16} className="me-2" />
                                    Amenities
                                </h6>
                                {formData.amenities.length ? (
                                    <div className="d-flex flex-wrap gap-2">
                                        {formData.amenities.map((id) => {
                                            const amenity = AMENITIES_LIST.find((a) => a.id === id);
                                            return (
                                                <span className="ltns-badge" key={id}>
                                                    {amenity?.label}
                                                </span>
                                            );
                                        })}
                                    </div>
                                ) : (
                                    <p className="mb-0">No amenities selected.</p>
                                )}
                            </div>
                        </div>
                    )}

                    {/* ---------------- BOTTOM NAVIGATION ---------------- */}
                    <div className="ltns-footer">
                        {currentStep > 1 ? (
                            <button type="button" className="btn ltns-btn-outline" onClick={goPrev}>
                                <ArrowLeft size={16} className="me-2" />
                                Previous
                            </button>
                        ) : (
                            <button type="button" className="btn ltns-btn-outline" onClick={handleSaveDraft}>
                                <Save size={16} className="me-2" />
                                Save Draft
                            </button>
                        )}

                        {currentStep < STEPS.length ? (
                            <button type="button" className="btn ltns-btn-primary" onClick={goNext}>
                                Next {STEPS[currentStep]}
                                <ArrowRight size={16} className="ms-2" />
                            </button>
                        ) : (
                            <button type="button" className="btn ltns-btn-primary" onClick={handleSubmit}>
                                <ShieldCheck size={16} className="me-2" />
                                Submit Listing
                            </button>
                        )}
                    </div>

                </div>

            </div>
        </div>
    );
};

export default ListTinySpace;