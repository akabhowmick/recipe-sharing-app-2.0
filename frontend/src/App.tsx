import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { HomePage } from "./pages/HomePage.tsx";
import { RecipePage } from "./pages/RecipePage.tsx";
import { CreateRecipePage } from "./pages/CreateRecipePage.tsx.tsx";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/recipes/:id" element={<RecipePage />} />
        <Route path="/create" element={<CreateRecipePage />} />
      </Routes>
    </Router>
  );
};

export default App;
