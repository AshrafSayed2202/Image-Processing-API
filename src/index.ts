// imports
import express from 'express'
import routes from './routes/index'
// initialize app
const app = express()
const port = 3000
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`)
})
app.use(routes)
export default app;