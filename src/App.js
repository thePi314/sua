import { BrowserRouter, Route, Routes } from "react-router-dom";

import { AuthProvider } from "./contexts/AuthProvider";
import Dashboard from "./screens/Dashboard/Dashboard";
import UserSubpage from "./screens/Dashboard/subpages/UserSubpage/UserSubpage";
import CreateUserSubpage from "./screens/Dashboard/subpages/CreateUserSubpage/CreateUserSubpage";
import LoginScreen from "./screens/LoginScreen/LoginScreen";
import Sandbox from "./screens/Sandbox/Sandbox";
import DobavljaciSubpage from "./screens/Dashboard/subpages/DobavljaciSubpage/DobavljaciSubpage";
import ManageDobavljacSubpace from "./screens/Dashboard/subpages/ManageDobavljacSubpace/ManageDobavljacSubpace";
import SirovineSubpage from "./screens/Dashboard/subpages/SirovineSubpage/SirovineSubpage";
import ManageSirovineSubpage from "./screens/Dashboard/subpages/ManageSirovineSubpage/ManageSirovineSubpage";
import ProizvodniProcesSubpage from "./screens/Dashboard/subpages/ProizvodniProcesSubpage/ProizvodniProcesSubpage";
import ManageProizvodniProcesSubpage from "./screens/Dashboard/subpages/ManageProizvodniProcesSubpage/ManageProizvodniProcesSubpage";
import ProizvodiSubpage from "./screens/Dashboard/subpages/ProizvodiSubpage/ProizvodiSubpage";
import ManageProizvodiSubpage from "./screens/Dashboard/subpages/ManageProizvodiSubpage/ManageProizvodiSubpage";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/sandbox" element={<Sandbox />} />
          <Route path="/dashboard" element={<Dashboard />}>
            <Route path="/dashboard/users" element={<UserSubpage />} />
            <Route path="/dashboard/users/create" element={<CreateUserSubpage />} />
            <Route path="/dashboard/users/:id/update" element={<CreateUserSubpage />} />
            
            <Route path="/dashboard/dobavljaci" element={<DobavljaciSubpage />} />
            <Route path="/dashboard/dobavljaci/create" element={<ManageDobavljacSubpace />} />
            <Route path="/dashboard/dobavljaci/:id/update" element={<ManageDobavljacSubpace />} />
            
            <Route path="/dashboard/sirovine" element={<SirovineSubpage/>} />
            <Route path="/dashboard/sirovine/create" element={<ManageSirovineSubpage />} />
            <Route path="/dashboard/sirovine/:id/update" element={<ManageSirovineSubpage />} />
            
            <Route path="/dashboard/proizvodniproces" element={<ProizvodniProcesSubpage/>} />
            <Route path="/dashboard/proizvodniproces/create" element={<ManageProizvodniProcesSubpage />} />
            <Route path="/dashboard/proizvodniproces/:id/update" element={<ManageProizvodniProcesSubpage />} />
            
            <Route path="/dashboard/proizvodi" element={<ProizvodiSubpage/>} />
            <Route path="/dashboard/proizvodi/create" element={<ManageProizvodiSubpage />} />
            <Route path="/dashboard/proizvodi/:id/update" element={<ManageProizvodiSubpage />} />
            
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
