import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { IRootState } from "../store/reducer";

interface IAuthorData {
  name?: string;
  iconImg?: string;
}

export function useAuthorData(username: string) {
  const token = useSelector<IRootState, string>(state => state.token.token);
  const [data, setData] = useState<IAuthorData>({});

  useEffect(() => {
    axios.get(`https://oauth.reddit.com/user/${username}/about`, {
      headers: { Authorization: `bearer ${token}`}
    })
      .then((resp) => {
        const authorData = resp.data;
        setData({ name: authorData.data.name, iconImg: authorData.data.icon_img });
      })
      .catch(console.log);
  }, [token]);

  return [data];
}
