"use client";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter, CardDescription } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
import { Skeleton } from "../../components/ui/skeleton";
import { Progress } from "../../components/ui/progress";
import { ArrowUpRight, Clock, FileText, TrendingUp, Wallet, CheckCircle2, XCircle, LogOut } from 'lucide-react';
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { BarChart, Bar, ResponsiveContainer } from 'recharts';

interface Upload {
  _id: string;
  title: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  price: number;
  createdAt: string;
  balance?: number;
}

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { theme } = useTheme();
  const [uploads, setUploads] = useState<Upload[]>([]);
  const [earnings, setEarnings] = useState(0);
  const [balance, setBalance] = useState(0);
  const [approvedCount, setApprovedCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  const handleLogout = async () => {
    await signOut({ callbackUrl: '/' });
  };

  // Mock data for chart
  const chartData = [
    { name: 'Mon', earnings: 5 },
    { name: 'Tue', earnings: 10 },
    { name: 'Wed', earnings: 15 },
    { name: 'Thu', earnings: 5 },
    { name: 'Fri', earnings: 20 },
    { name: 'Sat', earnings: 25 },
    { name: 'Sun', earnings: 15 },
  ];

  useEffect(() => {
    if (status === 'loading') return;

    if (!session) {
      router.push('/auth/signin');
      return;
    }

    if (session.user?.role === 'ADMIN') {
      router.push('/admin');
      return;
    }

    fetchUserData();
  }, [session, status, router]);

  const fetchUserData = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/user/uploads');
      const data = await response.json();
      setUploads(data.uploads || []);
      setEarnings(data.earnings || 0);
      setBalance(data.balance || 0);
      setApprovedCount(data.approvedCount || 0);
    } catch (error) {
      console.error('Failed to fetch user data:', error);
      setUploads([]);
      setBalance(0);
      setApprovedCount(0);
    } finally {
      setIsLoading(false);
    }
  };

  // Add auto-refresh every 10 seconds
  // Disabled auto-refresh to prevent multiple page refreshes
  // useEffect(() => {
  //   const interval = setInterval(fetchUserData, 10000);
  //   return () => clearInterval(interval);
  // }, []);

  // Animate progress bar
  useEffect(() => {
    const timer = setTimeout(() => setProgress(100), 500);
    return () => clearTimeout(timer);
  }, []);

  // Calculate status counts
  const pendingCount = uploads.filter(u => u.status === 'PENDING').length;
  const rejectedCount = uploads.filter(u => u.status === 'REJECTED').length;

  const getStatusIcon = (status: string) => {
    switch(status) {
      case 'APPROVED': return <CheckCircle2 className="h-4 w-4 text-green-500" />;
      case 'REJECTED': return <XCircle className="h-4 w-4 text-red-500" />;
      default: return <Clock className="h-4 w-4 text-yellow-500" />;
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto pt-24 pb-20 px-4 max-w-7xl">
        <div className="space-y-6">
          <Skeleton className="h-12 w-[250px]" />
          <div className="grid gap-6 md:grid-cols-3">
            <Skeleton className="h-[180px] rounded-xl" />
            <Skeleton className="h-[180px] rounded-xl" />
            <Skeleton className="h-[180px] rounded-xl" />
          </div>
          <Skeleton className="h-[300px] rounded-xl" />
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto pt-24 pb-10 px-4 max-w-7xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-4xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Welcome back, {session?.user?.name || 'User'}! Here&apos;s what&apos;s happening with your notes.
          </p>
        </div>
        <div className="flex gap-2">
          <Button onClick={() => router.push('/upload')} className="gap-2">
            <FileText className="h-4 w-4" />
            Upload New Notes
          </Button>
          <Button onClick={handleLogout} variant="outline" className="gap-2">
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-6 md:grid-cols-3 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="overflow-hidden border-none shadow-md bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium flex items-center gap-2">
                <Wallet className="h-5 w-5 text-blue-500" />
                Available Balance
              </CardTitle>
              <CardDescription>
                Based on {approvedCount} approved notes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">₹{balance}</div>
              <Progress value={progress} className="h-1 mt-4" />
            </CardContent>
            <CardFooter className="pt-0">
              <Button variant="ghost" size="sm" className="gap-1 text-xs text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 p-0">
                Withdraw funds <ArrowUpRight className="h-3 w-3" />
              </Button>
            </CardFooter>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <Card className="overflow-hidden border-none shadow-md bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-green-500" />
                Total Earnings
              </CardTitle>
              <CardDescription>
                Lifetime earnings from your notes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600 dark:text-green-400">₹{earnings}</div>
              <div className="h-[70px] mt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData} margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
                    <Bar dataKey="earnings" fill={theme === 'dark' ? '#4ade80' : '#22c55e'} radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
            <CardFooter className="pt-0">
              <Button variant="ghost" size="sm" className="gap-1 text-xs text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 p-0">
                View earnings report <ArrowUpRight className="h-3 w-3" />
              </Button>
            </CardFooter>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <Card className="overflow-hidden border-none shadow-md bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium flex items-center gap-2">
                <FileText className="h-5 w-5 text-purple-500" />
                Notes Status
              </CardTitle>
              <CardDescription>
                Overview of your uploaded notes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-2 mt-2">
                <div className="flex flex-col items-center justify-center p-2 bg-white dark:bg-purple-900/50 rounded-lg">
                  <div className="text-xl font-bold text-green-600 dark:text-green-400">{approvedCount}</div>
                  <div className="text-xs text-muted-foreground">Approved</div>
                </div>
                <div className="flex flex-col items-center justify-center p-2 bg-white dark:bg-purple-900/50 rounded-lg">
                  <div className="text-xl font-bold text-yellow-600 dark:text-yellow-400">{pendingCount}</div>
                  <div className="text-xs text-muted-foreground">Pending</div>
                </div>
                <div className="flex flex-col items-center justify-center p-2 bg-white dark:bg-purple-900/50 rounded-lg">
                  <div className="text-xl font-bold text-red-600 dark:text-red-400">{rejectedCount}</div>
                  <div className="text-xs text-muted-foreground">Rejected</div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="pt-0">
              <Button variant="ghost" size="sm" className="gap-1 text-xs text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 p-0">
                Upload more notes <ArrowUpRight className="h-3 w-3" />
              </Button>
            </CardFooter>
          </Card>
        </motion.div>
      </div>

      {/* Ad Banner */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <Card className="overflow-hidden border-none shadow-md bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div>
                <h3 className="text-xl font-bold mb-2">Upgrade to Premium</h3>
                <p className="text-white/80 max-w-md">Get higher rates per approved note, priority review, and advanced analytics with our premium plan.</p>
              </div>
              <Button className="bg-white text-purple-600 hover:bg-white/90 hover:text-purple-700">
                Upgrade Now
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Recent Uploads */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.3 }}
      >
        <Card className="border-none shadow-md">
          <CardHeader>
            <CardTitle className="text-xl flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Your Uploads
            </CardTitle>
            <CardDescription>
              Track the status of your uploaded notes
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="mb-4">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="approved">Approved</TabsTrigger>
                <TabsTrigger value="pending">Pending</TabsTrigger>
                <TabsTrigger value="rejected">Rejected</TabsTrigger>
              </TabsList>
              
              <TabsContent value="all" className="mt-0">
                {uploads && uploads.length > 0 ? (
                  <div className="rounded-md border">
                    <div className="grid grid-cols-1 md:grid-cols-12 bg-muted/50 p-4 text-sm font-medium">
                      <div className="col-span-1 md:col-span-5 mb-2 md:mb-0">Title</div>
                      <div className="col-span-1 md:col-span-2 mb-2 md:mb-0">Status</div>
                      <div className="col-span-1 md:col-span-2 mb-2 md:mb-0">Price</div>
                      <div className="col-span-1 md:col-span-3">Date</div>
                    </div>
                    {uploads.map((upload) => (
                      <div key={upload._id} className="grid grid-cols-1 md:grid-cols-12 items-center p-4 hover:bg-muted/50 transition-colors border-t gap-2 md:gap-0">
                        <div className="col-span-1 md:col-span-5 font-medium">{upload.title}</div>
                        <div className="col-span-1 md:col-span-2">
                          <Badge variant={
                            upload.status === 'APPROVED' ? 'default' :
                            upload.status === 'REJECTED' ? 'destructive' : 'outline'
                          } className="flex w-fit items-center gap-1">
                            {getStatusIcon(upload.status)}
                            {upload.status}
                          </Badge>
                        </div>
                        <div className="col-span-1 md:col-span-2">₹{upload.price}</div>
                        <div className="col-span-1 md:col-span-3 text-muted-foreground text-sm">
                          {new Date(upload.createdAt).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <FileText className="h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium">No uploads found</h3>
                    <p className="text-muted-foreground mt-1 mb-4">Start uploading your notes to earn money</p>
                    <Button onClick={() => router.push('/upload')}>Upload Notes</Button>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="approved" className="mt-0">
                {uploads.filter(u => u.status === 'APPROVED').length > 0 ? (
                  <div className="rounded-md border">
                    <div className="grid grid-cols-1 md:grid-cols-12 bg-muted/50 p-4 text-sm font-medium">
                      <div className="col-span-1 md:col-span-5 mb-2 md:mb-0">Title</div>
                      <div className="col-span-1 md:col-span-2 mb-2 md:mb-0">Status</div>
                      <div className="col-span-1 md:col-span-2 mb-2 md:mb-0">Price</div>
                      <div className="col-span-1 md:col-span-3">Date</div>
                    </div>
                    {uploads.filter(u => u.status === 'APPROVED').map((upload) => (
                      <div key={upload._id} className="grid grid-cols-1 md:grid-cols-12 items-center p-4 hover:bg-muted/50 transition-colors border-t gap-2 md:gap-0">
                        <div className="col-span-1 md:col-span-5 font-medium">{upload.title}</div>
                        <div className="col-span-1 md:col-span-2">
                          <Badge variant="default" className="flex w-fit items-center gap-1">
                            <CheckCircle2 className="h-4 w-4" />
                            APPROVED
                          </Badge>
                        </div>
                        <div className="col-span-1 md:col-span-2">₹{upload.price}</div>
                        <div className="col-span-1 md:col-span-3 text-muted-foreground text-sm">
                          {new Date(upload.createdAt).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <CheckCircle2 className="h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium">No approved uploads</h3>
                    <p className="text-muted-foreground mt-1">Your approved notes will appear here</p>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="pending" className="mt-0">
                {uploads.filter(u => u.status === 'PENDING').length > 0 ? (
                  <div className="rounded-md border">
                    <div className="grid grid-cols-1 md:grid-cols-12 bg-muted/50 p-4 text-sm font-medium">
                      <div className="col-span-1 md:col-span-5 mb-2 md:mb-0">Title</div>
                      <div className="col-span-1 md:col-span-2 mb-2 md:mb-0">Status</div>
                      <div className="col-span-1 md:col-span-2 mb-2 md:mb-0">Price</div>
                      <div className="col-span-1 md:col-span-3">Date</div>
                    </div>
                    {uploads.filter(u => u.status === 'PENDING').map((upload) => (
                      <div key={upload._id} className="grid grid-cols-1 md:grid-cols-12 items-center p-4 hover:bg-muted/50 transition-colors border-t gap-2 md:gap-0">
                        <div className="col-span-1 md:col-span-5 font-medium">{upload.title}</div>
                        <div className="col-span-1 md:col-span-2">
                          <Badge variant="outline" className="flex w-fit items-center gap-1">
                            <Clock className="h-4 w-4 text-yellow-500" />
                            PENDING
                          </Badge>
                        </div>
                        <div className="col-span-1 md:col-span-2">₹{upload.price}</div>
                        <div className="col-span-1 md:col-span-3 text-muted-foreground text-sm">
                          {new Date(upload.createdAt).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <Clock className="h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium">No pending uploads</h3>
                    <p className="text-muted-foreground mt-1">Your pending notes will appear here</p>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="rejected" className="mt-0">
                {uploads.filter(u => u.status === 'REJECTED').length > 0 ? (
                  <div className="rounded-md border">
                    <div className="grid grid-cols-1 md:grid-cols-12 bg-muted/50 p-4 text-sm font-medium">
                      <div className="col-span-1 md:col-span-5 mb-2 md:mb-0">Title</div>
                      <div className="col-span-1 md:col-span-2 mb-2 md:mb-0">Status</div>
                      <div className="col-span-1 md:col-span-2 mb-2 md:mb-0">Price</div>
                      <div className="col-span-1 md:col-span-3">Date</div>
                    </div>
                    {uploads.filter(u => u.status === 'REJECTED').map((upload) => (
                      <div key={upload._id} className="grid grid-cols-1 md:grid-cols-12 items-center p-4 hover:bg-muted/50 transition-colors border-t gap-2 md:gap-0">
                        <div className="col-span-1 md:col-span-5 font-medium">{upload.title}</div>
                        <div className="col-span-1 md:col-span-2">
                          <Badge variant="destructive" className="flex w-fit items-center gap-1">
                            <XCircle className="h-4 w-4" />
                            REJECTED
                          </Badge>
                        </div>
                        <div className="col-span-1 md:col-span-2">₹{upload.price}</div>
                        <div className="col-span-1 md:col-span-3 text-muted-foreground text-sm">
                          {new Date(upload.createdAt).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <XCircle className="h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium">No rejected uploads</h3>
                    <p className="text-muted-foreground mt-1">Your rejected notes will appear here</p>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
