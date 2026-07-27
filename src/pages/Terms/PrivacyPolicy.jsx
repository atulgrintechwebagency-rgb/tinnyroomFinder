import React, { useEffect, useState } from "react";
import Navbar from "../../component/Navbar";
import Footer from "../../component/Footer";
import "./Terms.css";

const sections = [
    {
        id: "information",
        title: "Information We Collect",
        content:
            "TinyRoomFinder collects information you provide when creating an account, submitting listings, contacting hosts, or communicating with us. This may include your name, email address, phone number, profile details, and listing information.",
    },
    {
        id: "usage",
        title: "How We Use Your Information",
        content:
            "We use your information to create and manage your account, connect renters with hosts, improve our services, provide customer support, send important notifications, and maintain the security of our platform.",
    },
    {
        id: "sharing",
        title: "Information Sharing",
        content:
            "We do not sell your personal information. Your information may be shared with other users only as necessary to facilitate bookings and communication, or with trusted service providers who assist in operating our platform.",
    },
    {
        id: "cookies",
        title: "Cookies & Tracking Technologies",
        content:
            "TinyRoomFinder uses cookies and similar technologies to enhance your browsing experience, remember your preferences, improve website performance, and analyze traffic.",
    },
    {
        id: "security",
        title: "Data Security",
        content:
            "We implement reasonable administrative, technical, and physical safeguards to protect your personal information. While we strive to keep your information secure, no method of transmission over the internet is completely secure.",
    },
    {
        id: "retention",
        title: "Data Retention",
        content:
            "We retain your information only as long as necessary to provide our services, comply with legal obligations, resolve disputes, and enforce our agreements.",
    },
    {
        id: "rights",
        title: "Your Privacy Rights",
        content:
            "You may access, update, or request deletion of your personal information by contacting us. Depending on your location, you may also have additional rights under applicable privacy laws.",
    },
    {
        id: "children",
        title: "Children's Privacy",
        content:
            "TinyRoomFinder is not intended for individuals under the age of 18. We do not knowingly collect personal information from children.",
    },
    {
        id: "thirdparty",
        title: "Third-Party Services",
        content:
            "Our platform may contain links to third-party websites or services. We are not responsible for the privacy practices or content of those third-party platforms.",
    },
    {
        id: "international",
        title: "International Data Transfers",
        content:
            "If you access TinyRoomFinder from outside the country where our servers are located, your information may be transferred and processed in accordance with applicable data protection laws.",
    },
    {
        id: "changes",
        title: "Changes to This Privacy Policy",
        content:
            "We may update this Privacy Policy from time to time. Any changes will become effective once published on this page. Continued use of the platform constitutes acceptance of the updated policy.",
    },
    {
        id: "contact",
        title: "Contact Us",
        content:
            "If you have any questions about this Privacy Policy or how your information is handled, please contact us through our Contact page.",
    },
];

const PrivacyPolicy = () => {
  const [activeSection, setActiveSection] = useState(sections[0].id);
  const [isScrolling, setIsScrolling] = useState(false);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);

    if (!element) return;

    setIsScrolling(true);
    setActiveSection(id);

    const offset = 100;

    const offsetPosition =
      element.getBoundingClientRect().top +
      window.pageYOffset -
      offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });

    setTimeout(() => {
      setIsScrolling(false);
    }, 1000);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (isScrolling) return;

      const scrollPosition = window.scrollY + 150;

      let currentSection = null;

      sections.forEach((section) => {
        const element = document.getElementById(section.id);

        if (element) {
          const { offsetTop, offsetHeight } = element;

          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            currentSection = section.id;
          }
        }
      });

      if (currentSection && currentSection !== activeSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [activeSection, isScrolling]);
   

    return (
        <>
            <Navbar />

            {/* HERO */}

            <section className="terms-hero">
                <div className="container">
                    <h1>Privacy Policy</h1>

                    <p>
                        Learn how TinyRoomFinder collects, uses, stores, and protects your
                        personal information while you use our platform.
                    </p>
                </div>
            </section>

            {/* CONTENT */}

            <section className="terms-section">
                <div className="container">

                    <div className="row">

                        {/* Sidebar */}

                        <div className="col-lg-3">

                            <aside className="terms-sidebar">

                                <h3>Table of Contents</h3>

                                <ul>
                                    {sections.map((item, index) => (
                                    <li
                                        key={item.id}
                                        className={activeSection === item.id ? "active" : ""}
                                    >
                                        <button
                                        type="button"
                                        onClick={() => scrollToSection(item.id)}
                                        >
                                        <span>{index + 1}.</span>
                                        {item.title}
                                        </button>
                                    </li>
                                    ))}
                                </ul>

                            </aside>

                        </div>

                        {/* Content */}

                        <div className="col-lg-9">

                            <div className="terms-card">
                                <p className="intro">
                                    At <strong>TinyRoomFinder</strong>, your privacy is important to us.
                                    This Privacy Policy explains what information we collect,
                                    how we use it, how we protect it, and the choices you have
                                    regarding your personal information.
                                </p>

                                {sections.map((section, index) => (

                                    <section
                                        key={section.id}
                                        id={section.id}
                                        className="terms-item"
                                    >

                                        <h4>

                                            <span>{index + 1}.</span>

                                            {section.title}

                                        </h4>

                                        <p>{section.content}</p>

                                    </section>

                                ))}

                            </div>

                        </div>

                    </div>

                </div>
            </section>

            <Footer />
        </>
    );
};

export default PrivacyPolicy;