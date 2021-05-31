import client from "../request"

const login = (data) => {
  return client.post('/admin/auth/login', data)
}

const changePassword = (data) => {
  return client.post(`/admin/auth/change-password`, data)
}

const AuthService = {
  login,
  changePassword
}

export default AuthService
