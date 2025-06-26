export type AuthCredentials = {
  email: string;
  password: string;
};

export type AuthResponse = {
  user: {
    id: string;
    email: string;
    role: 'vendor' | 'admin';
  };
  token: string;
};

export type LoginError = {
  message: string;
  field?: string;
};
