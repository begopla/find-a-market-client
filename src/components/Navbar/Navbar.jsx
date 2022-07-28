import { NavLink } from "react-router-dom"
import useAuth from "../../context/auth/useAuth"
import "./Navbar.css"

/*const Navbar = () => {
	// We are getting the user and some functions from the context
	const { isLoggedIn, currentUser, removeUser } = useAuth()
	// console.log(currentUser)
	return (
		<nav className="Navbar">
			<NavLink className="logo" to="/">
				App name
			</NavLink>
			<NavLink to="/markets">All Markets</NavLink>
			{isLoggedIn && (
				<>
					<NavLink to="/profile">{currentUser.email}</NavLink>
					<button onClick={removeUser}>Log-Out</button>
				</>
			)}
			{!isLoggedIn && (
				<>
					<NavLink to="/signin">Log in</NavLink>
					<NavLink to="/signup">Sign Up</NavLink>
				</>
			)}
		</nav>
	)
}

export default Navbar*/

//import { ReactNode } from 'react';
import {
	Box,
	Flex,
	Avatar,
	Button,
	Menu,
	MenuButton,
	MenuList,
	MenuItem,
	MenuDivider,
	useDisclosure,
	useColorModeValue,
	Stack,
	useColorMode,
	Center,
} from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';

/*const NavLink = ({ children }: { children: ReactNode }) => (
  <Link
	px={2}
	py={1}
	rounded={'md'}
	_hover={{
	  textDecoration: 'none',
	  bg: useColorModeValue('gray.200', 'gray.700'),
	}}
	href={'#'}>
	{children}
  </Link>
);*/

export default function Navbar() {
	const { isLoggedIn, currentUser, removeUser } = useAuth()
	const { colorMode, toggleColorMode } = useColorMode();
	//const { isOpen, onOpen, onClose } = useDisclosure();
	return (
		<>
			<Box bg={useColorModeValue('gray.100', 'gray.900')} px={4} pos={'fixed'} width={'100%'}>
				<Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
					<NavLink to='/'>Logo</NavLink>
					<Flex alignItems={'center'}>
						<Stack direction={'row'} spacing={7}>
							<Button onClick={toggleColorMode}>
								{colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
							</Button>
							{isLoggedIn && (
								<>
									<Menu>
										<MenuButton
											as={Button}
											rounded={'full'}
											variant={'link'}
											cursor={'pointer'}
											minW={0}>
											<Avatar
												size={'sm'}
												src={currentUser.profilePicture}
											/>
										</MenuButton>
										<MenuList alignItems={'center'}>
											<br />
											<Center>
												<Avatar
													size={'2xl'}
													src={currentUser.profilePicture}
												/>
											</Center>
											<br />
											<Center>
												<p>{currentUser.name}</p>
											</Center>
											<br />
											<MenuDivider />
											<MenuItem><NavLink to='/profile'>Your Profile</NavLink></MenuItem>
											<MenuItem>Account Settings</MenuItem>
											<MenuItem onClick={removeUser}>Logout</MenuItem>
										</MenuList>
									</Menu>
								</>
							)}
							{!isLoggedIn && (
								<>
									<NavLink to="/signin">Log in</NavLink>
									<NavLink to="/signup">Sign Up</NavLink>
								</>
							)}
						</Stack>
					</Flex>
				</Flex>
			</Box>
		</>
	);
}