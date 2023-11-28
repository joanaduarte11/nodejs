import express from 'express'
import userRoutes from "./routes/users.js"
import storeRoutes from "./routes/store.js"
import productsRoutes from "./routes/products.js"

const app = express()
const port = 3000

app.use(express.json())

app.get('/', (req, res) => {
    res.send('Olá mundo!')
  })

  
  //users.js
  app.use("/", userRoutes)
  
  //store.js
  app.use("/", storeRoutes)
  
  //products.js
  app.use("/", productsRoutes)
  
  
  app.listen(port, () => {
      console.log(`Example app listening on port ${port}`)
  })
  
  
/* 
arrumar DELETE
criar PUT