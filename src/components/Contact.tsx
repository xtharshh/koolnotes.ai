'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Loader2, MailIcon, MessageSquare, Send, User } from 'lucide-react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, SubmitHandler } from 'react-hook-form';
import * as z from 'zod';
import { NextUIProvider } from '@nextui-org/react';
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { useToast } from '../hooks/use-toast';

const formSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  subject: z.string().min(5, 'Subject must be at least 5 characters'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type FormValues = z.infer<typeof formSchema>;

const ContactSection: React.FC = React.memo(function ContactSection() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
    },
  });

  const onSubmit: SubmitHandler<FormValues> = async (values) => {
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        toast({
          title: 'Message sent successfully!',
          description: "We'll get back to you as soon as possible.",
        });
        reset();
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error);
      }
    } catch (error: unknown) {
      toast({
        variant: 'destructive',
        title: 'Error sending message',
        description: `Please try again later. Error: ${error instanceof Error ? error.message : 'Unknown error'}`,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <NextUIProvider>
      <section id='contactus' className="container mx-auto py-16 px-4 bg-white dark:bg-black text-black dark:text-white font-newLuck">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/50 bg-clip-text">
              Get in Touch
            </h2>
            <p className="text-lg text-muted-foreground mx-auto">
              Have questions about our resources? Need support? Or want to collaborate? 
              We&apos;re here to help! Fill out the form below and we&apos;ll get back to you shortly.
            </p>
          </div>

          <div className="max-w-2xl mx-auto relative">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-3xl blur-3xl dark:from-primary/5 dark:to-secondary/5" />
            <Card className="backdrop-blur-md bg-background/60 border-gradient dark:bg-background/40 border-gray-700">
              <CardHeader>
                <CardTitle>Contact Support</CardTitle>
                <CardDescription>
                  Fill out the form below and our team will get back to you within 24 hours.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form id="contact-form" onSubmit={handleSubmit(onSubmit)} className="space-y-6 border-gray-700">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Name</label>
                      <div className="mt-1 relative rounded-md shadow-sm">
                        <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground " />
                        <Input
                          id="name"
                          {...register('name')}
                          placeholder="Your name"
                          className={`w-full pl-10 ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
                        />
                      </div>
                      {errors.name && <p className="mt-2 text-sm text-red-600">{errors.name.message}</p>}
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
                      <div className="mt-1 relative rounded-md shadow-sm">
                        <MailIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="email"
                          type="email"
                          {...register('email')}
                          placeholder="your@email.com"
                          className={`w-full pl-10 ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                        />
                      </div>
                      {errors.email && <p className="mt-2 text-sm text-red-600">{errors.email.message}</p>}
                    </div>
                  </div>
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Subject</label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <MessageSquare className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="subject"
                        {...register('subject')}
                        placeholder="What's this about?"
                        className={`w-full pl-10 ${errors.subject ? 'border-red-500' : 'border-gray-300'}`}
                      />
                    </div>
                    {errors.subject && <p className="mt-2 text-sm text-red-600">{errors.subject.message}</p>}
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Message</label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <Textarea
                        id="message"
                        {...register('message')}
                        placeholder="Tell us how we can help..."
                        className={`w-full  ${errors.message ? 'border-red-500' : 'border-gray-300'}`}
                      />
                    </div>
                    {errors.message && <p className="mt-2 text-sm text-red-600">{errors.message.message}</p>}
                  </div>
                  <Button
                    type="submit"
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      </section>
    </NextUIProvider>
  );
});

export default ContactSection;
