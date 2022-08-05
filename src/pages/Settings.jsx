import useAuth from "../context/auth/useAuth";
import {Image, Text} from '@chakra-ui/react';
const Settings = () => {
    const {currentUser,  authenticateUser, storeToken } = useAuth();
	
  return (
    <>
    <Image 
        boxSize='20vw'
        ml='40vw'
        borderRadius='full'
        marginTop='5vh'
        src={currentUser.profilePicture} 
        alt={currentUser.name}>
    </Image>
    <Text fontSize='2xl' mt='2vh' ml='40vw' mb='2vh'>{currentUser.name}</Text>
    </>
    ) 
}
export default Settings