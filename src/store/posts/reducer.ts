import { Reducer } from "react";
import { IPostData, IPostsRequestLoadingAction, IPostsRequestErrorAction, IPostsRequestSuccessAction, IPostsLoadCounterAction, POSTS_REQUEST_ERROR, POSTS_REQUEST_SUCCESS, POSTS_LOAD_COUNTER, POSTS_REQUEST_LOADING, POSTS_SORT_BY, IPostsSortByAction } from "./actions";

export interface IPostsState {
  loading: boolean;
  error: string;
  data: IPostData[];
  after: string;
  loadCounter: number;
  sortBy: string;
}

export type PostsActions = IPostsRequestLoadingAction | IPostsRequestSuccessAction | IPostsRequestErrorAction | IPostsLoadCounterAction | IPostsSortByAction;
export const postsReducer: Reducer<IPostsState, PostsActions> = (state, action) => {
  switch (action.type) {
    case POSTS_REQUEST_LOADING:
      return {
        ...state,
        loading: true,
      };
    case POSTS_REQUEST_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.data,
        after: action.after,
      };
    case POSTS_REQUEST_ERROR:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case POSTS_LOAD_COUNTER:
      return {
        ...state,
        loadCounter: action.loadCounter,
      };
    case POSTS_SORT_BY:
      return {
        ...state,
        sortBy: action.sortBy,
        data: [],
        loadCounter: 1,
        after: '',
      };
    default:
      return state;
  }
}
