import Header from "./layout/Header";
import Footer from "./layout/Footer";
import PageContent from "./layout/PageContent";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <PageContent />
      <Footer />
    </div>
  );
}
