import React, { useState } from "react";
import Navbar from "../../component/Navbar";
import Footer from "../../component/Footer";
import "./contact.css";

import {
    MessageSquare,
    Mail,
    Phone,
    Clock3,
    ShieldCheck,
    User,
    Send,
    ChevronDown,
    FileText,
    CircleCheck,
} from "lucide-react";

const Contact = () => {
    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
    });

    const [loading, setLoading] = useState(false);

    const [message, setMessage] = useState("");

    const [messageType, setMessageType] = useState("");

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

        setLoading(true);

        try {
            // Replace with your Contact API

            console.log(formData);

            setMessage(
                "Thank you! Your message has been sent successfully. We'll get back to you shortly."
            );

            setMessageType("success");

            setFormData({
                first_name: "",
                last_name: "",
                email: "",
                phone: "",
                subject: "",
                message: "",
            });
        } catch (error) {
            setMessage("Something went wrong. Please try again.");

            setMessageType("error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Navbar />

            {/* Hero */}

            <section className="contact-hero">

                <div className="container text-center">

                    <h1>Contact Us</h1>

                    <p>
                        Have questions about TinyRoomFinder? Whether you're searching for a
                        room, listing a tiny space, or need account support, we're here to
                        help.
                    </p>

                </div>

            </section>

            {/* Contact */}

            <section className="contact-section">

                <div className="container">

                    <div className="row g-4">

                        {/* LEFT */}

                        <div className="col-lg-4">

                            <div className="contact-info-card">

                                <div className="contact-icon">

                                    <MessageSquare size={28} />

                                </div>

                                <h3>Get In Touch</h3>

                                <p>
                                    Our support team is ready to help you with room listings,
                                    hosting, billing, and account questions.
                                </p>

                                <div className="contact-info">

                                    <div className="info-item">

                                        <Mail size={18} />

                                        <div>

                                            <h6>Email Us</h6>

                                            <span>support@tinyroomfinder.com</span>

                                        </div>

                                    </div>

                                    <div className="info-item">

                                        <Phone size={18} />

                                        <div>

                                            <h6>Call Us</h6>

                                            <span>+1 (800) 555-1234</span>

                                        </div>

                                    </div>

                                    <div className="info-item">

                                        <Clock3 size={18} />

                                        <div>

                                            <h6>Support Hours</h6>

                                            <span>Mon - Fri, 9AM - 6PM EST</span>

                                        </div>

                                    </div>

                                    <div className="info-item">

                                        <ShieldCheck size={18} />

                                        <div>

                                            <h6>Response Time</h6>

                                            <span>Within 24 Hours</span>

                                        </div>

                                    </div>

                                </div>

                                <hr />

                                <h6 className="support-title">
                                    WE CAN HELP WITH
                                </h6>

                                <ul className="support-list">
                                    <li> <CircleCheck size={18} gap={10} /> Finding a Room</li>
                                    <li> <CircleCheck size={18} gap={10} /> Listing a Tiny Space</li>
                                    <li> <CircleCheck size={18} gap={10} />  Account Support</li>
                                    <li> <CircleCheck size={18} gap={10} /> Billing Questions</li>
                                </ul>
                            </div>
                        </div>

                        {/* RIGHT */}
                        <div className="col-lg-8">
                            <div className="contact-form-card">
                                <h2>Send Us a Message </h2>
                                <p>ill out the form below and we'll get back to you shortly. </p>

                                <form onSubmit={handleSubmit}>
                                    <div className="row">
                                        <div className="col-md-6 mb-3">
                                            <label> First Name</label>
                                            <div className="input-box">
                                                <User size={18} />
                                                <input
                                                    type="text"
                                                    name="first_name"
                                                    className="form-control"
                                                    placeholder="John"
                                                    value={formData.first_name} onChange={handleChange} required
                                                />

                                            </div>
                                        </div>
                                        <div className="col-md-6 mb-3">
                                            <label> Last Name</label>
                                            <div className="input-box">
                                                <User size={18} />
                                                <input
                                                    type="text"
                                                    name="last_name"
                                                    className="form-control"
                                                    placeholder="Doe"
                                                    value={formData.last_name}
                                                    onChange={handleChange}
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div className="col-12 mb-3">
                                            <label> Email Address</label>
                                            <div className="input-box">
                                                <Mail size={18} />
                                                <input
                                                    type="email"
                                                    className="form-control"
                                                    name="email"
                                                    placeholder="john@example.com"
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div className="col-12 mb-3">
                                            <label> Phone Number</label>
                                            <div className="input-box">
                                                <Phone size={18} />
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    name="phone"
                                                    placeholder="(555) 000-0000"
                                                    value={formData.phone}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-12 mb-3">
                                            <label> Subject </label>
                                            <div className="select-box">
                                                <FileText size={18} />
                                                <select
                                                    className="form-select"
                                                    name="subject"
                                                    value={formData.subject}
                                                    onChange={handleChange}
                                                    required >
                                                    <option value="">Select inquiry type </option>
                                                    <option>Looking for a Room </option>
                                                    <option>List a Tiny Space</option>
                                                    <option> Billing Question </option>
                                                    <option> Technical Support</option>
                                                    <option>General Inquiry</option>
                                                </select>

                                                <ChevronDown size={18} />
                                            </div>
                                        </div>
                                        <div className="col-12 mb-3">
                                            <label> Message</label>
                                            <textarea
                                                className="form-control"
                                                rows="6"
                                                name="message"
                                                placeholder="Tell us how we can help..."
                                                value={formData.message}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>

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
                                                className="contact-btn"
                                                type="submit"
                                                disabled={loading}
                                            >

                                                <Send size={18} />

                                                <span>

                                                    {loading
                                                        ? "Sending..."
                                                        : "Send Message"}

                                                </span>

                                            </button>

                                        </div>

                                    </div>

                                </form>

                            </div>

                        </div>

                    </div>

                </div>

            </section>

            <Footer />
        </>
    );
};

export default Contact;