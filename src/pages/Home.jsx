import React, { useState } from "react"
import Markets from "./Markets/Markets"
import {Box, useColorModeValue, Text} from '@chakra-ui/react'
import Searchbar from "../components/Searchbar/Searchbar";


const Home = () => {
	const [markets, setMarkets] = useState([])

	const objSentAsProps ={
        markets: markets,
        setMarkets: setMarkets,
            }

	return (
		<> 
		<Searchbar props ={objSentAsProps}/>
		<Box bg={useColorModeValue('gray.200', 'gray.700')}>
			{markets.length>0 ?<Markets props ={objSentAsProps}/> :
					<Text>No search results</Text>
			}
		</Box>
		</>
	);
};

export default Home;