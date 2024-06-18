import Home from "./pages/Home/Home.jsx";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import SignIn from "./pages/SignIn/SignIn.jsx";
import Main from "./pages/Main/Main.jsx";
import { useContext } from "react";
import SignUp from "./pages/SignUp/SignUp.jsx";
import { AuthContext } from "./context/AuthContext.jsx";
import UserProfile from "./pages/UserProfile/UserProfile.jsx";
import FavoritePosts from "./pages/FavoritePosts/FavoritePosts.jsx";
import PostPage from "./pages/PostPage/PostPage.jsx";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword.jsx";

function App() {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/sign-in"
          element={isAuthenticated ? <Navigate to="/all-posts" /> : <SignIn />}
        />
        <Route
          path="/sign-up"
          element={isAuthenticated ? <Navigate to="/all-posts" /> : <SignUp />}
        />
        <Route path="/all-posts" element={<Main />} />
        <Route
          path="/view-profile"
          element={isAuthenticated ? <UserProfile /> : <SignIn />}
        />
        <Route
          path="/view-favorites"
          element={isAuthenticated ? <FavoritePosts /> : <SignIn />}
        />
        <Route path="/haubau" element={<PostPage />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
