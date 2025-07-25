import {getBaseUrl} from './commonService'

// apiService.ts
const API_BASE_URL = getBaseUrl() // Replace with your backend API URL

// Generic type to handle any kind of response
const handleResponse = async <T>(response: Response): Promise<T> => {
  if (!response.ok) {
    // const error: ApiError = await response.json();
    // throw new Error(error.message || 'Something went wrong!');
    return response.json().then(err => {
      throw err
    })
  }
  return response.json()
}

// Function to get headers, including optional authorization token
const getHeaders = (token?: string): any => {
  const headers: any = {
    'Content-Type': 'application/json',
  }
  if (token) {
    headers['Authorization'] = `Bearer ${token}`
  }
  return headers
}

export const apiService = {
  get: async <T>(url: string, token?: string): Promise<T> => {
    const response = await fetch(`${API_BASE_URL}${url}`, {
      method: 'GET',
      headers: getHeaders(token),
    })
    return handleResponse<T>(response)
  },

  post: async <T>(url: string, data: any, token?: string, header?: any): Promise<T> => {
    const response = await fetch(`${API_BASE_URL}${url}`, {
      method: 'POST',
      headers: header ?? getHeaders(token),
      body: header ? data : JSON.stringify(data),
    })
    return handleResponse<T>(response)
  },

  put: async <T>(url: string, data: any, token?: string, header?: any): Promise<T> => {
    const response = await fetch(`${API_BASE_URL}${url}`, {
      method: 'PUT',
      headers: header ?? getHeaders(token),
      body: header ? data : JSON.stringify(data),
    })
    return handleResponse<T>(response)
  },
}
