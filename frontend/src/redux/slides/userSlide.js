import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  name: '',
  email: '',
  phone: '',
  address: '',
  avatar: '',
  access_token: '',
  id: '',
  isAdmin: false, // Fixed property name
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUser: (state, action) => {
      const {name='', email='',access_token='' ,
        address = '',
        phone = '',
        avatar = '',
        _id = '',
        isAdmin = false, // Ensure default value
      } = action.payload;
      console.log('action', action)
      state.name = name ;
      state.email = email;
      state.address = address;
      state.phone = phone;
      state.avatar = avatar;
      state.id = _id;
      state.access_token = access_token;
      state.isAdmin = isAdmin; // Corrected property name
    },
    resetUser: (state) => {
      state.name = '';
      state.email = '';
      state.address = '';
      state.phone = '';
      state.id = '';
      state.access_token = '';
      state.isAdmin = false; // Reset admin status
      
    },
  },
});

export const { updateUser, resetUser } = userSlice.actions;
export default userSlice.reducer;
