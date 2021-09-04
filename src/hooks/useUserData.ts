import { useEffect } from "react";
import { IRootState } from "../store/reducer";
import { useDispatch, useSelector } from "react-redux";
import { meRequestAsync } from "../store/me/actions";

export interface IUserData {
  name?: string;
  iconImg?: string;
}

export function useUserData() {
  const token = useSelector<IRootState, string>(state => state.token.token);
  const data = useSelector<IRootState, IUserData>(state => state.me.data);
  const loading = useSelector<IRootState, boolean>(state => state.me.loading);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!token) return;

    dispatch(meRequestAsync());
  }, [token]);

  return {data, loading};
}
