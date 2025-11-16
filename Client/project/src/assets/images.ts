// Centralized image assets
// This file exports all images used across the application

// Product images
import heroImage from './products/cool.jpg';
import homeBg from './products/home.jpg';
import menCategoryImg from './products/img2.jpg';
import womenCategoryImg from './products/img3.jpg';
import accessoriesCategoryImg from './products/img4.jpg';
import shoesCategoryImg from './products/img5.jpg';
import productImg1 from './products/img1.jpg';
import productImg2 from './products/img2.jpg';
import productImg3 from './products/img6.jpg';
import productImg4 from './products/img7.jpg';

// Brand images
import Puma from './Brands/Puma.png';
import Pantloon from './Brands/Pantloon.png';
import Levis from './Brands/Levis.png';
import Balenciaga from './Brands/Balenciaga.png';
import Zara from './Brands/Zara.png';
import HM from './Brands/H&M.png';

// Export individual images
export {
  heroImage,
  homeBg,
  menCategoryImg,
  womenCategoryImg,
  accessoriesCategoryImg,
  shoesCategoryImg,
  productImg1,
  productImg2,
  productImg3,
  productImg4,
  Puma,
  Pantloon,
  Levis,
  Balenciaga,
  Zara,
  HM,
};

// Brand images array for easy iteration
export const brandImages = [
  { id: 1, name: 'Puma', image: Puma },
  { id: 2, name: 'Pantloon', image: Pantloon },
  { id: 3, name: 'Levis', image: Levis },
  { id: 4, name: 'Balenciaga', image: Balenciaga },
  { id: 5, name: 'Zara', image: Zara },
  { id: 6, name: 'H&M', image: HM },
];

