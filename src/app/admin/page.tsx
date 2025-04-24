"use client"
import { useSession } from "next-auth/react"
import { Label } from "../../components/ui/label"
import {  signOut } from "next-auth/react";
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "../../components/ui/card"
import { Button } from "../../components/ui/button"
import { useToast } from "../../hooks/use-toast"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs"
import { Badge } from "../../components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar"
import { Input } from "../../components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../../components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../components/ui/dialog"
import { motion, AnimatePresence } from "framer-motion"
import {
  CheckCircle2,
  XCircle,
  Clock,
  FileText,
  Search,
  Filter,
  MoreVertical,
  Download,
  Eye,
  Loader2,
  BarChart3,
  Users,
} from "lucide-react"
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts"

interface Upload {
  _id: string
  title: string
  userId: {
    name: string
    email: string
  }
  status: string
  createdAt: string
}

interface Stats {
  pending: number
  approved: number
  rejected: number
}

// Mock data for charts
const activityData = [
  { name: "Mon", uploads: 4, approvals: 3 },
  { name: "Tue", uploads: 6, approvals: 4 },
  { name: "Wed", uploads: 8, approvals: 5 },
  { name: "Thu", uploads: 10, approvals: 7 },
  { name: "Fri", uploads: 12, approvals: 9 },
  { name: "Sat", uploads: 8, approvals: 6 },
  { name: "Sun", uploads: 6, approvals: 4 },
]

export default function AdminPage() {
  const { data: session } = useSession()
  const router = useRouter()
  const [pendingUploads, setPendingUploads] = useState<Upload[]>([])
  const [allUploads, setAllUploads] = useState<Upload[]>([])
  const [filteredUploads, setFilteredUploads] = useState<Upload[]>([])
  const [stats, setStats] = useState<Stats>({ pending: 0, approved: 0, rejected: 0 })
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedUpload, setSelectedUpload] = useState<Upload | null>(null)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const { toast } = useToast()


  const handleLogout = async () => {
    await signOut({ callbackUrl: '/' });
  };
  
  useEffect(() => {
    if (!session) {
      router.push("/auth/signin")
      return
    }

 
    
    if (session?.user?.role !== "ADMIN") {
      router.push("/")
      return
    }

    const fetchUploads = async () => {
      try {
        setIsLoading(true)
        const response = await fetch("/api/admin/uploads")
        if (response.ok) {
          const data = await response.json()
          const uploads = data.uploads || []
          setPendingUploads(uploads.filter((upload) => upload.status === "PENDING"))
          setAllUploads(uploads)
          setFilteredUploads(uploads)
          setStats(data.stats)
        }
      } catch (error) {
        console.error("Failed to fetch uploads:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchUploads()
  }, [session, router])

  useEffect(() => {
    if (searchQuery) {
      const filtered = allUploads.filter(
        (upload) =>
          upload.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          upload.userId.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          upload.userId.email.toLowerCase().includes(searchQuery.toLowerCase()),
      )
      setFilteredUploads(filtered)
    } else {
      setFilteredUploads(allUploads)
    }
  }, [searchQuery, allUploads])

  const handleApproval = async (uploadId: string, status: "APPROVED" | "REJECTED") => {
    try {
      setIsLoading(true)
      const response = await fetch(`/api/admin/uploads/${uploadId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      })

      const data = await response.json()

      if (!response.ok) {
        toast({
          title: "Error",
          description: data.error || "Failed to update status",
          variant: "destructive",
        })
        return
      }
      

      // Only update states if we have valid data
      if (data.uploads) {
        setPendingUploads(data.uploads.filter((upload) => upload.status === "PENDING"))
        setAllUploads(data.uploads)
        setFilteredUploads(data.uploads)
        setStats(data.stats || { pending: 0, approved: 0, rejected: 0 })
      }

      toast({
        title: "Success",
        description: data.message,
      })
    } catch (error) {
      console.error("Error updating upload:", error)
      toast({
        title: "Error",
        description: "Failed to update status",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "APPROVED":
        return (
          <Badge variant="default" className="bg-green-500 hover:bg-green-600 text-white flex items-center gap-1">
            <CheckCircle2 className="h-3 w-3" />
            APPROVED
          </Badge>
        )
      case "REJECTED":
        return (
          <Badge variant="destructive" className="flex items-center gap-1">
            <XCircle className="h-3 w-3" />
            REJECTED
          </Badge>
        )
      default:
        return (
          <Badge variant="outline" className="flex items-center gap-1">
            <Clock className="h-3 w-3 text-yellow-500" />
            PENDING
          </Badge>
        )
    }
  }

  // Prepare data for pie chart
  const pieData = [
    { name: "Pending", value: stats.pending, color: "#f59e0b" },
    { name: "Approved", value: stats.approved, color: "#10b981" },
    { name: "Rejected", value: stats.rejected, color: "#ef4444" },
  ]

  if (isLoading && !allUploads.length) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-muted-foreground">Loading admin panel...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-28 px-4 max-w-7xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-4xl font-bold tracking-tight">Admin Panel</h1>
          <p className="text-muted-foreground mt-1">Manage uploads, review content, and monitor platform activity</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleLogout} className="gap-2">
            <Download className="h-4 w-4" />
            Logout
          </Button>
          <Button className="gap-2">
            <Users className="h-4 w-4" />
            Manage Users
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
          <Card className="overflow-hidden border-none shadow-md bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-950 dark:to-yellow-900">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium flex items-center gap-2">
                <Clock className="h-5 w-5 text-yellow-500" />
                Pending Review
              </CardTitle>
              <CardDescription>Notes awaiting approval</CardDescription>
            </CardHeader>
            <CardContent className="pb-2">
              <div className="text-3xl font-bold text-yellow-600 dark:text-yellow-400">{stats.pending}</div>
              <div className="text-sm text-muted-foreground mt-1">
                {stats.pending > 0
                  ? `${Math.round((stats.pending / (stats.pending + stats.approved + stats.rejected)) * 100)}% of total uploads`
                  : "No pending uploads"}
              </div>
            </CardContent>
            <CardFooter className="pt-0">
              <Button
                variant="ghost"
                size="sm"
                className="gap-1 text-xs text-yellow-600 dark:text-yellow-400 hover:text-yellow-700 dark:hover:text-yellow-300 p-0"
              >
                Review pending uploads
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
                <CheckCircle2 className="h-5 w-5 text-green-500" />
                Approved
              </CardTitle>
              <CardDescription>Notes available to users</CardDescription>
            </CardHeader>
            <CardContent className="pb-2">
              <div className="text-3xl font-bold text-green-600 dark:text-green-400">{stats.approved}</div>
              <div className="text-sm text-muted-foreground mt-1">
                {stats.approved > 0
                  ? `${Math.round((stats.approved / (stats.pending + stats.approved + stats.rejected)) * 100)}% of total uploads`
                  : "No approved uploads"}
              </div>
            </CardContent>
            <CardFooter className="pt-0">
              <Button
                variant="ghost"
                size="sm"
                className="gap-1 text-xs text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 p-0"
              >
                View approved notes
              </Button>
            </CardFooter>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <Card className="overflow-hidden border-none shadow-md bg-gradient-to-br from-red-50 to-red-100 dark:from-red-950 dark:to-red-900">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium flex items-center gap-2">
                <XCircle className="h-5 w-5 text-red-500" />
                Rejected
              </CardTitle>
              <CardDescription>Notes that didn&apos;t meet standards</CardDescription>
            </CardHeader>
            <CardContent className="pb-2">
              <div className="text-3xl font-bold text-red-600 dark:text-red-400">{stats.rejected}</div>
              <div className="text-sm text-muted-foreground mt-1">
                {stats.rejected > 0
                  ? `${Math.round((stats.rejected / (stats.pending + stats.approved + stats.rejected)) * 100)}% of total uploads`
                  : "No rejected uploads"}
              </div>
            </CardContent>
            <CardFooter className="pt-0">
              <Button
                variant="ghost"
                size="sm"
                className="gap-1 text-xs text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 p-0"
              >
                View rejected notes
              </Button>
            </CardFooter>
          </Card>
        </motion.div>
      </div>

      {/* Analytics Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.3 }}
        className="mb-8"
      >
        <Card className="border-none shadow-md">
          <CardHeader>
            <CardTitle className="text-xl flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Analytics Overview
            </CardTitle>
            <CardDescription>Platform activity and content distribution</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="col-span-2">
                <h3 className="text-sm font-medium mb-4">Weekly Activity</h3>
                <div className="h-[250px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={activityData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                      <defs>
                        <linearGradient id="colorUploads" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                          <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="colorApprovals" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                          <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                      <XAxis dataKey="name" className="text-xs" />
                      <YAxis className="text-xs" />
                      <Tooltip />
                      <Area
                        type="monotone"
                        dataKey="uploads"
                        stroke="#8884d8"
                        fillOpacity={1}
                        fill="url(#colorUploads)"
                      />
                      <Area
                        type="monotone"
                        dataKey="approvals"
                        stroke="#82ca9d"
                        fillOpacity={1}
                        fill="url(#colorApprovals)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
              <div>
                <h3 className="text-sm font-medium mb-4">Content Status</h3>
                <div className="h-[250px] flex items-center justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        labelLine={false}
                      >
                        {pieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Content Management */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.4 }}
      >
        <Card className="border-none shadow-md">
          <CardHeader>
            <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
              <div>
                <CardTitle className="text-xl flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Content Management
                </CardTitle>
                <CardDescription>Review and manage uploaded content</CardDescription>
              </div>
              <div className="flex gap-2 w-full md:w-auto">
                <div className="relative flex-1 md:w-64">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search uploads..."
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Button variant="outline" size="icon">
                  <Filter className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="pending">
              <TabsList className="mb-4">
                <TabsTrigger value="pending" className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  Pending
                  {stats.pending > 0 && (
                    <Badge variant="secondary" className="ml-1">
                      {stats.pending}
                    </Badge>
                  )}
                </TabsTrigger>
                <TabsTrigger value="all" className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  All Uploads
                </TabsTrigger>
                <TabsTrigger value="approved" className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4" />
                  Approved
                </TabsTrigger>
                <TabsTrigger value="rejected" className="flex items-center gap-2">
                  <XCircle className="h-4 w-4" />
                  Rejected
                </TabsTrigger>
              </TabsList>

              <TabsContent value="pending" className="mt-0">
                {pendingUploads.length > 0 ? (
                  <div className="rounded-md border overflow-hidden">
                    <div className="grid grid-cols-12 bg-muted/50 p-4 text-sm font-medium">
                      <div className="col-span-4">Title</div>
                      <div className="col-span-3">Uploader</div>
                      <div className="col-span-2">Date</div>
                      <div className="col-span-3 text-right">Actions</div>
                    </div>
                    <div className="divide-y">
                      <AnimatePresence>
                        {pendingUploads.map((upload) => (
                          <motion.div
                            key={upload._id}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="grid grid-cols-12 items-center p-4 hover:bg-muted/50 transition-colors"
                          >
                            <div className="col-span-4 font-medium truncate pr-4">{upload.title}</div>
                            <div className="col-span-3">
                              <div className="flex items-center gap-2">
                                <Avatar className="h-8 w-8">
                                  <AvatarImage src={`https://avatar.vercel.sh/${upload.userId.email}`} />
                                  <AvatarFallback>{upload.userId.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div className="truncate">
                                  <div className="text-sm font-medium truncate">{upload.userId.name}</div>
                                  <div className="text-xs text-muted-foreground truncate">{upload.userId.email}</div>
                                </div>
                              </div>
                            </div>
                            <div className="col-span-2 text-sm text-muted-foreground">
                              {new Date(upload.createdAt).toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                              })}
                            </div>
                            <div className="col-span-3 flex justify-end gap-2">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => {
                                  setSelectedUpload(upload)
                                  setIsViewDialogOpen(true)
                                }}
                              >
                                <Eye className="h-4 w-4 mr-1" />
                                View
                              </Button>
                              <Button
                                size="sm"
                                variant="default"
                                className="bg-green-600 hover:bg-green-700"
                                onClick={() => handleApproval(upload._id, "APPROVED")}
                              >
                                <CheckCircle2 className="h-4 w-4 mr-1" />
                                Approve
                              </Button>
                              <Button
                                size="sm"
                                variant="destructive"
                                onClick={() => handleApproval(upload._id, "REJECTED")}
                              >
                                <XCircle className="h-4 w-4 mr-1" />
                                Reject
                              </Button>
                            </div>
                          </motion.div>
                        ))}
                      </AnimatePresence>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <Clock className="h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium">No pending uploads</h3>
                    <p className="text-muted-foreground mt-1 mb-4">All uploads have been reviewed</p>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="all" className="mt-0">
                {filteredUploads.length > 0 ? (
                  <div className="rounded-md border overflow-hidden">
                    <div className="grid grid-cols-12 bg-muted/50 p-4 text-sm font-medium">
                      <div className="col-span-4">Title</div>
                      <div className="col-span-3">Uploader</div>
                      <div className="col-span-2">Status</div>
                      <div className="col-span-2">Date</div>
                      <div className="col-span-1 text-right">Actions</div>
                    </div>
                    <div className="divide-y">
                      {filteredUploads.map((upload) => (
                        <div
                          key={upload._id}
                          className="grid grid-cols-12 items-center p-4 hover:bg-muted/50 transition-colors"
                        >
                          <div className="col-span-4 font-medium truncate pr-4">{upload.title}</div>
                          <div className="col-span-3">
                            <div className="flex items-center gap-2">
                              <Avatar className="h-8 w-8">
                                <AvatarImage src={`https://avatar.vercel.sh/${upload.userId.email}`} />
                                <AvatarFallback>{upload.userId.name.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <div className="truncate">
                                <div className="text-sm font-medium truncate">{upload.userId.name}</div>
                                <div className="text-xs text-muted-foreground truncate">{upload.userId.email}</div>
                              </div>
                            </div>
                          </div>
                          <div className="col-span-2">{getStatusBadge(upload.status)}</div>
                          <div className="col-span-2 text-sm text-muted-foreground">
                            {new Date(upload.createdAt).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            })}
                          </div>
                          <div className="col-span-1 text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                  <MoreVertical className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem
                                  onClick={() => {
                                    setSelectedUpload(upload)
                                    setIsViewDialogOpen(true)
                                  }}
                                >
                                  <Eye className="h-4 w-4 mr-2" />
                                  View Details
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Download className="h-4 w-4 mr-2" />
                                  Download
                                </DropdownMenuItem>
                                {upload.status === "PENDING" && (
                                  <>
                                    <DropdownMenuItem onClick={() => handleApproval(upload._id, "APPROVED")}>
                                      <CheckCircle2 className="h-4 w-4 mr-2 text-green-500" />
                                      Approve
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => handleApproval(upload._id, "REJECTED")}>
                                      <XCircle className="h-4 w-4 mr-2 text-red-500" />
                                      Reject
                                    </DropdownMenuItem>
                                  </>
                                )}
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <FileText className="h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium">No uploads found</h3>
                    <p className="text-muted-foreground mt-1">Try adjusting your search criteria</p>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="approved" className="mt-0">
                {filteredUploads.filter((u) => u.status === "APPROVED").length > 0 ? (
                  <div className="rounded-md border overflow-hidden">
                    <div className="grid grid-cols-12 bg-muted/50 p-4 text-sm font-medium">
                      <div className="col-span-4">Title</div>
                      <div className="col-span-3">Uploader</div>
                      <div className="col-span-2">Status</div>
                      <div className="col-span-2">Date</div>
                      <div className="col-span-1 text-right">Actions</div>
                    </div>
                    <div className="divide-y">
                      {filteredUploads
                        .filter((u) => u.status === "APPROVED")
                        .map((upload) => (
                          <div
                            key={upload._id}
                            className="grid grid-cols-12 items-center p-4 hover:bg-muted/50 transition-colors"
                          >
                            <div className="col-span-4 font-medium truncate pr-4">{upload.title}</div>
                            <div className="col-span-3">
                              <div className="flex items-center gap-2">
                                <Avatar className="h-8 w-8">
                                  <AvatarImage src={`https://avatar.vercel.sh/${upload.userId.email}`} />
                                  <AvatarFallback>{upload.userId.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div className="truncate">
                                  <div className="text-sm font-medium truncate">{upload.userId.name}</div>
                                  <div className="text-xs text-muted-foreground truncate">{upload.userId.email}</div>
                                </div>
                              </div>
                            </div>
                            <div className="col-span-2">
                              <Badge variant="default" className="flex w-fit items-center gap-1 bg-green-500 hover:bg-green-600">
                                <CheckCircle2 className="h-3 w-3" />
                                APPROVED
                              </Badge>
                            </div>
                            <div className="col-span-2 text-sm text-muted-foreground">
                              {new Date(upload.createdAt).toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                              })}
                            </div>
                            <div className="col-span-1 text-right">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon" className="h-8 w-8">
                                    <MoreVertical className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem
                                    onClick={() => {
                                      setSelectedUpload(upload)
                                      setIsViewDialogOpen(true)
                                    }}
                                  >
                                    <Eye className="h-4 w-4 mr-2" />
                                    View Details
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <Download className="h-4 w-4 mr-2" />
                                    Download
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <CheckCircle2 className="h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium">No approved uploads</h3>
                    <p className="text-muted-foreground mt-1">Approved uploads will appear here</p>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="rejected" className="mt-0">
                {filteredUploads.filter((u) => u.status === "REJECTED").length > 0 ? (
                  <div className="rounded-md border overflow-hidden">
                    <div className="grid grid-cols-12 bg-muted/50 p-4 text-sm font-medium">
                      <div className="col-span-4">Title</div>
                      <div className="col-span-3">Uploader</div>
                      <div className="col-span-2">Status</div>
                      <div className="col-span-2">Date</div>
                      <div className="col-span-1 text-right">Actions</div>
                    </div>
                    <div className="divide-y">
                      {filteredUploads
                        .filter((u) => u.status === "REJECTED")
                        .map((upload) => (
                          <div
                            key={upload._id}
                            className="grid grid-cols-12 items-center p-4 hover:bg-muted/50 transition-colors"
                          >
                            <div className="col-span-4 font-medium truncate pr-4">{upload.title}</div>
                            <div className="col-span-3">
                              <div className="flex items-center gap-2">
                                <Avatar className="h-8 w-8">
                                  <AvatarImage src={`https://avatar.vercel.sh/${upload.userId.email}`} />
                                  <AvatarFallback>{upload.userId.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div className="truncate">
                                  <div className="text-sm font-medium truncate">{upload.userId.name}</div>
                                  <div className="text-xs text-muted-foreground truncate">{upload.userId.email}</div>
                                </div>
                              </div>
                            </div>
                            <div className="col-span-2">
                              <Badge variant="destructive" className="flex w-fit items-center gap-1">
                                <XCircle className="h-3 w-3" />
                                REJECTED
                              </Badge>
                            </div>
                            <div className="col-span-2 text-sm text-muted-foreground">
                              {new Date(upload.createdAt).toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                              })}
                            </div>
                            <div className="col-span-1 text-right">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon" className="h-8 w-8">
                                    <MoreVertical className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem
                                    onClick={() => {
                                      setSelectedUpload(upload)
                                      setIsViewDialogOpen(true)
                                    }}
                                  >
                                    <Eye className="h-4 w-4 mr-2" />
                                    View Details
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <Download className="h-4 w-4 mr-2" />
                                    Download
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <XCircle className="h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium">No rejected uploads</h3>
                    <p className="text-muted-foreground mt-1">Rejected uploads will appear here</p>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </motion.div>

      {/* View Upload Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Upload Details</DialogTitle>
            <DialogDescription>Review the details of this upload</DialogDescription>
          </DialogHeader>

          {selectedUpload && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">Title</Label>
                <div className="col-span-3 font-medium">{selectedUpload.title}</div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">Uploader</Label>
                <div className="col-span-3">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={`https://avatar.vercel.sh/${selectedUpload.userId.email}`} />
                      <AvatarFallback>{selectedUpload.userId.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{selectedUpload.userId.name}</div>
                      <div className="text-sm text-muted-foreground">{selectedUpload.userId.email}</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">Status</Label>
                <div className="col-span-3">{getStatusBadge(selectedUpload.status)}</div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">Upload Date</Label>
                <div className="col-span-3">
                  {new Date(selectedUpload.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
              </div>

              <div className="border rounded-md p-4 mt-4">
                <div className="text-sm font-medium mb-2">Document Preview</div>
                <div className="aspect-video bg-muted rounded-md flex items-center justify-center">
                  <FileText className="h-12 w-12 text-muted-foreground" />
                </div>
              </div>
            </div>
          )}

          <DialogFooter>
            {selectedUpload && selectedUpload.status === "PENDING" && (
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setIsViewDialogOpen(false)}>
                  Cancel
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => {
                    handleApproval(selectedUpload._id, "REJECTED")
                    setIsViewDialogOpen(false)
                  }}
                >
                  <XCircle className="h-4 w-4 mr-2" />
                  Reject
                </Button>
                <Button
                  className="bg-green-600 hover:bg-green-700"
                  onClick={() => {
                    handleApproval(selectedUpload._id, "APPROVED")
                    setIsViewDialogOpen(false)
                  }}
                >
                  <CheckCircle2 className="h-4 w-4 mr-2" />
                  Approve
                </Button>
              </div>
            )}
            {selectedUpload && selectedUpload.status !== "PENDING" && (
              <Button onClick={() => setIsViewDialogOpen(false)}>Close</Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
