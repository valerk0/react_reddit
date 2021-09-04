import React, { RefObject, useState } from "react";
import { IComment, useCommentsList } from "../../hooks/useCommentsList";
import { IPostData } from "../../store/posts/actions";

export interface ICardContext {
  post?: IPostData;
  commentsList?: IComment[];
  commentFormValue?: ICommentFormValue;
}

interface ICommentFormValue {
  value: string | undefined;
  onChange: (value: string) => void;
}

export const cardContext = React.createContext<ICardContext>({});

export function CardContextProvider({post, children }: { post: IPostData, children: React.ReactNode }) {
  const [commentsList] = useCommentsList(post.id || '');
  const [formVal, setFormVal] = useState<string | undefined>();

  return (
    <cardContext.Provider value={{
        post,
        commentsList,
        commentFormValue: {value: formVal, onChange: setFormVal},
      }} >
      {children}
    </cardContext.Provider>
  );
}
