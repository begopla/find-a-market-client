import React, { useState } from "react"
import service from "../../services/apiHandler"
import useAuth from "../../context/auth/useAuth"
import { useNavigate } from "react-router-dom"
import './Form.css'
import { Flex, Center,Stack, Avatar, Heading, Box, InputGroup, InputLeftElement, Input, chakra, InputRightElement, Button, useColorModeValue} from '@chakra-ui/react'
import { FaUserAlt, FaLock } from "react-icons/fa";

const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);
const FormSignIn = () => {
	const [user, setUser] = useState({
		email: "",
		password: "",
	})
	const [error, setError] = useState(null)
	const [showPassword, setShowPassword] = useState(false)
	const navigate = useNavigate()
	const { storeToken, authenticateUser } = useAuth()

	const handleSubmit = async (e) => {
		e.preventDefault()
		try {
			const res = await service.signin(user)
			console.log(res)
			storeToken(res.authToken)
			await authenticateUser()
			navigate("/")
		} catch (error) {
			console.log(error)
			setError(error.response.data.message)
		}
	}
	const handleShowClick = () => setShowPassword(!showPassword);

	return (
		<Flex flexDirection="column"
		width="100wh"
		height="95vh"
		backgroundColor={useColorModeValue("gray.200",'gray.700')}
		justifyContent="center"
		alignItems="center"
		>
		<Stack
        flexDir="column"
        mb="2"
        justifyContent="center"
        alignItems="center"
      	>

		<Box minW={{ base: "90%", md: "468px" }}>
			
			<form onSubmit={handleSubmit}>
			<Stack
              spacing={4}
              p="1rem"
              backgroundColor={useColorModeValue("whiteAlpha.900",'gray.900')}
              boxShadow="md"
            >
			<Center>
				<Avatar bg={useColorModeValue("teal.900","gray.300")} />
			</Center>
			<Center>
				<Heading color={useColorModeValue("teal.900", "gray.300")}>Log in </Heading>
			</Center>
				<InputGroup>
				<InputLeftElement pointerEvents="none"
				children={<CFaUserAlt color="gray.300"/> }
				/>
				<Input
					type="email"
					id="email"
					name="email"
					placeholder="email address"
					onChange={(e) =>
						setUser({ ...user, [e.target.name]: e.target.value })
					}
					value={user.email}
				/>
				</InputGroup>
				<InputGroup>
				 <InputLeftElement pointerEvents="none"
				 children={<CFaLock color="gray.300"/>}
				 />
				
				<Input
					type={showPassword ? "text" : "password"}
					id="password"
					name="password"
					placeholder="password"
					onChange={(e) =>
						setUser({ ...user, [e.target.name]: e.target.value })
					}
					value={user.password}
				/>
				<InputRightElement width="4.5rem">
					<Button h="1.75rem" size="sm" onClick={handleShowClick}>
                      {showPassword ? "Hide" : "Show"}
					  </Button>
				</InputRightElement>
				</InputGroup>
				{error && <h3 className="error"> ⚠️{error}</h3>}
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

export default FormSignIn
