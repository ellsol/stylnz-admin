export type Token = {
  token: string
  refreshToken: string
  expiresIn: number
  type: string
}

export type MeResponse = {
  id: string
  role: string
}

export type UserResponse = {
  id: string
  role: string
}

export type UsersResponse = Array<UserResponse>