import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import PinterestIcon from '@mui/icons-material/Pinterest';
// import SnapchatIcon from '@mui/icons-material/Snapchat';
import TikTokIcon from '@mui/icons-material/MusicNote';
import { X } from '@mui/icons-material';

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
  { name: "Twitter", icon: <X fontSize="small" />, url: "https://www.twitter.com" },
  { name: "LinkedIn", icon: <LinkedInIcon fontSize="small" />, url: "https://www.linkedin.com" },
  { name: "Instagram", icon: <InstagramIcon fontSize="small" />, url: "https://www.instagram.com" },
  { name: "YouTube", icon: <YouTubeIcon fontSize="small" />, url: "https://www.youtube.com" },
  { name: "Pinterest", icon: <PinterestIcon fontSize="small" />, url: "https://www.pinterest.com" },
  // { name: "Snapchat", icon: <SnapchatIcon fontSize="small" />, url: "https://www.snapchat.com" },
  { name: "TikTok", icon: <TikTokIcon fontSize="small" />, url: "https://www.tiktok.com" },
];
