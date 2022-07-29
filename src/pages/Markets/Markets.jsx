import React, { useEffect, useState } from "react"
import axios from "axios"
import "./Markets.css"
import OneMarket from "../../components/OneMarket/OneMarket"
import { SimpleGrid, useColorModeValue } from '@chakra-ui/react';
const API_URL = process.env.REACT_APP_API_URL

const Markets = () => {
	const [markets, setMarkets] = useState([])
	const getAllMarkets = async () => {
		const response = await axios.get(`${API_URL}/`)
		// console.log(response)
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

export default Markets