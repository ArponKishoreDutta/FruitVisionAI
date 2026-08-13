import { HealthResponse, PredictResponse } from '../types/prediction';

const API_BASE_URL = 'https://fruitvisionai-eiou.onrender.com';

/**
 * Checks the health status of the FastAPI backend & model readiness.
 */
export async function checkHealth(): Promise<HealthResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/health`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Health check failed with status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.warn('Backend health check error:', error);
    return {
      status: 'error',
      model_loaded: false,
    };
  }
}

/**
 * Uploads image file to /predict endpoint and returns prediction results.
 */
export async function predictFruit(file: File): Promise<PredictResponse> {
  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch(`${API_BASE_URL}/predict`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    let errorMessage = 'Failed to analyze fruit image.';
    try {
      const errorData = await response.json();
      if (errorData.detail) {
        errorMessage = typeof errorData.detail === 'string' ? errorData.detail : JSON.stringify(errorData.detail);
      }
    } catch {
      errorMessage = `Server responded with status code ${response.status}`;
    }
    throw new Error(errorMessage);
  }

  const data: PredictResponse = await response.json();
  return data;
}
