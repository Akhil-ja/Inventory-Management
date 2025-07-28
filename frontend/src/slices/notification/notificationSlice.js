import { createSlice } from '@reduxjs/toolkit';

const notificationSlice = createSlice({
  name: 'notification',
  initialState: {
    isOpen: false,
    message: '',
    type: 'info', 
  },
  reducers: {
    showNotification: (state, action) => {
      state.isOpen = true;
      state.message = action.payload.message;
      state.type = action.payload.type || 'info';
    },
    hideNotification: (state) => {
      state.isOpen = false;
      state.message = '';
      state.type = 'info';
    },
  },
});

export const { showNotification, hideNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
