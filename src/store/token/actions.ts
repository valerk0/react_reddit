import axios from "axios";
import { Action, ActionCreator } from "redux";
import { ThunkAction } from "redux-thunk";
import { IRootState } from "../reducer";

export const GET_TOKEN = 'GET_TOKEN';
export interface IGetTokenAction {
  type: typeof GET_TOKEN;
}

export const getToken: ActionCreator<IGetTokenAction> = () => ({
  type: GET_TOKEN,
});

export const GET_TOKEN_SUCCESS = 'GET_TOKEN_SUCCESS';
export interface IGetTokenSuccessAction {
  type: typeof GET_TOKEN_SUCCESS;
  token: string;
}

export const getTokenSuccess: ActionCreator<IGetTokenSuccessAction> = (token: string) => ({
  type: GET_TOKEN_SUCCESS,
  token,
});

export const GET_TOKEN_ERROR = 'GET_TOKEN_ERROR';
export interface IGetTokenErrorAction {
  type: typeof GET_TOKEN_ERROR;
  error: string;
}

export const getTokenError: ActionCreator<IGetTokenErrorAction> = (error: string) => ({
  type: GET_TOKEN_ERROR,
  error,
});

export const getTokenAsync = (): ThunkAction<void, IRootState, unknown, Action<string>> => (dispatch, getState) => {
  dispatch(getToken());
  const urlSearchParams = new URLSearchParams(window.location.search);
  const code = urlSearchParams.get('code');
  if (!code) {
    dispatch(getTokenError('No code'));
    return;
  }
  axios.post('https://www.reddit.com/api/v1/access_token',
  `grant_type=authorization_code&code=${code}&redirect_uri=http://localhost:3000/auth`,
  {
    auth: { username: process.env.CLIENT_ID || '', password: 'mtO-pR631gJjRfhUx0mZAV9gQFi9IA' },
    headers: { 'Content-type': 'application/x-www-form-urlencoded' }
  })
    .then(({ data }) => {
      if (data['access_token']) {
        dispatch(getTokenSuccess(data['access_token']));
      }else{
        dispatch(getTokenError('No token'));
      }
    })
    .catch((error) => {
      dispatch(getTokenError(error.toString()));
    });
};
