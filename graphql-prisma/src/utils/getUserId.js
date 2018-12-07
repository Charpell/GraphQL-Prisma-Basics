import jwt from 'jsonwebtoken';

const getUserId = (request, reqireAuth = true) => {
   const header = request.request.headers.authorization

   if (header) {
    const token = header.replace('Bearer ', '')
    const decoded = jwt.verify(token, 'thisisasecret')
    return decoded.userId
   }

   if (reqireAuth) {
     throw new Error('Authentication required')
   }

   return null

}

export { getUserId as default }