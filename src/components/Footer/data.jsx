import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

// Array of product links
export const productLinks = [
  { name: "Home", path: "/" },
  { name: "About Us", path: "/about" },
  { name: "Delivery", path: "/delivery" },
  { name: "Privacy Policy", path: "/privacy" },
];

// Array of product resource links
export const resourceLinks = [
  { name: "Resources", path: "/resources" },
  { name: "Blog", path: "/blog" },
  { name: "FAQs", path: "/faqs" },
];

// Social media links with MUI icons
export const socialLinks = [
  { name: "Facebook", icon: <FacebookIcon fontSize="small" />, url: "https://www.facebook.com" },
  { name: "Twitter", icon: <TwitterIcon fontSize="small" />, url: "https://www.twitter.com" },
  { name: "LinkedIn", icon: <LinkedInIcon fontSize="small" />, url: "https://www.linkedin.com" },
];
