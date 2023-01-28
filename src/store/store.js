import { configureStore } from '@reduxjs/toolkit';
import { modeSlice } from './slice/mode/modeSlice';
import { postSlice } from './slice/post/postSlice';
import { tokenSlice } from './slice/token/tokenSlice';
import { userSlice } from './slice/user/userSlice';

export const store = configureStore({
	reducer: {
		token: tokenSlice.reducer,
		user: userSlice.reducer,
		post: postSlice.reducer,
		mode: modeSlice.reducer,
	},
});
