import React from "react";
import { Comment } from "domain/comment";
import { observer } from "mobx-react-lite";
import { CommentComponent } from "../comment";

interface IProps {
  level: number;
  parent: string;
  comments: Comment[];
}

export const CommentsThread: React.FC<IProps> = observer(({ level, parent, comments }) => {
  const rootComments = comments.filter(comment => comment.replyTo === parent);

  console.log(level, rootComments);

  return (
    <div style={{ marginLeft: level === 0 ? 0 : 50 }}>
      {rootComments.map(rootComment => (
        <>
          <CommentComponent comment={rootComment}/>
          <CommentsThread key={rootComment.id} level={level + 1} parent={rootComment.id} comments={comments}/>
        </>
      ))}
    </div>
  );
});