import axiosClient from './axiosClient';

import { API_ROUTE } from '../assets/constant';

const { USER_ROUTE } = API_ROUTE;

export interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

// Fetch users with optional page and searchTerm
export const userListApi = async (page: string = '1', searchTerm?: string) => {
  const url = `${USER_ROUTE}?page=${page}${
    searchTerm ? `&search=${encodeURIComponent(searchTerm)}` : ''
  }`;
  const response = await axiosClient.get(url);
  return response.data;
};

// Add a new user
export const addUserApi = async (userData: Partial<User>) => {
  const response = await axiosClient.post(USER_ROUTE, userData);
  return response.data;
};

// Update an existing user
export const updateUserApi = async (id: number, userData: Partial<User>) => {
  const response = await axiosClient.put(`${USER_ROUTE}/${id}`, userData);
  return response.data;
};

// Delete a user
export const deleteUserApi = async (id: number) => {
  const response = await axiosClient.delete(`${USER_ROUTE}/${id}`);
  return response.data;
};
