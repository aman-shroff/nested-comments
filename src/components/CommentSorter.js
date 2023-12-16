import { useContext } from "react";
import { CommentContext } from '../contexts/CommentContext';

export default function CommentSorter() {
    const { isSortedAsc, handleSortChange } = useContext(CommentContext);

    return (
        <div className="comment-sorter">
            <span>Sort By: Date & Time</span>
            {isSortedAsc && (
                <button
                    className="comment-sorter__downward"
                    onClick={()=> {
                        handleSortChange(true)
                    }}
                >
                        &darr;
                    </button>
                )
            }
            {!isSortedAsc && (
                <button 
                    className="comment-sorter__upward"
                    onClick={()=> {
                    handleSortChange(false)
                    }}
                >   
                    &uarr;
                </button>
            )}
        </div>
    )
} 