"use client";

import { motion } from "framer-motion";
import NotificationsList from "@/components/shared/NotificationsList";

export default function NotificationsPage() {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
      <NotificationsList />
    </motion.div>
  );
}
