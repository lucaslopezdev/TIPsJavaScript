import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import util from 'util'

// connection to database
import pkg from 'pg'
const { Client } = pkg

const credentials = {
  host: 'localhost',
  port: 5432,
  database: 'users',
  user: 'postgres',
  password: 'admin'
}

// async functions
const compareAsync = util.promisify(bcrypt.compare)
const signAsync = util.promisify(jwt.sign)
const verifyAsync = util.promisify(jwt.verify)

export class userModel {
  static async login({ email, password }) {
    try {
      const client = new Client(credentials)
      await client.connect()
      const { rows } = await client.query(
        'SELECT * FROM users WHERE email = $1',
        [email]
      )
      const user = rows[0]
      await client.end()

      if (user) {
        const passwordMatch = await compareAsync(password, user.password)
        if (!passwordMatch) throw Error()

        const token = await signAsync({ id: user.id }, 'lapalabrasecreta')
        return token
      } else throw new Error('El usuario/ contraseña es incorrecto')
    } catch (error) {
      throw Error('Usuario o contraseña incorrecta')
    }
  }

  static async signup({ email, password }) {
    try {
      const passwordHash = await bcrypt.hash(password, 10)
      const client = new Client(credentials)
      await client.connect()

      const query = 'INSERT INTO users(email, password) VALUES ($1, $2)'
      const values = [email, passwordHash]
      await client.query(query, values)
      const { rows } = await client.query(
        'SELECT id,email,password FROM users WHERE email = $1',
        [email]
      )
      const newUser = rows[0]
      await client.end()
      // jwt.sign recibe un objeto con la informacion que necesita, una palabra secreta y devuelve un callback
      // mas info interesante en github.com/auth0/node-jsonwebtoken
      const token = await signAsync({ id: newUser.id }, 'lapalabrasecreta')
      return token
      //este token que recibe el front, hay que almacenarlo dentro del localstorage
    } catch (error) {
      throw new Error('error en el signup')
    }
  }

  static async profile({user}) {
    try {
      const verify = await verifyAsync(user, 'lapalabrasecreta')
      if(!verify) throw new Error()
      return 'Bienvenido pase usted!' 
    } catch (error) {
      throw new Error('Access denied')
    }
  }

  static async users() {
    try {
      const client = new Client(credentials)
      await client.connect()
      const response = await client.query('SELECT * FROM users;')
      await client.end()

      return response.rows
    } catch (error) {
      throw new Error('No existen usuarios')
    }
  }
}
