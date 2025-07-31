import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import BaseLayout from '../layouts/BaseLayout';
import DigimonListPage from '../pages/DigimonListPage';
import DigimonNewPage from '../pages/DigimonNewPage';
import DigimonEditPage from '../pages/DigimonEditPage';
import DigimonViewPage from '../pages/DigimonViewPage';

const AppRoutes: React.FC = () => (
  <BrowserRouter>
    <Routes>
      <Route element={<BaseLayout />}>
        <Route path="/" element={<DigimonListPage />} />
        <Route path="/nuevo" element={<DigimonNewPage />} />
        <Route path="/ver/:id" element={<DigimonViewPage />} />
        <Route path="/editar/:id" element={<DigimonEditPage />} />
      </Route>
    </Routes>
  </BrowserRouter>
);

export default AppRoutes;
