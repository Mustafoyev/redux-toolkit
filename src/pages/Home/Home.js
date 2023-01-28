import { Box } from '@mui/material';
import { useSelector } from 'react-redux';

export const Home = () => {
	const theme = useSelector((state) => state.mode.mode);

	return (
		<Box
			sx={{
				backgroundColor: `${theme ? '#3b3b3b' : '#fff'}`,
				padding: '20px',
			}}></Box>
	);
};
