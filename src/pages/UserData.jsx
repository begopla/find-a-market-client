import { useState} from 'react'
import useAuth from "../context/auth/useAuth";
import {EditIcon} from '@chakra-ui/icons';
import service from '../services/apiHandler';
import {Flex, Image, Input, Button, Text, Center, Box,  Stack, Tag, Show, Hide} from '@chakra-ui/react';
import Select from 'react-select';
import axios from 'axios';
import {API_URL} from '../constants';
import { useNavigate } from "react-router-dom"

const UserData = () => {
  const navigate = useNavigate();
  const {currentUser,  authenticateUser, storeToken } = useAuth();
	const [editPhoto, setEditPhoto] = useState(false);
  const [editInfo, setEditInfo] = useState(false)
  const [error, setError] = useState(null);
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
      navigate("/profile")
		  } catch (error) {
        setError(error.response.data.message)
		  }
		}
	  }
    const handleSubmit = async (e) => {
      e.preventDefault()
      const token = localStorage.getItem("authToken")
      const payload = { name, location, typeOfCuisine, dietaryReq, eatingHabits }
      try {
        const data = await axios.put(`${API_URL}/profile/user-info`, payload, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        console.log(data)
        storeToken(data.token)
			  await authenticateUser()
      navigate("/profile")
        
      } catch (error) {
        setError(error.response.data.message)
      }
    }
  let dietaryReqValues = [];
  let eatingHabValues = [];
  let typeOfCuisineValues = [];

  currentUser.dietaryReq.forEach(element => {
    dietaryReqValues.push(element.value)
    console.log(dietaryReqValues)
  });

  currentUser.eatingHabits.forEach(element => {
    eatingHabValues.push(element.value)
    console.log(eatingHabValues)
  });

  currentUser.typeOfCuisine.forEach(element => {
    typeOfCuisineValues.push(element.value)
    console.log(typeOfCuisineValues)
  });

  return (
    <>
    
    <Flex  >
      <Hide above='600px'>

        <Box height='25vh'>
        <Image 
            boxSize='7rem'
            ml='35vw'
            borderRadius='full'
            marginTop='10vh'
            src={currentUser.profilePicture} 
            alt={currentUser.name}>
        </Image>    
        </Box>
      </Hide>
      <Show above='600px'><Hide above='950px'>

      <Box height='25vh'>
        <Image 
            boxSize='8rem'
            ml='40vw'
            borderRadius='full'
            marginTop='10vh'
            src={currentUser.profilePicture} 
            alt={currentUser.name}>
        </Image>    
        </Box>

      </Hide></Show>

      <Show above='950px'>
      <Box height='27vh'>
        <Image 
            boxSize='8rem'
            ml='44vw'
            borderRadius='full'
            marginTop='10vh'
            src={currentUser.profilePicture} 
            alt={currentUser.name}>
        </Image>    
        </Box>
      </Show>

        <Flex flexDirection='column' alignItems='flex-start'>
         <div onClick={toggleEditPhoto}>	
            <EditIcon mt='11vh' ml='5vw' w={5} h={5} />
         </div>
        <Text fontSize='2xl' ml='5vw' mt='2vh' mb='2vh'>{currentUser.name}</Text>
        </Flex>
    </Flex>
    <Box height='75vh'>
    {editPhoto && ( 
    <form onSubmit={submitPhoto}>
    <Center><Input 
      height='5vh'
      pt='0.5vh'
      width='50vw'
      type="file"
      name="profilePicture"
      accept="image/png, image/jpeg, image/jpg"
      onChange={(e) => setProfilePicture(e.target.files[0])}
    /></Center>
    <Center><Button type='submit' colorScheme='teal'  mt='1vh' mb='2vh'>Upload a new photo</Button></Center>
    </form>
    )}

    <Stack>
    
    {error && <h3 className="error"> {error}</h3>}
      <Center><Text >Cuisine type preferences: <Tag  size='md'  borderRadius='full'> {dietaryReqValues.join(', ')}</Tag></Text></Center>
      <Center><Text>Eating habits :<Tag  size='md'  borderRadius='full'> {eatingHabValues.join(', ')}</Tag></Text></Center>
      <Center><Text>Types of cuisine:<Tag  size='md'  borderRadius='full'> {typeOfCuisineValues.join(', ')}</Tag></Text></Center>
      
    <Center>
    {!editInfo &&<Button colorScheme='teal' mt='5vh' onClick={toggleEditInfo}>Edit profile </Button>}
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
    <Button type="submit" colorScheme='teal' mt='5vh' onClick={handleSubmit}>Submit</Button>
    </Flex>
    
   
    </Center>
    
    }
    </Stack>
    </Box>

    </>
  )
}

export default UserData