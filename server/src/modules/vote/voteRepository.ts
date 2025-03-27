import DatabaseClient from "../../../database/client";
import type { Result, Rows } from "../../../database/client";

class VoteRepository {
  async create(vote: Omit<VoteType, "id">) {
    const [result] = await DatabaseClient.query<Result>(
      " INSERT INTO vote (decision_id, state, user_id) VALUES (?,?,?)",
      [vote.decision_id, vote.state, vote.user_id],
    );
    return result.insertId;
  }

  // READ vote
  async read(voteData: VoteDecisionType) {
    const [rows] = await DatabaseClient.query<Rows>(
      `SELECT vote.*, user.firstname, user.lastname, decision.id 
        FROM vote
        JOIN user ON user.id=vote.user_id 
        JOIN decision ON decision_id = vote.decision_id
        WHERE vote.decision_id = ? 
        AND vote.user_id = ?`,
      [voteData.decision_id, voteData.user_id],
    );
    if (rows.length === 0) return null;
    return rows[0] as VoteType;
  }

  // READ vote For
  async readAllFor(decisionId: number) {
    const [rows] = await DatabaseClient.query<Rows>(
      "SELECT COUNT(*) AS VoteFor FROM vote WHERE decision_id = ? AND state = 1",
      [decisionId],
    );
    return rows;
  }

  // READ vote Against
  async readAllAgainst(decisionId: number) {
    const [rows] = await DatabaseClient.query<Rows>(
      "SELECT COUNT(*) AS VoteAgainst FROM vote WHERE decision_id = ? AND state = 0",
      [decisionId],
    );
    return rows;
  }

  //UPDATE vote
  async update(vote: Omit<VoteType, "id">) {
    const [result] = await DatabaseClient.query<Result>(
      "UPDATE vote SET state = ? WHERE decision_id = ? AND user_id = ?",
      [vote.state, vote.decision_id, vote.user_id],
    );
    return result.affectedRows;
  }
}

export default new VoteRepository();
