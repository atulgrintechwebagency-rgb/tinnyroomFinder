import React, { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import Navbar from "../../component/Navbar";
import Footer from "../../component/Footer";
import "./ForgotPassword.css";

import { resetPassword } from "../../Api/resetPasswordApi";

import {
    Lock,
    Eye,
    EyeOff,
} from "lucide-react";

const ResetPassword = () => {

    const navigate = useNavigate();

    const [searchParams] = useSearchParams();

    // Get email & token from URL
    const email = searchParams.get("email");
    const token = searchParams.get("token");

    const [loading, setLoading] = useState(false);

    const [message, setMessage] = useState("");

    const [messageType, setMessageType] = useState("");

    const [showPassword, setShowPassword] = useState(false);

    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [formData, setFormData] = useState({

        password: "",

        confirmPassword: "",

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

        if (formData.password !== formData.confirmPassword) {

            setMessage("Passwords do not match.");

            setMessageType("error");

            return;

        }

        try {

            setLoading(true);

            const response = await resetPassword({

                token,

                email,

                password: formData.password,

                password_confirmation: formData.confirmPassword,

            });

            setMessage(response.message);

            setMessageType("success");

            setTimeout(() => {

                navigate("/login");

            }, 2000);

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

                                    Reset Password

                                </h1>

                                <p>

                                    Create a new password for your account.

                                </p>

                                <form
                                    className="login-form"
                                    onSubmit={handleSubmit}
                                >

                                    {/* Password */}

                                    <div className="form-group mb-4">

                                        <label>New Password</label>

                                        <div className="input-box">

                                            <Lock size={18} />

                                            <input
                                                type={showPassword ? "text" : "password"}
                                                className="form-control"
                                                name="password"
                                                value={formData.password}
                                                onChange={handleChange}
                                                placeholder="Enter new password"
                                                required
                                            />

                                            <button
                                                type="button"
                                                className="password-toggle"
                                                onClick={() =>
                                                    setShowPassword(!showPassword)
                                                }
                                            >

                                                {showPassword ? (
                                                    <EyeOff size={18} />
                                                ) : (
                                                    <Eye size={18} />
                                                )}

                                            </button>

                                        </div>

                                    </div>

                                    {/* Confirm Password */}

                                    <div className="form-group mb-3">

                                        <label>Confirm Password</label>

                                        <div className="input-box">

                                            <Lock size={18} />

                                            <input
                                                type={
                                                    showConfirmPassword
                                                        ? "text"
                                                        : "password"
                                                }
                                                className="form-control"
                                                name="confirmPassword"
                                                value={formData.confirmPassword}
                                                onChange={handleChange}
                                                placeholder="Confirm password"
                                                required
                                            />

                                            <button
                                                type="button"
                                                className="password-toggle"
                                                onClick={() =>
                                                    setShowConfirmPassword(
                                                        !showConfirmPassword
                                                    )
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

                                    {/* API Message */}

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

                                    {/* Button */}

                                    <button
                                        className="btn login-account"
                                        type="submit"
                                        disabled={loading}
                                    >

                                        {loading
                                            ? "Updating..."
                                            : "Reset Password"}

                                    </button>

                                    {/* Divider */}

                                    <div className="login-divider"></div>

                                    {/* Back */}

                                    <div className="register-box">

                                        <p>

                                            Remember your password?

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
                                    alt="Reset Password"
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

export default ResetPassword;
