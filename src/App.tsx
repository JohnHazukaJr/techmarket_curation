import { Header } from "./components/layout/Header";
import { AboutScreen } from "./screens/AboutScreen";
import { CompareScreen } from "./screens/CompareScreen";
import { LibraryScreen } from "./screens/LibraryScreen";
import { MapScreen } from "./screens/MapScreen";
import { MetroScreen } from "./screens/MetroScreen";
import { SourceScreen } from "./screens/SourceScreen";
import { SynthesisScreen } from "./screens/SynthesisScreen";
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
      <SynthesisScreen />
      <AboutScreen />
      <div className="note">John Hazuka · CMPA 4301 · Texas Tech University</div>
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
