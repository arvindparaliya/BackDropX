import logo from '/logo.png';
import videoBanner from './home-page-banner.mp4';
import people from './people.png';
import peopleOrg from './people-org.png';
import credits from './credits.png';

// Steps for Background Removal
const steps = [
  {
    step: "Step 1",
    title: "Upload Your Photo 📸",
    description: `Choose any photo (PNG or JPG) and upload it to our tool. 
    We support all image sizes, from tiny profile pics to large HD shots.`
  },
  {
    step: "Step 2",
    title: "AI Removes Background ✨",
    description: `Our smart AI instantly removes the background for you. 
    Choose from transparent, white, or even custom colors to match your design.`
  },
  {
    step: "Step 3",
    title: "Download & Share 🚀",
    description: `Once you're happy with the result, download your image in high quality. 
    Perfect for resumes, social media, e-commerce, or creative projects.`
  }
];

// Popular categories
const categories = ["People", "Products", "Animals", "Cars", "Graphics"];

// Pricing Plans
// Pricing Plans
const plans = [
  {
    id: "Basic",
    name: "Basic",
    price: 299,
    credits: "100 Credits",
    description: "Perfect for students & casual users.",
    popular: false
  },
  {
    id: "Premium",
    name: "Premium",
    price: 999,
    credits: "500 Credits",
    description: "Most popular for freelancers & small businesses.",
    popular: true
  },
  {
    id: "Ultimate",
    name: "Ultimate",
    price: 1999,
    credits: "1500 Credits",
    description: "Best value for agencies & e-commerce teams.",
    popular: false
  }
];


// Testimonials
const testimonials = [
  {
    id: 1,
    quote: "BackDropX is unbelievably accurate! I saved hours editing my product photos.",
    author: "Vishal Malohtra",
    handle: "@vishu_18"
  },
  {
    id: 2,
    quote: "A game changer for my design workflow. It’s fast, simple, and way ahead of the competition.",
    author: "Kalpna Sharma",
    handle: "@kd_sharma"
  },
  {
    id: 3,
    quote: "Finally, an AI that understands fine details like hair strands — no more jagged edges!",
    author: "Bhavik Miyatra",
    handle: "@its_bhavik"
  }
];

// Footer Social Links
const footerConstants = [
  {
    url: "https://github.com/arvindparaliya",
    logo: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/github.svg"
  },
  {
    url: "https://linkedin.com/in/arvindparaliya",
    logo: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/linkedin.svg"
  },
  {
    url: "mailto:arvindparaliya01@gmail.com",
    logo: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/gmail.svg"
  },
  {
    url: "https://twitter.com/arvindparaliyaa",
    logo: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/x.svg"
  }
];


// Exporting all assets
export const assets = {
  logo,
  videoBanner,
  steps,
  categories,
  people,
  peopleOrg,
  plans,
  testimonials,
  footerConstants,
  credits
};
