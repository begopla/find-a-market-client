import { Link } from "react-router-dom"
import { Center, Text, Box, Flex, Button, Stack } from '@chakra-ui/react'

const Oops = () => {
	return (
		<>
			<Center>
				<Flex my='6rem' flexDirection='column'>
					<Box boxSize='20rem'><img src="./404-1.png" alt="404" /></Box>
					<Stack alignItems='center' pt='8rem' ml='15px'>
						<Text fontSize='md' fontWeight='bold'>Oops, that's a 404</Text>
						<Button><Link to="/" >Go back to the Homepage</Link></Button>
					</Stack>
				</Flex>
			</Center>
		</>
	)
}

export default Oops