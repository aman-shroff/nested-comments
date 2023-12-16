import React, { createContext, useCallback, useEffect, useState } from "react";
import { v4 as uuid } from 'uuid'

export const CommentContext = createContext({
    comments: []
})

const COMMENTS_KEY = 'comments';
const IS_ASC_SORTED_KEY = "isAscSorted";

export function CommentProvider({ children }) {
    const [comments, setComments] = useState([]);
    const [isSortedAsc, setIsSortedAsc] = useState(false);

    const handleSortChange = (order) => {
        setIsSortedAsc(!order);
        handleCommentSorting(comments, !order);
    }


    const handleCommentSorting = useCallback((storedComment, order = false) => {
        const sortItems = (obj) => {
            if(obj.length === 0) {
                return []
            }
            const updatedObj = [];
            for(let index = 0; index < obj.length; index++) {
                const comment = obj[index];
                const updatedItems = sortItems(comment.items);
                updatedObj.push({
                    ...comment,
                    items: updatedItems
                })
            }
            if(order) {
                updatedObj.sort((a, b)=> {
                    return new Date(a.timestamp) - new Date(b.timestamp) 
                })
            } else {
                updatedObj.sort((a, b)=> {
                    return new Date(b.timestamp) - new Date(a.timestamp) 
                })
            }
            return updatedObj;
        }

        const updatedComment = sortItems(storedComment);
        setComments(updatedComment);

    },[]);

    useEffect(() => {
        const val = localStorage.getItem(COMMENTS_KEY);
        const order = localStorage.getItem(IS_ASC_SORTED_KEY);
        if (val) {
            const storedComment = JSON.parse(val);
            setIsSortedAsc(order || false);
            handleCommentSorting(storedComment, order);
        } else {
            setComments([]);
        }
    }, [handleCommentSorting]);

    const addCommentsByparentId = (parentID, inputs) => {
        const { userName, comment } = inputs;
        const newUserObj =  {
            id: uuid(),
            timestamp: Date.now(),
            userName,
            comment,
            items: [],
            parentID
        }

        if(parentID === null) {
            const updated = comments.slice(0);
            if(isSortedAsc) {
                updated.push(newUserObj);
            }
            else {
                updated.unshift(newUserObj);
            }
            
            setComments(updated);
            return ;
        }
        const updateComment = (node) => {
            if (Array.isArray(node)) {
                return node.map(n => {
                    const { items, id } = n;
                    if (id === parentID) {
                        let nested = items.slice(0);
                        if(isSortedAsc) {
                            nested.unshift(newUserObj)
                        }
                        else {
                            nested.push(newUserObj)
                        }
                        return {
                            ...n,
                            items: nested
                        }
                    }
                    return {
                        ...n,
                        items: updateComment(items)
                    }
                })
            }
            return node;
        }

        const updated = updateComment(comments);
        setComments(updated);
    }

    const deleteCommentById = (commentId) => {
        const deleteComment = (obj) => {
            let res = [];
            for (let index = 0; index < obj.length; index++) {
                const { items, id } = obj[index];
                if (id === commentId) {
                    continue;
                }
                else if (items.length === 0) {
                    res.push({ ...obj[index], items: [] });
                }
                else {
                    let updatedItems = deleteComment(items);
                    res.push({ ...obj[index], items: updatedItems });
                }

            }
            return res;
        }
        setComments(deleteComment(comments));
    }

    const updateCommentById = (commentId, updatedComment) => {
        const updateComment = (obj) => {
            let res = [];
            for (let index = 0; index < obj.length; index++) {
                const { items, id } = obj[index];
                if (id === commentId) {
                    res.push({ 
                        ...obj[index],
                        comment: updatedComment,
                    });
                    
                }
                else if (items.length === 0) {
                    res.push({ ...obj[index], items: [] });
                }
                else {
                    let updatedItems = updateComment(items);
                    res.push({ ...obj[index], items: updatedItems });
                }

            }
            return res;
        }
        setComments(updateComment(comments));
    }

    const getCommentByParentID = (parentId) => {
        if (parentId === null) {
            return comments;
        }
        const findComments = (obj) => {
            for (let index = 0; index < obj.length; index++) {
                const { items, id } = obj[index];
                if (parentId === id) {
                    return items;
                }
                const i = findComments(items);
                if (i !== null) {
                    return i;
                }
            }
            return null;
        }
        return findComments(comments) || [];
    }

    useEffect(() => {
        if(comments.length > 0){
            localStorage.setItem(COMMENTS_KEY, JSON.stringify(comments));
            localStorage.setItem(isSortedAsc, JSON.stringify(IS_ASC_SORTED_KEY))
        }
    }, [comments,isSortedAsc]);

    return (
        <CommentContext.Provider value={
            {
                comments,
                getCommentByParentID,
                updateCommentById,
                addCommentsByparentId,
                deleteCommentById,
                handleSortChange,
                isSortedAsc
            }
        }>
            {children}
        </CommentContext.Provider>
    )
}

export default CommentProvider;
