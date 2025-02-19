import databaseClient from "../../../database/client";
import type { Result, Rows } from "../../../database/client";

class CommentRepository {
  async create(comment: CommentType) {
    const [result] = await databaseClient.query<Result>(
      "INSERT INTO comment(content, user_id, decision_id) VALUES (?,?,?)",
      [comment.content, comment.user_id, comment.decision_id],
    );

    return result.insertId;
  }

  async readAllComments(decisionId: number) {
    const [rows] = await databaseClient.query<Rows>(
      `SELECT comment.content, user.firstname, user.lastname, decision.id 
      FROM comment
      JOIN user ON comment.user_id = user.id
      JOIN decision ON comment.decision_id = decision.id
      WHERE decision_id=?`,
      [decisionId],
    );
    return rows;
  }
}

export default new CommentRepository();
