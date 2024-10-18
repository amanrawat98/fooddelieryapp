import { FaFacebookF, FaLinkedinIn, FaTwitter } from "react-icons/fa";

  // Array of product links
  export const productLinks = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about" },
    { name: "Delivery", path: "/delivery" },
    { name: "Privacy Policy", path: "/privacy" },
  ];

  // Array of product resource links
 export  const resourceLinks = [
    { name: "Resources", path: "/resources" },
    { name: "Blog", path: "/blog" },
    { name: "FAQs", path: "/faqs" },
  ];

  // Social media links
  export const socialLinks = [
    { name: "Facebook", icon: <FaFacebookF size={20} />, url: "https://www.facebook.com" },
    { name: "Twitter", icon: <FaTwitter size={20} />, url: "https://www.twitter.com" },
    { name: "LinkedIn", icon: <FaLinkedinIn size={20} />, url: "https://www.linkedin.com" },
  ];