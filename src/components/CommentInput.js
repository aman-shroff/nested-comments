import { useState, useContext } from "react"

import { CommentContext } from '../contexts/CommentContext';

export default function CommentInput({parentId, onPost}) {
    const { addCommentsByparentId } = useContext(CommentContext);
    const [ userName, setUserName ] = useState('');
    const [ comment, setComment ] = useState('');

    const handlePost = () => {
        if (userName && comment) {
          addCommentsByparentId(parentId, { userName, comment });
          setUserName('');
          setComment('');
          if(onPost) {
            onPost(true);
          }
        }
    };
    
    return (
        <div className={parentId !== null && "left-padding"}>
         <div className="comment-container">
            <div className="comment-container__header">
                <span className="comment-container__title">Comment</span>
            </div>
            <div className="comment-container__body">
                <input
                    name="username"
                    aria-label="username"
                    placeholder="User Name"
                    type="text"
                    className="field"
                    minLength={1}
                    value={userName}
                    onChange={(e)=> {
                        setUserName(e.target.value)
                    }}
                />
                <textarea 
                    aria-label="comment"
                    name="comment"
                    rows={4}
                    className="field"
                    value={comment}
                    onChange={(e) => {
                        setComment(e.target.value)
                    }}
                />  
            </div>
            <div className="comment-container__footer">
                <button 
                    onClick={handlePost}
                    className="postBtn"
                    disabled={!userName || !comment}
                >
                    Post
                </button>    
            </div>
         </div>
        </div>
    )
}
