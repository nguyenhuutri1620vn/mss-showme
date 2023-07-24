import * as constTypes from './constants';
import * as types from './types';

export const checkToken = () => ({
  type: constTypes.CHECK_TOKEN,
});
export const saveToken = (token: string) => ({
  type: constTypes.SET_TOKEN,
  payload: token,
});

export const setCurrentUser = (payload: any) => ({
  type: constTypes.SET_CURRENT_USER,
  payload,
});

export const setHomePage = (isHomePage: boolean) => ({
  type: constTypes.SET_HOME_PAGE,
  payload: isHomePage,
});

export const setBuildData = (payload: types.IBuildData) => ({
  type: constTypes.SET_BUILD_DATA,
  payload,
});
