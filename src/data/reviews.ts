import { Review } from "@/models/Reviews"

export const reviews: Review[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Student",
    college: "MIT Institute of Technology",
    branch: "Computer Science",
    year: "3rd Year",
    content: "This platform has been invaluable for my studies. Having access to previous years' question papers helped me understand the exam pattern better. The notes section is well-organized and comprehensive.",
    avatar: "/placeholder.svg?height=100&width=100",
    rating: 5
  },
  {
    id: 2,
    name: "Dr. Robert Chen",
    role: "Professor",
    college: "Stanford Engineering College",
    branch: "Electrical Engineering",
    year: "10+ years teaching",
    content: "As a faculty member, this platform has made it easier to share resources with students. The organization by semester and branch makes it simple to navigate and find relevant materials.",
    avatar: "/placeholder.svg?height=100&width=100",
    rating: 5
  },
  {
    id: 3,
    name: "Priya Patel",
    role: "Student",
    college: "Delhi Technical University",
    branch: "Mechanical Engineering",
    year: "4th Year",
    content: "The variety of study materials available here is amazing. It's helped me prepare for exams more effectively, and the interface makes finding specific topics really easy.",
    avatar: "/placeholder.svg?height=100&width=100",
    rating: 4
  }
]

