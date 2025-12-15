export interface ApiError {
  message: string;
  status?: number;
  code?: string;
}

export const handleApiError = (error: any): ApiError => {
  if (!error.response) {
    return {
      message: 'No se puede conectar con el servidor. Verifica que los servicios estén ejecutándose.',
      code: 'NETWORK_ERROR',
    };
  }

  const status = error.response.status;
  const data = error.response.data;
  switch (status) {
    case 400:
      return {
        message: data?.message || 'Solicitud inválida. Verifica los datos enviados.',
        status,
        code: 'BAD_REQUEST',
      };

    case 401:
      return {
        message: 'Sesión expirada. Por favor, inicia sesión nuevamente.',
        status,
        code: 'UNAUTHORIZED',
      };

    case 403:
      return {
        message: 'No tienes permisos para realizar esta acción.',
        status,
        code: 'FORBIDDEN',
      };

    case 404:
      return {
        message: 'Recurso no encontrado.',
        status,
        code: 'NOT_FOUND',
      };

    case 409:
      return {
        message: data?.message || 'El recurso ya existe.',
        status,
        code: 'CONFLICT',
      };

    case 500:
      return {
        message: 'Error interno del servidor. Intenta nuevamente más tarde.',
        status,
        code: 'SERVER_ERROR',
      };

    case 503:
      return {
        message: 'Servicio no disponible temporalmente. Intenta nuevamente más tarde.',
        status,
        code: 'SERVICE_UNAVAILABLE',
      };

    default:
      return {
        message: data?.message || 'Ocurrió un error inesperado.',
        status,
        code: 'UNKNOWN_ERROR',
      };
  }
};

export const isNetworkError = (error: ApiError): boolean => {
  return error.code === 'NETWORK_ERROR';
};

export const isAuthError = (error: ApiError): boolean => {
  return error.status === 401;
};

export const isForbiddenError = (error: ApiError): boolean => {
  return error.status === 403;
};

export const logError = (context: string, error: any): void => {
  if (import.meta.env.DEV) {
    console.group(`❌ API Error - ${context}`);
    console.error('Error:', error);
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Data:', error.response.data);
    }
    console.groupEnd();
  }
};
