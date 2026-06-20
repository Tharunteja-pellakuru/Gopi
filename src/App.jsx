import { useState } from 'react';
import { ReactLenis } from 'lenis/react';

// Components
import Loader from './components/Loader';
import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import TimelineProgress from './components/TimelineProgress';

// Sections
import Hero from './sections/Hero';
import Projects from './sections/Projects';
import Showreel from './sections/Showreel';
import EditingVibes from './sections/EditingVibes';
import Tools from './sections/Tools';
import About from './sections/About';
import Services from './sections/Services';
import Testimonials from './sections/Testimonials';
import Contact from './sections/Contact';
import Footer from './sections/Footer';

export default function App() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      {/* Preloader Screen */}
      <Loader onComplete={() => setLoading(false)} />

      {/* Main Page Content */}
      {!loading && (
        <ReactLenis root options={{ duration: 1.2, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) }}>
          {/* Global Film Grain Noise */}
          <div className="noise-overlay" />

          {/* Premium UI Utilities */}
          <CustomCursor />
          <TimelineProgress />
          <Navbar />

          {/* Structured Sections */}
          <main className="relative z-10 w-full overflow-x-hidden">
            <Hero />

            <Projects />
                        {/* <Showreel /> */}
            <EditingVibes />
            <Tools />
            <About />
            <Services />
            <Testimonials />
            <Contact />
            <Footer />
          </main>
        </ReactLenis>
      )}
    </>
  );
}
