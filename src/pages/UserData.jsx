import { useState} from 'react'
import useAuth from "../context/auth/useAuth";
import {EditIcon} from '@chakra-ui/icons';
import service from '../services/apiHandler';
import {Flex, Image, Input, Button, Text, Center, Box, color} from '@chakra-ui/react';
import Select from 'react-select';
import axios from 'axios';
import {API_URL} from '../constants';
const UserData = () => {
  const {currentUser,  authenticateUser, storeToken } = useAuth();
	const [editPhoto, setEditPhoto] = useState(false);
  const [editInfo, setEditInfo] = useState(false)
	const [profilePicture, setProfilePicture] = useState([]);
  const cuisineOp =[
    {value: 'Asian food', label: 'Asian'},
    {value: 'French', label: 'French'},
    {value: 'Mediterranean ', label: 'Mediterranean'},
    {value: 'Turkish ', label: 'Turkish'},
    {value: 'Indian ', label: 'Indian'},
    {value: 'Mexican ', label: 'Mexican' },
    {value: 'Caribbean ', label: 'Caribbean'},
    {value: 'German ', label: 'Geman'},
    {value: 'Rusian ', label: 'Rusian'},
    {value: 'American ', label: 'American'},
    {value: 'Others ', label: 'Others'}
  ];
  
  const dietaryRequirement =[
    {value: 'Fast Food', label: 'Fast Food'},
    {value: 'Vegetarian ', label: 'Vegetarian'},
    {value: 'Vegan ', label: 'Vegan'},
    {value: 'Low Carbs ', label: 'Low Carbs'},
    {value: 'Healthy ', label: 'Healthy'},
    {value: 'WholeFood ', label: 'WholeFood'},
    {value: 'Ecological ', label: 'Ecological'},
    {value: 'Others ', label: 'Others'}
  ];
  
  const eatingHab =[
    {value: 'Cooking ', label: 'Cooking'},
    {value: 'EatIn ', label: 'EatIn'},
    {value: 'Delivery ', label: 'Delivery'},
    {value: 'StreetFood ', label: 'StreetFood'},
    {value: 'Others ', label: 'Others'},
    
  ]
  
	const toggleEditPhoto = () => setEditPhoto(!editPhoto);
  const toggleEditInfo = () => setEditInfo(!editInfo)
  
  const [name, setName] = useState('');
  const [location, setLocation] = useState('')
  const [typeOfCuisine, setTypeOfCuisine] = useState([]);
  const [dietaryReq, setDietaryReq] = useState([]);
  const [eatingHabits, setEatingHabits] = useState([]);
  const handleNewName = (e) =>{setName(e.target.value)
  console.log(`New name changed`, name)}
  const handleNewLocation = (e) =>{setLocation(e.target.value)
    console.log(`New name changed`, location)}
  const handleCuisine = typeOfCuisine =>{setTypeOfCuisine(typeOfCuisine)
    console.log(`Option selected:`, typeOfCuisine);}  
  const handleDiet = dietaryReq =>{setDietaryReq(dietaryReq)
     console.log(`Option selected:`, dietaryReq)};
  const handleHabits = eatingHabits =>{setEatingHabits(eatingHabits)
      console.log(`Option selected:`, eatingHabits)};
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
    const handleSubmit = async (e) => {
      e.preventDefault()
      const token = localStorage.getItem("authToken")
      const payload = { name, location, typeOfCuisine, dietaryReq, eatingHabits }
      try {
        const response = await axios.put(`${API_URL}/profile/user-info`, payload, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        
      } catch (error) {
        console.error(error)
      }
    }
  return (
    <>
    
    <Flex  >
        <Box>
        <Image 
            boxSize='20vw'
            ml='40vw'
            borderRadius='full'
            marginTop='5vh'
            src={currentUser.profilePicture} 
            alt={currentUser.name}>
        </Image>
        </Box>
        <Flex flexDirection='column' alignItems='flex-start'>
         <div onClick={toggleEditPhoto}>	
            <EditIcon mt='5vh' ml='5vw' w={5} h={5} />
         </div>
        <Text fontSize='2xl' ml='5vw' mt='2vh' mb='2vh'>{currentUser.name}</Text>
        </Flex>

    </Flex>
   
    {editPhoto && ( 
    <form onSubmit={submitPhoto}>
    <Center><Input 
      height='8vh'
      pt='2vh'
      mt='2vh'
      width='50vw'
      type="file"
      name="profilePicture"
      accept="image/png, image/jpeg, image/jpg"
      onChange={(e) => setProfilePicture(e.target.files[0])}
    /></Center>
    <Center><Button type='submit' colorScheme='yellow'  mt='2vh' mb='2vh'>Upload a new photo</Button></Center>
    </form>
    )}
    
    <Center>
    {!editInfo &&<Button colorScheme='blue' mt='5vh' onClick={toggleEditInfo}>Edit profile </Button>}
    </Center>
    {editInfo && <Center>
    

    <Flex flexDirection='column'>
    <label style={{marginTop:'5vh',color: 'grey'}}>Edit your user name</label>
    <Input placeholder={currentUser.name}  onChange={handleNewName}
     ></Input>
    <label style={{marginTop: '1vh',color: 'grey'}}>Edit your address</label>
    <Input placeholder={currentUser.location} onChange={handleNewLocation} ></Input>
    <label style={{marginTop: '1vh',color: 'grey'}}>Which type of cuisine do you prefer?</label>
    <Select isMulti 
             value={typeOfCuisine}
             name="cuisineOptions"
             options={cuisineOp}
             isClearable
             closeMenuOnSelect={false}
             onChange={handleCuisine}
              />
    <label style={{marginTop: '1vh', color: 'grey'}}> Do you have any dietary requirements?</label>
    <Select isMulti 
             value={dietaryReq}
             name="dietaryReq"
             options={dietaryRequirement}
             isClearable
             closeMenuOnSelect={false}
             onChange={handleDiet}
              />
    <label style={{marginTop: '1vh', color: 'grey'}}> Which of these eating habits do you follow?</label>
    <Select isMulti 
             value={eatingHabits}
             name="eatingHabits"
             options={eatingHab}
             isClearable
             closeMenuOnSelect={false}
             onChange={handleHabits}
              />
    <Button type="submit" colorScheme='blue' mt='5vh' onClick={handleSubmit}>Submit</Button>
    </Flex>
    
   
    </Center>
    
    }


    </>
  )
}

export default UserData