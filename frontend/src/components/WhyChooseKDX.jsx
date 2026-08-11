import { motion } from "framer-motion";
import {
  Truck,
  ShieldCheck,
  RotateCcw,
  Sparkles,
} from "lucide-react";

function WhyChooseKDX() {
  const features = [
    {
      icon: Truck,
      title: "Fast Delivery",
      description:
        "Get your favorite products delivered quickly and safely.",
    },
    {
      icon: ShieldCheck,
      title: "Secure Payments",
      description:
        "Your payments and personal information stay protected.",
    },
    {
      icon: RotateCcw,
      title: "Easy Returns",
      description:
        "Shop confidently with our simple and hassle-free returns.",
    },
    {
      icon: Sparkles,
      title: "Premium Products",
      description:
        "Discover carefully selected products made for modern living.",
    },
  ];

  return (
    <section className="py-28 bg-black">

      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center"
        >
          <p className="text-yellow-500 uppercase tracking-[5px] text-sm font-semibold">
            Why KDX
          </p>

          <h2 className="text-4xl md:text-5xl font-bold mt-4">
            Why Choose KDX?
          </h2>

          <p className="text-gray-500 mt-5 max-w-2xl mx-auto text-lg">
            Premium products, trusted service, and an experience
            designed around you.
          </p>
        </motion.div>

        {/* Features */}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">

          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <motion.div
                key={feature.title}
                initial={{
                  opacity: 0,
                  y: 40,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
                }}
                whileHover={{
                  y: -8,
                }}
                className="group bg-[#111] border border-zinc-800 hover:border-yellow-500/50 rounded-3xl p-8 text-center transition duration-300"
              >

                {/* Icon */}

                <div className="w-16 h-16 mx-auto rounded-2xl bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center group-hover:bg-yellow-500 transition duration-300">

                  <Icon
                    size={30}
                    className="text-yellow-500 group-hover:text-black transition"
                  />

                </div>

                {/* Title */}

                <h3 className="text-xl font-semibold mt-7">
                  {feature.title}
                </h3>

                {/* Description */}

                <p className="text-gray-500 mt-4 leading-7">
                  {feature.description}
                </p>

              </motion.div>
            );
          })}

        </div>

      </div>

    </section>
  );
}

export default WhyChooseKDX;