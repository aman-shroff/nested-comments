import { useContext } from "react"

import { CommentContext } from '../contexts/CommentContext';
import Comment  from "./Comments/Comments"; 

export default function CommentList({parentId}) {
    const { getCommentByParentID } = useContext(CommentContext);
    const comments = getCommentByParentID(parentId)
    if(comments.length === 0) {
        return null;
    }

    return (
        <ul className={["comments-list" ,  parentId === null && "no-padding-left"].filter(Boolean).join(' ')}>
            {comments.map(comment => {
                return ( 
                    <Comment
                        key={comment.id}
                        comment={comment}
                        parentId={null}
                        hasReplyEnabled={parentId === null}
                    />
                )
            })}
        </ul>
    )
}