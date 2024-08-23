import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { HomePage } from "./pages/HomePage.tsx";
import { RecipePage } from "./pages/RecipePage.tsx";
import { CreateRecipePage } from "./pages/CreateRecipePage.tsx.tsx";
import "bootstrap/dist/css/bootstrap.min.css";
import { RecipeProvider } from "./providers/RecipesProvider.tsx";
import { Navbar } from "./components/Navbar.tsx";
import { ContactPage } from "./pages/ContactPage.tsx";
import LoginPage from "./pages/LoginPage.tsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Navbar />}>
      <Route path="/" element={<HomePage />} />
      <Route path="/recipes/:id" element={<RecipePage />} />
      <Route path="/create" element={<CreateRecipePage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/*" element={<HomePage />} />
    </Route>
  )
);

const App = () => {
  return (
    <RecipeProvider>
      <RouterProvider router={router} />
    </RecipeProvider>
  );
};

export default App;
