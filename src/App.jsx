import { Routes, Route, Navigate } from "react-router-dom";
import { Dashboard, Auth } from "@/layouts";
import {RecoilRoot} from "recoil";
import {BrowserRouter as Router } from "react-router-dom";
function App() {
  return (
    
      <RecoilRoot>
        
          <Routes>
            <Route path="/dashboard/*" element={<Dashboard />} />
            <Route path="/auth/*" element={<Auth />} />
            {/* <Route path="*" element={<Navigate to="/dashboard/home" replace />} /> */}
            <Route path="*" element={<Navigate to="/auth/sign-in" replace />} />
          </Routes>
        
      </RecoilRoot>
    
  );
}

export default App;
