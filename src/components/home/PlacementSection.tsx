"use client";

import { motion } from "framer-motion";
import { Building2, TrendingUp, ArrowRight } from "lucide-react";
import Link from "next/link";

const companies = [
  "TCS", "Infosys", "Wipro", "Accenture", "Cognizant",
  "Tech Mahindra", "HCL", "Capgemini", "Deloitte", "EY",
];

const placements = [
  { name: "Priya S.", role: "Data Analyst", company: "TCS", package: "6.5 LPA" },
  { name: "Rahul P.", role: "Full Stack Dev", company: "Infosys", package: "7 LPA" },
  { name: "Sneha K.", role: "Business Analyst", company: "Accenture", package: "5.5 LPA" },
  { name: "Amit D.", role: "Python Dev", company: "Wipro", package: "5 LPA" },
  { name: "Neha R.", role: "Data Scientist", company: "Cognizant", package: "8 LPA" },
  { name: "Rohan M.", role: "ML Engineer", company: "Deloitte", package: "9 LPA" },
];

export default function PlacementSection() {
  return (
    <section className="section-padding bg-surface-dark text-white relative overflow-hidden">
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-secondary/10 rounded-full blur-[100px]" />

      <div className="container-custom relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-accent text-sm font-semibold mb-4">
            <TrendingUp className="w-4 h-4" />
            Placement Track Record
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
            Our Students Work At{" "}
            <span className="bg-gradient-to-r from-accent to-accent-warm bg-clip-text text-transparent">
              Top Companies
            </span>
          </h2>
          <p className="text-white/50 text-lg max-w-2xl mx-auto">
            500+ students successfully placed in leading IT companies with
            competitive packages.
          </p>
        </motion.div>

        {/* Company Logos Marquee */}
        <div className="mb-14 overflow-hidden">
          <div className="flex gap-6 animate-marquee">
            {[...companies, ...companies].map((company, i) => (
              <div
                key={`${company}-${i}`}
                className="shrink-0 px-8 py-4 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center min-w-[160px] hover:bg-white/10 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-white/40" />
                  <span className="text-white/70 font-semibold text-sm whitespace-nowrap">
                    {company}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Placement Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4"
        >
          {placements.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="bg-white/5 border border-white/10 rounded-xl p-4 text-center hover:bg-white/10 transition-all"
            >
              <div className="w-12 h-12 mx-auto rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold text-lg mb-3">
                {p.name[0]}
              </div>
              <p className="font-semibold text-white text-sm">{p.name}</p>
              <p className="text-xs text-white/50 mb-1">{p.role}</p>
              <p className="text-xs text-secondary">{p.company}</p>
              <p className="text-sm font-bold text-success mt-2">{p.package}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <div className="text-center mt-10">
          <Link
            href="/testimonials"
            className="group inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-white/20 text-white font-semibold hover:bg-white/10 transition-all"
          >
            View All Success Stories
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
