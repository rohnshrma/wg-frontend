export const navItems = [
  { label: "Home", href: "/" },
  { label: "Courses", href: "/courses" },
  { label: "About", href: "/about" },
  { label: "Testimonials", href: "/testimonials" },
  { label: "Gallery", href: "/gallery" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
] as const;

export const dashboardNavItems = [
  { label: "Overview", href: "/dashboard", icon: "LayoutDashboard" },
  { label: "Profile", href: "/dashboard/profile", icon: "User" },
  { label: "My Course", href: "/dashboard/course", icon: "GraduationCap" },
  { label: "Payments", href: "/dashboard/payments", icon: "CreditCard" },
  { label: "Notifications", href: "/dashboard/notifications", icon: "Bell" },
  { label: "Documents", href: "/dashboard/documents", icon: "FileText" },
] as const;

export const adminNavItems = [
  { label: "Dashboard", href: "/admin", icon: "LayoutDashboard" },
  { label: "Students", href: "/admin/students", icon: "Users" },
  { label: "Leads", href: "/admin/leads", icon: "UserPlus" },
  { label: "Courses", href: "/admin/courses", icon: "BookOpen" },
  { label: "Payments", href: "/admin/payments", icon: "CreditCard" },
  { label: "Testimonials", href: "/admin/testimonials", icon: "MessageSquare" },
  { label: "Gallery", href: "/admin/gallery", icon: "Image" },
  { label: "Blogs", href: "/admin/blogs", icon: "PenSquare" },
  { label: "Notifications", href: "/admin/notifications", icon: "Bell" },
  { label: "Settings", href: "/admin/settings", icon: "Settings" },
] as const;
