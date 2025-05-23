// user
type UserType = {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  hash_password: string;
  avatar: string;
  created_at: number;
  updated_at: number;
  country_id: number;
  role_id: number;
};

type UpdatedUserType = {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  hash_password: string;
  avatar: string;
};

type NewUserType = {
  firstname: string;
  lastname: string;
  email: string;
  hash_password: string;
  avatar: string;
  country_id: number;
};

// country
type Country = {
  id: number;
  label: string;
};

// category
type Category = {
  id: number;
  label: string;
  color: string;
};

// vote
type VoteType = {
  id: number;
  state: boolean;
  user_id: number;
  decision_id: number;
};

type VoteDecisionType = {
  user_id: number;
  decision_id: number;
};

// comment
type CommentType = {
  content: string;
  user_id: number;
  decision_id: number;
};

// token
type DecodedTokenType = {
  email: string;
  iat: number;
  exp: number;
};

type PayloadType = {
  email: string;
  iat: number;
  exp: number;
};

// decision

type Decision = {
  title: string;
  country_id: number;
  description: string;
  max_date: Date;
  min_date: Date;
  context: string;
  profit: string;
  risk: string;
  user_id: number;
};

type DecisionCard = {
  title: string;
  firstname: string;
  lastname: string;
  category: string;
  country: string;
};

type DecisionCategoryType = {
  decision_id: number;
  category_id: number;
};
