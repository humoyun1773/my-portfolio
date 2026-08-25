import React from 'react';
import Hero from '../components/sections/Hero';
import Skills from '../components/sections/Skills';
import Projects from '../components/sections/Projects';
import LiveStatePlayground from '../components/sections/LiveStatePlayground';
import InteractiveTerminal from '../components/sections/InteractiveTerminal';
import ExperienceRoadmap from '../components/sections/ExperienceRoadmap';
import Contact from '../components/sections/Contact';

export default function HomePage({ currentTheme, setCurrentTheme }) {
  return (
    <main>
      <Hero currentTheme={currentTheme} />
      <Skills currentTheme={currentTheme} />
      <Projects />
      <LiveStatePlayground />
      <InteractiveTerminal currentTheme={currentTheme} setCurrentTheme={setCurrentTheme} />
      <ExperienceRoadmap />
      <Contact currentTheme={currentTheme} />
    </main>
  );
}
