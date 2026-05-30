import { LanguageProvider } from "./contexts/LanguageContext";
import { useReveal } from "./hooks/useReveal";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import TrustStrip from "./components/TrustStrip";
import About from "./components/About";
import Benefits from "./components/Benefits";
import Gallery from "./components/Gallery";
import Branches from "./components/Branches";
import Testimonials from "./components/Testimonials";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

function AppInner() {
  useReveal();
  return (
    <div className="min-h-screen bg-snow font-sans">
      <Navbar />
      <main>
        <Hero />
        <TrustStrip />
        <About />
        <Benefits />
        <Gallery />
        <Branches />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AppInner />
    </LanguageProvider>
  );
}
