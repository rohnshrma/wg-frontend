/**
 * The landing page's FAQ content.
 *
 * Extracted from the client component so the server component can emit
 * FAQPage JSON-LD from the *same* source the accordion renders. Structured
 * data that can drift from the visible answers is worse than none — Google
 * treats a mismatch as cloaking.
 */
export const faqs: { q: string; a: string }[] = [
  { q: "Do I need prior knowledge to join the course?", a: "No. You can start from the basics — we begin with Excel fundamentals in Week 1. Already comfortable with Excel? You can start from Phase 2 and skip the fundamentals." },
  { q: "Which is better for me: Data Analytics or Full Stack Development?", a: "Data Analytics suits you if you enjoy working with data and numbers, finding trends, and creating dashboards. Full Stack is better if you enjoy building websites/apps, coding, and backend problem-solving." },
  { q: "How practical are the training sessions?", a: "100% hands-on. Every major concept is backed by practical work — you'll build the dashboard or write the code yourself, with 1-on-1 mentor feedback on every lab." },
  { q: "What jobs can I get after completing the course?", a: "Roles like Data Analyst, Business Analyst, and Junior Data Scientist — our students have gone on to companies including KPMG, Adobe, and Streams Solutions Pvt. Ltd.\n\nSalary range: ₹3.5–10 LPA depending on background and experience." },
  { q: "Is placement guaranteed?", a: "We don't promise a guaranteed job — no responsible training program can. What we do provide: placement support including resume review with hiring managers, mock interviews across 3 rounds, LinkedIn optimisation, introductions within our hiring network, and a 6-week internship. Our focus is giving you every real advantage in the job search, not an empty guarantee." },
  { q: "What's included in the course fee?", a: "All course materials & recordings, 10+ industry-standard projects, a 6-week paid internship, personalised career guidance, 3 mock interview rounds, placement assistance, lifetime access to recordings, and alumni community access.\n\nNot included: optional certifications (extra cost), and your own laptop." },
  { q: "Can I pay the course fee in installments?", a: "Yes — full payment (5% bonus + free advanced module), monthly EMI (no interest, no hidden charges), or 50% upfront + 50% after 1 month. All options give the same course access." },
  { q: "How much time should I dedicate to the course?", a: "1 hour of live, mentor-led class per day, plus 2-3 hours of self-practice and project work — roughly 15-20 hours/week total. Designed to be manageable alongside a job." },
  { q: "How long is the course?", a: "6-7 months across 10 modules — Excel, SQL, Python, Pandas, EDA & visualization, advanced analytics (NumPy/Seaborn/SciPy), Power BI, Tableau, MongoDB, and real-world projects. New batches roll every 2 weeks." },
];
