export const BCRYPT_SALT_ROUNDS = (() => {
  const value = process.env.BCRYPT_SALT_ROUNDS;
  const rounds = parseInt(value ?? '10', 10);
  if (isNaN(rounds) || rounds < 4 || rounds > 31) {
    console.warn(`BCRYPT_SALT_ROUNDS inválido (${value}). Usando 10.`);
    return 10;
  }
  return rounds;
})();