import {BrowserRouter, Switch, Routes, Route } from "react-router-dom"
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
import Favourites from "./pages/Favourites"
import UserData from "./pages/UserData"

function App() {
			return (				
				<>
				<Routes>
				<Route element={<Navbar/>}>
					<Route path="/" element={<Home />} />
					<Route path="/signin" element={<Signin />} />
					<Route path="/signup" element={<Signup />} />
					<Route path="/markets" element={<Markets />} />
          <Route path="/markets/:marketId" element={<MarketDetails />} />
				 	<Route path="/markets/discover" element={<DiscoverPage />} />
					<Route path="/profile" element={<PrivateRoute />}>
						<Route path="/profile" element={<Profile />} />
					</Route> 
					<Route path="/profile/favourites" element={<Favourites />} />
					<Route path="*" element={<Oops />} />
				</Route>
				<Route element={<PrivateRoute />}>	
						
						<Route path="/profile/user" element={<UserData />} />
				</Route>
				</Routes>
        		<IconFooter />
				</>
			);		
}

export default App
