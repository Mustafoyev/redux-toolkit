import { Button, Dialog, DialogTitle, Typography } from '@mui/material';
import { Box } from '@mui/system';
import CloseIcon from '@mui/icons-material/Close';

export const Modal = ({ title, children, modal, setModal }) => {
	return (
		<Box
			sx={{
				position: 'fixed',
				top: '0',
				right: '0',
				bottom: '0',
				left: '0',
				dispay: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				backgroundColor: 'rgba(0, 0, 0, 0.5)',
			}}>
			<Dialog open={modal}>
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
			</Dialog>
		</Box>
	);
};
