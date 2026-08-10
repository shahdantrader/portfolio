import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import PersonalProjects from './components/PersonalProjects';
import Certificates from './components/Certificates';
import Contact from './components/Contact';

export default function Home() {
  return (
    <main className="flex flex-col">
      <Hero />
      <About />
      <Projects />
      <PersonalProjects />
      <Certificates />
      <Contact />
    </main>
  );
}
