import React, { useEffect, useState } from "react";
import Navbar from "../../component/Navbar";
import Footer from "../../component/Footer";
import "./Terms.css";

const sections = [
  {
    id: "introduction",
    title: "Introduction",
    content:
      "This Cookie Policy explains how TinyRoomFinder ('we', 'our', or 'us') uses cookies and similar technologies when you visit or use our website. By continuing to browse our platform, you consent to the use of cookies in accordance with this policy.",
  },
  {
    id: "what-are-cookies",
    title: "What Are Cookies?",
    content:
      "Cookies are small text files that are stored on your device when you visit a website. They help websites recognize your device, remember your preferences, improve functionality, and enhance your overall browsing experience.",
  },
  {
    id: "types-of-cookies",
    title: "Types of Cookies We Use",
    content:
      "We use essential cookies required for website functionality, performance cookies to analyze visitor activity, functional cookies to remember your preferences, and marketing cookies to deliver relevant content and advertisements where applicable.",
  },
  {
    id: "how-we-use-cookies",
    title: "How We Use Cookies",
    content:
      "Cookies help us maintain secure sessions, remember user preferences, improve website performance, analyze traffic, understand user behavior, and provide a more personalized experience while using TinyRoomFinder.",
  },
  {
    id: "third-party-cookies",
    title: "Third-Party Cookies",
    content:
      "Some cookies may be placed by trusted third-party services such as analytics providers, advertising partners, embedded content providers, or social media platforms. These third parties manage their own cookies according to their respective privacy policies.",
  },
  {
    id: "managing-cookies",
    title: "Managing Cookies",
    content:
      "Most web browsers allow you to control or disable cookies through browser settings. You may choose to block or delete cookies at any time; however, doing so may affect certain website features and limit your user experience.",
  },
  {
    id: "analytics",
    title: "Analytics & Performance",
    content:
      "We may use analytics tools to collect anonymous information about how visitors interact with our website. This helps us understand website performance, identify areas for improvement, and enhance the overall user experience.",
  },
  {
    id: "advertising",
    title: "Advertising Cookies",
    content:
      "Where applicable, advertising cookies may be used to display relevant advertisements and measure the effectiveness of marketing campaigns. These cookies may track browsing activity across websites operated by different organizations.",
  },
  {
    id: "cookie-retention",
    title: "Cookie Retention",
    content:
      "Some cookies remain active only during your browsing session, while others may remain on your device for a longer period to remember your preferences and improve future visits.",
  },
  {
    id: "policy-updates",
    title: "Changes to This Cookie Policy",
    content:
      "We may update this Cookie Policy from time to time to reflect changes in legal requirements, technology, or our business practices. Updated versions will be posted on this page with the latest revision date.",
  },
  {
    id: "contact",
    title: "Contact Us",
    content:
      "If you have any questions regarding this Cookie Policy or our use of cookies, please contact us through our Contact page. We will be happy to assist you.",
  },
];

const CookiePolicy = () => {
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
                    <h1>Cookie Policy</h1>

                    <p>
                    This Cookie Policy explains how TinyRoomFinder uses cookies and similar
                    technologies to recognize your device, improve website functionality,
                    analyze visitor activity, and deliver a better, more personalized
                    browsing experience.
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
                                    This Cookie Policy explains how <strong>TinyRoomFinder</strong> uses cookies
                                    and similar technologies to improve website functionality, analyze traffic,
                                    remember your preferences, and enhance your browsing experience. Please read
                                    this policy carefully to understand how cookies are used and how you can
                                    manage your preferences.
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

export default CookiePolicy;