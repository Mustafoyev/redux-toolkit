import { Button } from '@mui/material';
import { Box } from '@mui/system';
import { useRef, useState } from 'react';
import IdleTimer from 'react-idle-timer';
import ReactModal from 'react-modal';
import { GoAlert } from 'react-icons/go';
import { useNavigate } from 'react-router-dom';
import { setToken } from '../../store/slice/token/tokenSlice';
import { setUser } from '../../store/slice/user/userSlice';
import { useDispatch } from 'react-redux';

ReactModal.setAppElement('#root');

export const IdleTimerConatiner = () => {
	const idleRef = useRef();
	const timeOutRef = useRef();
	const [modal, setModal] = useState(false);
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const logOut = () => {
		setModal(true);
		timeOutRef.current = setTimeout(log, 5000);
	};

	const stay = () => {
		setModal(false);
		clearTimeout(timeOutRef.current);
	};

	const log = () => {
		setModal(false);
		clearTimeout(timeOutRef.current);
		localStorage.removeItem('token');
		localStorage.removeItem('user');
		dispatch(setToken(''));
		dispatch(setUser(''));
		navigate('/');
	};

	return (
		<div>
			<IdleTimer ref={idleRef} timeout={5000} onIdle={logOut}></IdleTimer>
			<ReactModal
				isOpen={modal}
				onRequestClose={() => setModal(false)}
				style={{
					overlay: {
						backgroundColor: 'rgba(0, 0, 0, 0.5)',
					},
					content: {
						width: '300px',
						height: '200px',
						top: '0',
						right: '0',
						bottom: '0',
						left: '0',
						margin: 'auto',
					},
				}}>
				<Box sx={{ display: 'flex', alignItems: 'center' }}>
					<GoAlert color='red' size='30px' style={{ marginRight: '4px' }} />
					<h2 style={{ textAlign: 'center' }}>Will you stay on site?</h2>
				</Box>
				<Box sx={{ paddingTop: '40px', textAlign: 'center' }}>
					<Button
						onClick={stay}
						variant='contained'
						color='success'
						sx={{ marginRight: '5px' }}>
						Yes
					</Button>
					<Button onClick={log} variant='contained' color='error'>
						No
					</Button>
				</Box>
			</ReactModal>
		</div>
	);
};
