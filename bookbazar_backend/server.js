const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const Products = require('./Products')
const User = require('./User')
const app = express()
const port = 5000

app.use(express.json())
app.use(cors())

const connectionurl =
  'mongodb://rabby11011:rabby123@ac-1t537zc-shard-00-00.chyecsy.mongodb.net:27017,ac-1t537zc-shard-00-01.chyecsy.mongodb.net:27017,ac-1t537zc-shard-00-02.chyecsy.mongodb.net:27017/bookbazar?ssl=true&replicaSet=atlas-4sjq8m-shard-0&authSource=admin&retryWrites=true&w=majority'

mongoose
  .connect(connectionurl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log('Connected to MongoDB successfully!')
  })
  .catch(error => {
    console.error('Error connecting to MongoDB:', error)
  })

app.get('/', (req, res) => res.status(200).send('hello world'))

app.post('/products/deliver', async (req, res) => {
  const product_detail = req.body
  // console.log('product details>> ', product_detail);

  try {
    const product = await Products.create(product_detail)
    res.status(201).send(product)
  } catch (error) {
    console.log('error message', error.message)
    res.json({ sucess: false })
  }
})
// signup form
app.post('/signup', async (req, res, next) => {
  const user_detail = req.body
  const { email } = req.body
  try {
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(409).json({ message: 'Email already exists' })
    }
    const product = await User.create(user_detail)
    res.json({ sucess: true })
  } catch (error) {
    console.log('error message', error.message)
    res.json({ sucess: false })
  }
})
//login form
app.post('/login', async (req, res) => {
  const { email, password } = req.body
  try {
    let userData = await User.findOne({ email })
    if (!userData) {
      return res.status(404).json({ success: false, message: 'User not found' })
    }
    if (password === userData.password) {
      res.status(200).json({ success: true, message: 'Login successful' })
    } else {
      res.status(401).json({ success: false, message: 'Wrong password' })
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, message: 'Internal server error' })
  }
})

app.post('/products/add', async (req, res) => {
  const product_detail = req.body
  // console.log('product details>> ', product_detail);

  try {
    const product = await Products.create(product_detail)
    res.status(201).send(product)
  } catch (error) {
    console.log('error message', error.message)
    res.json({ sucess: false })
  }
})
app.get('/products/get', async (req, res) => {
  try {
    const data = await Products.find()
    res.status(200).send(data)
  } catch (err) {
    res.status(500).send(err)
  }
})

app.listen(port, () => console.log('listening on the port', port))
