import React, { useEffect, useState } from "react";
import axios from "axios"
import { useNavigate } from "react-router-dom";
const API_URL = process.env.REACT_APP_API_URL

const DiscoverPage = () => {
    const [discoverMarket, setDiscoverMarket] = useState({})
    const navigate = useNavigate();

    const getRandomMarket = async () => {
        const { data } = await axios.get(`${API_URL}/markets/discover`)
        setDiscoverMarket(data)
    }
    useEffect(() => {
        getRandomMarket()
    }, []);

    return (
        <>
            {navigate(`/markets/${discoverMarket._id}`)}
        </>
    );
};


export default DiscoverPage;