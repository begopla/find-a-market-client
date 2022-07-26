import React, { useEffect, useState } from "react"
import axios from "axios"
import "./Markets.css"
import OneMarket from "../../components/OneMarket/OneMarket"
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
		<div className="ListMarkets">
			
			<div className="container">
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
			</div>
		</div>
	)
}

export default Markets