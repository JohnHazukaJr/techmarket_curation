import { Header } from "./components/layout/Header";
import { AboutScreen } from "./screens/AboutScreen";
import { CompareScreen } from "./screens/CompareScreen";
import { LibraryScreen } from "./screens/LibraryScreen";
import { MapScreen } from "./screens/MapScreen";
import { MetroScreen } from "./screens/MetroScreen";
import { SourceScreen } from "./screens/SourceScreen";
import { CollectionProvider } from "./state/CollectionContext";
import { ThemeProvider } from "./state/ThemeContext";

function Shell() {
  return (
    <div className="wrap">
      <Header />
      <MapScreen />
      <MetroScreen />
      <LibraryScreen />
      <CompareScreen />
      <SourceScreen />
      <AboutScreen />
      <div className="note">JOHN HAZUKA DATA CURATION TEXAS TECH UNIVERSITY</div>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <CollectionProvider>
        <Shell />
      </CollectionProvider>
    </ThemeProvider>
  );
}
