import { Link } from "react-router-dom";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../component/Navbar";
import Footer from "../../component/Footer";
import "./Login.css";
import { loginUser } from "../../Api/login";
import { resendVerification } from "../../Api/resendVerificationApi";
import {
    Mail,
    Lock,
    Eye,
    EyeOff,
} from "lucide-react";

const Login = () => {

    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [resendLoading, setResendLoading] = useState(false);

    const [showPassword, setShowPassword] = useState(false);

    const [message, setMessage] = useState("");

    const [messageType, setMessageType] = useState("");
    const [showResendVerification, setShowResendVerification] = useState(false);

    const [formData, setFormData] = useState({
        email: "",
        password: "",
        remember: false,
    });
    const handleChange = (e) => {
        const { name, value, checked, type } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));

        // Clear previous messages while typing
        setMessage("");
        setMessageType("");
    };
    const handleResendVerification = async () => {

    try {

        setResendLoading(true);

        const response = await resendVerification({
            email: formData.email,
        });

        setMessage(response.message);
        setMessageType("success");

    } catch (error) {

        let apiMessage = "Unable to resend verification email.";

        if (error.response?.data?.message) {
            apiMessage = error.response.data.message;
        }

        setMessage(apiMessage);
        setMessageType("error");

    } finally {

        setResendLoading(false);

    }

};
    const handleSubmit = async (e) => {

        e.preventDefault();

        setMessage("");
        setMessageType("");

        try {

            setLoading(true);

            const response = await loginUser({
                email: formData.email,
                password: formData.password,
            });

            console.log(response);

            setMessage(response.message);
            setMessageType("success");

            // Save Login Data
            localStorage.setItem("token", response.token);
            localStorage.setItem("user", JSON.stringify(response.user));

            // Redirect after 1 second
            setTimeout(() => {
                navigate("/");
            }, 1000);

        } catch (error) {

            let apiMessage = "Login failed.";

            setShowResendVerification(false);

            if (error.response?.data?.message) {
                apiMessage = error.response.data.message;
            }

            if (error.response?.data?.type === "not_verified") {
                setShowResendVerification(true);
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

                <div className="container ">

                    <div className="row login-wraper g-0">

                        {/* LEFT */}

                        <div className="col-lg-6">

                            <div className="login-left">

                                {/* Logo */}
                                <h1>

                                    Welcome Back

                                </h1>

                                <p>

                                    Sign in to access your saved listings,
                                    messages, and host dashboard.

                                </p>

                                {/* LOGIN FORM-*/}

                                <form className="login-form" onSubmit={handleSubmit}>

                                    {/* Email */}

                                    <div className="form-group mb-4">

                                        <label>Email Address</label>

                                        <input
                                            type="email"
                                            className="form-control"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder="Enter your email"
                                            autoComplete="email"
                                            required
                                        />

                                    </div>

                                    {/* Password */}

                                    <div className="form-group mb-3">

                                        <label>Password</label>

                                        <div className="input-box">

                                            <Lock size={18} />

                                            <input
                                                type={showPassword ? "text" : "password"}
                                                className="form-control"
                                                name="password"
                                                value={formData.password}
                                                onChange={handleChange}
                                                placeholder="Enter your password"
                                                autoComplete="current-password"
                                                required
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

                                    {/* Remember */}

                                    <div className="remember-row">

                                        <div className="form-check">

                                            <input
                                                className="form-check-input"
                                                type="checkbox"
                                                id="remember"
                                                name="remember"
                                                checked={formData.remember}
                                                onChange={handleChange}
                                            />

                                            <label
                                                className="form-check-label"
                                                htmlFor="remember"
                                            >

                                                Remember me

                                            </label>

                                        </div>

                                        <Link to="/forgot-password">
                                            Forgot Password?
                                        </Link>

                                    </div>

                                    {/* Login */}
                                    {message && (
                                        <div
                                            className={`form-message ${
                                                messageType === "success"
                                                    ? "success-message"
                                                    : "error-message"
                                            }`}
                                        >
                                            <div>{message}</div>

                                            {messageType === "error" &&
                                                message.toLowerCase().includes("verify") && (
                                                    <button
                                                        type="button"
                                                        className="resend-verification-btn"
                                                        onClick={handleResendVerification}
                                                        disabled={resendLoading}
                                                    >
                                                        {resendLoading
                                                            ? "Sending..."
                                                            : "Resend Verification Email"}
                                                    </button>
                                            )}
                                        </div>
                                    )}
                                    {showResendVerification && (
                                        <div className="text-center mt-2 mb-2">
                                            <Link
                                                to="/resend-verification"
                                                state={{ email: formData.email }}
                                                className="resend-verification-link"
                                            >
                                                Resend Verification Email
                                            </Link>
                                        </div>
                                    )}
                                    <button
                                        className="btn login-account"
                                        type="submit"
                                        disabled={loading}
                                    >
                                        {loading ? "Logging In..." : "Log In"}
                                    </button>

                                    {/* Divider */}

                                    <div className="login-divider">
                                    </div>


                                    {/* Register */}

                                    <div className="register-box">

                                        <p>

                                            Don't have an account?

                                        </p>
                                        <Link to="/signup">Create Account</Link>

                                    </div>

                                </form>

                            </div>

                        </div>

                        {/* RIGHT */}

                        <div className="col-lg-6 d-none d-lg-block">

                            <div className="login-right">

                                <img

                                    src="/images/login.jpg"

                                    alt="Login"

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

export default Login;