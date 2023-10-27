import RouteLinks from "./RouteLinks";
import Header, { Footer } from "./components/HomePage";
// import './App.css';

export function App() {
  return (
      <div className="app-container">
        <Header />
        <div className="content-container">
            <RouteLinks/>
        </div>
        <Footer />
      </div>
  );
}
export default App;
