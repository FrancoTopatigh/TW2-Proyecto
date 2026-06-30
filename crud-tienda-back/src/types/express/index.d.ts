declare global {
  namespace Express {
    interface Request {
      user?: {
        id: number;
        email: string;
        role: 'USER' | 'ADMIN'; //Uso role para validar el tipo de usuario
      };
    }
  }
}

export {};
