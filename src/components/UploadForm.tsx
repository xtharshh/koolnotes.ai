"use client"
import { useDropzone } from "react-dropzone"
import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Textarea } from "../components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "../components/ui/card"
import { useToast } from "../hooks/use-toast"
import { Label } from "../components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs"
import { Slider } from "../components/ui/slider"
import { Switch } from "../components/ui/switch"
import { FileText, Upload, X, AlertCircle, Info, FileUp, Loader2 } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "../components/ui/alert"
import { Progress } from "../components/ui/progress"

// Mock subject options
const subjectOptions = [
  { value: "mathematics", label: "Mathematics" },
  { value: "physics", label: "Physics" },
  { value: "chemistry", label: "Chemistry" },
  { value: "biology", label: "Biology" },
  { value: "computer-science", label: "Computer Science" },
  { value: "history", label: "History" },
  { value: "geography", label: "Geography" },
  { value: "economics", label: "Economics" },
  { value: "business", label: "Business Studies" },
  { value: "english", label: "English" },
]

export function UploadForm() {
  const { toast } = useToast()
  const router = useRouter()
  const { status } = useSession()
  const [file, setFile] = useState<File | null>(null)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    subject: "",
    price: "5",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isPremium, setIsPremium] = useState(false)
  const [activeTab, setActiveTab] = useState("basic")
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)

  const { getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject } = useDropzone({
    accept: {
      "application/pdf": [".pdf"],
      "application/msword": [".doc", ".docx"],
    },
    maxSize: 20 * 1024 * 1024, // 20MB
    onDrop: (acceptedFiles) => {
      setFile(acceptedFiles[0])

      // Create preview for PDF
      if (acceptedFiles[0].type === "application/pdf") {
        setPreviewUrl(URL.createObjectURL(acceptedFiles[0]))
      } else {
        setPreviewUrl(null)
      }
    },
  })

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin")
    }
  }, [status, router])

  useEffect(() => {
    // Cleanup preview URL on unmount
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl)
      }
    }
  }, [previewUrl])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setUploadProgress(0)

    if (!file) {
      toast({
        title: "Error",
        description: "Please select a file to upload",
        variant: "destructive",
      })
      setIsLoading(false)
      return
    }

    const data = new FormData()
    data.append("file", file)
    data.append("title", formData.title)
    data.append("description", formData.description)
    data.append("subject", formData.subject)
    data.append("price", formData.price.toString())
    data.append("isPremium", isPremium.toString())

    try {
      // Simulate upload progress
      const progressInterval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 95) {
            clearInterval(progressInterval)
            return 95
          }
          return prev + 5
        })
      }, 300)

      const response = await fetch("/api/upload", {
        method: "POST",
        body: data,
      })

      clearInterval(progressInterval)
      setUploadProgress(100)

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || "Upload failed")
      }

      const responseData = await response.json()
      console.log("Upload successful:", responseData)

      toast({
        title: "Success!",
        description: "Your notes have been uploaded and are pending review",
        variant: "default",
      })

      // Reset form
      setTimeout(() => {
        setFile(null)
        setPreviewUrl(null)
        setFormData({
          title: "",
          description: "",
          subject: "",
          price: "5",
        })
        setIsPremium(false)
        setIsLoading(false)
        setUploadProgress(0)
        setActiveTab("basic")
      }, 1000)
    } catch (error) {
      console.error("Upload error:", error)
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to upload file",
        variant: "destructive",
      })
      setIsLoading(false)
      setUploadProgress(0)
    }
  }

  // Show loading state while checking session
  if (status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-10 px-4 max-w-3xl">
      <Card className="border-none shadow-lg">
        <CardHeader>
          <div className="flex items-center gap-2">
            <FileUp className="h-5 w-5 text-primary" />
            <CardTitle className="text-2xl">Upload Notes</CardTitle>
          </div>
          <CardDescription>Share your notes with others and earn money for each approved document</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-2 mb-8">
              <TabsTrigger value="basic">Basic Info</TabsTrigger>
              <TabsTrigger value="advanced">Advanced Options</TabsTrigger>
            </TabsList>

            <form onSubmit={handleSubmit} className="space-y-6">
              <TabsContent value="basic" className="space-y-6 mt-0">
                {/* File Upload Area */}
                <div
                  {...getRootProps()}
                  className={cn(
                    "border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors",
                    isDragActive ? "border-primary/70 bg-primary/5" : "border-muted-foreground/30",
                    isDragAccept ? "border-green-500/70 bg-green-500/5" : "",
                    isDragReject ? "border-red-500/70 bg-red-500/5" : "",
                    file ? "border-primary/70 bg-primary/5" : "",
                  )}
                >
                  <input {...getInputProps()} />
                  <div className="flex flex-col items-center gap-4">
                    {file ? (
                      <>
                        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                          <FileText className="h-8 w-8 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">{file.name}</p>
                          <p className="text-sm text-muted-foreground">{(file.size / (1024 * 1024)).toFixed(2)} MB</p>
                        </div>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation()
                            setFile(null)
                            setPreviewUrl(null)
                          }}
                          className="mt-2"
                        >
                          <X className="h-4 w-4 mr-2" />
                          Remove File
                        </Button>
                      </>
                    ) : (
                      <>
                        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                          <Upload className="h-8 w-8 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">Drag & drop your notes here</p>
                          <p className="text-sm text-muted-foreground">Supports PDF, DOC, and DOCX (Max 20MB)</p>
                        </div>
                        <Button type="button" variant="outline" size="sm" className="mt-2">
                          Browse Files
                        </Button>
                      </>
                    )}
                  </div>
                </div>

                {/* Basic Form Fields */}
                <div className="space-y-4">
                  <div className="grid gap-2">
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      placeholder="Enter a descriptive title for your notes"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      required
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      placeholder="Provide details about what's included in your notes"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      rows={4}
                      required
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Select
                      value={formData.subject}
                      onValueChange={(value) => setFormData({ ...formData, subject: value })}
                      required
                    >
                      <SelectTrigger id="subject">
                        <SelectValue placeholder="Select a subject" />
                      </SelectTrigger>
                      <SelectContent>
                        {subjectOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="advanced" className="space-y-6 mt-0">
                <div className="space-y-4">
                  <div className="grid gap-2">
                    <div className="flex justify-between items-center">
                      <Label htmlFor="price">Price (₹)</Label>
                      <span className="text-sm font-medium">₹{formData.price}</span>
                    </div>
                    <Slider
                      id="price"
                      min={5}
                      max={50}
                      step={5}
                      value={[Number.parseInt(formData.price)]}
                      onValueChange={(value) => setFormData({ ...formData, price: value[0].toString() })}
                    />
                    <p className="text-sm text-muted-foreground">Set a price between ₹5 and ₹50</p>
                  </div>

                  <div className="flex items-center justify-between space-x-2">
                    <div className="space-y-0.5">
                      <Label htmlFor="premium">Premium Content</Label>
                      <p className="text-sm text-muted-foreground">Mark as premium to earn higher rates</p>
                    </div>
                    <Switch id="premium" checked={isPremium} onCheckedChange={setIsPremium} />
                  </div>

                  <Alert>
                    <Info className="h-4 w-4" />
                    <AlertTitle>Important</AlertTitle>
                    <AlertDescription>
                      Premium content undergoes stricter review but earns 50% more per download.
                    </AlertDescription>
                  </Alert>
                </div>
              </TabsContent>

              {/* Preview Section */}
              {previewUrl && (
                <div className="mt-6 border rounded-lg overflow-hidden">
                  <div className="bg-muted p-2 flex justify-between items-center">
                    <h3 className="text-sm font-medium">Preview</h3>
                    <Button type="button" variant="ghost" size="sm" onClick={() => window.open(previewUrl, "_blank")}>
                      Open
                    </Button>
                  </div>
                  <iframe src={previewUrl} className="w-full h-[300px] border-0" title="Document Preview" />
                </div>
              )}

              {/* Submit Button */}
              <div className="pt-4">
                {isLoading && (
                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-1">
                      <span>Uploading...</span>
                      <span>{uploadProgress}%</span>
                    </div>
                    <Progress value={uploadProgress} className="h-2" />
                  </div>
                )}

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    type="button"
                    variant="outline"
                    className="sm:flex-1"
                    onClick={() => router.push("/dashboard")}
                    disabled={isLoading}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="sm:flex-1"
                    disabled={isLoading || !file || !formData.title || !formData.subject}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Uploading...
                      </>
                    ) : (
                      <>
                        <FileUp className="mr-2 h-4 w-4" />
                        Upload Notes
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </form>
          </Tabs>
        </CardContent>
        <CardFooter className="flex flex-col border-t pt-6">
          <Alert variant="default" className="bg-primary/5 border-primary/10">
            <AlertCircle className="h-4 w-4 text-primary" />
            <AlertTitle>Note</AlertTitle>
            <AlertDescription className="text-sm text-muted-foreground">
              All uploads are reviewed by our team before being published. This process typically takes 24-48 hours.
            </AlertDescription>
          </Alert>
        </CardFooter>
      </Card>
    </div>
  )
}

// Helper function to conditionally join class names
const cn = (...classes: (string | boolean | undefined)[]) => {
  return classes.filter(Boolean).join(" ")
}
