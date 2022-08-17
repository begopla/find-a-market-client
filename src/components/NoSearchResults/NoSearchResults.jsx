import { Box, Text, Stack, Image } from '@chakra-ui/react'

export default function NoSearchResults() {
    return (
        <Stack align='center' pb='6rem'>
            <Box boxSize='sm'><Image src='no-results.png'></Image></Box>
            <Text align='center' fontSize='xl' fontWeight='bold'>Sorry We could't find<br />what you are looking for</Text>
            <Text fontSize='md'>Please try searching something else</Text>
        </Stack>
    )
}