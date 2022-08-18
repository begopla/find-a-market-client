import {
  Box,
  Container,
  Stack,
  useColorModeValue,
  Hide,
  Show,
  Text
} from '@chakra-ui/react';
import { IoEarthOutline } from 'react-icons/io5';
import { CgProfile } from "react-icons/cg";
import { VscHeart, VscSearch } from "react-icons/vsc";
import FooterPopover from '../FooterPopover/FooterPopover';

export default function IconFooter() {
  return (
    <>
      <Hide above='900px'>
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
            <Box as={'a'} href={'/'}>
              <VscSearch size={22} />
            </Box>
            <Box as={'a'} href={'/profile/favourites'} >
              <VscHeart size={24} />
            </Box>
            <Box as={'a'} href={'/profile'}>
              <CgProfile size={24} />
            </Box>
            <Box as={'a'} href={'/markets/discover'}>
              <IoEarthOutline size={25} />
            </Box>
            <Box>
              <FooterPopover />
            </Box>
          </Container>
        </Box>
      </Hide>

      <Show above='900px'>
        <Box
          bg={useColorModeValue('gray.50', 'gray.900')}
          color={useColorModeValue('gray.700', 'gray.200')}>
          <Container
            as={Stack}
            maxW={'6xl'}
            py={4}
            direction={{ base: 'column', md: 'row' }}
            spacing={4}
            justify='center'
            align={{ base: 'center', md: 'center' }}>
            <Text>© 2022 Localish. All rights reserved</Text>
          </Container>
        </Box>
      </Show>
    </>
  );
}