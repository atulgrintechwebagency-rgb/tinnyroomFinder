import React from "react";
import Navbar from "../../component/Navbar";
import Footer from "../../component/Footer";
import "./Pricing.css";

import {
    Check,
    BadgeCheck,
    CircleCheckBig,
} from "lucide-react";

const plans = [
    {
        id: 1,
        name: "Basic",
        subtitle: "For occasional hosts",
        price: 0,
        priceSubTitle: "List your space and connect with renters.",
        popular: false,
        button: "Get Started Free",
        trial: "",
        features: [
            "List 1 tiny space",
            "Up to 6 photos",
            "In-app messaging",
            "Standard search visibility",
            "Email support",
        ],
    },
    {
        id: 2,
        name: "Pro",
        subtitle: "For active hosts",
        price: 9,
        priceSubTitle: "Unlock more features and reach more renters.",
        popular: true,
        button: "Start Pro Trial",
        trial: "7-day free trial. Cancel anytime.",
        features: [
            "List up to 5 tiny spaces",
            "Up to 20 photos per listing",
            "In-app messaging",
            "Enhanced search visibility",
            "Basic analytics",
            "Priority email support",
        ],
    },
    {
        id: 3,
        name: "Featured",
        subtitle: "For boosted visibility",
        price: 19,
        priceSubTitle: "Get maximum exposure and priority placement.",
        popular: false,
        button: "Start Featured Trial",
        trial: "7-day free trial. Cancel anytime.",
        features: [
            "List up to 10 spaces",
            "Up to 30 photos",
            "In-app messaging",
            "Top placement in results",
            "Featured badge",
            "Advanced analytics",
            "Priority support",
        ],
    },
];

const comparison = [
    {
        feature: "Listing visibility",
        basic: "Standard",
        pro: "Enhanced",
        featured: "Top placement",
    },
    {
        feature: "Photo limits per listing",
        basic: "Up to 6",
        pro: "Up to 20",
        featured: "Up to 30",
    },
    {
        feature: "In-app messaging",
        basic: true,
        pro: true,
        featured: true,
    },
    {
        feature: "Featured placement",
        basic: false,
        pro: false,
        featured: true,
    },
    {
        feature: "Analytics",
        basic: "-",
        pro: "Basic",
        featured: "Advanced",
    },
    {
        feature: "Support",
        basic: "Email",
        pro: "Priority Email",
        featured: "Priority",
    },
];

const Pricing = () => {
    return (
        <>
            <Navbar />

            <section className="pricing-section py-5">

                <div className="container pricing_div">

                    <div className="text-center mb-5">

                        <h1 className="pricing-title">
                            Simple Pricing for{" "}
                            <span>Hosts.</span>
                        </h1>

                        <p className="pricing-subtitle">
                            Choose the plan that fits your goals.
                            Upgrade, downgrade, or cancel anytime.
                        </p>

                    </div>

                    {/* Pricing Cards */}

                    <div className="row g-5">

                        {plans.map((plan) => (

                            <div
                                className="col-lg-4"
                                key={plan.id}
                            >

                                <div
                                    className={`pricing-card ${plan.popular ? "active" : ""
                                        }`}
                                >

                                    {plan.popular && (
                                        <span className="popular-badge">
                                            MOST POPULAR
                                        </span>
                                    )}

                                    <h4>{plan.name}</h4>

                                    <p>{plan.subtitle}</p>

                                    <div className="price-new">

                                        ${plan.price}

                                        <span>/mo</span>

                                    <p>{plan.priceSubTitle}</p>
                                    </div>

                                    <ul className="feature-list">

                                        {plan.features.map(
                                            (feature, index) => (

                                                <li key={index}>

                                                    <Check size={16} />

                                                    {feature}

                                                </li>

                                            )
                                        )}

                                    </ul>

                                    <button className="pricing-btn">

                                        {plan.button}

                                    </button>

                                    {plan.trial && (

                                        <small>

                                            {plan.trial}

                                        </small>

                                    )}

                                </div>

                            </div>

                        ))}

                    </div>

                    {/* Comparison Table */}

                    <div className="pricing-table mt-5">

                        <div className="table-responsive">

                            <table className="table align-middle">

                                <thead>

                                    <tr>

                                        <th>Features</th>

                                        <th>Basic</th>

                                        <th>Pro</th>

                                        <th>Featured</th>

                                    </tr>

                                </thead>

                                <tbody>

                                    {comparison.map((row, index) => (

                                        <tr key={index}>

                                            <td>{row.feature}</td>

                                            <td>
                                                {typeof row.basic ===
                                                    "boolean" ? (
                                                    row.basic ? (
                                                        <CircleCheckBig
                                                            size={18}
                                                            color="#19b6b2"
                                                        />
                                                    ) : (
                                                        "-"
                                                    )
                                                ) : (
                                                    row.basic
                                                )}
                                            </td>

                                            <td>
                                                {typeof row.pro ===
                                                    "boolean" ? (
                                                    row.pro ? (
                                                        <CircleCheckBig
                                                            size={18}
                                                            color="#19b6b2"
                                                        />
                                                    ) : (
                                                        "-"
                                                    )
                                                ) : (
                                                    row.pro
                                                )}
                                            </td>

                                            <td>
                                                {typeof row.featured ===
                                                    "boolean" ? (
                                                    row.featured ? (
                                                        <CircleCheckBig
                                                            size={18}
                                                            color="#19b6b2"
                                                        />
                                                    ) : (
                                                        "-"
                                                    )
                                                ) : (
                                                    row.featured
                                                )}
                                            </td>

                                        </tr>

                                    ))}

                                </tbody>

                            </table>

                        </div>

                    </div>

                    {/* Bottom Notice */}

                    <div className="pricing-bottom">

                        <BadgeCheck size={22} />

                        <div>

                            <b>Great news for renters:&nbsp;</b> 
                            Browsing and contacting hosts
                            is 100% free. No hidden fees,
                            ever.
                        </div>

                    </div>

                </div>

            </section>

            <Footer />
        </>
    );
};

export default Pricing;