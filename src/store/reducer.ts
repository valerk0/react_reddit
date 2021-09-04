import { Reducer, ActionCreator, AnyAction } from "redux";
import { ME_REQUEST, ME_REQUEST_ERROR, ME_REQUEST_SUCCESS } from "./me/actions";
import { IMeState, MeActions, meReducer } from "./me/reducer";
import { POSTS_LOAD_COUNTER, POSTS_REQUEST_LOADING, POSTS_REQUEST_ERROR, POSTS_REQUEST_SUCCESS, POSTS_SORT_BY } from "./posts/actions";
import { IPostsState, postsReducer } from "./posts/reducer";
import { GET_TOKEN, GET_TOKEN_ERROR, GET_TOKEN_SUCCESS } from "./token/actions";
import { ITokenState, tokenReducer } from "./token/reducer";

export interface IRootState {
  commentText: string;
  me: IMeState;
  token: ITokenState;
  posts: IPostsState;
}

const initialState: IRootState = {
  commentText: 'Hi',
  me: {
    loading: false,
    error: '',
    data: {},
  },
  token: {
    loading: false,
    error: '',
    token: '',
  },
  posts: {
    loading: false,
    error: '',
    data: [],
    after: '',
    loadCounter: 1,
    sortBy: 'best'
  },
};

interface IUpdateCommentAction {
  type: string;
  text: string;
}
const UPDATE_COMMENT = 'UPDATE_COMMENT';

export const updateComment: ActionCreator<IUpdateCommentAction> = (text) => ({
  type: UPDATE_COMMENT,
  text,
});

interface ISetTokenAction {
  type: string;
  text: string;
}

export const rootReducer: Reducer<IRootState, AnyAction> = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_COMMENT:
      return {
        ...state,
        commentText: action.text,
      };
    case ME_REQUEST:
    case ME_REQUEST_SUCCESS:
    case ME_REQUEST_ERROR:
      return {
        ...state,
        me: meReducer(state.me, action),
      };
    case GET_TOKEN:
    case GET_TOKEN_SUCCESS:
    case GET_TOKEN_ERROR:
      return {
        ...state,
        token: tokenReducer(state.token, action),
      };
    case POSTS_REQUEST_LOADING:
    case POSTS_REQUEST_SUCCESS:
    case POSTS_REQUEST_ERROR:
    case POSTS_LOAD_COUNTER:
    case POSTS_SORT_BY:
      return {
        ...state,
        posts: postsReducer(state.posts, action),
      };
    default:
      return state;
  }
};
