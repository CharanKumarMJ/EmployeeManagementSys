import { Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./pages/header/Header";
import Dashboard from "./pages/dashboard/Dashboard";
import NoMatch from "./pages/noMatch/NoMatch";
import PostEmployee from "./pages/employee/PostEmployee";
import UpdateEmployee from "./pages/employee/UpdateEmployee";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/employee" element={<PostEmployee />} />
        <Route path="/employee/:id" element={<UpdateEmployee />} />
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </>
  );
}

export default App;
