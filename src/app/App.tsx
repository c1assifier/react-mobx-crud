import { HashRouter, Route, Routes } from "react-router-dom";
import { Home } from "@/pages/Home/Home.tsx";
import { userStore } from "@/store/userStore";
import { StoreContext } from "@/store/StoreContext";
import { UserFormPage } from "@/pages/UserFormPage";
import { EditUserPage } from "@/pages/EditFormPage";
import { SearchPage } from "@/pages/SearchPage";
import { ThemeProvider } from "@/context/ThemeContext";

function App() {
  return (
    <>
      <ThemeProvider>
        <StoreContext.Provider value={{ userStore }}>
          <HashRouter>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/add" element={<UserFormPage />} />
              <Route path="/edit/:id" element={<EditUserPage />} />
              <Route path="/search" element={<SearchPage />} />
            </Routes>
          </HashRouter>
        </StoreContext.Provider>
      </ThemeProvider>
    </>
  );
}

export default App;

//* ___   ___
//* |||   |||
//* |__|  |__|
//* __________
//* |_________|
//*
