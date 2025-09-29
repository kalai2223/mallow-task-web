import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

import { userListApi, addUserApi, updateUserApi, deleteUserApi } from '@api/userApi';

interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

interface UserState {
  users: User[];
  allUsers: User[];
  loading: boolean;
  error: string | null;
  page: string;
  perPage: number;
  total: number;
  totalPages: number;
  searchTerm: string;
}

// Fetch users with page and optional search
export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async ({ page }: { page: string }) => {
    const response = await userListApi(page);
    return {
      users: response.data,
      page: response.page,
      perPage: response.per_page,
      total: response.total,
      totalPages: response.total_pages,
    };
  },
);

// Add user
export const addUser = createAsyncThunk('users/addUser', async (userData: Partial<User>) => {
  const response = await addUserApi(userData);
  return response; // return newly added user
});

// Edit user
export const editUser = createAsyncThunk(
  'users/editUser',
  async ({ id, userData }: { id: number; userData: Partial<User> }) => {
    const response = await updateUserApi(id, userData);
    return response; // return updated user
  },
);

//Delete user
export const deleteUser = createAsyncThunk('users/deleteUser', async (id: number) => {
  const response = await deleteUserApi(id);
  return response; // return deleted user
});

const initialState: UserState = {
  users: [],
  allUsers: [],
  loading: false,
  error: null,
  page: '1',
  perPage: 6,
  total: 0,
  totalPages: 0,
  searchTerm: '',
};

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
      const term = action.payload.toLowerCase();
      state.users = state.allUsers.filter(
        (u) =>
          u.first_name.toLowerCase().includes(term) || u.last_name.toLowerCase().includes(term),
      );

      const pageSize = Math.ceil(state.users.length / state.perPage);
      state.total = pageSize;
    },
    clearSearchTerm: (state) => {
      state.searchTerm = '';
      state.users = state.allUsers;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Users
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchUsers.fulfilled,
        (
          state,
          action: PayloadAction<{
            users: User[];
            page: string;
            perPage: number;
            total: number;
            totalPages: number;
          }>,
        ) => {
          state.allUsers = action.payload.users;
          state.users = action.payload.users;
          state.page = action.payload.page;
          state.perPage = action.payload.perPage;
          state.total = action.payload.total;
          state.totalPages = action.payload.totalPages;
          state.loading = false;
        },
      )
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Something went wrong';
      })

      // Add User
      .addCase(addUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.users.unshift(action.payload); // add new user at the top
        state.loading = false;
      })
      .addCase(addUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to add user';
      })

      // Edit User
      .addCase(editUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editUser.fulfilled, (state, action: PayloadAction<User>) => {
        const index = state.users.findIndex((u) => u.id === action.payload.id);
        if (index >= 0) state.users[index] = action.payload;
        state.loading = false;
      })
      .addCase(editUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to update user';
      })

      // Delete User
      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.users = state.users.filter((u) => u.id !== action.payload.id);
        state.loading = false;
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to delete user';
      });
  },
});

export const { setSearchTerm } = userSlice.actions;

export default userSlice.reducer;
