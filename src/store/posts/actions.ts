import axios from "axios";
import { Action, ActionCreator } from "redux";
import { ThunkAction } from "redux-thunk";
import { IRootState } from "../reducer";

export interface IPostData {
  title?: string;
  previewLink?: string;
  author?: string;
  timeCode?: number;
  score?: number;
  num_comments?: number;
  id?: string;
}

export const POSTS_REQUEST_LOADING = 'POSTS_REQUEST_LOADING';
export interface IPostsRequestLoadingAction {
  type: typeof POSTS_REQUEST_LOADING;
}

export const postsRequestLoading: ActionCreator<IPostsRequestLoadingAction> = () => ({
  type: POSTS_REQUEST_LOADING,
});

export const POSTS_REQUEST_SUCCESS = 'POSTS_REQUEST_SUCCESS';
export interface IPostsRequestSuccessAction {
  type: typeof POSTS_REQUEST_SUCCESS;
  after: string;
  data: IPostData[];
}

export const postsRequestSuccess: ActionCreator<IPostsRequestSuccessAction> = (after: string, data: IPostData[]) => ({
  type: POSTS_REQUEST_SUCCESS,
  after,
  data,
});

export const POSTS_REQUEST_ERROR = 'POSTS_REQUEST_ERROR';
export interface IPostsRequestErrorAction {
  type: typeof POSTS_REQUEST_ERROR;
  error: string;
}

export const postsRequestError: ActionCreator<IPostsRequestErrorAction> = (error: string) => ({
  type: POSTS_REQUEST_ERROR,
  error,
});

export const POSTS_LOAD_COUNTER = 'POSTS_LOAD_COUNTER';
export interface IPostsLoadCounterAction {
  type: typeof POSTS_LOAD_COUNTER;
  loadCounter: number;
}

export const postsLoadCounter: ActionCreator<IPostsLoadCounterAction> = (loadCounter: number) => ({
  type: POSTS_LOAD_COUNTER,
  loadCounter,
});

export const POSTS_SORT_BY = 'POSTS_SORT_BY';
export interface IPostsSortByAction {
  type: typeof POSTS_SORT_BY;
  sortBy: string;
}

export const postsSortBy: ActionCreator<IPostsSortByAction> = (sortBy: string) => ({
  type: POSTS_SORT_BY,
  sortBy,
});

export const postsRequestAsync = (): ThunkAction<void, IRootState, unknown, Action<string>> => (dispatch, getState) => {

  async function load() {
    try {
      const { data: {data: {after, children}} } = await axios.get(`https://oauth.reddit.com/${getState().posts.sortBy}`, {
        headers: { Authorization: `bearer ${getState().token.token}`},
        params: {limit: 10, after: getState().posts.after},
      });
      if (children && children[0]) {
        type post = typeof children[0];
        dispatch(postsRequestSuccess(after, getState().posts.data.concat(...children.map((child: post) => {
          return {
            title: child.data.title,
            previewLink: child.data.url,
            author: child.data.author,
            timeCode: child.data.created_utc,
            score: child.data.score,
            num_comments: child.data.num_comments,
            id: child.data.id,
          };
        }))));
      }
    } catch (error) {
      dispatch(postsRequestError(error.toString()));
    }
  }

  load();
};
