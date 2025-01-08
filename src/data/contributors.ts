export interface Contributor {
    id: number;
    name: string;
    department: string;
    review: string;
    photo: string;
    specialisation: string;
    socialLinks: {
      instagram?: string; 
      linkedin?: string;
      github?: string;
    };
  }
  
  export const contributors: Contributor[] = [
    {
      id: 1,
      name: "Raghav Gupta",
      department: "Engineering",
      review: "Raghav Gupta is an exceptional problem solver and a great team player. His innovative approaches to complex challenges have significantly improved the website's performance. He has provided the entire Computer Science Engineering (CSE) content material for the students of CGC College (CEC). His dedication and contributions have been invaluable to our success.",
      photo: "https://res.cloudinary.com/djcbdfehg/image/upload/v1735296984/information-technology.jpg",//photo to be pastedhere
      specialisation: "Android Developer",
      socialLinks: {
        instagram: "https://instagram.com/raghavgupta.04",
        linkedin: "https://linkedin.com/in/raghaavgupta2004",
        github: "https://github.com/raghavg2004"
      }
    },
    {
      id: 2,
      name: "Sonu Kumar",
      department: "Design",
      review: "John's creative designs have significantly improved our user experience. His attention to detail and user-centric approach have set new standards for our product's visual appeal.",
      photo: "https://res.cloudinary.com/djcbdfehg/image/upload/v1735296984/information-technology.jpg",
      specialisation: "UI/UX Design",
      socialLinks: {
        instagram: "https://instagram.com/raghavgupta.04",
        linkedin: "https://linkedin.com/in/raghaavgupta2004",
        github: "https://github.com/raghavg2004"
      }
    },
    {
      id: 3,
      name: "Sonu Pal",
      department: "Marketing",
      review: "Emily's innovative marketing strategies have boosted our brand visibility. Her data-driven approach and creative campaigns have significantly increased our market reach and user engagement.",
      photo: "https://res.cloudinary.com/djcbdfehg/image/upload/v1735296984/information-technology.jpg",
      specialisation: "Digital Marketing",
      socialLinks: {
        instagram: "https://instagram.com/raghavgupta.04",
        linkedin: "https://linkedin.com/in/raghaavgupta2004",
        github: "https://github.com/raghavg2004"
      }
    },
    {
      id: 4,
      name: "Amit Kumar",
      department: "Marketing",
      review: "Emily's innovative marketing strategies have boosted our brand visibility. Her data-driven approach and creative campaigns have significantly increased our market reach and user engagement.",
      photo: "https://res.cloudinary.com/djcbdfehg/image/upload/v1735296984/information-technology.jpg",
      specialisation: "Digital Marketing",
      socialLinks: {
        instagram: "https://instagram.com/raghavgupta.04",
        linkedin: "https://linkedin.com/in/raghaavgupta2004",
        github: "https://github.com/raghavg2004"
      }
    },
    {
      id: 5,
      name: "Ojas Mehta",
      department: "Marketing",
      review: "Emily's innovative marketing strategies have boosted our brand visibility. Her data-driven approach and creative campaigns have significantly increased our market reach and user engagement.",
      photo: "https://res.cloudinary.com/djcbdfehg/image/upload/v1735296984/information-technology.jpg",
      specialisation: "Digital Marketing",
      socialLinks: {
        instagram: "https://instagram.com/raghavgupta.04",
        linkedin: "https://linkedin.com/in/raghaavgupta2004",
        github: "https://github.com/raghavg2004"
      }
    }
  ];
  
  