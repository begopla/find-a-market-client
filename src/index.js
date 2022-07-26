import React from "react"
import ReactDOM from "react-dom"
import "./styles/reset.css"
import "./styles/global.css"
import App from "./App"
import { BrowserRouter } from "react-router-dom"
import UserWrapper from "./context/auth/UserWrapper"
import { ChakraProvider } from "@chakra-ui/react"

ReactDOM.render(
	<React.StrictMode>
	<ChakraProvider>
		<BrowserRouter>
			<UserWrapper>
				<App />
			</UserWrapper>
		</BrowserRouter>
	</ChakraProvider>
	</React.StrictMode>,
	document.getElementById("root")
)
