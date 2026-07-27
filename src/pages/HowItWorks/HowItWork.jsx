import React, { useState } from "react";
import Navbar from "../../component/Navbar";
import Footer from "../../component/Footer";
import "./howitwork.css";
import {
  Search,
  House,
  ChevronDown,
  ChevronUp,
} from "lucide-react";




const renterSteps = [
  {
    id: 1,
    image: "/images/step1.jpeg",
    title: "Search Spaces",
    description:
      "Use filters to find tiny rooms, lofts, or studios that fit your lifestyle and budget.",
  },
  {
    id: 2,
    image: "/images/step2.jpeg",
    title: "Compare Listings",
    description:
      "Review details, amenities, prices and save your favorites.",
  },
  {
    id: 3,
    image: "/images/step3.jpeg",
    title: "Contact Hosts",
    description:
      "Message hosts directly to ask questions and arrange viewings.",
  },
  {
    id: 4,
    image: "/images/step4.jpeg",
    title: "Move In",
    description:
      "Finalize the details and move into your new space with confidence.",
  },
];

const renterHosts = [
  {
    id: 1,
    image: "/images/hoststep1.png",
    title: "Search Spaces",
    description:
      "Use filters to find tiny rooms, lofts, or studios that fit your lifestyle and budget.",
  },
  {
    id: 2,
    image: "/images/hoststep2.png",
    title: "Compare Listings",
    description:
      "Review details, amenities, prices and save your favorites.",
  },
  {
    id: 3,
    image: "/images/hoststep3.png",
    title: "Contact Hosts",
    description:
      "Message hosts directly to ask questions and arrange viewings.",
  },
  {
    id: 4,
    image: "/images/hoststep4.png",
    title: "Move In",
    description:
      "Finalize the details and move into your new space with confidence.",
  },
];


const faqs = [
  {
    question: "Is TinyRoomFinder free to use?",
    answer:
      "Yes. Searching listings and contacting hosts is completely free for renters.",
  },
  {
    question: "How do I know if a listing is legit?",
    answer:
      "Verified hosts, profile reviews and secure messaging help keep listings trustworthy.",
  },
  {
    question: "Can I message hosts before booking?",
    answer:
      "Absolutely. You can contact hosts directly before making any decision.",
  },
  {
    question: "What types of spaces can I find?",
    answer:
      "Private rooms, studios, lofts, guest suites, tiny homes and shared spaces.",
  },
];

const HowItWork = () => {

  const [openFAQ, setOpenFAQ] = useState(0);
  return (
    <>
      <Navbar />
      <section className="how-steps-section py-5">
        <div className="container-xxl">

          <div className="row">

            <div className="banner_content">

              <h1 className="banner_heading text-center">

                How <span style={{ color: '#21b7b3' }}> TinnyRoomFinder </span> Works
              </h1>

              <p className="banner_text">

                Whether you're searching for a cozy place to live or listing a
                space you love, we make it simple, secure, and stress-free.

              </p>

            </div>

          </div>
          <h2 className="left_heading mt-3"> For Renters: Find Your Perfect Space</h2>
          <div className="row g-4  step_box mt-3">
            {renterSteps.map((step, index) => (
              <div className="col-lg-3 col-md-6"
                key={step.id}>
                <div className="step-card">
                  <div className="step-number">
                    {step.id}
                  </div>
                  <div className="step-image">
                    <img src={step.image} alt={step.title} />
                  </div>
                  <h4>{step.title}</h4>
                  <p> {step.description} </p>
                  {index !== renterSteps.length - 1 && (
                    <div className="step-arrow"></div>
                  )}

                </div>

              </div>

            ))}

          </div>
          <h2 className="left_heading mt-5"> For Hosts: List and Connect</h2>
          <div className="row g-4 step_box mt-3">
            {renterHosts.map((hosts, index) => (
              <div className="col-lg-3 col-md-6" key={hosts.id}>
                <div className="step-card">
                  <div className="step-number">
                    {hosts.id}
                  </div>
                  <div className="step-image">
                    <img src={hosts.image} alt={hosts.title} />
                  </div>
                  <h4>{hosts.title}</h4>
                  <p> {hosts.description} </p>
                  {index !== renterHosts.length - 1 && (
                    <div className="step-arrow"></div>
                  )}
                </div>
              </div>
            ))}
          </div>
          </div>

      </section>
      <section className="faq-cta-section py-5">

  <div className="container-xxl">

    <div className="row g-4 align-items-stretch">

      {/* FAQ */}

      <div className="col-lg-6">

        <h2 className="left_heading mb-2">
          Frequently Asked Questions
        </h2>

        <div className="faq-wrapper">

          {faqs.map((faq, index) => (

            <div
              className="faq-item"
              key={index}
            >

              <button
                className="faq-question"
                onClick={() =>
                  setOpenFAQ(
                    openFAQ === index ? -1 : index
                  )
                }
              >

                <span>{faq.question}</span>

                {openFAQ === index ? (
                  <ChevronUp size={20} />
                ) : (
                  <ChevronDown size={20} />
                )}

              </button>

              {openFAQ === index && (

                <div className="faq-answer">

                  {faq.answer}

                </div>

              )}

            </div>

          ))}

        </div>

      </div>

      {/* CTA */}

      <div className="col-lg-6">

        <div className="cta-card">

          <div className="row align-items-center">

            <div className="col-lg-9">

              <h2>

                Ready to Find or List Your Tiny Space?

              </h2>

              <p>

                Join thousands of renters and hosts building
                better living—together.

              </p>

              <div className="cta-buttons">

                <button className="btn btn-search">

                  <Search size={18} />

                  Search Spaces

                </button>

                <button className="btn btn-list">

                  <House size={18} />

                  List Your Space

                </button>

              </div>

            </div>

            <div className="col-lg-3 text-center">
            {/* <img src="/images/TinnySpace.png" /> */}
            </div>

          </div>

        </div>

      </div>

    </div>

  </div>

</section>

      <Footer />
    </>

      );
};
export default HowItWork;