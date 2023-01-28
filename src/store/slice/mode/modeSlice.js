import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	mode: JSON.parse(localStorage.getItem('theme')) || false,
};

export const modeSlice = createSlice({
	name: 'mode',
	initialState,
	reducers: {
		setMode: (state, action) => {
			state.mode = action.payload;
			localStorage.setItem('theme', JSON.stringify(action.payload));
		},
	},
});

export const { setMode } = modeSlice.actions;
