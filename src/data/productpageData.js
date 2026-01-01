// src/data/productPageData.js

export const productDetails = Array.from({ length: 12 }).map((_, i) => {
  const id = i + 1;

  return {
    id,
    title: "Floating Phone",
    reviews: 10,
    price: "$1,139.33",
    availability: "In Stock",
    description:
      "Met minim Mollie non desert Alamo est sit cliquey dolor do met sent. RELIT official consequent door ENIM RELIT Mollie. Excitation venial consequent nostrud met.",
    colors: ["#23A6F0", "#23856D", "#E77C40", "#252B42"],
    images: {
      main: `https://picsum.photos/900/650?random=${100 + id}`,
      thumbs: [
        `https://picsum.photos/180/140?random=${200 + id}`,
        `https://picsum.photos/180/140?random=${220 + id}`,
      ],
    },
    tabs: {
      descriptionTitle: "the quick fox jumps over",
      paragraphs: [
        "Met minim Mollie non desert Alamo est sit cliquey dolor do met sent. RELIT official consequent door ENIM RELIT Mollie. Excitation venial consequent nostrud met.",
        "Met minim Mollie non desert Alamo est sit cliquey dolor do met sent. RELIT official consequent door ENIM RELIT Mollie. Excitation venial consequent nostrud met.",
        "Met minim Mollie non desert Alamo est sit cliquey dolor do met sent. RELIT official consequent door ENIM RELIT Mollie. Excitation venial consequent nostrud met.",
      ],
      bullets: [
        "the quick fox jumps over the lazy dog",
        "the quick fox jumps over the lazy dog",
        "the quick fox jumps over the lazy dog",
        "the quick fox jumps over the lazy dog",
      ],
      image: `https://picsum.photos/520/420?random=${300 + id}`,
    },
  };
});

export function getProductById(id) {
  return productDetails.find((p) => String(p.id) === String(id));
}
