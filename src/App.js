import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { Header } from './components/Header/Header';
import { Home } from './pages/Home/Home';
import { Login } from './pages/Login/Login';
import { Posts } from './pages/Posts/Posts';
import { Profile } from './pages/Profile/Profile';
import { Register } from './pages/Register/Register';
import { setToken } from './store/slice/token/tokenSlice';
import { setUser } from './store/slice/user/userSlice';

function App() {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(setToken(localStorage.getItem('token')));
		dispatch(setUser(JSON.parse(localStorage.getItem('user'))));
	}, []);

	const token = useSelector((state) => state.token.token);

	if (token) {
		return (
			<>
				<Header />
				<Routes>
					<Route path='/' element={<Home />} />
					<Route path='/posts' element={<Posts />} />
					<Route path='/profile' element={<Profile />} />
				</Routes>
			</>
		);
	}

	return (
		<Routes>
			<Route path='/' element={<Login />} />
			<Route path='/register' element={<Register />} />
		</Routes>
	);
}

export default App;
