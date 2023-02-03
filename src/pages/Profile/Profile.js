import {
	Avatar,
	Box,
	Button,
	DialogActions,
	DialogContent,
	List,
	TextField,
	Typography,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import EmailIcon from '@mui/icons-material/Email';
import PersonIcon from '@mui/icons-material/Person';
import CreateIcon from '@mui/icons-material/Create';
import { useEffect, useRef, useState } from 'react';
import { Modal } from '../../components/Modal/Modal';
import { Stack } from '@mui/system';
import AddIcon from '@mui/icons-material/Add';
import axios from 'axios';
import { setPost } from '../../store/slice/post/postSlice';
import { Card } from '../../components/Card/Card';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/animations/scale.css';

export const Profile = () => {
	const user = useSelector((state) => state.user.user);
	const postTitleRef = useRef();
	const postBodyRef = useRef();
	const dispatch = useDispatch();
	const post = useSelector((state) => state.post.post);
	const [createPostModal, setCreatePostModal] = useState(false);
	const theme = useSelector((state) => state.mode.mode);

	const handleFormSubmit = (evt) => {
		evt.preventDefault();
		axios
			.post('http://localhost:8080/posts', {
				post_title: postTitleRef.current.value,
				post_body: postBodyRef.current.value,
				user_id: user.id,
				user_name: user.first_name + ' ' + user.last_name,
			})
			.then((res) => {
				if (res.status === 201) {
					setCreatePostModal(false);
					dispatch(setPost([...post, res.data]));
				}
			})
			.catch((err) => console.log(err));
	};

	useEffect(() => {
		axios
			.get('http://localhost:8080/posts?user_id=' + user.id)
			.then((res) => dispatch(setPost(res.data)))
			.catch((err) => console.log(err));
	}, []);

	return (
		<Box
			sx={{
				backgroundColor: `${theme ? '#3b3b3b' : '#fff'}`,
			}}>
			<Box
				sx={{
					display: 'flex',
					justifyContent: 'flex-start',
					padding: '20px',
				}}>
				<Box
					sx={{
						width: '260px',
						height: '240px',
						marginRight: '20px',
						padding: '20px',
						backgroundColor: '#f2f2f2',
						boxShadow:
							'rgba(0, 0, 0, 0.19) 0px 10px 20px 0px, rgba(0, 0, 0, 0.23) 0px 6px 6px 0px',
						borderRadius: '10px',
					}}>
					<Box sx={{ marginBottom: '30px' }}>
						<Avatar
							sx={{ margin: '10px auto', width: '100px', height: '100px' }}
							alt='Template'
							src='https://via.placeholder.com/100'
						/>
					</Box>
					<Box sx={{ display: 'flex', alignItems: 'center' }}>
						<PersonIcon />
						<Typography>
							User: {user.first_name} {user.last_name}
						</Typography>
					</Box>
					<Box sx={{ display: 'flex', alignItems: 'center' }}>
						<Box sx={{ display: 'flex', alignItems: 'center' }}>
							<EmailIcon />{' '}
							<Typography sx={{ marginLeft: '4px' }}>Email:</Typography>
						</Box>
						<Typography sx={{ marginLeft: '4px' }}>
							<a href={`mailto:${user.email}`}>{user.email}</a>
						</Typography>
					</Box>
				</Box>
				<Box
					sx={{
						flexGrow: '1',
					}}>
					<Box
						sx={{
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'space-between',
							width: '100%',
							padding: '20px',
							backgroundColor: '#4158D0',
							backgroundImage:
								'linear-gradient(43deg, #4158D0 0%, #C850C0 46%, #FFCC70 100%)',
							boxShadow:
								'rgba(0, 0, 0, 0.19) 0px 10px 20px 0px, rgba(0, 0, 0, 0.23) 0px 6px 6px 0px',
							borderRadius: '10px',
						}}>
						<Typography
							sx={{ fontWeight: '700', fontSize: '22px', color: '#fff' }}>
							Posts
						</Typography>
						<Tippy
							content='Add post'
							animation='scale'
							duration={1000}
							delay={[500, 1000]}>
							<Button
								onClick={() => setCreatePostModal(true)}
								variant='contained'
								startIcon={<CreateIcon />}>
								Create new post
							</Button>
						</Tippy>
					</Box>
					<List
						sx={{
							marginTop: '20px',
						}}>
						{post.map((el) => (
							<Card key={el.id} obj={el} />
						))}
					</List>
				</Box>
			</Box>
			{createPostModal ? (
				<Modal
					modal={createPostModal}
					setModal={setCreatePostModal}
					title='Create new post'>
					<form onSubmit={handleFormSubmit}>
						<DialogContent>
							<Stack width={'400px'} direction='column' spacing={2}>
								<TextField
									inputRef={postTitleRef}
									type='text'
									label='Enter your post title'
								/>
								<TextField
									inputRef={postBodyRef}
									type='text'
									label='Enter your post description'
								/>
							</Stack>
						</DialogContent>
						<DialogActions>
							<Button type='submit' variant='contained' startIcon={<AddIcon />}>
								Add post
							</Button>
						</DialogActions>
					</form>
				</Modal>
			) : (
				''
			)}
		</Box>
	);
};
