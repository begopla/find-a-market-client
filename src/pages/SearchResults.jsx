import React, { useEffect, useState } from "react"
import OneMarket from "../components/OneMarket/OneMarket"
import {Box, SimpleGrid, useColorModeValue} from '@chakra-ui/react'
import service from "../services/apiHandler"

const SearchResults = () => {
	const [markets, setMarkets] = useState([])
	const getAllMarkets = async () => {
		const response = await service.get("/markets/search")
		 console.log(response)
		setMarkets(response.data)
	}
	useEffect(() => {
		getAllMarkets()
	}, [])

	return (
		<SimpleGrid
			minChildWidth='sm'
			spacing='0'
			className="listMarkets"
			marginBottom={'4rem'}
			bg={useColorModeValue('white', 'gray.700')}>
			{markets.map((market) => {
				return (
					<OneMarket
						{...market}
						key={market._id}
						id={market._id}
						name={market.name}
					/>
				)
			})}
		</SimpleGrid>
	)
}

export default SearchResults