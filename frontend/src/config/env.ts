export interface Enviroment {
  baseUrl: string
  apiUrl: string
  apiWsUrl: string
}

const env: Enviroment = {
  baseUrl: process.env.REACT_APP_APP_URL as string,
  apiUrl: process.env.REACT_APP_API_URL as string,
  apiWsUrl: process.env.REACT_APP_API_WS_URL as string,
}

export default env
