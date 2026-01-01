// src/data/shopPageData.js

export const shopCategories = [
  { id: "c1", title: "CLOTHS", items: "5 Items", img: "https://picsum.photos/600/600?random=11" },
  { id: "c2", title: "CLOTHS", items: "5 Items", img: "https://picsum.photos/600/600?random=12" },
  { id: "c3", title: "CLOTHS", items: "5 Items", img: "https://picsum.photos/600/600?random=13" },
  { id: "c4", title: "CLOTHS", items: "5 Items", img: "https://picsum.photos/600/600?random=14" },
  { id: "c5", title: "CLOTHS", items: "5 Items", img: "https://picsum.photos/600/600?random=15" },
];

export const shopProducts = Array.from({ length: 12 }).map((_, i) => ({
  id: i + 1,
  img: `https://picsum.photos/800/900?random=${30 + i}`,
  title: "Graphic Design",
  department: "English Department",
  priceOld: "$16.48",
  priceNew: "$6.48",
}));

export const brandLogos = [
  { id: "b1", name: "Hooli", img: "https://dummyimage.com/140x60/ddd/555&text=Hooli" },
  { id: "b2", name: "Lyft", img: "https://dummyimage.com/140x60/ddd/555&text=Lyft" },
  { id: "b3", name: "Stripe", img: "https://dummyimage.com/140x60/ddd/555&text=Stripe" },
  { id: "b4", name: "AWS", img: "https://dummyimage.com/140x60/ddd/555&text=AWS" },
  { id: "b5", name: "Reddit", img: "https://dummyimage.com/140x60/ddd/555&text=Reddit" },
];
