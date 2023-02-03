import {
	Box,
	Button,
	InputAdornment,
	Link,
	TextField,
	Typography,
} from '@mui/material';
import { Stack } from '@mui/system';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import SendIcon from '@mui/icons-material/Send';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useRef, useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setToken } from '../../store/slice/token/tokenSlice';
import { setUser } from '../../store/slice/user/userSlice';

export const Register = () => {
	const nameRef = useRef();
	const lastRef = useRef();
	const emailRef = useRef();
	const passwordRef = useRef();
	const [type, setType] = useState(false);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleFormSubmit = (evt) => {
		evt.preventDefault();
		axios
			.post('http://localhost:8080/register', {
				first_name: nameRef.current.value,
				last_name: lastRef.current.value,
				email: emailRef.current.value,
				password: passwordRef.current.value,
			})
			.then((res) => {
				if (res.status === 201) {
					localStorage.setItem('token', res.data.accessToken);
					localStorage.setItem('user', JSON.stringify(res.data.user));
					dispatch(setToken(res.data.accessToken));
					dispatch(setUser(res.data.user));
					navigate('/');
				}
			})
			.catch((err) => console.log(err));
	};

	return (
		<Box
			sx={{
				padding: '60px',
			}}>
			<Box
				sx={{
					width: '50%',
					margin: '0 auto',
					padding: '20px',
					borderRadius: '12px',
					boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px 0px',
				}}>
				<Typography sx={{ textAlign: 'center' }} variant='h3'>
					Registration
				</Typography>
				<Typography sx={{ marginTop: '20px' }}>
					Do you have an account?{' '}
					<Link component={RouterLink} to='/'>
						Login
					</Link>
				</Typography>
				<form onSubmit={handleFormSubmit} style={{ marginTop: '20px' }}>
					<Stack sx={{ padding: '20px' }} direction={'column'} spacing={2}>
						<TextField inputRef={nameRef} type='text' label='First name' />
						<TextField inputRef={lastRef} type='text' label='Last name' />
						<TextField inputRef={emailRef} type='email' label='Email' />
						<TextField
							inputRef={passwordRef}
							type={type ? 'text' : 'password'}
							label='Password'
							InputProps={{
								endAdornment: (
									<InputAdornment position='end' onClick={() => setType(!type)}>
										{type ? (
											<VisibilityIcon cursor='pointer' />
										) : (
											<VisibilityOffIcon cursor='pointer' />
										)}
									</InputAdornment>
								),
							}}
						/>
						<Button
							type='submit'
							variant='contained'
							size='large'
							endIcon={<SendIcon />}>
							Send
						</Button>
					</Stack>
				</form>
			</Box>
		</Box>
	);
};
