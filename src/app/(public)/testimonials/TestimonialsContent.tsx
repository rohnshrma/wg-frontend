"use client";

import { motion } from "framer-motion";
import { Star, Award, ArrowRight, GraduationCap } from "lucide-react";
import Link from "next/link";

const testimonials = [
  { id: 1, name: "Priya Sharma", course: "Data Science", company: "TCS", role: "Data Analyst", pkg: "6.5 LPA", rating: 5, text: "WebiGeeks transformed my career completely. The hands-on projects and AI-integrated curriculum prepared me for real-world challenges. I got placed at TCS within 2 months!" },
  { id: 2, name: "Rahul Patel", course: "MERN Stack", company: "Infosys", role: "Full Stack Dev", pkg: "7 LPA", rating: 5, text: "The MERN Stack course was incredibly comprehensive. Building real projects gave me the confidence to crack interviews. The mentors are always available for doubt clearing." },
  { id: 3, name: "Sneha Kulkarni", course: "Data Analytics", company: "Accenture", role: "Business Analyst", pkg: "5.5 LPA", rating: 5, text: "Coming from a non-tech background, I was worried. But WebiGeeks made everything so simple and practical. The Power BI and SQL skills I learned here are exactly what companies need." },
  { id: 4, name: "Amit Deshmukh", course: "Python", company: "Wipro", role: "Python Dev", pkg: "5 LPA", rating: 4, text: "Excellent training with real-world projects. The flexible timings helped me learn while working. I highly recommend WebiGeeks to anyone looking to upskill." },
  { id: 5, name: "Neha Rajput", course: "Data Science", company: "Cognizant", role: "Data Scientist", pkg: "8 LPA", rating: 5, text: "The Deep Learning and NLP modules were outstanding. I built 5 projects that I showcased in interviews. Got multiple offers and chose Cognizant!" },
  { id: 6, name: "Rohan Mehta", course: "Artificial Intelligence", company: "Deloitte", role: "ML Engineer", pkg: "9 LPA", rating: 5, text: "The AI course at WebiGeeks is unmatched. From neural networks to GenAI, everything was taught with practical implementation. Best investment in my career." },
  { id: 7, name: "Pooja Joshi", course: "Power BI", company: "EY", role: "BI Analyst", pkg: "6 LPA", rating: 5, text: "The Power BI course helped me create dashboards that impressed my interviewers. Got placed at EY within a month of course completion." },
  { id: 8, name: "Vikram Singh", course: "MERN Stack", company: "Tech Mahindra", role: "React Developer", pkg: "5.5 LPA", rating: 4, text: "I went from zero coding knowledge to building full-stack apps in 4 months. The project-based approach is what makes WebiGeeks special." },
  { id: 9, name: "Anjali Patil", course: "Data Analytics", company: "Capgemini", role: "Data Analyst", pkg: "5 LPA", rating: 5, text: "SQL and Excel training was extremely practical. Every concept was taught with real business scenarios. Excellent placement support team!" },
];

export default function TestimonialsContent() {
  return (
    <>
      {/* Hero */}
      <section className="gradient-hero text-white py-16 md:py-20 relative overflow-hidden">
        <div className="absolute top-10 right-20 w-72 h-72 bg-primary/20 rounded-full blur-[100px]" />
        <div className="container-custom relative text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-sm font-medium mb-6">
              <Award className="w-4 h-4 text-accent" />
              Success Stories
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
              What Our <span className="bg-gradient-to-r from-accent to-accent-warm bg-clip-text text-transparent">Students Say</span>
            </h1>
            <p className="text-white/60 text-lg max-w-xl mx-auto">
              Real stories from real students who transformed their careers.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="bg-white rounded-xl border border-border p-6 card-hover"
              >
                {/* Stars */}
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <Star key={j} className={`w-4 h-4 ${j < t.rating ? "text-accent-warm fill-accent-warm" : "text-gray-200"}`} />
                  ))}
                </div>

                {/* Text */}
                <p className="text-sm text-text-secondary leading-relaxed mb-5 italic">
                  &ldquo;{t.text}&rdquo;
                </p>

                {/* Author */}
                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center text-white font-bold text-sm">
                      {t.name[0]}
                    </div>
                    <div>
                      <p className="font-bold text-text-primary text-sm">{t.name}</p>
                      <p className="text-xs text-text-muted">{t.role} at {t.company}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-text-muted">{t.course}</p>
                    <p className="text-sm font-bold text-success">{t.pkg}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 gradient-primary text-white text-center">
        <div className="container-custom">
          <GraduationCap className="w-12 h-12 mx-auto mb-4 opacity-80" />
          <h2 className="text-3xl font-extrabold mb-3">Be the Next Success Story</h2>
          <p className="text-white/60 text-lg mb-6 max-w-lg mx-auto">
            Join WebiGeeks and start your journey towards a rewarding tech career.
          </p>
          <Link href="/contact" className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl gradient-accent text-white font-bold shadow-lg hover:shadow-glow-accent transition-shadow">
            Start Your Journey <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </>
  );
}
