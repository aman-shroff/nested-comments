import { useState, useContext } from "react";

import { CommentContext } from '../../contexts/CommentContext';
import CommentList from "../CommentList";
import CommentInput from "../CommentInput";
import { formatDate } from '../../utils/date'
import CommentFooter from "./CommentFooter";

export default function Comment({comment, hasReplyEnabled}) {
    const [isInEditMode, setIsInEditMode ] = useState(false);
    const [isReplyModeEnabled, setIsReplyModeEnabled] = useState(false);
    const { updateCommentById, deleteCommentById } = useContext(CommentContext);
    const [commenTtext, setcommenTtext]  = useState(comment.comment);

    const handleEditModeToggle = () => {
        setIsInEditMode(prev => !prev);
    }


    const handleCommentUpdate = ()  => {
        updateCommentById(comment.id, commenTtext );
        setIsInEditMode(false);
    }

    const handleDeleteComment = () => {
        deleteCommentById(comment.id);
    }

    const handleReply = () => {
        setIsReplyModeEnabled(false);
    }

    return ( 
        <>
        <li className="comment" key={comment.id} >
            <div className="comment__header">
                <span className="comment__username">{comment.userName}</span>
                <span className="comment__date">{formatDate(comment.timestamp)}</span>
            </div>   
            <div className="comment__body"> 
                {!isInEditMode  && (
                    <>
                    <span>{commenTtext}</span>
                    <button onClick={handleDeleteComment} className="comment__trashcan">&#x1F5D1;</button>
                    </>
                )}   
                {isInEditMode && <textarea rows={3} value={commenTtext} onChange={
                    (e) => {
                        setcommenTtext(e.target.value);
                    }
                }/>}
            </div>    
            <div className="comment__footer">
                <CommentFooter  
                    isInEditMode={isInEditMode}
                    setIsReplyModeEnabled={setIsReplyModeEnabled}
                    handleEditModeToggle={handleEditModeToggle}
                    hasReplyEnabled={hasReplyEnabled}
                    handleCancelEdit={
                        () => {
                            handleEditModeToggle();
                            setcommenTtext(comment.comment);
                        }
                    }
                    handleCommentUpdate={handleCommentUpdate}
                />
            </div>
                  
        </li>
        {isReplyModeEnabled && (
            <CommentInput parentId={comment.id} onPost={handleReply}/>
        )}
        {<CommentList parentId={comment.id}/>}
        </>
    )
}