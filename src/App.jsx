// App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Hypocycloid from "./pages/Hypocycloid";
import Epicycloid from "./pages/Epicycloid";
import Epitrochoid from "./pages/Epitrochoid";
import Hypotrochoid from "./pages/Hypotrochoid";
import Lissajous from "./pages/Lissajous";
import Rose from "./pages/Rose";
import DocsLayout from "./layouts/DocsLayout";
import HypocycloidDocs from "./pages/HypocycloidDocs";
import EpicycloidDocs from "./pages/EpicycloidDocs";
import EpitrochoidDocs from "./pages/EpitrochoidDocs";
import HypotrochoidDocs from "./pages/HypotrochoidDocs";
import LissajousDocs from "./pages/LissajousDocs";
import RoseDocs from "./pages/RoseDocs";
import HomeLight from "./pages/HomeLight";

function App() {
  return (
    <Router>
      <Routes>
        {/* Home page without sidebar */}
        <Route path="/" element={<Home />} />

        {/* Docs pages with sidebar */}
         <Route
          path="/docs"
          element={
            <DocsLayout>
              <HypocycloidDocs />
            </DocsLayout>
          }
        />       
        <Route
          path="/docs/hypocycloid"
          element={
            <DocsLayout>
              <HypocycloidDocs />
            </DocsLayout>
          }
        />
        <Route
          path="/docs/epicycloid"
          element={
            <DocsLayout>
              <EpicycloidDocs />
            </DocsLayout>
          }
        />
        <Route
          path="/docs/epitrochoid"
          element={
            <DocsLayout>
              <EpitrochoidDocs />
            </DocsLayout>
          }
        />
        <Route
          path="/docs/hypotrochoid"
          element={
            <DocsLayout>
              <HypotrochoidDocs />
            </DocsLayout>
          }
        />
        <Route
          path="/docs/lissajous"
          element={
            <DocsLayout>
              <LissajousDocs />
            </DocsLayout>
          }
        />
        <Route
          path="/docs/rose"
          element={
            <DocsLayout>
              <RoseDocs />
            </DocsLayout>
          }
        />
        <Route
          path="/hypocycloid"
          element={
            <Hypocycloid />
          }
        />
        <Route
          path="epicycloid"
          element={
            <Epicycloid />
          }
        />
        <Route
          path="/epitrochoid"
          element={
            <Epitrochoid />
          }
        />
        <Route
          path="/hypotrochoid"
          element={
            <Hypotrochoid />
          }
        />
        <Route
          path="/lissajous"
          element={
            <Lissajous />
          }
        />
        <Route
          path="/rose"
          element={
            <Rose />
          }
        />
        <Route
          path="/home"
          element={
            <HomeLight />
          }
        />

      </Routes>
    </Router>
  );
}

export default App;