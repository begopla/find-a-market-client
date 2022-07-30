// import React, { useState, useCallback } from 'react'
// import useAuth from '../context/auth/useAuth';
// import { Flex, Image, Button, Input } from '@chakra-ui/react';
// //import ImageUploader from 'react-images-upload'
// import axios from 'axios';
// import { API_URL } from '../constants';
// import service from '../services/apiHandler'
// const EditProfile = ({photo}) => {
//   const { currentUser, authenticateUser, storeToken } = useAuth();

//   const [profilePicture, setProfilePicture] = useState([photo]);
  
 
 
 
//   // const onDrop = useCallback(picture => {

//   //   setProfilePicture(picture)
//   //   console.log(picture[0])
//   // },[])
//   const submitPhoto = async (e) => {
//     e.preventDefault();
//     const fd = new FormData()
//     console.log(profilePicture)
//     if (profilePicture) {
//       fd.append("profilePicture", profilePicture)
//       try {
//         const data = await service.fileUpload(fd);
//         storeToken(data.token)
//         await authenticateUser()

//       } catch (error) {
//         console.error(error)
//       }
//     }
//   }

//   return (
//     <>


//         {/* <Image
//           boxSize='20vw'
//           ml='40vw'
//           borderRadius='full'
//           marginTop='5vh'
//           objectFit='cover'
//           src={currentUser?.profilePicture}
//           alt={currentUser?.name}
//         /> */}
     
//       {/* <ImageUploader  withPreview={true}  
//                         onChange={onDrop}
//                         withIcon={true}
//                         singleImage={true} />
//      <div>
//         <Button type='submit' onClick ={submitPhoto} colorScheme='yellow' ml='40vw'>Upload</Button> 
//      </div> */}


//       <form onSubmit={submitPhoto}>
//         {/* <label htmlFor="profilePicture">Picture</label> */}
//         <Input 
//           height='8vh'
//           ml='20vw'
//           pt='2vh'
//           mt='10vh'
//           width='50vw'
//           type="file"
//           name="profilePicture"
//           accept="image/png, image/jpeg, image/jpg"
//           onChange={(e) => setProfilePicture(e.target.files[0])}
//         />
//         <Button type='submit' colorScheme='yellow' ml='40vw' mt='5vh'>Upload</Button>
//       </form>
//       <br/>
//       <hr style={{marginBotton:'2vh'}}></hr>
//     </>
//   )
// }

// export default EditProfile