export type LoginErrors = Partial<Record<'email' | 'password', string>>;

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateLogin(email: string, password: string): LoginErrors {
  const errors: LoginErrors = {};

  if (!email.trim()) {
    errors.email = 'Informe seu e-mail.';
  } else if (!emailPattern.test(email.trim())) {
    errors.email = 'Digite um e-mail válido.';
  }

  if (!password) {
    errors.password = 'Informe sua senha.';
  } else if (password.length < 6) {
    errors.password = 'A senha precisa ter pelo menos 6 caracteres.';
  }

  return errors;
}
