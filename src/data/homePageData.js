// src/data/homePageData.js

export const heroSlides = [
  {
    id: "hero-1",
    img: "/assets/homepage/shop-hero-1-product-slide-1.png",
    season: "SUMMER 2020",
    title: "NEW COLLECTION",
    desc: "We know how large objects will act, but things on a small scale.",
    button: "SHOP NOW",
    href: "/shop",
  },
];

export const vitaClassicSlides = [
  {
    id: "vita-1",
    bg: "/assets/homepage/product-slide-1-2.jpg",          // yeşil bg
    personPng: "assets/homepage/png-cover-2.png", // erkek png
    season: "SUMMER 2020",
    title: "Vita Classic Product",
    desc: "We know how large objects will act, but things on a small scale.",
    price: "$16.48",
    button: "ADD TO CART",
    href: "/shop",
  },
];

export const editorsPick = {
  men: "/assets/homepage/media-bg-cover.png",
  women: "/assets/homepage/women-vertical.jpg",
  accessories: "/assets/homepage/accessories.jpg",
  kids: "/assets/homepage/kid.jpg",
};

const productImgs = [
  
  "/assets/homepage/product-slide-1-2.jpg",
  "/assets/homepage/product-slide-2.jpg",
  
];

export const bestsellerProducts = Array.from({ length: 8 }).map((_, i) => ({
  id: i + 1,
  img: productImgs[i % productImgs.length],
  title: "Graphic Design",
  department: "English Department",
  priceOld: "$16.48",
  priceNew: "$6.48",
}));

export const neuralUniverse = {
  img: "/assets/homepage/rh_women.jpg",
  season: "SUMMER 2020",
  title: "Part of the Neural Universe",
  desc: "We know how large objects will act, but things on a small scale.",
  primaryBtn: "BUY NOW",
  primaryHref: "/shop",
  secondaryBtn: "READ MORE",
  secondaryHref: "/about",
};

export const featuredPosts = [
  {
    id: "post-1",
    img: "/assets/homepage/unsplash_Bd7gNnWJBkU-1.jpg",
    title: "Loudest à la Madison #1",
    desc: "We focus on ergonomics and meeting you where you work. It's only a keystroke away.",
    href: "/blog/1",
  },
  {
    id: "post-2",
    img: "/assets/homepage/unsplash_Bd7gNnWJBkU-2.jpg",
    title: "Loudest à la Madison #1",
    desc: "We focus on ergonomics and meeting you where you work. It's only a keystroke away.",
    href: "/blog/2",
  },
  {
    id: "post-3",
    img: "/assets/homepage/rh_women.jpg",
    title: "Loudest à la Madison #1",
    desc: "We focus on ergonomics and meeting you where you work. It's only a keystroke away.",
    href: "/blog/3",
  },
];
