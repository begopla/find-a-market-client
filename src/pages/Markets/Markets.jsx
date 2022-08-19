import React, { useEffect, useState } from "react"
import axios from "axios"
import OneMarket from "../../components/OneMarket/OneMarket"
import { SimpleGrid, Spinner, useColorModeValue } from '@chakra-ui/react'
const API_URL = process.env.REACT_APP_API_URL

const Markets = ({ props: { markets, setMarkets } }) => {
	const [isLoading, setIsLoading] = useState(true)

	const getAllMarkets = async () => {
		const response = await axios.get(`${API_URL}/`)
		setMarkets(response.data)
		setIsLoading(false)
	}

	useEffect(() => {
		getAllMarkets()
	}, []);

	return (
		<>
			{isLoading && <Spinner
				position='fixed'
				top={{ base: '30%', md: '40%', lg: '45%' }}
				left='50%'
				marginLeft='-1.5em'
				thickness='4px'
				speed='0.65s'
				emptyColor='gray.200'
				color='teal.500'
				size='xl' />}
			{
				<SimpleGrid
					bg={useColorModeValue('white', 'gray.700')}
					minChildWidth='15rem'
					spacing='5px'
					className="listMarkets"
					pb={'4rem'}
					px={'3rem'}
					pt={'3rem'}>
					{markets.map((market) => {
						return (
							<OneMarket
								{...market}
								key={market._id}
								id={market._id}
								name={market.name}
								stars={market.stars}
							/>
						)
					})}
				</SimpleGrid>
			}
		</>
	)
}

export default Markets