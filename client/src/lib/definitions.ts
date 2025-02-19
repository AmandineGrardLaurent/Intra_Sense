// user
type UserType = {
  id: number;
  content: string;
  firstname: string;
  lastname: string;
};

type FormValues = {
  firstname: string;
  lastname: string;
  email: string;
  hash_password: string;
  confirmed_password: string;
  avatar: string;
  country_id: number;
};

type UserListType = {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  hash_password: string;
  avatar: string;
  country_id: number;
  role_id: number;
  created_at: Date;
  updated_at: Date;
  label: string;
};

// decision

type DecisionDetailType = {
  id: number;
  title: string;
  min_date: Date;
  max_date: Date;
  description: string;
  context: string;
  profit: string;
  risk: string;
  step: string;
  country: string;
  lastname: string;
  firstname: string;
};

type DataFormDecisionType = {
  id: number;
  title: string;
  country_id: string;
  description: string;
  context: string;
  profit: string;
  risk: string;
  min_date: Date;
  max_date: Date;
  category_id: string;
  user_animator_id: number;
  user_expert_id: number;
  user_impacted_id: number;
};

// country

type CountryType = {
  id: number;
  label: string;
};

// category

type FormValuesCategory = {
  id: number;
  label: string;
};

type CategoryFormData = {
  id: number;
  label: string;
};

type CategoryType = {
  id: number;
  label: string;
  color: string;
};
// comment

type CommentType = {
  content: string;
  firstname: string;
  lastname: string;
};

// profil

type ProfileFormValues = {
  firstname: string;
  lastname: string;
  email: string;
  avatar?: string;
  hash_password: string;
  confirmed_password: string;
};

type UpdateFormValues = {
  firstname?: string;
  lastname?: string;
  email?: string;
  avatar?: string;
  new_password?: string;
  confirmed_password?: string;
  country_id: number;
  role_id: number;
};

type Decision = {
  Id: number;
  ProfilePicture: string;
  UserName: string;
  UserFirstname: string;
  DecisionTitle: string;
  DecisionCategory: string;
};

type DecisionDetailCard = {
  id: number;
  title: string;
  min_date: Date;
  max_date: Date;
  description: string;
  context: string;
  profit: string;
  risk: string;
  step: string;
  country: string;
  lastname: string;
  firstname: string;
  avatar: string;
};

type DataUserType = {
  avatar: string;
  country_id: number;
  decision_id: number;
  email: string;
  firstname: string;
  hash_password: string;
  id: number;
  lastname: string;
  role: string;
  role_id: number;
  user_id: number;
};
