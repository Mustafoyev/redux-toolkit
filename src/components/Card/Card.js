import { useRef, useState } from 'react';
import {
	Button,
	DialogActions,
	DialogContent,
	ListItem,
	TextField,
	Typography,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { Stack } from '@mui/system';
import { Modal } from '../../components/Modal/Modal';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { FiEdit } from 'react-icons/fi';
import { MdDeleteForever } from 'react-icons/md';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/animations/scale.css';

export const Card = ({ obj }) => {
	const editTitleRef = useRef();
	const editBodyRef = useRef();
	const [editPostModal, setEditPostModal] = useState(false);
	const user = useSelector((state) => state.user.user);

	const handleEditPost = (id) => {
		axios
			.put(`http://localhost:8080/posts/${id}`, {
				post_title: editTitleRef.current.value,
				post_body: editBodyRef.current.value,
				user_id: user.id,
				user_name: user.first_name + ' ' + user.last_name,
			})
			.then((res) => {
				if (res.status === 200) {
					setEditPostModal(false);
				}
			})
			.catch((err) => console.log(err));
	};

	const handleDeletePost = (id) => {
		axios
			.delete('http://localhost:8080/posts/' + id)
			.then((res) => {
				if (res.status === 200) {
					setEditPostModal(false);
				}
			})
			.catch((err) => console.log(err));
	};

	return (
		<>
			<ListItem
				sx={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'flex-start',
					marginBottom: '20px',
					padding: '30px',
					backgroundColor: '#F2F2F2',
					borderRadius: '10px',
				}}>
				<Typography sx={{ marginBottom: '10px' }} variant='h4'>
					{obj.post_title}
				</Typography>
				<Typography sx={{ marginBottom: '10px' }}>
					Description: {obj.post_body}
				</Typography>

				<Tippy
					content='Edit post'
					placement='bottom'
					animation='scale'
					duration={1000}
					delay={[500, 1000]}>
					<Button
						onClick={() => setEditPostModal(true)}
						variant='contained'
						color='warning'>
						<FiEdit style={{ marginRight: '4px' }} />
						Edit
					</Button>
				</Tippy>
			</ListItem>
			{editPostModal ? (
				<Modal
					title='Edit post'
					modal={editPostModal}
					setModal={setEditPostModal}>
					<form>
						<DialogContent>
							<Stack width={'400px'} direction='column' spacing={2}>
								<TextField
									inputRef={editTitleRef}
									type='text'
									label='Enter your post title'
									defaultValue={obj.post_title}
								/>
								<TextField
									inputRef={editBodyRef}
									type='text'
									label='Enter your post description'
									defaultValue={obj.post_body}
								/>
							</Stack>
						</DialogContent>
						<DialogActions>
							<Button
								onClick={() => handleEditPost(obj.id)}
								variant='contained'
								color='success'>
								<FiEdit style={{ marginRight: '4px' }} /> Edit post
							</Button>
							<Button
								onClick={() => handleDeletePost(obj.id)}
								variant='contained'
								color='error'>
								<MdDeleteForever size='18px' style={{ marginRight: '4px' }} />
								Delete post
							</Button>
						</DialogActions>
					</form>
				</Modal>
			) : (
				''
			)}
		</>
	);
};
