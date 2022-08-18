import React, { useEffect, useState } from "react";
import service from '../../services/apiHandler';
import { useParams } from "react-router-dom";
import axios from "axios"
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
    useColorModeValue
} from "@chakra-ui/react";
import { StarIcon } from '@chakra-ui/icons';
import { FaRegHeart } from "react-icons/fa";
import ReviewInput from "../../components/Review/ReviewInput";
import Review from "../../components/Review/Review";
import MapContainer from "../../components/Map/MapContainer"
import useAuth from "../../context/auth/useAuth";
import { useNavigate } from "react-router-dom";
const API_URL = process.env.REACT_APP_API_URL

const DiscoverPage = () => {
    const [discoverMarket, setDiscoverMarket] = useState({})
    const { currentUser } = useAuth();
    const [isLoading, setIsLoading] = useState(true);
    const [imageUrl, setImageUrl] = useState([])
    const [savedAsFav, setSavedAsFav] = useState(false)
    const [thisMarketReviews, setThisMarketReviews] = useState([]);
    const [marketIsFav, setMarketIsFav] = useState(false)
    const { marketId } = useParams();
    const navigate = useNavigate();

    const getRandomMarket = async () => {
        const { data } = await axios.get(`${API_URL}/markets/discover`)
        //console.log(data);
        setDiscoverMarket(data)
        setThisMarketReviews(data.allReviews)
        setIsLoading(false);
    }
    useEffect(() => {
        getRandomMarket()
    }, []);

    const objSentAsProps = {
        discoverMarket: discoverMarket,
        setDiscoverMarket: setDiscoverMarket,
        marketId: marketId,
        imageUrl: imageUrl,
        setImageUrl: setImageUrl
    };

    const reviewProps = {
        thisMarketReviews: thisMarketReviews,
        setThisMarketReviews: setThisMarketReviews
    }

    const toggleSaveAsFav = () => setSavedAsFav(!savedAsFav)

    const saveAsFav = async () => {
        if (currentUser) {
            toggleSaveAsFav()
            await service.post(`markets/${marketId}/favourites`)
            console.log('market added as fav')
        } else {
            navigate('/signin')
        }
    }
    const removeAsFav = async () => {
        toggleSaveAsFav()
        await service.post(`markets/${marketId}/removefav`)
        console.log('market removed as fav')
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
    }, []);

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
                                src={discoverMarket.imageUrl}
                                alt={discoverMarket.name}

                            />

                        </Box>
                    </Center>
                    <Stack spacing={2} px={"2rem"}>
                        <Flex>
                            <Text fontSize="3xl">{discoverMarket.name}</Text>
                            <Flex justifyContent='space-between'>
                                {savedAsFav || marketIsFav === false ? <Icon as={FaRegHeart} onClick={saveAsFav} w={6} h={6} ml="2vw" mt="1vh" /> :
                                    <Icon as={FaRegHeart} onClick={removeAsFav} style={{ color: "red" }} w={6} h={6} ml="2vw" mt="1vh" />}
                            </Flex>
                        </Flex>
                        <Flex alignItems="baseline" justifyContent="space-between">
                            <Box as="span" color="gray.600" fontSize="sm">
                                {discoverMarket.address}
                            </Box>
                        </Flex>

                        <Flex>
                            <Flex gap="10px" alignItems="center">
                                <Avatar
                                    size="md"
                                    mt="0px"
                                    src={discoverMarket.author?.profilePicture}
                                />
                                <Flex flexDirection="column" gap="2px">
                                    <Text>{discoverMarket.author?.name}</Text>
                                    <Badge
                                        borderRadius="full"
                                        px="2"
                                        colorScheme="teal"
                                        textAlign="center"
                                    >
                                        Follow
                                    </Badge>
                                </Flex>
                                <Box display="flex" alignItems="center" gap="3px">
                                    <Box as="span" ml="41vw" color="gray.600" fontSize="m" >
                                       {discoverMarket.stars.length}
                                    </Box>
                                    <StarIcon color={"teal.500"} w={5} h={5} ml="2vw" />
                                </Box>
                            </Flex>
                        </Flex>
                        <Text fontSize="md">{discoverMarket.description}</Text>
                        <Text fontSize="sm">
                            <br />Opening days: {discoverMarket?.opening_days}
                            <br />Opening Months: {discoverMarket?.opening_months}
                            <br />Opening hours: {discoverMarket?.opening_hours?.from} to {discoverMarket?.opening_hours?.to}
                        </Text>
                        <Text fontSize="sm">
                            Website:{" "}
                            <Link href={discoverMarket.website} isExternal>
                                {discoverMarket.website}
                            </Link>
                        </Text>
                    </Stack>
                    {discoverMarket?.coordinates && <MapContainer lat={discoverMarket.coordinates?.lat} lng={discoverMarket.coordinates?.lng} />}
                    
                        <Box pl='3rem' py='1rem'>
                            <Text fontSize="lg" fontWeight="bold" mt='1rem'>Do you know this market?</Text>
                            <ReviewInput props={reviewProps} />
                        </Box>
                    
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


export default DiscoverPage;