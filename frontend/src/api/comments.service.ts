/* eslint-disable @typescript-eslint/no-explicit-any */
import api from "./api";

const endpoint = "/comments";

class CommentsService {
  async replyToComment(commentId: string, content: string): Promise<void> {
    await api.post<any[]>(`${endpoint}/${encodeURIComponent(commentId)}/reply`, { content });
  }
}

export default new CommentsService();