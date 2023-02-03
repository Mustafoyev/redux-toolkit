import { Button, Dialog, DialogTitle, Typography } from '@mui/material';
import { Box } from '@mui/system';
import CloseIcon from '@mui/icons-material/Close';
import ReactModal from 'react-modal';
ReactModal.setAppElement('#root');

export const Modal = ({ title, children, modal, setModal }) => {
	return (
		<ReactModal
			isOpen={modal}
			onRequestClose={() => setModal(false)}
			style={{
				overlay: {
					backgroundColor: 'rgba(0, 0, 0, 0.5)',
				},
				content: {
					width: '500px',
					height: '400px',
					top: '0',
					right: '0',
					bottom: '0',
					left: '0',
					margin: 'auto',
				},
			}}>
			<Box
				sx={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'space-between',
					padding: '10px',
				}}>
				<DialogTitle>
					<Typography variant='h5'>{title}</Typography>
				</DialogTitle>
				<Button onClick={() => setModal(false)}>
					<CloseIcon />
				</Button>
			</Box>
			{children}
		</ReactModal>
	);
};
