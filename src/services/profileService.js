import { getToken } from "../utils/authStorage";

const API_URL = import.meta.env.VITE_API_URL;

export async function getCustomerProfile(userId) {
  const token = getToken();

  const response = await fetch(`${API_URL}/profile/${userId}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw {
      status: response.status,
      data,
    };
  }

  return data;
}

export async function updateCustomerProfile(userId, payload) {
  const token = getToken();

  const response = await fetch(`${API_URL}/profile/${userId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });

  const data = await response.json();

  if (!response.ok) {
    throw {
      status: response.status,
      data,
    };
  }

  return data;
}