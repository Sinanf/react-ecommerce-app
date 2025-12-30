// src/pages/HomePage.jsx
import HeroSection from "../components/homepage/HeroSection";
import EditorsPickSection from "../components/homepage/EditorsPickSection";
import BestsellerSection from "../components/homepage/BestsellerSection";
import NeuralUniverseSection from "../components/homepage/NeuralUniverseSection";
import FeaturedPostsSection from "../components/homepage/FeaturedPostsSection";
import VitaSection from "../components/homepage/VitaSection";

export default function HomePage() {
  return (
    <div className="w-full flex flex-col">
      <HeroSection />
      <EditorsPickSection />
      <BestsellerSection />
      <NeuralUniverseSection />
      <VitaSection />
      <FeaturedPostsSection />
    </div>
  );
}
