import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Area,
  AreaChart
} from 'recharts';
import {
  TrendingUp,
  TrendingDown,
  BarChart3,
  PieChart as PieChartIcon,
  Activity,
  Users,
  FileText,
  Lightbulb,
  Shield,
  Download,
  Calendar,
  Filter
} from 'lucide-react';

// --- UI starts here ---


export function AnalyticsDashboard() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [kpi, setKpi] = useState<any>({ papers: 0, patents: 0, inventions: 0, collaborations: 0 });
  const [metrics, setMetrics] = useState<any[]>([]);
  const [domains, setDomains] = useState<any[]>([]);
  const [collab, setCollab] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        // Fetch research projects (papers)
        const { data: projects, error: projErr } = await supabase
          .from('research_projects')
          .select('id, domain, created_at');
        if (projErr) throw projErr;

        // Fetch inventions
        const { data: inventions, error: invErr } = await supabase
          .from('inventions')
          .select('id, created_at');
        if (invErr) throw invErr;

        // Fetch collaborators
        const { data: collaborators, error: collabErr } = await supabase
          .from('collaborators')
          .select('id, created_at');
        if (collabErr) throw collabErr;

        // Fetch patents (assume 'artifacts' table with type = 'patent')
        const { data: patents, error: patErr } = await supabase
          .from('artifacts')
          .select('id, created_at')
          .eq('type', 'patent');
        if (patErr) throw patErr;

        // KPI cards
        setKpi({
          papers: projects.length,
          patents: patents.length,
          inventions: inventions.length,
          collaborations: collaborators.length
        });

        // Metrics by month (last 6 months)
        const months = Array.from({ length: 6 }, (_, i) => {
          const d = new Date();
          d.setMonth(d.getMonth() - (5 - i));
          return d;
        });
        const monthFmt = (d: Date) => d.toLocaleString('default', { month: 'short' });
        const metricsData = months.map((d) => {
          const m = d.getMonth();
          const y = d.getFullYear();
          return {
            month: monthFmt(d),
            papers: projects.filter(p => new Date(p.created_at).getMonth() === m && new Date(p.created_at).getFullYear() === y).length,
            patents: patents.filter(p => new Date(p.created_at).getMonth() === m && new Date(p.created_at).getFullYear() === y).length,
            inventions: inventions.filter(i => new Date(i.created_at).getMonth() === m && new Date(i.created_at).getFullYear() === y).length
          };
        });
        setMetrics(metricsData);

        // Domain distribution
        const domainCounts: Record<string, number> = {};
        projects.forEach(p => {
          if (p.domain) domainCounts[p.domain] = (domainCounts[p.domain] || 0) + 1;
        });
        const domainColors = ['#3B82F6', '#10B981', '#F59E0B', '#8B5CF6', '#6B7280'];
        const domainsArr = Object.entries(domainCounts).map(([name, value], idx) => ({
          name,
          value,
          color: domainColors[idx % domainColors.length]
        }));
        setDomains(domainsArr);

        // Collaboration data by month
        const collabData = months.map((d) => {
          const m = d.getMonth();
          const y = d.getFullYear();
          return {
            month: monthFmt(d),
            count: collaborators.filter(c => new Date(c.created_at).getMonth() === m && new Date(c.created_at).getFullYear() === y).length
          };
        });
        setCollab(collabData);

        setLoading(false);
      } catch (e: any) {
        setError(e.message || 'Failed to load analytics');
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const kpiCards = [
    {
      title: 'Total Research Papers',
      value: kpi.papers,
      change: '',
      trend: 'up',
      icon: FileText,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Patent Applications',
      value: kpi.patents,
      change: '',
      trend: 'up',
      icon: Shield,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      title: 'Inventions Generated',
      value: kpi.inventions,
      change: '',
      trend: 'up',
      icon: Lightbulb,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50'
    },
    {
      title: 'Active Collaborations',
      value: kpi.collaborations,
      change: '',
      trend: 'up',
      icon: Users,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <motion.div
      className="space-y-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Header */}
      <motion.div variants={itemVariants}>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
            <p className="text-gray-600 mt-1">
              Track research performance and collaboration metrics
            </p>
          </div>
          <div className="flex space-x-3">
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
            <Button variant="outline">
              <Calendar className="h-4 w-4 mr-2" />
              Date Range
            </Button>
            <Button className="aria-gradient text-white">
              <Download className="h-4 w-4 mr-2" />
              Export Report
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Loading/Error State */}
      {loading && (
        <div className="text-center text-gray-500 py-10">Loading analytics...</div>
      )}
      {error && (
        <div className="text-center text-red-500 py-10">{error}</div>
      )}

      {/* KPI Cards and Charts Grid */}
      {!loading && !error && (
        <>
          <motion.div variants={itemVariants}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {kpiCards.map((kpi, index) => {
                const Icon = kpi.icon;
                return (
                  <motion.div
                    key={kpi.title}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                    className="cursor-pointer"
                  >
                    <Card className="hover:shadow-lg transition-all duration-300">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="text-2xl font-bold text-gray-900">{kpi.value}</div>
                            <div className="text-sm text-gray-500 mt-1">{kpi.title}</div>
                          </div>
                          <div className={`rounded-full p-2 ${kpi.bgColor}`}>
                            <Icon className={`h-6 w-6 ${kpi.color}`} />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Charts Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
            {/* Research Metrics Chart */}
            <motion.div variants={itemVariants}>
              <Card>
                <CardHeader>
                  <CardTitle>Research Output Over Time</CardTitle>
                  <CardDescription>
                    Monthly papers, patents, and inventions
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={240}>
                    <BarChart data={metrics}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="papers" fill="#3B82F6" name="Papers" />
                      <Bar dataKey="patents" fill="#8B5CF6" name="Patents" />
                      <Bar dataKey="inventions" fill="#F59E0B" name="Inventions" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </motion.div>

            {/* Domain Distribution Pie Chart */}
            <motion.div variants={itemVariants}>
              <Card>
                <CardHeader>
                  <CardTitle>Domain Distribution</CardTitle>
                  <CardDescription>
                    Research projects by domain
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={240}>
                    <PieChart>
                      <Pie
                        data={domains}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        label
                      >
                        {domains.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </>
      )}
    </motion.div>
  );
}