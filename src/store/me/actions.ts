import axios from "axios";
import { Action, ActionCreator } from "redux";
import { ThunkAction } from "redux-thunk";
import { IUserData } from "../../hooks/useUserData";
import { IRootState } from "../reducer";

export const ME_REQUEST = 'ME_REQUEST';
export interface IMeRequestAction {
  type: typeof ME_REQUEST;
}

export const meRequest: ActionCreator<IMeRequestAction> = () => ({
  type: ME_REQUEST,
});

export const ME_REQUEST_SUCCESS = 'ME_REQUEST_SUCCESS';
export interface IMeRequestSuccessAction {
  type: typeof ME_REQUEST_SUCCESS;
  data: IUserData;
}

export const meRequestSuccess: ActionCreator<IMeRequestSuccessAction> = (data: IUserData) => ({
  type: ME_REQUEST_SUCCESS,
  data,
});

export const ME_REQUEST_ERROR = 'ME_REQUEST_ERROR';
export interface IMeRequestErrorAction {
  type: typeof ME_REQUEST_ERROR;
  error: string;
}

export const meRequestError: ActionCreator<IMeRequestErrorAction> = (error: string) => ({
  type: ME_REQUEST_ERROR,
  error,
});

export const meRequestAsync = (): ThunkAction<void, IRootState, unknown, Action<string>> => (dispatch, getState) => {
  dispatch(meRequest());
  axios.get('https://oauth.reddit.com/api/v1/me', {
    headers: { Authorization: `bearer ${getState().token.token}`}
  })
    .then((resp) => {
      const userData = resp.data;
      dispatch(meRequestSuccess({ name: userData.name, iconImg: userData.icon_img }));
    })
    .catch((error) => {
      dispatch(meRequestError(error.toString()));
    });
};
