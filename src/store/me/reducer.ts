import { Reducer } from "react";
import { IUserData } from "../../hooks/useUserData";
import { IMeRequestAction, IMeRequestErrorAction, IMeRequestSuccessAction, ME_REQUEST, ME_REQUEST_ERROR, ME_REQUEST_SUCCESS } from "./actions";

export interface IMeState {
  loading: boolean;
  error: string;
  data: IUserData;
}

export type MeActions = IMeRequestAction | IMeRequestSuccessAction | IMeRequestErrorAction;
export const meReducer: Reducer<IMeState, MeActions> = (state, action) => {
  switch (action.type) {
    case ME_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ME_REQUEST_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.data,
      };
    case ME_REQUEST_ERROR:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    default:
      return state;
  }
}
