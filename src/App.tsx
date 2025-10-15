import { Outlet } from "react-router";
import CommonLayout from "./components/layouts/CommonLayout";
import Navbar from "./components/layouts/Navbar";
import Footer from "./components/layouts/Footer";

function App() {
  return (
    <>
      <div>
        <CommonLayout>
          <Navbar />
          <Outlet />
          <Footer />
        </CommonLayout>
      </div>
    </>
  );
}

export default App;
