import {
  isValidEmail,
  isValidPassword,
  isValidCardNumber,
  isValidFutureDate,
  isValidTimeFormat,
  isValidPhone,
  sanitizeString,
  isRequired,
  isNumeric,
  isPositiveNumber,
} from './validation';

// Pruebas unitarias simples para las funciones de validación del FrontEnd
describe('validation utils', () => {
  // ---- Email ----
  // Prueba que isValidEmail detecte emails válidos e inválidos
  test('isValidEmail valida formatos básicos', () => {
    expect(isValidEmail('test@example.com')).toBe(true);
    expect(isValidEmail('  test@example.com  ')).toBe(true);
    expect(isValidEmail('bad-email')).toBe(false);
  });

  // ---- Password ----
  // Verifica que se cumplan las reglas de longitud y mezcla de mayúsculas/minúsculas
  test('isValidPassword exige largo y mayúsculas/minúsculas', () => {
    expect(isValidPassword('Aa1234').valid).toBe(true); // cumple todas las reglas
    expect(isValidPassword('abc').valid).toBe(false);   // muy corta
    expect(isValidPassword('abcdef').valid).toBe(false); // sin mayúsculas
    expect(isValidPassword('ABCDEF').valid).toBe(false); // sin minúsculas
  });

  // ---- Número de tarjeta ----
  // Acepta tarjetas de prueba y tarjetas válidas por Luhn
  test('isValidCardNumber acepta tarjetas de prueba y Luhn', () => {
    expect(isValidCardNumber('1234123412341234')).toBe(true);      // tarjeta de prueba
    expect(isValidCardNumber('4111 1111 1111 1111')).toBe(true);   //  válida
    expect(isValidCardNumber('1234')).toBe(false);                 // demasiado corta
  });

  // ---- Fecha futura ----
  // Compara una fecha claramente futura contra una claramente pasada
  test('isValidFutureDate solo acepta fechas futuras claras frente a una pasada', () => {
    expect(isValidFutureDate('2999-12-31')).toBe(true);
    expect(isValidFutureDate('1900-01-01')).toBe(false);
  });

  // ---- Hora (formato HH:MM 24h) ----
  test('isValidTimeFormat valida HH:MM en 24h', () => {
    expect(isValidTimeFormat('00:00')).toBe(true);
    expect(isValidTimeFormat('23:59')).toBe(true);
    expect(isValidTimeFormat('24:00')).toBe(false);
    expect(isValidTimeFormat('aa:bb')).toBe(false);
  });

  // ---- Teléfono básico ----
  test('isValidPhone acepta números básicos', () => {
    expect(isValidPhone('12345678')).toBe(true);
    expect(isValidPhone('+56 9 1234 5678')).toBe(true);
    expect(isValidPhone('123')).toBe(false);
  });

  // ---- Sanitización de strings ----
  // Debe eliminar etiquetas HTML y espacios sobrantes
  test('sanitizeString elimina etiquetas HTML y espacios extra', () => {
    const entrada = '  <b>Hola</b> <script>alert(1)</script>  ';
    const salidaEsperada = 'Hola alert(1)';

    expect(sanitizeString(entrada)).toBe(salidaEsperada);
  });

  // ---- Campo requerido ----
  test('isRequired funciona con strings y otros tipos', () => {
    expect(isRequired('texto')).toBe(true);
    expect(isRequired('   ')).toBe(false);
    expect(isRequired(0)).toBe(true);
    expect(isRequired(null)).toBe(false);
    expect(isRequired(undefined)).toBe(false);
  });

  // ---- Numérico ----
  test('isNumeric reconoce números enteros y decimales', () => {
    expect(isNumeric('123')).toBe(true);
    expect(isNumeric('123.45')).toBe(true);
    expect(isNumeric('abc')).toBe(false);
  });

  // ---- Número positivo ----
  test('isPositiveNumber verifica que sea mayor que cero', () => {
    expect(isPositiveNumber(1)).toBe(true);
    expect(isPositiveNumber(0)).toBe(false);
    expect(isPositiveNumber(-1)).toBe(false);
  });
});

