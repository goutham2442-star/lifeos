import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { BottomNav } from './BottomNav';
import { FloatingAIButton } from './FloatingAIButton';

export function RootLayout() {
  return (
    <div className="flex min-h-screen bg-base">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <Header />
        <main className="flex-1 px-3 sm:px-4 lg:px-8 py-4 sm:py-6 pb-24 lg:pb-8">
          <Outlet />
        </main>
      </div>
      <BottomNav />
      <FloatingAIButton />
    </div>
  );
}
