import { useState, useEffect } from "react";
import {
  Text,
  Box,
  Center,
  SimpleGrid,
  useColorModeValue,
  Avatar,
  AvatarGroup,
  Hide,
  Show,
  Stack
} from "@chakra-ui/react";
import "../styles/profile.css";
import DisplayMyMarket from "../components/DisplayMyMarket/DisplayMyMarket";
import service from "../services/apiHandler";
import OneMarketSmall from "../components/OneMarket/OneMarketSmall";
const Profile = () => {
  const [followedUsers, setFollowedUsers] = useState([]);
  const [myMarkets, setMyMarkets] = useState([]);
  const getMyMarkets = async () => {
    const response = await service.myMarkets();
    const res = await service.get("/profile/followed");
    setMyMarkets(response);
    setFollowedUsers(res.data.savedList);
  };

  useEffect(() => {
    getMyMarkets();
  }, []);
  return (
    <>
      <Box height="95vh">
	  <Stack>

	 
        <Hide above="650px">
		<Center>
          <Text  fontSize="1xl" mt='10vh'>
            Following 
          </Text>
        </Center>
		<Center> <AvatarGroup>
          {followedUsers?.map((user) => {
            return <Avatar size="md" mt="0px" src={user.profilePicture} />;
          })}
        </AvatarGroup></Center>
		
        <Center>
          <Text  fontSize="1xl">
            My Markets 
          </Text>
        </Center>
          <Box height="95vh">     
            {myMarkets?.map((market) => {
              return <DisplayMyMarket {...market} id={market._id} />;
            })}
          </Box>
        </Hide>
        <Show above="650px">
          {
			<>
			<Center>
          <Text  fontSize="2xl" mt='9vh'>
            My Markets 
          </Text>
        </Center>
            <SimpleGrid
              bg={useColorModeValue("white", "gray.700")}
              minChildWidth="10rem"
              spacing="5px"
              className="listMarkets"
              px={"3rem"}	  
            >
              {myMarkets?.map((market) => {
                return (
                  <OneMarketSmall
                    {...market}
                    key={market._id}
                    id={market._id}
                    name={market.name}
                  />
                );
              })}
            </SimpleGrid>
			</>
          }
		  <Center height='22vh' flexDirection="column">
        <Text fontSize="2xl">Users following</Text>
        <AvatarGroup
		mb='5vh'>
          {followedUsers?.map((user) => {
            return <Avatar size="lg" mt="0px" src={user.profilePicture} />;
          })}
        </AvatarGroup>
      </Center>
        </Show>

	  </Stack>
      </Box>
    </>
  );
};

export default Profile;