export const JWT_SECRET = process.env.JWT_SECRET || 'default-secret';
export const JWT_EXPIRES_IN = parseInt(process.env.JWT_EXPIRES_IN ?? '3600', 10);
