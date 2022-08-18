import React, { useState } from "react"
import Markets from "./Markets/Markets"
import { Box, useColorModeValue } from '@chakra-ui/react'
import Searchbar from "../components/Searchbar/Searchbar";
import NoSearchResults from "../components/NoSearchResults/NoSearchResults";


const Home = () => {
	const [markets, setMarkets] = useState([])

	const objSentAsProps = {
		markets: markets,
		setMarkets: setMarkets,
	}

	return (
		<>
			<Searchbar props={objSentAsProps} />
			<Box bg={useColorModeValue('gray.200', 'gray.700')}>
				<Markets props={objSentAsProps} />
				{markets.length === 0 && <NoSearchResults />}
			</Box>
		</>
	);
};

export default Home;