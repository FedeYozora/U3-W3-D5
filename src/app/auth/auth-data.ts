export interface AuthData {
  accessToken: string;
  user: {
    id: number;
    username: string;
    email: string;
    nome: string;
    cognome: string;
  };
}
