"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Users, GraduationCap, BookOpen, Award } from "lucide-react";

const stats = [
  { icon: Users, value: 500, suffix: "+", label: "Students Placed", color: "text-primary" },
  { icon: GraduationCap, value: 100, suffix: "+", label: "Batches Completed", color: "text-secondary" },
  { icon: BookOpen, value: 10, suffix: "+", label: "Courses Offered", color: "text-accent" },
  { icon: Award, value: 6, suffix: "+", label: "Years Experience", color: "text-success" },
];

function AnimatedNumber({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const duration = 2000;
          const steps = 60;
          const increment = value / steps;
          let current = 0;
          const timer = setInterval(() => {
            current += increment;
            if (current >= value) {
              setCount(value);
              clearInterval(timer);
            } else {
              setCount(Math.floor(current));
            }
          }, duration / steps);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

export default function StatsCounter() {
  return (
    <section className="py-16 gradient-primary relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 2px 2px, white 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="container-custom relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="w-14 h-14 mx-auto rounded-2xl bg-white/10 flex items-center justify-center mb-4">
                <stat.icon className="w-7 h-7 text-white" />
              </div>
              <p className="text-3xl md:text-4xl font-extrabold text-white mb-1">
                <AnimatedNumber value={stat.value} suffix={stat.suffix} />
              </p>
              <p className="text-sm text-white/60 font-medium">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
