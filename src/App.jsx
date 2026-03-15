import Navbar from "./components/layout/Navbar";
import AppRoutes from "./routes/AppRoutes";

function App() {

  return (
    <>
      <Navbar />
      <div className="pt-2">
        <AppRoutes />
      </div>
    </>
  );

}

export default App;