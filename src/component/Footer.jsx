import { Link, NavLink, useNavigate } from "react-router-dom";
import "./Footer.css";
import logo from "/images/logo.png";
import {
    Globe,
    Share2,
    MessageCircle,
    Send,
    CircleUserRound,
} from "lucide-react";

const Footer = () => {
    return (
        <footer className="footer">

            <div className="container">

                <div className="row gy-4 gy-lg-5">

                    {/* Logo */}

                    <div className="col-lg-3">

                        <img src={logo} alt="Tiny Room Finder" className="footer-logo" />

                    </div>
                    <div className="col-lg-6 footer_items">
                        {/* Company */}

                        <div className="company">

                            <h6>Company</h6>

                            <ul>
                                <li><Link to="/about1">About Us</Link></li>
                                <li><Link to="/careers">Careers</Link></li>
                                <li><Link to="/press">Press</Link></li>
                            </ul>

                        </div>

                        {/* Support */}

                        <div className="Support">

                            <h6>Support</h6>

                            <ul>
                                <li><Link to="/contact">Help Center</Link></li>
                                <li><Link to="/safety">Safety</Link></li>
                                <li><Link to="/contact">Contact Us</Link></li>
                            </ul>

                        </div>

                        {/* Resources */}

                        <div className="Resources">

                            <h6>Resources</h6>

                            <ul>

                                <li><Link to="/blog">Blog</Link></li>

                                <li><Link to="/resources">Tiny Living Guide</Link></li>

                                <li><Link to="/resources">For Landlords</Link></li>

                            </ul>

                        </div>

                        {/* Legal */}

                        <div className="Legal">

                            <h6>Legal</h6>

                            <ul>

                                <li> <Link to="/terms">Terms</Link></li>
                                <li><Link to="/privacy-policy">Privacy</Link></li>
                                <li><Link to="/cookie-policy">Cookie Policy</Link></li>

                            </ul>

                        </div>
                    </div>

                    {/* Newsletter */}

                    <div className="col-lg-3">

                        <h6>Stay in the loop</h6>

                        <p>
                            Get tips, new listings and tiny living inspiration delivered to
                            your inbox.
                        </p>

                        <div className="newsletter">

                            <input
                                type="email"
                                placeholder="Enter your email"
                            />

                            <button>
                                Subscribe
                            </button>

                        </div>

                    </div>

                </div>

                {/* Bottom */}

                <div className="footer-bottom">

                    <p>
                        ©2026 <a href="https://tinyroomfinder.com"> TinyRoom Finder™  </a> All Rights Reserved. Part of <a href="https://roomfindergroup.com/" target="_blank"> RoomFinder Group™ </a> Network
                    </p>
                    <div className="social-icons">
                        <a href="#"><Globe size={18} /></a>
                        <a href="#"><Share2 size={18} /></a>
                        <a href="#"><MessageCircle size={18} /></a>
                        <a href="#"><Send size={18} /></a>
                        <a href="#"><CircleUserRound size={18} /></a>
                    </div>

                </div>

            </div>

        </footer>
    );
};

export default Footer;