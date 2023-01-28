import {
	Box,
	Button,
	Card,
	CardActions,
	CardContent,
	List,
	ListItem,
	Typography,
} from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPost } from '../../store/slice/post/postSlice';

export const Posts = () => {
	const [users, setUsers] = useState([]);
	const posts = useSelector((state) => state.post.post);
	const dispatch = useDispatch();
	const theme = useSelector((state) => state.mode.mode);

	useEffect(() => {
		axios
			.get('http://localhost:8080/posts')
			.then((res) => {
				if (res.status === 200) {
					dispatch(setPost(res.data));
				}
			})
			.catch((err) => console.log(err));
	}, []);

	useEffect(() => {
		axios
			.get('http://localhost:8080/users')
			.then((res) => setUsers(res.data))
			.catch((err) => console.log(err));
	}, []);

	const handleAllPosts = () => {
		axios
			.get('http://localhost:8080/posts')
			.then((res) => {
				if (res.status === 200) {
					dispatch(setPost(res.data));
				}
			})
			.catch((err) => console.log(err));
	};

	const handleUserPosts = (id) => {
		axios
			.get('http://localhost:8080/posts?user_id=' + id)
			.then((res) => {
				if (res.status === 200) {
					dispatch(setPost(res.data));
				}
			})
			.catch((err) => console.log(err));
	};

	return (
		<Box
			sx={{
				display: 'flex',
				backgroundColor: `${theme ? '#3b3b3b' : '#fff'}`,
			}}>
			<Box
				sx={{
					padding: '20px',
					width: '500px',
					backgroundColor: `${theme ? '#4a4a4a' : '#f2f2f2'}`,
					borderRadius: '0 12px 12px 0',
				}}>
				<List>
					<Box
						sx={{
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'space-between',
							marginBottom: '20px',
						}}>
						<Typography sx={{ color: `${theme ? '#fff' : ''}` }} variant='h4'>
							Users
						</Typography>
						<Button onClick={handleAllPosts} variant='contained'>
							All posts
						</Button>
					</Box>
					{users.map((el) => (
						<ListItem key={el.id}>
							<Button
								sx={{ color: `${theme ? '#fff' : ''}` }}
								onClick={() => handleUserPosts(el.id)}>
								{el.id + ' ' + el.first_name + ' ' + el.last_name}
							</Button>
						</ListItem>
					))}
				</List>
			</Box>
			<Box
				sx={{
					display: 'flex',
					flexWrap: 'wrap',
					justifyContent: 'space-between',
					gap: '30px',
					width: '1600px',
					padding: '40px',
				}}>
				{posts.map((el) => (
					<Card key={el.id} sx={{ width: 330 }}>
						<CardContent>
							<Typography
								sx={{ fontSize: 14 }}
								color='text.secondary'
								gutterBottom>
								Author: {el.user_name}
							</Typography>
							<Typography
								sx={{ marginBottom: '6px' }}
								variant='h5'
								component='div'>
								{el.post_title}
							</Typography>
							<Typography variant='body2'>{el.post_body}</Typography>
						</CardContent>
						<CardActions>
							<Button size='small'>Learn More</Button>
						</CardActions>
					</Card>
				))}
			</Box>
		</Box>
	);
};
