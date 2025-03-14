export interface FAQ {
  question: string;
  answer: string;
}

export const faq: FAQ[] = [
  {
    question: "What is Kool.ai?",
    answer: "Kool.ai is an innovative platform providing AI-powered solutions for education."
  },
  {
    question: "How do I contact support?",
    answer: "You can reach our support team at support@kool.ai."
  }
];

export const initialMessage = {
  content: "You are Kool.ai's AI assistant. How can I help you with your college-related questions?"
};