const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('This is my TCC!')
})

app.listen(port, () => {
  console.log(`Server run in dor: ${port}`)
})


//Express - roteamento: https://expressjs.com/pt-br/guide/routing.html
//