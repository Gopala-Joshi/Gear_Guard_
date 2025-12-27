import Navbar from "./Navbar";

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Top Navigation */}
      <Navbar />

      {/* Page Content */}
      <main className="pt-14">
        <div className="max-w-7xl mx-auto px-6 py-6">
          {children}
        </div>
      </main>
    </div>
  );
}
