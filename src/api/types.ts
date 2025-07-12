export interface User {
  id: string;
  name: string;
  email: string;
  created_at: string;
  full_name: string;
  location: string;
  bio: string;
  password: string;
}

export interface UserSession {
  userId: string;
  email: string;
}
