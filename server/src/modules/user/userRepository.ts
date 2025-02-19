import databaseClient from "../../../database/client";
import type { Result, Rows } from "../../../database/client";

class UserRepository {
  async create(user: NewUserType) {
    const [result] = await databaseClient.query<Result>(
      "INSERT INTO user (firstname, lastname, email, hash_password, avatar, country_id) VALUES (?, ?, ?, ?, ?, ?)",
      [
        user.firstname,
        user.lastname,
        user.email,
        user.hash_password,
        user.avatar,
        user.country_id,
      ],
    );
    return [result];
  }

  async read(id: number) {
    const [rows] = await databaseClient.query<Rows>(
      "SELECT * FROM user WHERE id = ?",
      [id],
    );
    return rows[0] as UserType;
  }

  async readAll() {
    const [rows] = await databaseClient.query<Rows>("SELECT * FROM user");
    return rows as UserType[];
  }

  async update(user: UpdatedUserType) {
    const [result] = await databaseClient.query<Result>(
      "UPDATE user SET firstname = ?, lastname = ?, email = ?, hash_password = ?, avatar = ? WHERE id = ?",
      [
        user.firstname,
        user.lastname,
        user.email,
        user.hash_password,
        user.avatar,
        user.id,
      ],
    );
    return result.affectedRows;
  }

  async delete(id: number) {
    const [result] = await databaseClient.query<Result>(
      "DELETE FROM user WHERE id = ?",
      [id],
    );
    return result.affectedRows;
  }

  async readAllApplicant() {
    const [rows] = await databaseClient.query<Rows>(`SELECT user.*, role.label FROM user
      JOIN role ON user.role_id = role.id 
      WHERE role.label = "applicant"`);
    return rows as UserType[];
  }

  async readAllAccepted() {
    const [rows] = await databaseClient.query<Rows>(`SELECT user.*, role.label FROM user
      JOIN role ON user.role_id = role.id 
      WHERE role.label = "user"`);
    return rows as UserType[];
  }

  async updateApplicant(userId: number) {
    const [result] = await databaseClient.query<Result>(
      "UPDATE user SET role_id=2 WHERE id = ?",
      [userId],
    );
    return result.affectedRows;
  }

  async checkUniqueEmail(userEmail: string) {
    const [rows] = await databaseClient.query<Rows>(
      "SELECT * FROM user WHERE email= ?",
      [userEmail],
    );
    return rows as UserType[];
  }

  async readByEmail(email: string): Promise<UserType | null> {
    const [user] = await databaseClient.query<Rows>(
      "SELECT * FROM user WHERE email = ?",
      [email],
    );

    const result = user as UserType[];
    return result.length > 0 ? result[0] : null;
  }

  async readByEmailForComment(
    email: string,
  ): Promise<{ user_id: number } | null> {
    const [user] = await databaseClient.query<Rows>(
      "SELECT id AS user_id FROM user WHERE email = ?",
      [email],
    );

    const result = user as { user_id: number }[];
    return result[0];
  }
}

export default new UserRepository();
