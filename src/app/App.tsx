import { HashRouter, Route, Routes } from "react-router-dom";
import { Home } from "@/pages/Home/Home.tsx";
import { userStore } from "@/store/userStore";
import { StoreContext } from "@/store/StoreContext";
import { UserFormPage } from "@/pages/UserFormPage";
import { EditUserPage } from "@/pages/EditFormPage";

function App() {
  return (
    <StoreContext.Provider value={{ userStore }}>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add" element={<UserFormPage />} />
          <Route path="/edit/:id" element={<EditUserPage />} />
        </Routes>
      </HashRouter>
    </StoreContext.Provider>
  );
}

export default App;

//* ___   ___
//* |||   |||
//* |__|  |__|
//* __________
//* |_________|
//*
