import statusCodes from "../statusCodes"

export const internalError = {
  status: statusCodes.ERROR, 
  message: 'Internal error on server',
  data: {}
}