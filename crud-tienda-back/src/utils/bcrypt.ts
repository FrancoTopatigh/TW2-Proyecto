import bcrypt from 'bcrypt';
import { config } from '../config/config.js';

export const encrypt = async (miPassword: string) => {
    const hash = await bcrypt.hash(miPassword, config.bcrypt_salt);
    return hash;
};

export const compare = async(passwordLogin: string,hashPassword:string)=>{
    return await bcrypt.compare(passwordLogin,hashPassword);
}