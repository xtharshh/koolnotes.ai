'use client'

import { useState, useEffect } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { ChevronLeft, ChevronRight, GraduationCap, Library, Star, Users } from 'lucide-react'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { reviews } from "../data/reviews"
import ContactSection from "@/components/Contact"

export default function AboutAndReviews() {
  const [currentReview, setCurrentReview] = useState(0)
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient) {
      const images = document.querySelectorAll('.review-image');
      images.forEach((img) => {
        const width = (img as HTMLImageElement).style.width;
        const height = (img as HTMLImageElement).style.height;
        if ((width && width !== 'auto') || (height && height !== 'auto')) {
          if (width && width !== 'auto') {
            (img as HTMLImageElement).style.height = 'auto';
          }
          if (height && height !== 'auto') {
            (img as HTMLImageElement).style.width = 'auto';
          }
          console.warn('Image with src', (img as HTMLImageElement).src, 'has either width or height modified, but not the other. Both are now set to "auto" to maintain the aspect ratio.');
        }
      });
    }
  }, [isClient]);

  const nextReview = () => {
    setCurrentReview((prev) => (prev + 1) % reviews.length)
  }

  const prevReview = () => {
    setCurrentReview((prev) => (prev - 1 + reviews.length) % reviews.length)
  }

  if (!isClient) {
    return null;
  }

  return (
    <div id="aboutus" className="min-h-screen bg-white dark:bg-black text-black dark:text-white w-full py-12 px-4 md:px-6 bg-background">
      <section className="mb-20">
        <div  className="container mx-auto">
          <h2 className="text-4xl font-newLuck font-bold text-center mb-12 bg-gradient-to-r from-primary to-primary/50 bg-clip-text text-black dark:text-white">
            About Us
          </h2>
          <div className="grid lg:grid-cols-2 gap-4 items-center">
            <div className="space-y-6 text-center vlg:pl-28">
              <p className="text-lg font-newLuck text-muted-foreground leading-relaxed">
                CollegeED is your comprehensive platform for accessing academic materials across various engineering disciplines. 
                We understand the importance of having the right resources at your fingertips during your academic journey.
              </p>
              <div className="grid grid-cols-2 gap-4 w-92 lg:w-auto">
                <Card className="backdrop-blur-md bg-background/60 border-gradient hover:scale-105 transition-transform duration-300 dark:bg-background/40 border-gray-700">
                  <CardContent className="p-6 space-y-2">
                    <Users className="w-8 h-8 text-primary" />
                    <h3 className="font-semibold">10K+ Users</h3>
                    <p className="text-sm text-muted-foreground font-newLuck">Active students & faculty</p>
                  </CardContent>
                </Card>
                <Card className="backdrop-blur-md bg-background/60 border-gradient hover:scale-105 transition-transform duration-300 dark:bg-background/40 border-gray-700">
                  <CardContent className="p-6 space-y-2">
                    <Library className="w-8 h-8 text-primary" />
                    <h3 className="font-semibold">50+ Colleges</h3>
                    <p className="text-sm text-muted-foreground font-newLuck">Partner institutions</p>
                  </CardContent>
                </Card>
                <Card className="backdrop-blur-md bg-background/60 border-gradient hover:scale-105 transition-transform duration-300 dark:bg-background/40 border-gray-700">
                  <CardContent className="p-6 space-y-2">
                    <GraduationCap className="w-8 h-8 text-primary" />
                    <h3 className="font-semibold">20+ Branches</h3>
                    <p className="text-sm text-muted-foreground font-newLuck">Engineering disciplines</p>
                  </CardContent>
                </Card>
                <Card className="backdrop-blur-md bg-background/60 border-gradient hover:scale-105 transition-transform duration-300 dark:bg-background/40 border-gray-700">
                  <CardContent className="p-6 space-y-2">
                    <Star className="w-8 h-8 text-primary" />
                    <h3 className="font-semibold">4.8/5 Rating</h3>
                    <p className="text-sm text-muted-foreground font-newLuck">User satisfaction</p>
                  </CardContent>
                </Card>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-3xl blur-3xl dark:from-primary/10 dark:to-secondary/10" />
              <Image
                src="https://res.cloudinary.com/djcbdfehg/image/upload/v1711614282/samples/cup-on-a-table.jpg"
                alt="Students studying"
                width={600}
                height={400}
                className="rounded-3xl relative shadow-2xl border-gray-700 review-image"
                style={{ width: 'auto', height: 'auto' }} // Maintain aspect ratio
              />
            </div>
          </div>
        </div>
      </section>

      {/* Reviews  */}
      <section id='reviews' className="container mx-auto mb-20 font-newLuck">
        <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-primary to-primary/50 bg-clip-text text-black dark:text-white">
          What Our Users Say
        </h2>
        <div className="relative max-w-4xl mx-auto">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-3xl blur-3xl dark:from-primary/5 dark:to-secondary/5" />
          <Card className="backdrop-blur-md bg-background/60 border-gradient dark:bg-background/40 border-gray-700 font-newLuck">
            <CardContent className="p-8">
              <div className="flex items-center gap-4 mb-6">
                <Image
                  src={reviews[currentReview].avatar}
                  alt={reviews[currentReview].name}
                  width={60}
                  height={60}
                  className="rounded-full review-image"
                />
                <div>
                  <h3 className="font-semibold">{reviews[currentReview].name}</h3>
                  <p className="text-sm text-muted-foreground">{reviews[currentReview].role}</p>
                  <p className="text-sm text-muted-foreground">{reviews[currentReview].college}</p>
                </div>
              </div>
              <motion.div
                key={currentReview}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="mb-6"
              >
                <p className="text-lg italic">{reviews[currentReview].content}</p>
              </motion.div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  {[...Array(reviews[currentReview].rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                  ))}
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={prevReview}
                    className="rounded-full hover:scale-110 transition-transform duration-300"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={nextReview}
                    className="rounded-full hover:scale-110 transition-transform duration-300"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Contact Section */}
      <ContactSection />
    </div>
  )
}

