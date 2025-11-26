import { useState } from 'react';

interface ApiError {
  message: string;
  status?: number;
}

interface UseApiOptions {
  onSuccess?: (data: any) => void;
  onError?: (error: ApiError) => void;
}

export const useApi = <T>(
  apiFunction: (...args: any[]) => Promise<T>,
  options?: UseApiOptions
) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<ApiError | null>(null);

  const execute = async (...args: any[]) => {
    try {
      setLoading(true);
      setError(null);
      
      const result = await apiFunction(...args);
      
      setData(result);
      
      if (options?.onSuccess) {
        options.onSuccess(result);
      }
      
      return result;
    } catch (err: any) {
      const apiError: ApiError = {
        message: err.message || 'An error occurred',
        status: err.status,
      };
      
      setError(apiError);
      
      if (options?.onError) {
        options.onError(apiError);
      }
      
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setData(null);
    setError(null);
    setLoading(false);
  };

  return {
    data,
    loading,
    error,
    execute,
    reset,
  };
};
