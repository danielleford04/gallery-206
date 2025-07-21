import ReactDOM from "react-dom/client";
import Gallery from "./Components/Gallery";

const el = document.getElementById("root");

const root = ReactDOM.createRoot(el!);

const App = () => {
  return (
    <div>
        <Gallery/>
    </div>
  );
};

export default App;

root.render(<App />);
