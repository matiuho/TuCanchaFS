// Valida que el texto tenga un formato básico de correo electrónico
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim());
};

// Valida que una contraseña cumpla reglas mínimas de seguridad
// - Largo mínimo de 6 caracteres
// - Al menos una letra mayúscula
// - Al menos una letra minúscula
export const isValidPassword = (password: string): { valid: boolean; message?: string } => {
  if (password.length < 6) {
    return {
      valid: false,
      message: 'La contraseña debe tener al menos 6 caracteres.',
    };
  }

  if (!/[A-Z]/.test(password)) {
    return {
      valid: false,
      message: 'La contraseña debe contener al menos una letra mayúscula.',
    };
  }

  if (!/[a-z]/.test(password)) {
    return {
      valid: false,
      message: 'La contraseña debe contener al menos una letra minúscula.',
    };
  }

  return { valid: true };
};

// Valida un número de tarjeta de crédito usando:
// - Largo entre 13 y 19 dígitos
// - Tarjetas de prueba permitidas
// - Algoritmo de Luhn para tarjetas reales
export const isValidCardNumber = (cardNumber: string): boolean => {
  const cleaned = cardNumber.replace(/[\s-]/g, '');

  if (!/^\d{13,19}$/.test(cleaned)) {
    return false;
  }

  const testCards = ['1234123412341234', '4111111111111111'];
  if (testCards.includes(cleaned)) {
    return true;
  }

  // Implementación compacta del algoritmo de Luhn
  const digits = cleaned.split('').reverse().map(Number);
  const sum = digits.reduce((acum, digit, index) => {
    if (index % 2 === 1) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }
    return acum + digit;
  }, 0);

  return sum % 10 === 0;
};

// Valida que una fecha (en formato string) no sea anterior a hoy
export const isValidFutureDate = (dateString: string): boolean => {
  const selectedDate = new Date(dateString);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  return selectedDate >= today;
};

// Valida que una hora tenga formato HH:MM en reloj de 24 horas
export const isValidTimeFormat = (time: string): boolean => {
  const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;
  return timeRegex.test(time);
};

// Valida que un teléfono tenga al menos 8 caracteres permitidos (dígitos, espacios y símbolos comunes)
export const isValidPhone = (phone: string): boolean => {
  const phoneRegex = /^[\d\s\-\+\(\)]{8,}$/;
  return phoneRegex.test(phone);
};

// Limpia un string: quita espacios sobrantes y remueve etiquetas/ángulos HTML
export const sanitizeString = (input: string): string => {
  return input
    .trim()
    .replace(/<[^>]*>/g, '')
    .replace(/[<>]/g, '');
};

// Valida que un campo requerido tenga algún valor "no vacío"
// - Para strings: que no sea cadena vacía ni solo espacios
// - Para otros tipos: que no sea null ni undefined
export const isRequired = (value: any): boolean => {
  if (typeof value === 'string') {
    return value.trim().length > 0;
  }
  return value !== null && value !== undefined;
};

// Verifica que un string represente un número entero o decimal
export const isNumeric = (value: string): boolean => {
  return /^\d+(\.\d+)?$/.test(value);
};

// Verifica que un número sea estrictamente mayor que cero
export const isPositiveNumber = (value: number): boolean => {
  return value > 0;
};
