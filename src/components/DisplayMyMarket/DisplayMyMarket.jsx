import React from 'react'
import {Flex, Image, Text, Spacer} from '@chakra-ui/react';
import { StarIcon } from '@chakra-ui/icons';
import {Link} from 'react-router-dom'
const DisplayMyMarket = ({ name, imageUrl, _id}) => {
  return (

	<Link to={`/markets/${_id}`}>

			 <Flex mt='3vh'>
				<Image src={imageUrl} boxSize='15vw' ml='5vw' mr='10vw'></Image>
				<Flex flexDirection='column' justify='top' mr='10vw'>
				<Text fontSize='1xl'>{name}</Text>
				<Text marginBottom='5vh'>City, Country</Text>
				</Flex>
				<Spacer />
				<Text>5</Text>
				<StarIcon color={'teal.500'} ml='2vw' mt='0.5vh' mr='8vw'/>
			 </Flex>
				<hr style={{width: '80%', marginLeft:'10%'}}/>
	</Link>
  )
}

export default DisplayMyMarket