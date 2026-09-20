export const site = {
  name: "kodcreate",
  description: "Founder-led website development. Custom, responsive websites thoughtfully designed and built around your business goals.",
  contactEmail: "kodcreatecompany@gmail.com",
  hero: {
    eyebrow: "THOUGHTFULLY DESIGNED. PURPOSEFULLY BUILT.",
    description: "Make a memorable first impression. Custom design, thoughtful development, and a website that moves your business forward.",
  },
  navigation: [
    { label: "Home", href: "#home" },
    { label: "Service", href: "#service" },
    { label: "Process", href: "#process" },
    { label: "FAQs", href: "#faqs" },
  ],
  features: [
    { title: "Uniquely yours", description: "Custom design that reflects your brand, not a template that could belong to anyone." },
    { title: "Every screen, considered", description: "Responsive layouts that feel right on a phone, a tablet, and everything in between." },
    { title: "Performance built in", description: "Fast-loading pages, accessible interactions, and a smooth experience from the first click." },
    { title: "A strong foundation", description: "Search-friendly structure and the backend functionality your business actually needs." },
  ],
  process: [
    { number: "01", title: "Discovery", description: "A conversation about your business, your audience, and what your website needs to achieve." },
    { number: "02", title: "Design", description: "Your vision takes shape. We refine the look, feel, and flow together before building." },
    { number: "03", title: "Development", description: "Thoughtful design meets clean code. Your website is built and checked across devices." },
    { number: "04", title: "Launch", description: "Final checks, a smooth launch, and a clear handover so you can move forward confidently." },
  ],
  faqs: [
    { question: "What’s included in website development?", answer: "Your project brings design and development together as one complete offering. It can include custom page design, responsive layouts, SEO foundations, and backend features such as forms or content management. We agree on the exact scope before work begins, so you know what is included." },
    { question: "How long will my website take?", answer: "Timelines depend on the number of pages, the functionality, and how ready your content is. After our discovery conversation, you’ll receive a proposed schedule with clear milestones. Your preferred launch date is part of that conversation." },
    { question: "Can you help with hosting and my domain?", answer: "Yes. I can help you choose suitable hosting, connect your domain, and get your website online. Domain and hosting costs depend on your chosen providers and are discussed separately. Your accounts and domain stay in your control." },
    { question: "How do feedback and revisions work?", answer: "You’re involved throughout the project, with opportunities to review the design and the working website. The revision process is agreed in the project scope. If a new idea changes that scope, we discuss the impact before proceeding." },
    { question: "What happens after launch?", answer: "You’ll receive a clear handover and guidance for using your website. If you need ongoing updates or technical support, we can discuss a suitable arrangement based on your website and your needs. Nothing is added without your agreement." },
  ],
} as const

export function getSiteUrl() {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "")
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`
  return "http://localhost:3000"
}
