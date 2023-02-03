import {
	AppBar,
	Avatar,
	Box,
	Button,
	Container,
	IconButton,
	Menu,
	MenuItem,
	Toolbar,
	Tooltip,
	Typography,
} from '@mui/material';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import ChatIcon from '@mui/icons-material/Chat';
import { useDispatch, useSelector } from 'react-redux';
import { setMode } from '../../store/slice/mode/modeSlice';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import LightModeIcon from '@mui/icons-material/LightMode';
import { AiFillSetting } from 'react-icons/ai';
import { FiLogOut } from 'react-icons/fi';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/animations/scale.css';
import { setToken } from '../../store/slice/token/tokenSlice';
import { setUser } from '../../store/slice/user/userSlice';

export const Header = () => {
	const [anchorElNav, setAnchorElNav] = useState(null);
	const [anchorElUser, setAnchorElUser] = useState(null);
	const user = useSelector((state) => state.user.user);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const theme = useSelector((state) => state.mode.mode);

	const handleOpenNavMenu = (event) => {
		setAnchorElNav(event.currentTarget);
	};
	const handleOpenUserMenu = (event) => {
		setAnchorElUser(event.currentTarget);
	};

	const handleCloseNavMenu = () => {
		setAnchorElNav(null);
	};

	const handleCloseUserMenu = () => {
		setAnchorElUser(null);
	};

	const handleLogOut = () => {
		localStorage.removeItem('token');
		localStorage.removeItem('user');
		dispatch(setToken(''));
		dispatch(setUser(''));
		navigate('/');
	};

	return (
		<AppBar position='static'>
			<Container maxWidth='xl'>
				<Toolbar disableGutters>
					<Typography
						variant='h6'
						noWrap
						component='a'
						href='/'
						sx={{
							mr: 2,
							display: { xs: 'none', md: 'flex' },
							fontFamily: 'monospace',
							fontWeight: 700,
							letterSpacing: '.3rem',
							color: 'inherit',
							textDecoration: 'none',
						}}>
						<ChatIcon />
					</Typography>

					<Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
						<IconButton
							size='large'
							aria-label='account of current user'
							aria-controls='menu-appbar'
							aria-haspopup='true'
							onClick={handleOpenNavMenu}
							color='inherit'>
							<MenuIcon />
						</IconButton>
						<Menu
							id='menu-appbar'
							anchorEl={anchorElNav}
							anchorOrigin={{
								vertical: 'bottom',
								horizontal: 'left',
							}}
							keepMounted
							transformOrigin={{
								vertical: 'top',
								horizontal: 'left',
							}}
							open={Boolean(anchorElNav)}
							onClose={handleCloseNavMenu}
							sx={{
								display: { xs: 'block', md: 'none' },
							}}>
							<MenuItem onClick={handleCloseNavMenu}>
								<Link
									style={{
										textDecoration: 'none',
										fontWeight: '700',
										fontSize: '20px',
										color: '#3D1766',
										textAlign: 'center',
									}}
									to='/'>
									Home
								</Link>
							</MenuItem>
							<MenuItem onClick={handleCloseNavMenu}>
								<Link
									style={{
										textDecoration: 'none',
										fontWeight: '700',
										fontSize: '20px',
										color: '#3D1766',
										textAlign: 'center',
									}}
									to='/posts'>
									Posts
								</Link>
							</MenuItem>
							<MenuItem onClick={handleCloseNavMenu}>
								<Link
									style={{
										textDecoration: 'none',
										fontWeight: '700',
										fontSize: '20px',
										color: '#3D1766',
										textAlign: 'center',
									}}
									to='/profile'>
									Profile
								</Link>
							</MenuItem>
						</Menu>
					</Box>
					<Typography
						variant='h5'
						noWrap
						component='a'
						href=''
						sx={{
							mr: 2,
							display: { xs: 'flex', md: 'none' },
							flexGrow: 1,
							fontFamily: 'monospace',
							fontWeight: 700,
							letterSpacing: '.3rem',
							color: 'inherit',
							textDecoration: 'none',
						}}>
						<ChatIcon />
					</Typography>
					<Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
						<Link
							style={{
								marginRight: '20px',
								textDecoration: 'none',
								fontWeight: '700',
								fontSize: '20px',
								color: '#F8EDE3',
							}}
							to='/'
							onClick={handleCloseNavMenu}
							sx={{ my: 2, color: 'white', display: 'block' }}>
							Home
						</Link>
						<Link
							style={{
								marginRight: '20px',
								textDecoration: 'none',
								fontWeight: '700',
								fontSize: '20px',
								color: '#F8EDE3',
							}}
							to='/posts'
							onClick={handleCloseNavMenu}
							sx={{ my: 2, color: 'white', display: 'block' }}>
							Posts
						</Link>
						<Link
							style={{
								textDecoration: 'none',
								fontWeight: '700',
								fontSize: '20px',
								color: '#F8EDE3',
							}}
							to='/profile'
							onClick={handleCloseNavMenu}
							sx={{ my: 2, color: 'white', display: 'block' }}>
							Profile
						</Link>
					</Box>

					<Box sx={{ flexGrow: 0 }}>
						<Tippy
							content='Dark / Light'
							animation='scale'
							duration={1000}
							delay={[500, 1000]}>
							<IconButton
								sx={{ ml: 1, marginRight: '10px' }}
								onClick={() => dispatch(setMode(!theme))}
								color='inherit'>
								{theme ? <LightModeIcon /> : <Brightness4Icon />}
							</IconButton>
						</Tippy>

						<Tooltip title='Open settings'>
							<IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
								<Avatar sx={{ color: '#000' }}>
									{user.first_name.at(0) + ' ' + user.last_name.at(0)}
								</Avatar>
							</IconButton>
						</Tooltip>
						<Menu
							sx={{ mt: '45px' }}
							id='menu-appbar'
							anchorEl={anchorElUser}
							anchorOrigin={{
								vertical: 'top',
								horizontal: 'right',
							}}
							keepMounted
							transformOrigin={{
								vertical: 'top',
								horizontal: 'right',
							}}
							open={Boolean(anchorElUser)}
							onClose={handleCloseUserMenu}>
							<MenuItem>
								<Button>
									<Link
										style={{ textDecoration: 'none', textAlign: 'center' }}
										to={''}>
										<AiFillSetting size='16px' style={{ marginRight: '4px' }} />
										Settings
									</Link>
								</Button>
							</MenuItem>
							<MenuItem>
								<Button
									onClick={handleLogOut}
									style={{ textDecoration: 'none', textAlign: 'center' }}
									to={''}>
									<FiLogOut style={{ marginRight: '4px' }} />
									Log Out
								</Button>
							</MenuItem>
						</Menu>
					</Box>
				</Toolbar>
			</Container>
		</AppBar>
	);
};
