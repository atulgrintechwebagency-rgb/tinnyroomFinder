import { Link } from "react-router-dom";
import React, { useState } from "react";
import Navbar from "../../component/Navbar";
import Footer from "../../component/Footer";
import "./Signup.css";
import { registerUser } from "../../Api/signupApi";
import {
    User,
    Mail,
    Phone,
    Lock,
    Building2,
    Eye,
    EyeOff,
    CheckCircle,
} from "lucide-react";

const Signup = () => {
    const [activeTab, setActiveTab] = useState("renter");
    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState("");
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [formData, setFormData] = useState({
        fullName: "",
        businessName: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
        terms: false,
    });



    const handleChange = (e) => {
        const { name, value, checked, type } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setMessage("");
        setMessageType("");

        // Password Match Check
        if (formData.password !== formData.confirmPassword) {
            setMessage("Passwords do not match.");
            setMessageType("error");
            return;
        }

        const payload = {
            full_name: formData.fullName,
            role: activeTab === "renter" ? "customer" : "host",
            email: formData.email,
            phone: formData.phone,
            password: formData.password,
            password_confirmation: formData.confirmPassword,
        };

        if (activeTab === "host") {
            payload.business_name = formData.businessName;
        }

        try {
            setLoading(true);

            const response = await registerUser(payload);

            setMessage(response.data.message);
            setMessageType("success");

            // Reset Form
            setFormData({
                fullName: "",
                businessName: "",
                email: "",
                phone: "",
                password: "",
                confirmPassword: "",
                terms: false,
            });

        } catch (error) {

            let apiMessage = "Something went wrong.";

            if (error.response?.data?.message) {
                apiMessage = error.response.data.message;
            }

            if (error.response?.data?.errors) {
                const firstError = Object.values(error.response.data.errors)[0];
                if (firstError?.length) {
                    apiMessage = firstError[0];
                }
            }

            setMessage(apiMessage);
            setMessageType("error");

        } finally {
            setLoading(false);
        }
    };
    return (



        <>

            <Navbar />

            <section className="signup-page">

                <div className="container">

                    <div className="row g-0 signup-wraper">

                        {/* LEFT */}

                        <div className="col-lg-6">

                            <div className="signup-left">

                                {/* Heading */}

                                <h1>

                                    Create Your Account

                                </h1>

                                <p>

                                    Join TinyRoomFinder and start finding or
                                    listing spaces in minutes.

                                </p>

                                {/* Tabs */}

                                <div className="signup-tabs">

                                    <button
                                        type="button"
                                        className={
                                            activeTab === "renter"
                                                ? "active"
                                                : ""
                                        }
                                        onClick={() =>
                                            setActiveTab("renter")
                                        }
                                    >

                                        For Renter

                                    </button>

                                    <button
                                        type="button"
                                        className={
                                            activeTab === "host"
                                                ? "active"
                                                : ""
                                        }
                                        onClick={() =>
                                            setActiveTab("host")
                                        }
                                    >

                                        For Host

                                    </button>

                                </div>
                                <form className="signup-form" onSubmit={handleSubmit}>
                                    <div className="row">

                                        {/* Full Name */}
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label>Full Name</label>

                                                <div className="input-box">
                                                    <User size={18} />

                                                    <input
                                                        type="text"
                                                        name="fullName"
                                                        value={formData.fullName}
                                                        onChange={handleChange}
                                                        placeholder="Enter your full name"
                                                        
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        {/* Email */}
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label>Email Address</label>

                                                <div className="input-box">
                                                    <Mail size={18} />

                                                    <input
                                                        type="email"
                                                        name="email"
                                                        value={formData.email}
                                                        onChange={handleChange}
                                                        placeholder="Enter your email"
                                                        
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        {/* Phone Number */}
                                        <div className="col-12">
                                            <div className="form-group">
                                                <label>Phone Number</label>

                                                <div className="input-box">
                                                    <Phone size={18} />

                                                    <input
                                                        type="tel"
                                                        name="phone"
                                                        value={formData.phone}
                                                        onChange={handleChange}
                                                        placeholder="Enter phone number"
                                                        
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        {/* Business Name (Host Only) */}
                                        {activeTab === "host" && (
                                            <div className="col-12">
                                                <div className="form-group">
                                                    <label>Business Name</label>

                                                    <div className="input-box">
                                                        <Building2 size={18} />

                                                        <input
                                                            type="text"
                                                            name="businessName"
                                                            value={formData.businessName}
                                                            onChange={handleChange}
                                                            placeholder="Enter business name"
                                                            
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                        {/* Password */}
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label>Password</label>

                                                <div className="input-box">
                                                    <Lock size={18} />

                                                    <input
                                                        type={showPassword ? "text" : "password"}
                                                        name="password"
                                                        value={formData.password}
                                                        onChange={handleChange}
                                                        placeholder="Create password"
                                                        
                                                    />

                                                    <button
                                                        type="button"
                                                        className="password-toggle"
                                                        onClick={() => setShowPassword(!showPassword)}
                                                    >
                                                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                                    </button>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Confirm Password */}
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label>Confirm Password</label>

                                                <div className="input-box">
                                                    <Lock size={18} />

                                                    <input
                                                        type={showConfirmPassword ? "text" : "password"}
                                                        name="confirmPassword"
                                                        value={formData.confirmPassword}
                                                        onChange={handleChange}
                                                        placeholder="Confirm Password"
                                                        
                                                    />

                                                    <button
                                                        type="button"
                                                        className="password-toggle"
                                                        onClick={() =>
                                                            setShowConfirmPassword(!showConfirmPassword)
                                                        }
                                                    >
                                                        {showConfirmPassword ? (
                                                            <EyeOff size={18} />
                                                        ) : (
                                                            <Eye size={18} />
                                                        )}
                                                    </button>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Terms */}
                                        <div className="col-12">
                                            <div className="terms-box">
                                                <label>

                                                    <input
                                                        type="checkbox"
                                                        name="terms"
                                                        checked={formData.terms}
                                                        onChange={handleChange}
                                                        
                                                    />

                                                    <span>
                                                        I agree to the{" "}
                                                        <a href="/terms">Terms of Service</a> &{" "}
                                                        <a href="/privacy-policy">Privacy Policy</a>
                                                    </span>

                                                </label>
                                            </div>
                                        </div>

                                        {/* Submit */}
                                        {message && (
                                            <div
                                                className={`form-message ${messageType === "success"
                                                        ? "success-message"
                                                        : "error-message"
                                                    }`}
                                            >
                                                {message}
                                            </div>
                                        )}
                                        <div className="col-12">
                                            <button
                                                type="submit"
                                                className="btn-signup"
                                                disabled={loading}
                                            >
                                                {loading ? "Creating Account..." : "Create Account"}
                                            </button>
                                        </div>

                                        {/* Login */}
                                        <div className="col-12">
                                            <div className="signup-login">
                                                Already have an account?
                                                <Link to="/login">Log In</Link>
                                            </div>
                                        </div>

                                    </div>
                                </form>

                            </div>

                        </div>

                        {/* RIGHT */}

                        <div className="col-lg-6 d-none d-lg-block">

                            <div className="signup-right">

                                <img
                                    src="/images/login.jpg"
                                    alt="Signup"
                                />

                            </div>

                        </div>

                    </div>

                </div>

            </section>

            <Footer />

        </>

    );

};

export default Signup;