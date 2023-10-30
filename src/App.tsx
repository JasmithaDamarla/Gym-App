import RouteLinks from "./RouteLinks";
import { Footer } from "./components/HomePage";
import Header from "./components/HomePage";

export function App() {
  return (
    <div className="app-container">
      <Header />
      <div className="content-container">
        <RouteLinks />
      </div>
      <Footer />
    </div>
  );
}

export default App;
