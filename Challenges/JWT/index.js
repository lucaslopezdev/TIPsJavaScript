import express, { json } from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

// conexion con la base de datos
import pkg from 'pg'
const { Client } = pkg

const credentials = {
  host: 'localhost',
  port: 5432,
  database: 'users',
  user: 'postgres',
  password: 'admin'
}

const PORT = 3001
const app = express()

app.use(json())
app.disable('x-powered-by')

app.get('/users', async (req, res) => {
  try {
    const client = new Client(credentials)
    await client.connect()
    const response = await client.query('SELECT * FROM users;')
    await client.end()

    res.status(200).send(response.rows)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

app.post('/signup', async (req, res) => {
  try {
    const { email } = req.body
    const password = await bcrypt.hash(req.body.password, 10)

    const client = new Client(credentials)
    await client.connect()

    const query = 'INSERT INTO users(email, password) VALUES ($1, $2)'
    const values = [email, password]
    await client.query(query, values)
    const newUser = await client.query('SELECT * FROM users WHERE email = $1', [
      email
    ])
    await client.end()

    // jwt.sign recibe un objeto con la informacion que necesita, una palabra secreta y devuelve un callback
    // mas info interesante en github.com/auth0/node-jsonwebtoken
    jwt.sign({ id: newUser.id }, 'lapalabrasecreta', (error, token) => {
      //if(error) throw new Error('...')

      return res.status(200).json({ token })
      //este token que recibe el front, hay que almacenarlo dentro del localstorage
    })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

const verificacionDeTokenMiddleware = (req, res, next) => {
  const bearerHeader = req.headers["authorization"]

  if(typeof bearerHeader !== undefined){
    const bearer = bearerHeader.split(' ') // [ bearer, eltoken ]
    const bearerToken = bearer[1]

    req.user = bearerToken
    next()
  } else { throw new Error('You shall not pass!!') }
}

app.get('/perfil', verificacionDeTokenMiddleware, (req, res) => {
  try {
    jwt.verify(req.user, 'lapalabrasecreta', (error, data) => {
      if(error) throw new Error('Access denied')

      return res.status(200).send('Bienvenido pase usted')
    })
  } catch (error) {
    res.status(400).json({error: error.message})
  }
})

app.listen(PORT, () => {
  console.log(`Server is listening on PORT: ${PORT}`)
})
