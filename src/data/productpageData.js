//productpageData.js
import { shopProducts } from "./shoppageData";

export function getProductDetailById(id) {
  const base =
    shopProducts.find((p) => String(p.id) === String(id)) || shopProducts[0];

  const safeId = base?.id || 1;

  return {
    id: safeId,
    title: "Floating Phone",
    reviewsCount: 10,
    price: "$1,139.33",
    availability: "In Stock",
    desc:
      "Met minim Mollie non desert Alamo est sit cliquey dolor do met sent. RELIT official consequent door ENIM RELIT Mollie.",
    colors: ["#23A6F0", "#2DC071", "#E77C40", "#252B42"],
    images: [
      `https://picsum.photos/900/700?random=${200 + safeId}`,
      `https://picsum.photos/900/700?random=${210 + safeId}`,
      `https://picsum.photos/900/700?random=${220 + safeId}`,
    ],
    thumbs: [
      `https://picsum.photos/160/120?random=${300 + safeId}`,
      `https://picsum.photos/160/120?random=${310 + safeId}`,
    ],
    tabs: {
      descriptionTitle: "the quick fox jumps over",
      descriptionText:
        "Met minim Mollie non desert Alamo est sit cliquey dolor do met sent. RELIT official consequent door ENIM RELIT Mollie. Excitation venial consequent nostrum met.\n\nMet minim Mollie non desert Alamo est sit cliquey dolor do met sent. RELIT official consequent door ENIM RELIT Mollie.",
      bulletTitle: "the quick fox jumps over",
      bullets: Array.from({ length: 8 }).map(
        () => "the quick fox jumps over the lazy dog"
      ),
      image: `https://picsum.photos/520/420?random=${400 + safeId}`,
    },
    related: shopProducts.slice(0, 8),
  };
}
