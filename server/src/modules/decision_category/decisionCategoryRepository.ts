import databaseClient from "../../../database/client";
import type { Result } from "../../../database/client";

class DecisionCategoryRepository {
  async create(decisionCategory: DecisionCategoryType) {
    const [result] = await databaseClient.query<Result>(
      "INSERT INTO decision_category (decision_id, category_id) VALUES (?, ?)",
      [decisionCategory.decision_id, decisionCategory.category_id],
    );
    return [result];
  }
}

export default new DecisionCategoryRepository();
