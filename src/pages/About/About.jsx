import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../../component/Navbar";
import Footer from "../../component/Footer";
import "./About.css";

import {
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

const About = () => {
  return (
    <>
      <Navbar />

      {/* ================= HERO ================= */}

      <section className="about-hero">
        <div className="container">

          <div className="row align-items-center">

            {/* LEFT */}

            <div className="col-lg-6">

              <div className="about-hero-content">

                <span className="about-tag">
                  ABOUT TINYROOMFINDER
                </span>

                <h1>
                  Making Small Spaces
                  <br />
                  Feel Like
                  <span> Home.</span>
                </h1>

                <p>
                  TinyRoomFinder connects renters with trusted hosts,
                  making it easier than ever to discover affordable
                  rooms, ADUs, guest suites, tiny homes, RV spaces,
                  and unique living options across the United States.
                </p>

                <div className="about-hero-btn">

                  <Link
                    to="/all-listing"
                    className="theme-btn"
                  >
                    Find a Room
                    <ArrowRight size={18} />
                  </Link>

                  <Link
                    to="/list-a-space"
                    className="theme-btn-outline"
                  >
                    List Your Space
                  </Link>

                </div>

              </div>

            </div>

            {/* RIGHT */}

            <div className="col-lg-6">

              <div className="about-hero-image">

                <img
                  src="/images/about-hero.jpg"
                  alt="TinyRoomFinder"
                  className="img-fluid"
                />
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* ================= STORY ================= */}

      <section className="about-story">

        <div className="container">

          <div className="row align-items-center g-5">

            {/* IMAGE */}

            <div className="col-lg-6">

              <div className="story-image">

                <img
                  src="/images/about-story.jpg"
                  className="img-fluid rounded-4"
                  alt="Our Story"
                />

              </div>

            </div>

            {/* CONTENT */}

            <div className="col-lg-6">

              <div className="story-content">

                <span className="about-tag">

                  OUR STORY

                </span>

                <h2>

                  Helping People Find
                  Better Places to Live.

                </h2>

                <p>

                  TinyRoomFinder was built with one goal:
                  making affordable housing easier to find.

                  We understand that finding a comfortable,
                  safe, and budget-friendly place can be
                  stressful, especially in today's housing
                  market.

                </p>

                <p>

                  Our platform connects renters with verified
                  hosts offering tiny homes, rooms,
                  ADUs, guest suites, RV spaces,
                  and other unique accommodations.

                </p>

                <div className="story-list">

                  <div>

                    <CheckCircle2 size={20} />

                    Verified Property Listings

                  </div>

                  <div>

                    <CheckCircle2 size={20} />

                    Secure User Profiles

                  </div>

                  <div>

                    <CheckCircle2 size={20} />

                    Direct Communication

                  </div>

                  <div>

                    <CheckCircle2 size={20} />

                    Affordable Housing Options

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>
            {/* ================= MISSION & VISION ================= */}

      <section className="mission-section">

        <div className="container">

          <div className="row g-4">

            {/* Mission */}

            <div className="col-lg-6">

              <div className="mission-card">

                <div className="mission-icon">

                  🚀

                </div>

                <h3>

                  Our Mission

                </h3>

                <p>

                  Our mission is to simplify the search for affordable,
                  comfortable, and flexible living spaces while helping
                  property owners easily connect with trusted renters.
                  We believe everyone deserves access to safe housing,
                  regardless of budget.

                </p>

              </div>

            </div>

            {/* Vision */}

            <div className="col-lg-6">

              <div className="mission-card">

                <div className="mission-icon">

                  🌎

                </div>

                <h3>

                  Our Vision

                </h3>

                <p>

                  We envision becoming America's leading marketplace
                  for tiny homes, ADUs, guest suites, rooms, RV spaces,
                  and alternative housing by creating a trusted,
                  transparent, and community-driven platform.

                </p>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* ================= WHY CHOOSE US ================= */}

      <section className="why-us-section">

        <div className="container">

          <div className="section-heading">

            <span>

              WHY CHOOSE US

            </span>

            <h2>

              Why Thousands Choose
              TinyRoomFinder

            </h2>

            <p>

              We make discovering affordable housing simple,
              secure, and stress-free for both renters and hosts.

            </p>

          </div>

          <div className="row g-4">

            {/* Card 1 */}

            <div className="col-lg-4 col-md-6">

              <div className="why-card">

                <div className="why-icon">

                  🏡

                </div>

                <h4>

                  Diverse Listings

                </h4>

                <p>

                  Browse rooms, ADUs, guest houses,
                  RV spaces, tiny homes, and more
                  in one convenient platform.

                </p>

              </div>

            </div>

            {/* Card 2 */}

            <div className="col-lg-4 col-md-6">

              <div className="why-card">

                <div className="why-icon">

                  ✔️

                </div>

                <h4>

                  Verified Hosts

                </h4>

                <p>

                  We encourage trusted listings
                  and authentic profiles to help
                  create safer rental experiences.

                </p>

              </div>

            </div>

            {/* Card 3 */}

            <div className="col-lg-4 col-md-6">

              <div className="why-card">

                <div className="why-icon">

                  💬

                </div>

                <h4>

                  Direct Communication

                </h4>

                <p>

                  Easily connect with property
                  owners without unnecessary
                  middlemen or delays.

                </p>

              </div>

            </div>

            {/* Card 4 */}

            <div className="col-lg-4 col-md-6">

              <div className="why-card">

                <div className="why-icon">

                  💲

                </div>

                <h4>

                  Affordable Options

                </h4>

                <p>

                  Discover housing solutions
                  designed for every lifestyle
                  and every budget.

                </p>

              </div>

            </div>

            {/* Card 5 */}

            <div className="col-lg-4 col-md-6">

              <div className="why-card">

                <div className="why-icon">

                  ⚡

                </div>

                <h4>

                  Fast Search

                </h4>

                <p>

                  Powerful filters help you
                  quickly find spaces that
                  match your exact needs.

                </p>

              </div>

            </div>

            {/* Card 6 */}

            <div className="col-lg-4 col-md-6">

              <div className="why-card">

                <div className="why-icon">

                  ❤️

                </div>

                <h4>

                  Community Focused

                </h4>

                <p>

                  We believe housing is about
                  creating communities and helping
                  people feel at home.

                </p>

              </div>

            </div>

          </div>

        </div>

      </section>

            {/* ================= HOW IT WORKS ================= */}

      <section className="how-section">

        <div className="container">

          <div className="section-heading">

            <span>HOW IT WORKS</span>

            <h2>Finding Your Next Space Is Easy</h2>

            <p>
              Whether you're looking for a room or listing a property,
              TinyRoomFinder makes the entire process simple.
            </p>

          </div>

          <div className="row g-4">

            <div className="col-lg-3 col-md-6">

              <div className="step-card">

                <div className="step-number">
                  01
                </div>

                <h4>Create an Account</h4>

                <p>
                  Sign up in just a few minutes and
                  create your renter or host profile.
                </p>

              </div>

            </div>

            <div className="col-lg-3 col-md-6">

              <div className="step-card">

                <div className="step-number">
                  02
                </div>

                <h4>Search Listings</h4>

                <p>
                  Browse available rooms,
                  ADUs, guest suites,
                  RV spaces and more.
                </p>

              </div>

            </div>

            <div className="col-lg-3 col-md-6">

              <div className="step-card">

                <div className="step-number">
                  03
                </div>

                <h4>Connect Directly</h4>

                <p>
                  Message hosts and discuss
                  pricing, availability,
                  and move-in details.
                </p>

              </div>

            </div>

            <div className="col-lg-3 col-md-6">

              <div className="step-card">

                <div className="step-number">
                  04
                </div>

                <h4>Move In</h4>

                <p>
                  Finalize arrangements
                  and enjoy your
                  new living space.
                </p>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* ================= STATS ================= */}

      <section className="stats-section">

        <div className="container">

          <div className="row text-center">

            <div className="col-lg-3 col-6">

              <div className="stat-box">

                <h2>10K+</h2>

                <p>Property Listings</p>

              </div>

            </div>

            <div className="col-lg-3 col-6">

              <div className="stat-box">

                <h2>5K+</h2>

                <p>Happy Renters</p>

              </div>

            </div>

            <div className="col-lg-3 col-6">

              <div className="stat-box">

                <h2>50+</h2>

                <p>Cities Covered</p>

              </div>

            </div>

            <div className="col-lg-3 col-6">

              <div className="stat-box">

                <h2>99%</h2>

                <p>User Satisfaction</p>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* ================= COMMUNITY ================= */}

      <section className="community-section">

        <div className="container">

          <div className="row align-items-center g-5">

            <div className="col-lg-6">

              <img
                src="/images/community.jpg"
                alt="Community"
                className="img-fluid rounded-4"
              />

            </div>

            <div className="col-lg-6">

              <span className="about-tag">

                OUR COMMUNITY

              </span>

              <h2>

                Building Connections,
                Not Just Listings

              </h2>

              <p>

                TinyRoomFinder is more than a rental platform.
                We help create meaningful connections between
                renters and hosts while supporting affordable,
                flexible housing solutions throughout the country.

              </p>

              <p>

                Every listing represents an opportunity for
                someone to find a safe, comfortable place
                they can truly call home.

              </p>

            </div>

          </div>

        </div>

      </section>


      {/* ================= TRUST ================= */}

      <section className="trust-section">

        <div className="container">

          <div className="section-heading">

            <span>

              TRUST & SAFETY

            </span>

            <h2>

              Your Safety Matters

            </h2>

          </div>

          <div className="row g-4">

            <div className="col-lg-4">

              <div className="trust-card">

                <h4>

                  Verified Accounts

                </h4>

                <p>

                  Encouraging trusted user
                  profiles for a safer experience.

                </p>

              </div>

            </div>

            <div className="col-lg-4">

              <div className="trust-card">

                <h4>

                  Secure Platform

                </h4>

                <p>

                  Modern security practices
                  help protect user data.

                </p>

              </div>

            </div>

            <div className="col-lg-4">

              <div className="trust-card">

                <h4>

                  Dedicated Support

                </h4>

                <p>

                  Our team is ready to
                  assist whenever you
                  need help.

                </p>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* ================= CTA ================= */}

      <section className="about-cta">

        <div className="container">

          <div className="cta-box">

            <h2>

              Ready to Find
              Your Next Home?

            </h2>

            <p>

              Join thousands of renters and hosts
              already using TinyRoomFinder.

            </p>

            <div className="cta-buttons">

              <Link
                to="/all-listing"
                className="theme-btn"
              >
                Browse Listings
              </Link>

              <Link
                to="/signup"
                className="theme-btn-outline"
              >
                Create Free Account
              </Link>

            </div>

          </div>

        </div>

      </section>

      <Footer />

    </>

  );

};

export default About;