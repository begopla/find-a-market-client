import React, { useEffect, useState } from "react"
import axios from "axios"
import "./Markets.css"
import OneMarket from "../../components/OneMarket/OneMarket"
import {Box, useColorModeValue} from '@chakra-ui/react'
const API_URL = process.env.REACT_APP_API_URL

const Markets = () => {
	const [markets, setMarkets] = useState([])
	const getAllMarkets = async () => {
		const response = await axios.get(`${API_URL}/`)
		 console.log(response)
		setMarkets(response.data)
	}
	useEffect(() => {
		getAllMarkets()
	}, [])

	return (
		<div className="ListMarkets">
			
			<Box bg={useColorModeValue('gray.200', 'gray.700')}>
				{markets.map((market) => {
					//console.log(market)
					return (
						<OneMarket
							{...market}
							key={market._id}
							id={market._id}
							name={market.name}
						/>
					)
				})}
			</Box>
		</div>
	)
}

export default Markets