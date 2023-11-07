export const verifyToken = (req, res, next) => {
  const bearerHeader = req.headers["authorization"]

  if(typeof bearerHeader !== undefined){
    const bearer = bearerHeader.split(' ') // [ bearer, eltoken ]
    const bearerToken = bearer[1]

    req.user = bearerToken
    next()
  } else { throw new Error('You shall not pass!!') }
}