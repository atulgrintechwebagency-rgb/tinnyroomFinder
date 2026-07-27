import React, { useEffect, useState } from "react";
import Navbar from "../../component/Navbar";
import Footer from "../../component/Footer";
import "./Terms.css";

const sections = [
  {
    id: "acceptance",
    title: "Acceptance of Terms",
    content:
      "By accessing or using TinyRoomFinder, you agree to comply with these Terms & Conditions. If you do not agree with these terms, please discontinue using the platform.",
  },
  {
    id: "purpose",
    title: "Platform Purpose",
    content:
      "TinyRoomFinder connects individuals looking for tiny homes, ADUs, RV spaces, rooms, and other small living accommodations with property owners and hosts. We act solely as a platform and are not a party to agreements between users.",
  },
  {
    id: "accounts",
    title: "User Accounts",
    content:
      "Users are responsible for maintaining the confidentiality of their account credentials and for all activities that occur under their account. You agree to provide accurate and up-to-date information.",
  },
  {
    id: "listing",
    title: "Listing Responsibilities",
    content:
      "Hosts are responsible for ensuring that all listing information, pricing, amenities, photos, and availability are accurate and regularly updated.",
  },
  {
    id: "booking",
    title: "Booking & Communication",
    content:
      "Users are responsible for communicating directly with hosts regarding availability, payments, agreements, and move-in details. TinyRoomFinder does not guarantee successful bookings.",
  },
  {
    id: "conduct",
    title: "User Conduct",
    content:
      "Users agree not to post false information, engage in fraudulent activity, harass others, or use the platform for unlawful purposes.",
  },
  {
    id: "privacy",
    title: "Privacy",
    content:
      "Your use of TinyRoomFinder is also governed by our Privacy Policy, which explains how personal information is collected, stored, and used.",
  },
  {
    id: "intellectual",
    title: "Intellectual Property",
    content:
      "All website content, branding, logos, graphics, text, and software are the intellectual property of TinyRoomFinder unless otherwise stated.",
  },
  {
    id: "liability",
    title: "Limitation of Liability",
    content:
      "TinyRoomFinder shall not be liable for disputes, damages, financial losses, injuries, or other issues arising from user interactions or property listings.",
  },
  {
    id: "termination",
    title: "Termination",
    content:
      "We reserve the right to suspend or terminate accounts that violate these Terms & Conditions or misuse the platform.",
  },
  {
    id: "links",
    title: "Third-Party Links",
    content:
      "Our website may contain links to third-party websites. TinyRoomFinder is not responsible for their content, policies, or practices.",
  },
  {
    id: "changes",
    title: "Changes to Terms",
    content:
      "We may update these Terms & Conditions at any time. Continued use of the platform constitutes acceptance of the updated terms.",
  },
  {
    id: "law",
    title: "Governing Law",
    content:
      "These Terms & Conditions shall be governed by and interpreted in accordance with the applicable laws of the jurisdiction in which TinyRoomFinder operates.",
  },
  {
    id: "contact",
    title: "Contact Us",
    content:
      "If you have questions regarding these Terms & Conditions, please contact us through our Contact page.",
  },
];

const Terms = () => {
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

      <section className="terms-hero">
        <div className="container">
          <h1>Terms & Conditions</h1>

          <p>
            Please read these Terms & Conditions carefully before using
            TinyRoomFinder.
          </p>
        </div>
      </section>
      <section className="terms-section">
        <div className="container">
          <div className="row g-4">

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
                Welcome to <strong>TinyRoomFinder</strong>. By using this
                website you agree to comply with these Terms & Conditions.
                Please review each section carefully before using our
                services.
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
    </section >

      <Footer />
    </>
  );
};

export default Terms;