import React from "react";
import Markets from "./Markets/Markets"
import {Box, useColorModeValue} from '@chakra-ui/react'

const Home = () => {
	return (
		<Box bg={useColorModeValue('gray.200', 'gray.700')}>
			<Markets />
		</Box>
	);
};

export default Home;
