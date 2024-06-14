import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Index from "./pages/Index.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Navbar from "./components/Navbar.jsx";
import Login from "./pages/Login.jsx";
import { useSupabaseAuth } from "./integrations/supabase/auth.jsx";
import { Button } from "@chakra-ui/react";

function App() {
  const { session, logout } = useSupabaseAuth();

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Index />} />
        
        <Route exact path="/dashboard" element={<Dashboard />} />
      <Route exact path="/login" element={<Login />} />
      </Routes>
      <div style={{ position: "fixed", bottom: 10, right: 10 }}>
        {session ? (
          <Button colorScheme="teal" onClick={logout}>Logout</Button>
        ) : (
          <Button colorScheme="teal" as="a" href="/login">Login</Button>
        )}
      </div>
    </Router>
  );
}

export default App;