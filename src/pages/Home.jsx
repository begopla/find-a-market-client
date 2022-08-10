import React from "react";
import Markets from "./Markets/Markets"
import {Box, useColorModeValue} from '@chakra-ui/react'
import Searchbar from "../components/Searchbar/Searchbar";

const Home = () => {
	const [markets, setMarkets] = useState([])
	return (
		<> 
		<Searchbar markets={setMarkets}/>
		<Box bg={useColorModeValue('gray.200', 'gray.700')}>
			<Markets markets={setMarkets}/>
		</Box>
		</>
	);
};

export default Home;
