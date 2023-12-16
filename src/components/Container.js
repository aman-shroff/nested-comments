import { CommentProvider } from '../contexts/CommentContext';
import CommentInput from './CommentInput';
import CommentList from './CommentList';
import CommentSorter from './CommentSorter';

export default function Container() {
    const handleReply = () => {
        console.log("User has posted a new Comment");
    }
    return (
        <CommentProvider>
            <CommentInput parentId={null} title="Comment" onPost={handleReply}/>
            <CommentSorter/>
            <CommentList parentId={null}/>
        </CommentProvider>
    )
}