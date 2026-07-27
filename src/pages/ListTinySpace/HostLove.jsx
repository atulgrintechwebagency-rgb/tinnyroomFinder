import {
  Users,
  MessageCircleMore,
  CircleCheck,
  DollarSign,
} from "lucide-react";

const features = [
  {
    icon: <Users size={25} />,
    title: "Reach Qualified Renters",
    desc: "Connect with verified renters actively looking for small spaces like yours.",
  },
  {
    icon: <MessageCircleMore size={25} />,
    title: "Verified Messaging",
    desc: "Communicate securely through our platform before deciding.",
  },
  {
    icon: <CircleCheck size={25} />,
    title: "Easy Listing Setup",
    desc: "Create your listing in minutes and start getting interest.",
  },
  {
    icon: <DollarSign size={25} />,
    title: "Flexible Pricing",
    desc: "Set your own price, update anytime, and maximize your income.",
  },
];

const HostLove = () => {
  return (
    <section className="host-benefits">
      <div className="container">

        <h2 className="section-heading">
          Why Hosts Love TinyRoomFinder
        </h2>

        <div className="row g-3 mt-4 mt-md-0">

          {features.map((item, index) => (
            <div className="col-lg-3 col-md-6" key={index}>

              <div className="host-card">

                <div className="host-icon">
                  {item.icon}
                </div>

                <div className="host-content">

                  <h4>{item.title}</h4>

                  <p>{item.desc}</p>

                </div>

              </div>

            </div>
          ))}

        </div>

      </div>
    </section>
  );
};

export default HostLove;