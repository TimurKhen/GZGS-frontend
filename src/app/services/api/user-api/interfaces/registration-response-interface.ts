export interface RegistrationResponseInterface {
  "user": {
    "user_id": string,
    "username": string,
    "fullname": string,
    "email": string,
    "avatar_url": string,
    "notifications": boolean
  },
  "tokens": {
    "acces_token": string,
    "refresh_token": string,
    "token_type": string,
    "expires_in": number
  }
}
