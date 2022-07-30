import { useState, useEffect} from "react";
import {Flex,Image,Text, Input, Button} from '@chakra-ui/react';
import useAuth from "../context/auth/useAuth";
import {EditIcon, StarIcon} from '@chakra-ui/icons';
import '../styles/profile.css';
import { API_URL } from "../constants";
import service from '../services/apiHandler'
import axios from 'axios'

const Profile = () => {
	const {currentUser,  authenticateUser, storeToken } = useAuth();
	const [myMarkets, setMyMarkets] = useState([]);
	const [editPhoto, setEditPhoto] = useState(false);
	const [profilePicture, setProfilePicture] = useState([]);
	

	const toggleEditPhoto = () => setEditPhoto(!editPhoto);

	const getRandomMarket = async () => {
		const response = await axios.get(`${API_URL}/markets/discover`)
		 //console.log(response.data)
		setMyMarkets(response.data)
	}
	useEffect(() => {
		getRandomMarket()
	}, [])

	const submitPhoto = async (e) => {
		e.preventDefault();
		const fd = new FormData()
		console.log(profilePicture)
		if (profilePicture) {
		  fd.append("profilePicture", profilePicture)
		  try {
			const data = await service.fileUpload(fd);
			storeToken(data.token)
			await authenticateUser()
	
		  } catch (error) {
			console.error(error)
		  }
		}
	  }
	//console.log(currentUser)
	return (
		<>
			<Flex >

			<Image 
				boxSize='20vw'
				ml='40vw'
				borderRadius='full'
				marginTop='5vh'
				src={currentUser.profilePicture} 
				alt={currentUser.name}>
			</Image>
			{/* <NavLink to='/profile/edit'> */}
			<div onClick={toggleEditPhoto}>	
			<EditIcon mt='2vh' ml='20vw' w={5} h={5} />
			</div>
			</Flex>
			{editPhoto && (

			<form onSubmit={submitPhoto}>
        		<Input 
         		 height='8vh'
         		 ml='25vw'
         		 pt='2vh'
         		 mt='2vh'
         		 width='50vw'
         		 type="file"
         		 name="profilePicture"
         		 accept="image/png, image/jpeg, image/jpg"
         		 onChange={(e) => setProfilePicture(e.target.files[0])}
        		/>
        	<Button type='submit' colorScheme='yellow' ml='27vw' mt='2vh' mb='2vh'>Upload a new photo</Button>
      		</form>

			) }
			{/* </NavLink> */}
			<Text fontSize='2xl' ml='40vw' mb='2vh'>{currentUser.name}</Text>
			
			<hr style={{fontWeight: 'bold'}}/>
			<Text fontSize='3xl' mt='3vh' ml='30vw' mb='5vh'>My Markets</Text>
				
			<Flex >
				<Image src={myMarkets.imageUrl} boxSize='15vw' ml='5vw' mr='10vw'></Image>
				<Flex flexDirection='column' justify='top' mr='10vw'>
				<Text fontSize='1xl'>{myMarkets.name}</Text>
				<Text marginBottom='5vh'>City, Country</Text>
				</Flex>
				<Text>5</Text>
				<StarIcon ml='3vw' mt='.35vh'/>
			</Flex>
				<hr style={{width: '80%', marginLeft:'10%'}}/>

		</>
	)
}

export default Profile
