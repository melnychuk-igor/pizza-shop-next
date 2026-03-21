import { User } from '@prisma/client';
import { axiosInstance } from './instance';

export const getMe = async () => {
  try {
  const { data } = await axiosInstance.get<User>('/auth/me');

  return data;
} catch (e) {
  console.error(e);
  throw e;
}
};
