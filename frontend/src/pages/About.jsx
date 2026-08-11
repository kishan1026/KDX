import { motion } from "framer-motion";
import {
  Crown,
  ShieldCheck,
  Sparkles,
  Truck,
  Heart,
  ShoppingBag,
} from "lucide-react";

function About() {
  const features = [
    {
      icon: Crown,
      title: "Premium Experience",
      description:
        "KDX is designed to deliver a premium shopping experience with elegant design and carefully selected products.",
    },
    {
      icon: ShieldCheck,
      title: "Secure Shopping",
      description:
        "Your account, orders, and shopping experience are protected with secure authentication and reliable systems.",
    },
    {
      icon: Truck,
      title: "Reliable Delivery",
      description:
        "We aim to make every order simple, smooth, and convenient from checkout to delivery.",
    },
    {
      icon: Heart,
      title: "Customer First",
      description:
        "Everything we build at KDX is focused on creating a better experience for our customers.",
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white">

      {/* Hero Section */}

      <section className="relative overflow-hidden">

        {/* Gold glow */}

        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-96 h-96 bg-yellow-500/10 blur-[120px] rounded-full" />

        <div className="relative max-w-7xl mx-auto px-6 py-24 text-center">

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >

            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 rounded-2xl border border-yellow-500/40 bg-yellow-500/10 flex items-center justify-center">
                <Crown
                  size={32}
                  className="text-yellow-400"
                />
              </div>
            </div>

            <p className="text-yellow-400 uppercase tracking-[0.4em] text-sm font-semibold">
              About KDX
            </p>

            <h1 className="text-5xl md:text-7xl font-bold mt-5">
              More Than
              <span className="text-yellow-400"> Shopping.</span>
            </h1>

            <p className="max-w-3xl mx-auto text-gray-400 text-lg md:text-xl leading-8 mt-7">
              KDX is built for people who appreciate quality,
              simplicity, and a premium digital shopping experience.
            </p>

          </motion.div>

        </div>

      </section>

      {/* Our Story */}

      <section className="max-w-7xl mx-auto px-6 py-20">

        <div className="grid lg:grid-cols-2 gap-16 items-center">

          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >

            <p className="text-yellow-400 uppercase tracking-widest text-sm font-semibold">
              Our Story
            </p>

            <h2 className="text-4xl md:text-5xl font-bold mt-4">
              Built with a
              <span className="text-yellow-400"> vision.</span>
            </h2>

            <p className="text-gray-400 leading-8 mt-7">
              KDX was created with a simple idea — online shopping
              should feel premium, effortless, and enjoyable.
            </p>

            <p className="text-gray-400 leading-8 mt-5">
              From discovering products to managing orders, every
              part of KDX is designed with attention to detail and
              a focus on delivering a smooth customer experience.
            </p>

          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >

            <div className="absolute inset-0 bg-yellow-500/10 blur-3xl" />

            <div className="relative bg-[#0d0d0d] border border-yellow-500/20 rounded-3xl p-10 md:p-14">

              <Sparkles
                size={40}
                className="text-yellow-400"
              />

              <h3 className="text-3xl font-bold mt-7">
                The KDX Standard
              </h3>

              <p className="text-gray-400 leading-7 mt-5">
                Premium design. Reliable technology. Quality products.
                A shopping experience built around you.
              </p>

            </div>

          </motion.div>

        </div>

      </section>

      {/* Features */}

      <section className="max-w-7xl mx-auto px-6 py-20">

        <div className="text-center">

          <p className="text-yellow-400 uppercase tracking-widest text-sm font-semibold">
            Why KDX
          </p>

          <h2 className="text-4xl md:text-5xl font-bold mt-4">
            Designed for
            <span className="text-yellow-400"> excellence.</span>
          </h2>

        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-14">

          {features.map((feature, index) => {

            const Icon = feature.icon;

            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{
                  y: -8,
                  borderColor: "rgba(234,179,8,0.4)",
                }}
                className="bg-[#0d0d0d] border border-zinc-800 rounded-3xl p-7 transition"
              >

                <div className="w-14 h-14 rounded-2xl bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center">

                  <Icon
                    size={27}
                    className="text-yellow-400"
                  />

                </div>

                <h3 className="text-xl font-semibold mt-6">
                  {feature.title}
                </h3>

                <p className="text-gray-400 mt-3 leading-7">
                  {feature.description}
                </p>

              </motion.div>
            );

          })}

        </div>

      </section>

      {/* Bottom CTA */}

      <section className="max-w-7xl mx-auto px-6 py-20">

        <div className="bg-[#0d0d0d] border border-yellow-500/20 rounded-3xl p-10 md:p-16 text-center">

          <ShoppingBag
            size={42}
            className="text-yellow-400 mx-auto"
          />

          <h2 className="text-3xl md:text-4xl font-bold mt-6">
            Welcome to <span className="text-yellow-400">KDX.</span>
          </h2>

          <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
            Discover a better way to shop — premium, simple, and
            designed for you.
          </p>

        </div>

      </section>

    </div>
  );
}

export default About;