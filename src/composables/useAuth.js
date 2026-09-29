import { ref, computed } from 'vue'
import { getCurrentUser } from '../services/authService'
import { getToken, removeToken } from '../utils/authStorage'

const user = ref(null)
const loading = ref(false)

export function useAuth() {
  const isAuthenticated = computed(() => !!user.value)

async function loadUser() {
  const token = getToken()

  if (!token) {
    user.value = null
    return null
  }

  loading.value = true

  try {
    const currentUser = await getCurrentUser()

    user.value = currentUser

    return currentUser
  } catch (error) {
    user.value = null

    if (error.status === 401) {
      removeToken()
    }

    throw error
  } finally {
    loading.value = false
  }
}

  function logout() {
    removeToken()
    user.value = null
  }

  return {
    user,
    loading,
    isAuthenticated,
    loadUser,
    logout,
  }
}