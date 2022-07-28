import React, { useState } from 'react'
import useAuth from '../context/auth/useAuth';
import { Flex, Image, Button } from '@chakra-ui/react';
//import ImageUploader from 'react-images-upload'
import axios from 'axios';
import { API_URL } from '../constants';
import service from '../services/apiHandler'
import { useNavigate } from 'react-router-dom';
const EditProfile = () => {
  const { currentUser, authenticateUser, storeToken } = useAuth();

  const [profilePicture, setProfilePicture] = useState([])
  const navigate = useNavigate()
  const onDrop = picture => {

    setProfilePicture(picture)
    console.log(picture[0])
  }
  const submitPhoto = async (e) => {
    e.preventDefault();
    const fd = new FormData()
    console.log(profilePicture)
    if (profilePicture) {
      fd.append("profilePicture", profilePicture)
      console.log(fd)
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
          objectFit='cover'
          src={currentUser.profilePicture}
          alt={currentUser.name}
        />
      </Flex>
      {/* <ImageUploader  withPreview={true}  
                        onChange={onDrop}
                        withIcon={true}
                        imgExtension={['.jpg', '.gif', '.png', '.gif']}
                        singleImage={true} />
     <div>
        <Button type='submit' onClick ={submitPhoto} colorScheme='yellow' ml='40vw'>Upload</Button> 
     </div> */}


      <form onSubmit={submitPhoto}>
        <label htmlFor="profilePicture">Picture</label>
        <input
          type="file"
          name="profilePicture"
          multiple
          onChange={(e) => setProfilePicture(e.target.files[0])}
        />
        <Button type='submit' colorScheme='yellow' ml='40vw'>Upload</Button>
      </form>
    </>
  )
}

export default EditProfile