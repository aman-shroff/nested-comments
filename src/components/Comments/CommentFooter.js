export default function CommentFooter({
    isInEditMode,
    hasReplyEnabled,
    setIsReplyModeEnabled,
    handleEditModeToggle,
    handleCancelEdit,
    handleCommentUpdate
}) {
    if(!isInEditMode) {
        return (
            <>
                {hasReplyEnabled && <button onClick={() => setIsReplyModeEnabled(prev => !prev)}>Reply</button>}
                <button onClick={handleEditModeToggle}>Edit</button>
            </>
        )
    }

    return (  
        <>
        <button 
            onClick={handleCancelEdit}
        >
            Cancel
        </button>
        <button onClick={handleCommentUpdate}>Update</button>
        </>
    )
}