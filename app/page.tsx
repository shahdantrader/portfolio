import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Certificates from './components/Certificates';
import Lab from './components/Lab';
import Contact from './components/Contact';

export default function Home() {
  return (
    <main className="flex flex-col">
      <Hero />
      <About />
      <Projects />
      <Certificates />
      <Lab />
      <Contact />
    </main>
  );
}
