import { HashRouter, Route, Routes } from "react-router-dom";
import { Home } from "@/pages/Home/Home.tsx";
import { userStore } from "@/store/userStore";
import { StoreContext } from "@/store/StoreContext";

function App() {
  return (
    <StoreContext.Provider value={{ userStore }}>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </HashRouter>
    </StoreContext.Provider>
  );
}

export default App;
