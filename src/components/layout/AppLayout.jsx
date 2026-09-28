import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';

export default function AppLayout() {
  return (
    <div className="bg-surface font-body-md text-on-surface antialiased min-h-screen">
      <Sidebar />
      <div className="pl-64">
        <Header />
        <main className="relative pt-16 w-full min-h-screen bg-surface">
          <Outlet />
        </main>
      </div>
    </div>
  );
}