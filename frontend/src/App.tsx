import { Route, Routes } from "react-router-dom"
import PublicRoute from "./routeGuard/PublicRoute"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import PrivateRoute from "./routeGuard/PrivateRoute"
import Home from "./pages/Home"
import PageNotFound from "./pages/PageNotFound"
import PlaylistDetail from "./pages/PlaylistDetail"

const App = () => {
  return (
    <>
      <Routes>

        <Route element={<PublicRoute />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Route>

        <Route element={<PrivateRoute />}>
          <Route path="/" element={<Home />} />
          <Route path="/playlist/:playlistId" element={<PlaylistDetail />} />
        </Route>

        <Route path="*" element={<PageNotFound />} />

      </Routes>
    </>
  )
}

export default App