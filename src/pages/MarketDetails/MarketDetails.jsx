import React, { useEffect, useState } from "react";
import service from '../../services/apiHandler';
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Spinner,
  Center,
  Image,
  Avatar,
  Text,
  Stack,
  Link,
  Flex,
  Badge,
  Input,
  Button,
  Icon
} from "@chakra-ui/react";
import { EditIcon } from "@chakra-ui/icons";
import { StarIcon } from "@chakra-ui/icons";
import {FaRegHeart} from "react-icons/fa";
import FormEditMarket from "../../components/Forms/FormEditMarket";
const API_URL = process.env.REACT_APP_API_URL;

const MarketDetails = () => {
  const [detailMarket, setDetailMarket] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [editMarketPhoto, setEditMarketePhoto] = useState(false);
  const [imageUrl, setImageUrl] = useState([])
  const [savedAsFav, setSavedAsFav] = useState(false)
  const { marketId } = useParams();
  const getOneMarket = async () => {
    const { data } = await axios.get(`${API_URL}/markets/${marketId}`);
    setDetailMarket(data);
    setIsLoading(false);
  };
  useEffect(() => {
    getOneMarket();
  }, []);

  const objSentAsProps = {
    detailMarket: detailMarket,
    setDetailMarket: setDetailMarket,
    marketId:marketId,
    imageUrl:imageUrl,
    setImageUrl:setImageUrl

  };
  const toggleEditMarketPhoto = () => setEditMarketePhoto(!editMarketPhoto);
  const toggleSaveAsFav = () => setSavedAsFav(!savedAsFav)
  // const submitPhoto = async (e) => {
  //   e.preventDefault();
  //   const fd = new FormData()
  //   console.log(imageUrl)
  //   if (imageUrl) {
  //     //fd.append("imageUrl", imageUrl)
  //     for(let img of imageUrl){
  //       fd.append("imageUrl", img)
  //       console.log(fd)
  //     }
  //     try {
  //        await service.marketPhotoUpload(fd,marketId);
      
  //     } catch (error) {
  //       console.error(error)
  //     }
  //   }
  // } 

  const saveAsFav = async() =>{
    toggleSaveAsFav()
    await service.post(`markets/${marketId}/favourites`)
  }
  const removeAsFav = async() =>{
    toggleSaveAsFav()
    await service.post(`markets/${marketId}/removefav`)
  }
  return (
    <>
      {isLoading && (
        <Spinner
          position="fixed"
          top={{ base: "30%", md: "40%", lg: "50%" }}
          left="50%"
          marginLeft="-1.5em"
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="teal.500"
          size="xl"
        />
      )}
      {!isLoading && (
        <Stack className="DetailsMarket" py={"4rem"} spacing={4}>
          <Center>
            <Box w="100%">
              <Image
                boxSize="18rem"
                w="100%"
                objectFit="cover"
                src={detailMarket.imageUrl}
                alt={detailMarket.name}
                
              />
            </Box>
            {/* {editMarketPhoto && (
                <Box>
              <form onSubmit={submitPhoto}>
                 <Input
                    height="8vh"
                    pt="2vh"
                    mt="2vh"
                    ml="5vw"
                    mr = "5vw"
                    width="25vw"
                    type="file"
                    name="imageUrl"
                    accept="image/png, image/jpeg, image/jpg"
                    multiple
                    onChange={(e) => setImageUrl(e.target.files)}
                  />
                <Center>

                  <Button type="submit" colorScheme="teal" mt="2vh" mb="2vh">
                    Upload a new photo
                  </Button>
                </Center>
              </form>
                </Box>
            )} */}
          </Center>
          <Stack spacing={2} px={"2rem"}>
            <Flex>
              <Text fontSize="3xl">{detailMarket.name}</Text>
              <Flex justifyContent='space-between'>
                {/* <EditIcon onClick={toggleEditMarketPhoto} ml="35vw" w={6} h={6} mt="1vh" /> */}
              { !savedAsFav && <Icon as={FaRegHeart} onClick={saveAsFav}  w={6} h={6} ml="2vw" mt="1vh" />}
              {  savedAsFav && <Icon as={FaRegHeart} onClick={removeAsFav} style={{color:"red"}}  w={6} h={6} ml="2vw" mt="1vh" />}
              </Flex>
            </Flex>
            <Flex alignItems="baseline" justifyContent="space-between">
              <Box as="span" color="gray.600" fontSize="sm">
                {detailMarket.address}
              </Box>
            </Flex>
             
            <Flex>              
            <Flex gap="10px" alignItems="center">
              <Avatar
                size="md"
                mt="0px"
                src={detailMarket.author?.profilePicture}
              />
              <Flex flexDirection="column" gap="2px">
                <Text>{detailMarket.author?.name}</Text>
                <Badge
                  borderRadius="full"
                  px="2"
                  colorScheme="teal"
                  textAlign="center"
                >
                  Follow
                </Badge>
              </Flex>
              <Box display="flex"  alignItems="center" gap="3px">
                <Box as="span" ml="41vw" color="gray.600" fontSize="m" >
                  10
                </Box>
                <StarIcon color={"teal.500"}  w={5} h={5} ml="2vw"/>
              </Box>
            </Flex>
            </Flex>
            <Text fontSize="md">{detailMarket.description}</Text>
            <Text fontSize="sm">
              Website:{" "}
              <Link href={detailMarket.website} isExternal>
                {detailMarket.website}
              </Link>
            </Text>
          </Stack>
          <FormEditMarket props={objSentAsProps} />
        </Stack>
      )}
    </>
  );
};

export default MarketDetails;
