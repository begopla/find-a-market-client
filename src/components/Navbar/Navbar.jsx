import { NavLink, Outlet } from "react-router-dom"
import useAuth from "../../context/auth/useAuth"
import "./Navbar.css"
import FormCreateMarket from "../Forms/FormCreateMarket";
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
	useColorModeValue,
	Stack,
	useColorMode,
	Center,
	Text,
	Hide
} from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';

export default function Navbar() {
	const { isLoggedIn, currentUser, removeUser } = useAuth()
	const { colorMode, toggleColorMode } = useColorMode();

	return (
		<>
			<Box bg={useColorModeValue('gray.100', 'gray.900')} px={4} pos={'fixed'} width={'100%'} zIndex={1}>
				<Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
					<NavLink to='/'>
					<Flex alignItems={'center'}>
							<img src="/logo1.png" alt="logo" width='45rem' />
							<Hide below='900px'><Text className="name">Localish</Text></Hide>
						</Flex>

					</NavLink>
					<Flex alignItems={'center'}>
						<Stack direction={'row'} spacing={7}>
							<Button onClick={toggleColorMode}>
								{colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
							</Button>
							{isLoggedIn && (
								<>
								<FormCreateMarket />
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
											<MenuItem><NavLink to='/profile/User'>Personal Data</NavLink></MenuItem>
											<MenuItem><NavLink to='/profile/favourites'> Favourites</NavLink></MenuItem>
											<MenuItem  onClick={removeUser}>Logout</MenuItem>

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
			<Outlet/>
		</>
	);
}