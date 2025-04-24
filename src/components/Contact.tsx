"use client"

import React, { useState } from "react"
import { motion } from "framer-motion"
import { Loader2, MailIcon, MessageSquare, Send, User, Phone, ArrowRight, CheckCircle } from "lucide-react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, type SubmitHandler } from "react-hook-form"
import * as z from "zod"
import { Button } from "../components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"
import { Input } from "../components/ui/input"
import { Textarea } from "../components/ui/textarea"
import { useToast } from "../hooks/use-toast"
import { useRouter } from "next/navigation"

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
})

type FormValues = z.infer<typeof formSchema>

const ContactSection: React.FC = React.memo(function ContactSection() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const { toast } = useToast()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty },
    reset,
    watch,
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  })

  const watchedFields = watch()
  const getCompletionPercentage = () => {
    const fields = ["name", "email", "subject", "message"]
    const filledFields = fields.filter((field) => watchedFields[field as keyof FormValues]?.trim().length > 0)
    return (filledFields.length / fields.length) * 100
  }

  const onSubmit: SubmitHandler<FormValues> = async (values) => {
    setIsSubmitting(true)
    try {
      
      await new Promise((resolve) => setTimeout(resolve, 1500))

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      })

      if (response.ok) {
        setIsSuccess(true)
        toast({
          title: "Message sent successfully!",
          description: "We'll get back to you as soon as possible.",
        })
        reset()

        // Reset success state after 3 seconds
        setTimeout(() => {
          setIsSuccess(false)
        }, 3000)
      } else {
        const errorData = await response.json()
        throw new Error(errorData.error)
      }
    } catch (error: unknown) {
      toast({
        variant: "destructive",
        title: "Error sending message",
        description: `Please try again later. Error: ${error instanceof Error ? error.message : "Unknown error"}`,
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const contactInfo = [
    
    {
      icon: <Phone className="h-5 w-5" />,
      title: "Download Our App",
      content: "Get it on Play Store",
      action: () => {
        window.open("https://play.google.com/store/apps/details?id=com.xt.harshh.koolnotesapp", "_blank")
      },
    },
    {
      icon: <MailIcon className="h-5 w-5" />,
      title: "Email Us",
      content: "koolnotes.ai@gmail.com",
      action: () => {
        window.location.href = "mailto:koolnotes.ai@gmail.com"
      },
    },
  ]

  return (
    <section id="contactus" className="container mx-auto py-16 px-4 sm:px-6 lg:px-8 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-primary/5 pointer-events-none -z-10" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <h1 className="text-4xl font-bold font-newLuck text-center pt-10">Contact us</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Have questions about our resources? Need support? Or want to collaborate? We&apos;re here to help!
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-8 mb-16 place-items-center max-w-4xl mx-auto"> {/* Updated grid */}
        {contactInfo.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 * index }}
            className="w-full max-w-sm" // Added max width
          >
            <Card
              className="border border-primary/10 bg-background/60 backdrop-blur-sm hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 h-full cursor-pointer flex flex-col justify-center"
              onClick={item.action}
            >
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  {item.icon}
                </div>
                <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                <p className="text-muted-foreground">{item.content}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative w-full"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-3xl blur-3xl dark:from-primary/5 dark:to-secondary/5 opacity-70" />

          <Card 
            className="border-none shadow-[0_0_15px_rgba(0,0,0,0.1)] dark:shadow-[0_0_15px_rgba(255,255,255,0.1)] 
            bg-background/80 backdrop-blur-sm relative overflow-hidden 
            hover:shadow-[0_0_30px_rgba(0,0,0,0.2)] dark:hover:shadow-[0_0_30px_rgba(255,255,255,0.15)] 
            transition-all duration-300"
          >
            <CardHeader>
              <CardTitle className="text-2xl">Send Us a Message</CardTitle>
              <CardDescription>
                Fill out the form below and our team will get back to you within 24 hours.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form id="contact-form" onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium">
                      Name
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="name"
                        {...register("name")}
                        placeholder="Your name"
                        className={`pl-10 transition-all duration-200 ${errors.name ? "border-red-500 focus-visible:ring-red-500" : "focus-visible:ring-primary/20"}`}
                      />
                      {errors.name && (
                        <motion.p
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="mt-1 text-sm text-red-500"
                        >
                          {errors.name.message}
                        </motion.p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">
                      Email
                    </label>
                    <div className="relative">
                      <MailIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="email"
                        type="email"
                        {...register("email")}
                        placeholder="your@email.com"
                        className={`pl-10 transition-all duration-200 ${errors.email ? "border-red-500 focus-visible:ring-red-500" : "focus-visible:ring-primary/20"}`}
                      />
                      {errors.email && (
                        <motion.p
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="mt-1 text-sm text-red-500"
                        >
                          {errors.email.message}
                        </motion.p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="subject" className="text-sm font-medium">
                    Subject
                  </label>
                  <div className="relative">
                    <MessageSquare className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="subject"
                      {...register("subject")}
                      placeholder="What's this about?"
                      className={`pl-10 transition-all duration-200 ${errors.subject ? "border-red-500 focus-visible:ring-red-500" : "focus-visible:ring-primary/20"}`}
                    />
                    {errors.subject && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-1 text-sm text-red-500"
                      >
                        {errors.subject.message}
                      </motion.p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium">
                    Message
                  </label>
                  <div className="relative">
                    <Textarea
                      id="message"
                      {...register("message")}
                      placeholder="Tell us how we can help..."
                      className={`min-h-[120px] transition-all duration-200 ${errors.message ? "border-red-500 focus-visible:ring-red-500" : "focus-visible:ring-primary/20"}`}
                    />
                    {errors.message && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-1 text-sm text-red-500"
                      >
                        {errors.message.message}
                      </motion.p>
                    )}
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="w-full bg-muted h-1 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-primary"
                      initial={{ width: "0%" }}
                      animate={{ width: `${getCompletionPercentage()}%` }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>

                  <Button type="submit" className="w-full group" disabled={isSubmitting || !isValid || !isDirty}>
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Sending...
                      </>
                    ) : isSuccess ? (
                      <>
                        <CheckCircle className="mr-2 h-4 w-4" />
                        Message Sent!
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        Send Message
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-8"
        >
          <div>
            <h3 className="text-3xl font-bold mb-4">We&apos;d Love to Hear From You</h3>
            <p className="text-lg text-muted-foreground mb-6">
              Whether you have a question about our resources, need help with your account, or want to suggest new
              features, our team is ready to assist you.
            </p>
            <ul className="space-y-4">
              <li className="flex items-start gap-2">
                <div className="mt-1 text-primary">
                  <ArrowRight className="h-4 w-4" />
                </div>
                <p>Get personalized support from our dedicated team</p>
              </li>
              <li className="flex items-start gap-2">
                <div className="mt-1 text-primary">
                  <ArrowRight className="h-4 w-4" />
                </div>
                <p>Request specific resources for your academic needs</p>
              </li>
              <li className="flex items-start gap-2">
                <div className="mt-1 text-primary">
                  <ArrowRight className="h-4 w-4" />
                </div>
                <p>Provide feedback to help us improve our platform</p>
              </li>
              <li className="flex items-start gap-2">
                <div className="mt-1 text-primary">
                  <ArrowRight className="h-4 w-4" />
                </div>
                <p>Explore partnership and collaboration opportunities</p>
              </li>
            </ul>
          </div>

          <Card className="border border-primary/10 bg-primary/5 backdrop-blur-sm">
            <CardContent className="p-6">
              <h4 className="text-xl font-bold mb-3">Our Response Time</h4>
              <p className="text-muted-foreground mb-4">
                We strive to respond to all inquiries within 24 hours. For urgent matters, please include &quot;URGENT&quot; in
                your subject line.
              </p>
              <div className="flex items-center gap-2 text-sm">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span>Customer support available Monday-Friday, 9AM-6PM</span>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
})

export default ContactSection
