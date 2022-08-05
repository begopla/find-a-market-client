import { Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar/Navbar"
import Home from "./pages/Home"
import Signin from "./pages/Signin"
import Signup from "./pages/Signup"
import Profile from "./pages/Profile"
import MarketDetails from "./pages/MarketDetails/MarketDetails"
import Oops from "./pages/Oops"
import PrivateRoute from "./components/ProtectedRoute/PrivateRoute"
import Markets from "./pages/Markets/Markets"
import IconFooter from "./components/Footer/IconFooter"
import DiscoverPage from "./pages/DiscoverPage/DiscoverPage"
import Settings from "./pages/Settings"
import UserData from "./pages/UserData"
import SearchResults from "./pages/SearchResults"

function App() {
	return (
		<div className="App">
			<Navbar />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/signin" element={<Signin />} />
				<Route path="/signup" element={<Signup />} />
				<Route path="/markets" element={<Markets />} />
				<Route path="/markets/:marketId" element={<MarketDetails />} />
				<Route path="/markets/discover" element={<DiscoverPage />} />
				<Route path="/markets/search" element={<SearchResults />} />
				<Route element={<PrivateRoute />}>
					<Route path="/profile" element={<Profile />} />
					<Route path="/profile/settings" element={<Settings />} />
					<Route path="/profile/user" element={<UserData />} />
				</Route>
				<Route path="*" element={<Oops />} />
			</Routes>
			<IconFooter />
		</div>

	)
}

export default App
