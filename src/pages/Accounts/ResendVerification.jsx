import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../component/Navbar";
import Footer from "../../component/Footer";
import "./ForgotPassword.css";

import { resendVerification } from "../../Api/resendVerificationApi";

import { Mail } from "lucide-react";

const ResendVerification = () => {

    const [loading, setLoading] = useState(false);

    const [message, setMessage] = useState("");

    const [messageType, setMessageType] = useState("");

    const [formData, setFormData] = useState({

        email: "",

    });

    const handleChange = (e) => {

        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        setMessage("");
        setMessageType("");

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        setMessage("");
        setMessageType("");

        try {

            setLoading(true);

            const response = await resendVerification({

                email: formData.email,

            });

            setMessage(response.message);

            setMessageType("success");

            setFormData({

                email: "",

            });

        } catch (error) {

            let apiMessage = "Something went wrong.";

            if (error.response?.data?.message) {

                apiMessage = error.response.data.message;

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

            <section className="login-page">

                <div className="container">

                    <div className="row login-wraper g-0">

                        {/* LEFT */}

                        <div className="col-lg-6">

                            <div className="login-left">

                                <h1>

                                    Verify Your Email

                                </h1>

                                <p>

                                    Enter your email address below and we'll send you a new verification email.

                                </p>

                                <form
                                    className="login-form"
                                    onSubmit={handleSubmit}
                                >

                                    {/* Email */}

                                    <div className="form-group mb-4">

                                        <label>Email Address</label>

                                        <div className="input-box">

                                            <Mail size={18} />

                                            <input
                                                type="email"
                                                className="form-control"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                placeholder="Enter your email"
                                                required
                                            />

                                        </div>

                                    </div>

                                    {/* Message */}

                                    {message && (

                                        <div
                                            className={`form-message ${
                                                messageType === "success"
                                                    ? "success-message"
                                                    : "error-message"
                                            }`}
                                        >

                                            {message}

                                        </div>

                                    )}

                                    {/* Button */}

                                    <button
                                        className="btn login-account"
                                        type="submit"
                                        disabled={loading}
                                    >

                                        {loading
                                            ? "Sending..."
                                            : "Resend Verification Email"}

                                    </button>

                                    {/* Divider */}

                                    <div className="login-divider"></div>

                                    {/* Login */}

                                    <div className="register-box">

                                        <p>

                                            Already verified your email?

                                        </p>

                                        <Link to="/login">

                                            Back to Login

                                        </Link>

                                    </div>

                                </form>

                            </div>

                        </div>

                        {/* RIGHT */}

                        <div className="col-lg-6 d-none d-lg-block">

                            <div className="login-right">

                                <img
                                    src="/images/login.jpg"
                                    alt="Verify Email"
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

export default ResendVerification;