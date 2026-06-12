export class Usuario {
  id!: number;
  email!: string;
  contrasena!: string;
  nombre!: string;
  apellido!: string;
  direccion!: string;
  role!: 'USER' | 'ADMIN';
  
}
