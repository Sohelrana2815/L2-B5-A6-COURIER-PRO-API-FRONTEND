import { Outlet } from "react-router";
import CommonLayout from "./components/layouts/CommonLayout";
import { generateRoutes } from "./utils/generateRoutes";
import { adminSidebarItems } from "./routes/adminSidebarItems";

function App() {
  console.log(generateRoutes(adminSidebarItems));

  return (
    <>
      <div>
        <CommonLayout>
          <Outlet />
        </CommonLayout>
      </div>
    </>
  );
}

export default App;
