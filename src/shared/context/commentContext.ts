import React from "react";

interface ICommentContext {
  value: string;
  onChange: (value: string) => void;
}

export const commentContext = React.createContext<ICommentContext>({
  value: '',
  onChange: () => {},
});
