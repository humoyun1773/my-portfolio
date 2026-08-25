import React from 'react';
import Hero from '../components/sections/Hero';
import Skills from '../components/sections/Skills';
import Projects from '../components/sections/Projects';
import ExperienceRoadmap from '../components/sections/ExperienceRoadmap';
import Contact from '../components/sections/Contact';

export default function HomePage({ currentTheme, setCurrentTheme }) {
  return (
    <main>
      <Hero currentTheme={currentTheme} />
      <Skills currentTheme={currentTheme} />
      <Projects />
      <ExperienceRoadmap />
      <Contact currentTheme={currentTheme} />
    </main>
  );
}
