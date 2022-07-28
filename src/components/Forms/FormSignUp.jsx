import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import axios from "axios"
import service from "../../services/apiHandler"
import './Form.css' 
import { Flex, Stack, Center, Heading, Box, InputGroup, Input, InputRightElement, Button, useColorModeValue} from '@chakra-ui/react'



const FormSignUp = () => {
	const [user, setUser] = useState({ name: "", email: "", password: "" })
	const [error, setError] = useState(null)
	const [showPassword, setShowPassword] = useState(false)
	const navigate = useNavigate()

	const handleSubmit = async (e) => {
		e.preventDefault()
		try {
			const res = await service.signup(user)
			console.log(res)
			navigate("/signin")
		} catch (error) {
			setError(e.message)
		}
	}
	const handleShowClick = () => setShowPassword(!showPassword);
	return (
		<Flex flexDirection="column"
		width="100wh"
		height="95vh"
		backgroundColor={useColorModeValue("gray.200",'gray.700')}
		justifyContent="center"
		alignItems="center">
		<Stack
        flexDir="column"
        mb="2"
        justifyContent="center"
        alignItems="center"
      	>
		<Box minW={{ base: "90%", md: "468px" }}>
			{error && <h3 className="error">{error.message}</h3>}
			<form onSubmit={handleSubmit}>
			<Stack
              spacing={4}
              p="1rem"
              backgroundColor={useColorModeValue("whiteAlpha.900",'gray.900')}
              boxShadow="md"
            >
			<Center>

		<Heading>Sign up</Heading>
			</Center>
				<Input
					onChange={(e) =>
						setUser({ ...user, [e.target.name]: e.target.value })
					}
					value={user.name}
					type="text"
					id="name"
					placeholder="username"
					name="name"
				/>
				<Input
					onChange={(e) =>
						setUser({ ...user, [e.target.name]: e.target.value })
					}
					value={user.email}
					type="email"
					id="email"
					placeholder="email address"
					name="email"
				/>
				<InputGroup>

				<Input
					onChange={(e) =>
						setUser({ ...user, [e.target.name]: e.target.value })
					}
					value={user.password}
					type={showPassword ? "text" : "password"}
					id="password"
					placeholder="password"
					name="password"
				/>
				<InputRightElement width="4.5rem">
					<Button h="1.75rem" size="sm" onClick={handleShowClick}>
                      {showPassword ? "Hide" : "Show"}
					  </Button>
				</InputRightElement>
				</InputGroup>
				<Button
					borderRadius={10}
					type="submit"
					colorScheme='teal'
					variant="outline"
					width="full"
					>Submit</Button>
				</Stack>
			</form>
			</Box>
			</Stack>
		</Flex>
	)
}

export default FormSignUp
