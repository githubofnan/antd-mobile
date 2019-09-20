import { USER } from '../constants/index';

export const setUser = data => ({
  type: USER.LOGIN,
  data
})

export const clearUser = () => ({
  type: USER.LOGINOUT
})