import React from "react";
import { BadgeDollarSign, ShieldCheck, SlidersHorizontal } from "lucide-react";

const Hero = () => {
  return (
    <section className="hero-banner">
      <div className="container">
        <div className="row align-items-center">

          {/* Left Content */}
          <div className="left_content">

            <h1 className="hero-title">
              Turn Your Small Space <br />
              <span>Into Monthly Income.</span>
            </h1>

            <p className="hero-text">
              List your extra room, loft, or tiny home and connect with
              responsible renters looking for affordable, unique places to live.
            </p>

            <div className="hero-features">

              <div className="feature-item">
                <div className="icon-box">
                  <BadgeDollarSign size={20} />
                </div>

                <div>
                  <h6>Free to list</h6>
                  <p>No upfront fees</p>
                </div>
              </div>

              <div className="feature-item">
                <div className="icon-box">
                  <ShieldCheck size={20} />
                </div>

                <div>
                  <h6>Background-checked renters</h6>
                  <p>Live with confidence</p>
                </div>
              </div>

              <div className="feature-item">
                <div className="icon-box">
                  <SlidersHorizontal size={20} />
                </div>

                <div>
                  <h6>You're in control</h6>
                  <p>Set rules, prices and more</p>
                </div>
              </div>

            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;