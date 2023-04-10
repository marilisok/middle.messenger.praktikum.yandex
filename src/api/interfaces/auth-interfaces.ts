export interface SignUpData{
  first_name: string,
  second_name: string,
  login: string,
  email: string,
  password: string,
  phone: string
}

export interface SignInData{
  login: string,
  password: string,
}

export interface User{
  id: number,
  first_name: string,
  second_name: string,
  display_name: string,
  login: string,
  email: string,
  phone: string,
  avatar: string
}
