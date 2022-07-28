import { Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar/Navbar"
import Home from "./pages/Home"
import Signin from "./pages/Signin"
import Signup from "./pages/Signup"
import Profile from "./pages/Profile"
import Oops from "./pages/Oops"
import PrivateRoute from "./components/ProtectedRoute/PrivateRoute"
import Markets from "./pages/Markets/Markets"
import EditProfile from "./pages/EditProfile"

function App() {
	return (
			<div className="App">
				<Navbar />
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/signin" element={<Signin />} />
					<Route path="/signup" element={<Signup />} />
					<Route path="/markets" element={<Markets />} />
					<Route element={<PrivateRoute />}>
						<Route path="/profile" element={<Profile />} />
						<Route path="/profile/edit" element={<EditProfile />} />
					</Route>
					<Route path="*" element={<Oops />} />
				</Routes>
			</div>
	)
}

export default App
