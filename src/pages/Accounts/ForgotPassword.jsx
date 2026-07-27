import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import Navbar from "../../component/Navbar";
import Footer from "../../component/Footer";
import "./ForgotPassword.css";

import { forgotPassword } from "../../Api/forgotPasswordApi";

import { Mail, ArrowLeft, MailCheck, } from "lucide-react";

const ForgotPassword = () => {

    const [email, setEmail] = useState("");

    const [loading, setLoading] = useState(false);

    const [message, setMessage] = useState("");

    const [messageType, setMessageType] = useState("");

    // Form handle Submit
const handleSubmit = async (e) => {

    e.preventDefault();

    setMessage("");
    setMessageType("");

    try {

        setLoading(true);

        const response = await forgotPassword(email);

        // Save email for Resend Reset Password page
        sessionStorage.setItem("resetEmail", email);

        // Show API message (or fallback message)
        setMessage(
            response.message ||
            "Password reset link has been sent successfully. Please check your email and click the reset password link to continue."
        );

        setMessageType("success");

        // Clear email field
        setEmail("");

    } catch (error) {

        let apiMessage = "Something went wrong.";

        if (error.response?.data?.message) {

            apiMessage = error.response.data.message;

            // Optional: friendlier message for rate limit
            if (apiMessage === "Please wait before retrying.") {
                apiMessage =
                    "A reset email was recently sent. Please wait a minute before requesting another one.";
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

            <section className="forgot-page">

                <div className="container">

                    <div className="row forgot-wrapper g-0">

                        {/* LEFT */}

                        <div className="col-lg-6">

                            <div className="forgot-left">

                                <h1>

                                    Forgot Password

                                </h1>

                                <p>

                                    Enter your email address and we'll send you a password reset link.

                                </p>
                                <form
                                    className="forgot-form"
                                    onSubmit={handleSubmit}
                                >

                                    <div className="form-group">

                                        <label>Email Address</label>

                                        <div className="input-box">

                                            <Mail size={18} />

                                            <input
                                                type="email"
                                                placeholder="Enter your email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                required
                                            />

                                        </div>

                                    </div>

                                            {messageType === "success" && (

                                                <div className="check-email-box">

                                                    <MailCheck size={22} className="check-email-icon" />

                                                    <div>

                                                        <h6>

                                                            Check your email

                                                        </h6>

                                                        <p>

                                                            We've sent a password reset link to your email address.

                                                        </p>

                                                        <small>

                                                            Didn't receive it?{" "}

                                                            <Link to="/resend-reset-password">

                                                                Resend Reset Link

                                                            </Link>

                                                        </small>

                                                    </div>

                                                </div>

                                            )}

                                    <button
                                        type="submit"
                                        className="btn-forgot"
                                        disabled={loading}
                                    >

                                        {loading
                                            ? "Sending..."
                                            : "Send Reset Link"}

                                    </button>

                                    <div className="back-login">

                                        <Link to="/login">

                                            Back to Login

                                        </Link>

                                    </div>

                                </form>
                            </div>

                        </div>

                        {/* RIGHT */}

                        <div className="col-lg-6 d-none d-lg-block">

                            <div className="forgot-right">

                                <img
                                    src="/images/login.jpg"
                                    alt="Forgot Password"
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

export default ForgotPassword;