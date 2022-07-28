import {
  Box,
  Container,
  Stack,
  useColorModeValue
} from '@chakra-ui/react';
import { StarIcon } from '@chakra-ui/icons';
import { IoEarthOutline } from 'react-icons/io5';
import { CgProfile } from "react-icons/cg";
import { VscHeart, VscSearch } from "react-icons/vsc";
import { BsThreeDots } from "react-icons/bs";


export default function IconFooter() {
  return (
    <Box
      bg={useColorModeValue('gray.50', 'gray.900')}
      color={useColorModeValue('gray.700', 'gray.200')}
      borderTop={'1px'}
      borderColor={'gray.200'}
      pos="fixed"
      bottom={0}
      w={'100%'}>
      <Container
        as={Stack}
        maxW={'6xl'}
        py={4}
        direction={'row'}
        spacing={4}
        justify={'space-around'}
        align={'center'}>
        <Box as={'a'} href={'/search'}>
          <VscSearch size={22}/>
        </Box>
        <Box as={'a'} href={'/favourites'} >
          <VscHeart size={24}/>
        </Box>
        <Box as={'a'} href={'/signin'}>
          <CgProfile size={24}/>
        </Box>
        <Box as={'a'} href={'/discover'}>
          <IoEarthOutline size={25}/>
        </Box>
        <Box as={'a'} href={'#'}>
          <BsThreeDots size={25}/>
        </Box>

      </Container>
    </Box>
  );
}