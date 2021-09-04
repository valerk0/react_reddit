import { Reducer } from "react";
import { GET_TOKEN, GET_TOKEN_ERROR, GET_TOKEN_SUCCESS, IGetTokenAction, IGetTokenErrorAction, IGetTokenSuccessAction } from "./actions";

export interface ITokenState {
  loading: boolean;
  error: string;
  token: string;
}

export type TokenActions = IGetTokenAction | IGetTokenSuccessAction |IGetTokenErrorAction;
export const tokenReducer: Reducer<ITokenState, TokenActions> = (state, action) => {
  switch (action.type) {
    case GET_TOKEN:
      return {
        ...state,
        loading: true,
      };
    case GET_TOKEN_SUCCESS:
      return {
        ...state,
        loading: false,
        token: action.token,
      };
    case GET_TOKEN_ERROR:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    default:
      return state;
  }
}
