import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { RootLayout } from '@/components/layout/RootLayout';
import { HomePage } from '@/pages/HomePage';
import { PlannerPage } from '@/pages/PlannerPage';
import { AppHubPage } from '@/pages/AppHubPage';
import { KnowledgeHubPage } from '@/pages/KnowledgeHubPage';
import { WellnessPage } from '@/pages/WellnessPage';
import { LifeAIPage } from '@/pages/LifeAIPage';
import { PersonalizationPage } from '@/pages/PersonalizationPage';
import { useSettingsStore } from '@/store/settingsStore';
import { accentColors } from '@/data/mockData';

function ThemeManager() {
  const { theme, accent } = useSettingsStore();

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  useEffect(() => {
    const color = accentColors.find((c) => c.name === accent);
    if (color) {
      document.documentElement.style.setProperty('--accent', color.value);
      document.documentElement.style.setProperty('--accent-soft', color.soft);
    }
  }, [accent]);

  return null;
}

function App() {
  return (
    <BrowserRouter>
      <ThemeManager />
      <Routes>
        <Route element={<RootLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/planner" element={<PlannerPage />} />
          <Route path="/apps" element={<AppHubPage />} />
          <Route path="/knowledge" element={<KnowledgeHubPage />} />
          <Route path="/wellness" element={<WellnessPage />} />
          <Route path="/ai" element={<LifeAIPage />} />
          <Route path="/settings" element={<PersonalizationPage />} />
          <Route path="*" element={<HomePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
