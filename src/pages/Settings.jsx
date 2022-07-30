import {useState} from 'react'
import useAuth from "../context/auth/useAuth";
import {EditIcon} from '@chakra-ui/icons';
import service from '../services/apiHandler';
import {Flex, Image, Input, Button, Text} from '@chakra-ui/react';
const Settings = () => {

    const {currentUser,  authenticateUser, storeToken } = useAuth();
	const [editPhoto, setEditPhoto] = useState(false);
	const [profilePicture, setProfilePicture] = useState([]);
	

	const toggleEditPhoto = () => setEditPhoto(!editPhoto);

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

<Text fontSize='2xl' ml='40vw' mb='2vh'>{currentUser.name}</Text>




    </>
  )
}

export default Settings