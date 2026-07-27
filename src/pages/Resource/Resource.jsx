import React, { useRef } from "react";
import Navbar from "../../component/Navbar";
import Footer from "../../component/Footer";
import {
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  BookOpen,
  DollarSign,
  Users,
  ShieldCheck,
  ClipboardList,
  Sofa,
  FileText,
  Download,
  Mail,
  User,
  Home,
} from "lucide-react";

import "./Resource.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";


const topics = [
  {
    icon: BookOpen,
    title: "Tiny Living Guide",
    description:
      "Everything you need to know about living small—benefits, challenges, and lifestyle tips.",
  },
  {
    icon: DollarSign,
    title: "Budgeting Tips",
    description:
      "Smart ways to save money and make the most of your budget in a tiny space.",
  },
  {
    icon: Users,
    title: "Host Best Practices",
    description:
      "Tips for creating a great experience for guests and maintaining your space.",
  },
  {
    icon: ShieldCheck,
    title: "Safety & Verification",
    description:
      "Learn how we keep our community safe and how you can verify listings.",
  },
  {
    icon: ClipboardList,
    title: "Moving Checklist",
    description:
      "A step-by-step checklist to help you move in, settle down, and feel at home.",
  },
  {
    icon: Sofa,
    title: "Furnishing Small Spaces",
    description:
      "Ideas and inspiration for making tiny spaces functional, cozy, and beautiful.",
  },
];



const guides = [
  {
    title: "Tiny Living Starter Guide",
    type: "PDF",
  },
  {
    title: "Hosting Success Checklist",
    type: "PDF",
  },
  {
    title: "Budgeting Worksheet",
    type: "PDF",
  },
  {
    title: "Moving Day Checklist",
    type: "PDF",
  },
];

const featuredArticles = [
  {
    id: 1,
    badge: "FEATURED",
    category: "GUIDE",
    image: "/images/resource1.png",
    title: "10 Tips for Choosing the Right Tiny Space",
    description:
      "From layout and natural light to location and lease terms, here's what to look for before you book.",
  },
  {
    id: 2,
    badge: "FEATURED",
    category: "ARTICLE",
    image: "/images/resource2.png",
    title: "How to Save Money While Renting",
    description:
      "Discover practical budgeting tips and hidden savings every renter should know.",
  },
  {
    id: 3,
    badge: "FEATURED",
    category: "GUIDE",
    image: "/images/resource3.png",
    title: "What Every First-Time Renter Should Know",
    description:
      "Avoid common mistakes and confidently rent your first tiny room.",
  },
];

const Resource = () => {


  return (
    <>
      <Navbar />

      <section className="resources-section py-5">

        <div className="container-xxl">
          <div className="row g-5">

            {/* LEFT SIDE */}

            <div className="col-lg-8">
                        {/* Heading */}

          <div className="resources-heading mb-4">

            <h1>
              Tiny Living Resources
            </h1>

            <p>
              Practical guides, expert tips, and trusted advice for
              living small—whether you're renting a tiny space or
              hosting one.
            </p>

          </div>

              <div className="featured-slider-wrapper">

                <Swiper
                  modules={[Navigation, Pagination, Autoplay]}
                  slidesPerView={1}
                  loop={true}
                  autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                  }}
                  navigation={{
                    prevEl: ".resource-prev",
                    nextEl: ".resource-next",
                  }}
                  pagination={{
                    el: ".resource-pagination",
                    clickable: true,
                  }}
                  onInit={(swiper) => {
                    swiper.pagination.init();
                    swiper.pagination.render();
                    swiper.pagination.update();
                  }}
                  className="featured-slider"
                >

                  {featuredArticles.map((article) => (

                    <SwiperSlide key={article.id}>

                      <div className="featured-slide">

                        <div className="featured-image">

                          <img
                            src={article.image}
                            alt={article.title}
                          />

                          <span className="featured-badge">
                            {article.badge}
                          </span>

                        </div>

                        <div className="featured-content">

                          <span className="article-category">
                            {article.category}
                          </span>

                          <h2>{article.title}</h2>

                          <p>{article.description}</p>

                          <button className="read-btn">
                            Read Article
                            <ArrowRight size={18} />
                          </button>

                        </div>

                      </div>

                    </SwiperSlide>

                  ))}

                </Swiper>

                {/* Navigation Buttons */}
                <button className="resource-prev custom-prev">
                  <ChevronLeft size={22} />
                </button>

                <button className="resource-next custom-next">
                  <ChevronRight size={22} />
                </button>
                {/* Outside Pagination */}
                <div className="resource-pagination"></div>
              </div>
              <section className="topics-section">

                <div className="d-flex justify-content-between align-items-center mb-4">

                  <h2 className="section-title">
                    Explore by Topic
                  </h2>

                </div>

                <div className="row g-4 grid_card">

                  {topics.map((item, index) => {

                    const Icon = item.icon;

                    return (

                      <div
                        className="col-lg-4 col-md-6"
                        key={index}
                      >

                        <div className="topic-card">

                          <div className="topic-icon">

                            <Icon size={30} />

                          </div>

                          <div className="topic-content">

                            <h4>{item.title}</h4>

                            <p>{item.description}</p>

                            <button className="topic-btn">

                              Browse Articles

                              <ArrowRight size={16} />

                            </button>

                          </div>

                        </div>

                      </div>

                    );

                  })}

                </div>

              </section>

            </div>

            {/* RIGHT SIDEBAR
                Part 1B will go here */}
            <div className="col-lg-4">
              <div className="sidebar-card">

                <h4 className="sidebar-title">
                  Downloadable Guides
                </h4>

                {guides.map((guide, index) => (

                  <div
                    className="guide-item"
                    key={index}
                  >

                    <div className="guide-left">

                      <div className="guide-icon">

                        <FileText size={28} />

                      </div>

                      <div>

                        <h6>{guide.title}</h6>

                        <span>{guide.type}</span>

                      </div>

                    </div>

                    <button className="download-btn">

                      <Download size={18} />

                    </button>

                  </div>

                ))}

                <button className="view-guide-btn">

                  View All Guides

                </button>

              </div>

              {/* Newsletter */}

              <div className="sidebar-card newsletter-card">

                <div className="newsletter-top">

                  <div>

                    <h4>Stay in the loop</h4>

                    <p>
                      Get tips, new listings, and tiny living inspiration delivered to your inbox.
                    </p>

                  </div>
{/* 
                  <img
                    src="/images/newsletter.png"
                    alt="Newsletter"
                  /> */}

                </div>

                <div className="newsletter-form">

                  <input
                    type="email"
                    placeholder="Enter your email"
                  />

                  <button>

                    Subscribe

                  </button>

                </div>

                <small>
                  We respect your privacy. Unsubscribe anytime.
                </small>

              </div>

              {/* Resources */}

              <div className="sidebar-card renthosted">

                <h4 className="sidebar-title">
                  For Renters & Hosts
                </h4>

                <p className="sidebar-desc">
                  Resources to help you find or host the perfect tiny space.
                </p>

                <div className="resource-link">

                  <div className="resource-left">

                    <div className="resource-icon renter">

                      <User size={18} />

                    </div>

                    <div>

                      <h6>I'm Looking for a Space</h6>

                      <span>Tips and advice for renters</span>

                    </div>

                  </div>

                  <ChevronRight size={18} />

                </div>

                <div className="resource-link">

                  <div className="resource-left">

                    <div className="resource-icon host">

                      <Home size={18} />

                    </div>

                    <div>

                      <h6>I'm Hosting a Space</h6>

                      <span>Guidance for hosts</span>

                    </div>

                  </div>

                  <ChevronRight size={18} />

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

export default Resource;