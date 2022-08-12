import axios from "axios"
// We can create an instance of axios and set it with some base values like the URL to our API.

const service = axios.create({
	baseURL: process.env.REACT_APP_API_URL,
	withCredentials: true,
})

/**
 * ! This function configure the axios instance called service
 * ! It tries to get the token from the localStorage and put it in the Authorization headers.
 */

service.interceptors.request.use((config) => {
	const token = localStorage.getItem("authToken")
	config.headers.Authorization = token ? `Bearer ${token}` : ""
	return config
})

service.signup = async (user) => {
	try {
		const { data } = await service.post("/auth/signup", user)
		return data
	} catch (error) {
		errorHandler(error)
	}
}

service.fileUpload =async (picture)=>{
   try {
	const {data} = await service.put('/profile',picture)
	return data
   } catch (error) {
	errorHandler(error)
   }
}
service.marketPhotoUpload =async (picture, marketId)=>{
	try {
	 const {data} = await service.put(`/markets/${marketId}`,picture)
	 return data
	} catch (error) {
	 errorHandler(error)
	}
 }
 service.marketPhotoUpload =async (picture, marketId)=>{
	try {
	 const {data} = await service.put(`/markets/${marketId}`,picture)
	 return data
	} catch (error) {
	 errorHandler(error)
	}
 }

service.signin = async (user) => {
	try {
		const { data } = await service.post("/auth/signin", user)
		console.log(data)
		return data
	} catch (error) {
		errorHandler(error)
	}
}

service.isLoggedIn = async () => {
	try {
		const { data } = await service.get("/auth/me")
		return data
	} catch (error) {
		errorHandler(error)
	}
}

service.myMarkets = async () =>{
	try {
		const { data } = await service.get("/markets/my-markets")
		return data
	} catch (error) {
		errorHandler(error)
	}
}

//! Error handling to use in the catch
function errorHandler(error) {
	if (error.response.data) {
		console.log(error.response && error.response.data)
		throw error
	}
	throw error
}

export default service
