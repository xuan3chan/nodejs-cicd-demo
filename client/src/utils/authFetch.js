/**
 * Auth-aware fetch wrapper.
 * Automatically adds Authorization header from stored token.
 * Redirects to login if token is expired (401).
 */
export async function authFetch(url, options = {}) {
  const token = localStorage.getItem('admin_token')
  const headers = {
    ...options.headers,
  }

  if (token) {
    headers['Authorization'] = `Bearer ${token}`
  }

  const res = await fetch(url, { ...options, headers })

  if (res.status === 401) {
    localStorage.removeItem('admin_token')
    localStorage.removeItem('admin_user')
    window.location.href = '/admin/login'
    throw new Error('Unauthorized')
  }

  return res
}
