const API_URL = import.meta.env.VITE_API_URL

export async function registerUser(payload) {
  const response = await fetch(`${API_URL}/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })

  const data = await response.json()

  if (!response.ok) {
    throw {
      status: response.status,
      data,
    }
  }

  return data
}

export async function loginUser(email, password) {
  const credentials = btoa(`${email}:${password}`)

  const response = await fetch(`${API_URL}/auth/token`, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${credentials}`,
    },
  })

  const data = await response.json()

  if (!response.ok) {
    throw {
      status: response.status,
      data,
    }
  }

  return data
}