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
  Icon,
  SimpleGrid,
  useColorModeValue,
  Button,
  Hide,
  Show
} from "@chakra-ui/react";

import { StarIcon } from "@chakra-ui/icons";
import { FaRegHeart } from "react-icons/fa";
import FormEditMarket from "../../components/Forms/FormEditMarket";
import ReviewInput from "../../components/Review/ReviewInput";
import Review from "../../components/Review/Review";
import MapContainer from "../../components/Map/MapContainer"
import useAuth from "../../context/auth/useAuth";
import { useNavigate } from "react-router-dom";
import './MarketDetails.css'
const API_URL = process.env.REACT_APP_API_URL;

const MarketDetails = () => {
  const { currentUser } = useAuth();
  const [detailMarket, setDetailMarket] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [imageUrl, setImageUrl] = useState([])
  const [savedAsFav, setSavedAsFav] = useState(false)
  const [thisMarketReviews, setThisMarketReviews] = useState([]);
  const [marketIsFav, setMarketIsFav] = useState(false)
  const [userWantsFollow, setUserWantsFollow] = useState(false)
  const { marketId } = useParams();
  const navigate = useNavigate();
  const getOneMarket = async () => {
    const { data } = await axios.get(`${API_URL}/markets/${marketId}`);
    setDetailMarket(data.market);
    setThisMarketReviews(data.allReviews)
    setIsLoading(false);

  };
  useEffect(() => {
    getOneMarket();
  }, [savedAsFav]);

  const objSentAsProps = {
    detailMarket: detailMarket,
    setDetailMarket: setDetailMarket,
    marketId: marketId,
    imageUrl: imageUrl,
    setImageUrl: setImageUrl

  };

  const reviewProps = {
    thisMarketReviews: thisMarketReviews,
    setThisMarketReviews: setThisMarketReviews
  }

  const toggleSaveAsFav = () => setSavedAsFav(!savedAsFav)
  const toggleFollowUsers = () => setUserWantsFollow(!userWantsFollow)


  const saveAsFav = async () => {
    if (currentUser) {
      toggleSaveAsFav()
      const res = await service.post(`markets/${marketId}/favourites`)
    } else {
      navigate('/signin')
    }
  }
  const removeAsFav = async () => {
    toggleSaveAsFav()
    await service.post(`markets/${marketId}/removefav`)

  }

 
  const checkIfMarketisFav = async () => {
    if (currentUser) {
      
      const favMarkets = await service.get(`/profile/favourites`)
      const favMarketArray = favMarkets.data.savedList;
      if (!favMarketArray.lenght) {
        favMarketArray.forEach(element => {
          if (element._id === marketId) {
            setMarketIsFav(!marketIsFav)
          }
        });
      }
    }
  }
  useEffect(() => {
    checkIfMarketisFav();
  }, [savedAsFav]);

  
  const updateFollowUsers = async (e) => {
    const toFollowId = e.currentTarget.children[0].childNodes[1].innerHTML;
    if(currentUser._id!==toFollowId){
      toggleFollowUsers()
      await service.post(`/profile/${toFollowId}/addfollower`)
    }
    
  }

  const removeFollowedUser = async (e) => {
    const toUnFollowId =  e.currentTarget.children[0].childNodes[1].innerHTML;
    if(currentUser._id!==toUnFollowId){
      toggleFollowUsers()
    await service.post(`/profile/${toUnFollowId}/removefollower`)
    }
  }

  return (
    <Box bg={useColorModeValue('white', 'gray.700')}>
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
        <Stack
          className="DetailsMarket"
          py={"4rem"}
          pb={"3rem"}
          spacing={4}
        >
          <Center>
            <Box w="100%">
              <Image
                boxSize="18rem"
                w="100%"
                objectFit="cover"
                src={detailMarket?.imageUrl}
                alt={detailMarket?.name}

              />
            </Box>
          </Center>
          <Stack spacing={2} px={"2rem"}>
            <Flex>
              <Text fontSize="3xl">{detailMarket?.name}</Text>
              <Flex justifyContent='space-between'>
                {!savedAsFav && !marketIsFav ? <Icon as={FaRegHeart} onClick={saveAsFav} w={6} h={6} ml="2vw" mt="1vh" /> : ''}
                {marketIsFav && <Icon as={FaRegHeart} onClick={removeAsFav} style={{ color: "red" }} w={6} h={6} ml="2vw" mt="1vh" />}
              </Flex>
            </Flex>
              <Box as="span" color="gray.600" fontSize="sm">
                {detailMarket?.address}
              </Box>   
            <Flex>
              <Flex gap="10px" alignItems="center">
                <Avatar
                  size="lg"
                  mt="0px"
                  src={detailMarket.author?.profilePicture}
                />
                <Flex flexDirection="column">
                  <Text>{detailMarket?.author?.name}</Text>
                  { !userWantsFollow && <Button variant='ghost' padding={0} borderTop={0} onClick={updateFollowUsers}><Badge
                    height='3vh'
                    paddingTop='0.5vh'
                    paddingBottom='0.2vh'
                    borderRadius="full"
                    px="3"
                    colorScheme="teal"
                    textAlign="center"               
                  >
                    Follow <span class="authorId hide">{detailMarket?.author?._id}</span>
                  </Badge></Button>}
                  {userWantsFollow &&<Button variant='ghost' padding={0} borderTop={0} onClick={removeFollowedUser}><Badge
                    height='3vh'
                    paddingTop='0.5vh'
                    paddingBottom='0.2vh'
                    borderRadius="full"
                    px="3"
                    colorScheme="teal"
                    textAlign="center"
                  >
                    Followed  <span class="authorId hide">{detailMarket?.author._id}</span> 
                  </Badge></Button>}
                </Flex>
                <Hide above="600px" >
                <Box display="flex"  gap="3px">
                  <Box as="span" ml="30vw" color="gray.600" fontSize="m" >
                    {detailMarket.stars.length}</Box>
                  <StarIcon color='teal'/>
                </Box>
                </Hide>

                <Show above="600px">
                <Hide above="800px" >

                <Flex  gap="3px">
                  <Box as="span" ml="60vw" color="gray.600" fontSize="m" >
                    {detailMarket.stars.length}</Box>
                  <StarIcon color='teal'/>
                </Flex>
                </Hide>
    
                </Show>
                <Show above="800px">
                <Flex  gap="3px">
                  <Box as="span" ml="75vw" color="gray.600" fontSize="m" >
                    {detailMarket.stars.length}</Box>
                  <StarIcon color='teal'/>
                </Flex>
    
                </Show>
              
              </Flex>
            </Flex>
            <Text fontSize="md">{detailMarket?.description}</Text>
            <Text fontSize="sm">
              <br />Opening days: {detailMarket?.openingDays.join(', ')}
              <br />Opening Months: {detailMarket?.openingMonths.join(', ')}
              <br />Opening hours: {detailMarket?.opening_hours?.from} to {detailMarket?.opening_hours?.to}
            </Text>
            <Text fontSize="sm">
              Website:{" "}
              <Link href={detailMarket?.website} isExternal>
                {detailMarket?.website}
              </Link>
            </Text>
          </Stack>
          {detailMarket?.coordinates && <MapContainer lat={detailMarket.coordinates?.lat} lng={detailMarket.coordinates?.lng} />}
          {currentUser &&
            currentUser?._id === detailMarket.author?._id ? <FormEditMarket props={objSentAsProps} /> :
            <Box pl='3rem' py='1rem'>
              <Text fontSize="lg" fontWeight="bold" mt='1rem'>Do you know this market?</Text>
              <ReviewInput props={reviewProps} />
            </Box>
          }
          <SimpleGrid
            px='2rem'
            minChildWidth='18rem'
            spacing='20px'
            pos='relative'>
            {thisMarketReviews?.map((review) => {
              return (
                <Review
                  {...review}
                  key={review._id}
                />
              )
            })}
          </SimpleGrid>
        </Stack>
      )}
    </Box>
  );
};

export default MarketDetails;
