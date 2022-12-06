import { uuid } from "./uuid";

export interface AddCommentRequest {
    content: string,
    blogPostId: uuid
}