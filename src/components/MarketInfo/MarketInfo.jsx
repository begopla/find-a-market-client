import React from 'react'
import { Box, Center, Image, Avatar, Text, Stack, Link, Flex, Badge } from '@chakra-ui/react'
import { StarIcon } from '@chakra-ui/icons';

export default function MarketInfo({name, imageUrl, description, website, address}){
    <Stack className="DetailsMarket" py={'4rem'} spacing={4}>
    <Center>
        <Image
            boxSize='18rem'
            w='100%'
            objectFit='cover'
            src={imageUrl}
            alt={name} />
    </Center>
    <Stack spacing={2} px={'2rem'}>
        <Text fontSize='3xl'>{name}</Text>
        <Flex alignItems='baseline' justifyContent='space-between'>
            <Box as='span' color='gray.600' fontSize='sm'>City &bull; Country? {address}</Box>
            <Box display='flex' mt='2' alignItems='center' gap='3px'>
                <Box as='span' ml='2' color='gray.600' fontSize='sm'>10</Box>
                <StarIcon color={'teal.500'} />
            </Box>
        </Flex>
        <Flex gap='10px' alignItems='center'>
            <Avatar size='sm' mt='3px' src='' />
            <Flex flexDirection='column' gap='2px'>
                <Text>user_name</Text>
                <Badge borderRadius='full' px='2' colorScheme='teal' textAlign='center'>Follow</Badge>
            </Flex>
        </Flex>
        <Text fontSize='md'>{description}</Text>
        <Text fontSize='sm'>Website: <Link href={website} isExternal>{website}</Link></Text>
    </Stack>
</Stack>
}