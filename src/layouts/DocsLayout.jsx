// DocsLayout.jsx
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";

const DocsLayout = ({ children }) => (
  <div className="flex flex-col min-h-screen">
    <div className="flex flex-1 relative">
      <Sidebar />
      <div className="flex-1 flex flex-col ml-0 md:ml-64">
        <main className="flex-1 bg-black text-white p-8">
          {children}
        </main>
      </div>
    </div>
    <Footer />
  </div>
);

export default DocsLayout;