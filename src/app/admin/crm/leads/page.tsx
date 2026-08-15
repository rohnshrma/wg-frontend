"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Users,
  Plus,
  Search,
  Filter,
  TrendingUp,
  Mail,
  Phone,
  Building,
  DollarSign,
  Calendar,
} from "lucide-react";

export default function LeadsPage() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchLeads = async () => {
      try {
        // TODO: Replace with actual API call
        // const response = await fetch('/api/leads');
        // const data = await response.json();
        setLoading(false);
      } catch (error) {
        console.error("Error fetching leads:", error);
        setLoading(false);
      }
    };

    fetchLeads();
  }, []);

  const statuses = [
    { label: "New", value: "new", color: "bg-blue-100 text-blue-800" },
    { label: "Contacted", value: "contacted", color: "bg-purple-100 text-purple-800" },
    { label: "Qualified", value: "qualified", color: "bg-yellow-100 text-yellow-800" },
    { label: "Proposal Sent", value: "proposal_sent", color: "bg-orange-100 text-orange-800" },
    { label: "Won", value: "won", color: "bg-green-100 text-green-800" },
    { label: "Lost", value: "lost", color: "bg-red-100 text-red-800" },
  ];

  const budgetRanges = [
    { label: "$5k-10k", value: "$5k-10k" },
    { label: "$10k-25k", value: "$10k-25k" },
    { label: "$25k-50k", value: "$25k-50k" },
    { label: "$50k+", value: "$50k+" },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg bg-blue-600/10 flex items-center justify-center">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-slate-950">Leads</h1>
                <p className="text-slate-600">Manage and track all project inquiries</p>
              </div>
            </div>
            <Link
              href="/admin/crm/leads/new"
              className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
            >
              <Plus className="w-5 h-5" />
              Add Lead
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "Total Leads", value: "0", icon: Users, color: "blue" },
              { label: "This Month", value: "0", icon: Calendar, color: "purple" },
              { label: "Conversion Rate", value: "0%", icon: TrendingUp, color: "green" },
              { label: "Avg. Deal Size", value: "$0", icon: DollarSign, color: "orange" },
            ].map((stat) => {
              const Icon = stat.icon;
              return (
                <div key={stat.label} className="bg-white rounded-lg p-4 border border-slate-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-slate-600 text-sm font-medium">{stat.label}</p>
                      <p className="text-2xl font-bold text-slate-950 mt-2">{stat.value}</p>
                    </div>
                    <div className={`w-10 h-10 rounded-lg bg-${stat.color}-100 flex items-center justify-center`}>
                      <Icon className={`w-5 h-5 text-${stat.color}-600`} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-40">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search by name, email, or company..."
                className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            {/* Filter buttons */}
            <div className="flex gap-2 overflow-x-auto">
              <button className="flex items-center gap-2 px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors whitespace-nowrap">
                <Filter className="w-4 h-4" />
                Status
              </button>
              <button className="flex items-center gap-2 px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors whitespace-nowrap">
                Budget Range
              </button>
              <button className="flex items-center gap-2 px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors whitespace-nowrap">
                Service Type
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Leads Table */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin w-8 h-8 border-4 border-slate-200 border-t-blue-600 rounded-full mx-auto"></div>
            <p className="text-slate-600 mt-4">Loading leads...</p>
          </div>
        ) : leads.length === 0 ? (
          <div className="bg-white rounded-lg border border-slate-200 p-12 text-center">
            <Users className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-slate-950 mb-2">No leads yet</h3>
            <p className="text-slate-600 mb-6">Start by adding your first lead or website inquiries will appear here.</p>
            <Link
              href="/admin/crm/leads/new"
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
            >
              <Plus className="w-5 h-5" />
              Add First Lead
            </Link>
          </div>
        ) : (
          <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-slate-950">Name</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-slate-950">Contact</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-slate-950">Project Type</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-slate-950">Budget</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-slate-950">Status</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-slate-950">Action</th>
                </tr>
              </thead>
              <tbody>
                {/* Empty state - will populate with real data */}
                <tr className="border-t border-slate-200 hover:bg-slate-50 transition-colors">
                  <td colSpan={6} className="px-6 py-8 text-center text-slate-600">
                    No leads to display
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
