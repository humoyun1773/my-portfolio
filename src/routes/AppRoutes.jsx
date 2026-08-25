import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import NotFoundPage from '../pages/NotFoundPage';
import { ROUTE_PATHS } from './routePaths';

export default function AppRoutes({ currentTheme, setCurrentTheme }) {
  return (
    <Routes>
      <Route
        path={ROUTE_PATHS.HOME}
        element={
          <HomePage
            currentTheme={currentTheme}
            setCurrentTheme={setCurrentTheme}
          />
        }
      />
      <Route path={ROUTE_PATHS.NOT_FOUND} element={<NotFoundPage />} />
    </Routes>
  );
}
