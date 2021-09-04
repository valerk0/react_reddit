import { RefObject, useEffect } from "react";
import { IRootState } from "../store/reducer";
import { useDispatch, useSelector } from "react-redux";
import { postsLoadCounter, postsRequestAsync, postsRequestLoading } from "../store/posts/actions";
import { IPostsState } from "../store/posts/reducer";

export function usePostsData(bottomListRef: RefObject<HTMLDivElement>) {
  const token = useSelector<IRootState, string>(state => state.token.token);
  const { data, loading, error, after, loadCounter, sortBy } = useSelector<IRootState, IPostsState>(state => state.posts);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!token) return;

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !loading && loadCounter % 3 !== 0) {
        dispatch(postsRequestLoading());
        dispatch(postsLoadCounter(loadCounter + 1));
        dispatch(postsRequestAsync());
      }
    }, {
      rootMargin: '10px'
    });

    if (bottomListRef.current) {
      observer.observe(bottomListRef.current);
    }

    return () => {
      if (bottomListRef.current) {
        observer.unobserve(bottomListRef.current);
      }
    }

  }, [token, bottomListRef.current, after, loadCounter, sortBy]);

  return { data, loading, error };
}
