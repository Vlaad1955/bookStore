import { getComments } from "@/features/comments/api/comments";
import ClientCommentsSection from "./ClientCommentsSection";

interface CommentsServerProps {
  bookId: string;
}

const CommentsServer = async ({ bookId }: CommentsServerProps) => {
  const data = await getComments({ book_id: bookId });
  const comments = data.entities || [];

  return <ClientCommentsSection comments={comments} bookId={bookId} />;
};

export default CommentsServer;
