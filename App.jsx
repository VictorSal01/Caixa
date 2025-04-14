import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/firebaseConfig";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/home";
import Estoque from "./pages/Estoque";
import Venda from "./pages/Venda";
import CadastroProduto from "./pages/CadastroProduto";
import CadastroCliente from "./pages/CadastroCliente";
import Relatorio from "./pages/Relatorio";

//Rota Protegida
function PrivateRoute({ children }) {
  const [user, setUser] = useState(undefined);
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setCheckingAuth(false);
    });

    return () => unsubscribe();
  }, []);

  if (checkingAuth) {
    return <div>Carregando...</div>;
  }

  return user ? children : <Navigate to="/login" replace />;
}

export default function App() {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route
            path="/home"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
          <Route
            path="/estoque"
            element={
              <PrivateRoute>
                <Estoque />
              </PrivateRoute>
            }
          />
          <Route
            path="/venda"
            element={
              <PrivateRoute>
                <Venda />
              </PrivateRoute>
            }
          />
          <Route
            path="/cadastro-produto"
            element={
              <PrivateRoute>
                <CadastroProduto />
              </PrivateRoute>
            }
          />
          <Route
            path="/cadastro-cliente"
            element={
              <PrivateRoute>
                <CadastroCliente />
              </PrivateRoute>
            }
          />
          <Route
            path="/relatorio"
            element={
              <PrivateRoute>
                <Relatorio />
              </PrivateRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}
