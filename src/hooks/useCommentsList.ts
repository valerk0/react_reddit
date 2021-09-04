import { useEffect, useState } from "react";
import axios from "axios";
import { IRootState } from "../store/reducer";
import { useSelector } from "react-redux";

export interface IComment {
  author?: string;
  body?: string;
  created?: number;
  id?: string;
  parent_id?: string;
}

export function useCommentsList(postId: string) {
  const token = useSelector<IRootState, string>(state => state.token.token);
  const [commentsData, setCommentsData] = useState<IComment[]>([{}]);

  useEffect(() => {
    axios.get(`https://oauth.reddit.com/comments/${postId}`, {
      headers: { Authorization: `bearer ${token}`}
    })
      .then((resp) => {
        const commentsData = resp.data;
        const commentsChildren = commentsData[1].data.children;
        type childType = typeof commentsChildren[0];
        const commentsList = commentsChildren.map((child: childType) => {
          return {
            author: child.data.author,
            body: child.data.body,
            created: child.data.created,
            id: child.data.id,
            parent_id: child.data.parent_id,
          }
        });
        setCommentsData(commentsList);
      })
      .catch(console.log);
  }, [token]);

  return [commentsData];
}
