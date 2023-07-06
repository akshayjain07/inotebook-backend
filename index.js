const connectToMongo = require('./db');
const express = require('express')
const app = express()
const port = 5000
var cors = require('cors')  // it is because aap browser se directly end point ko hit nhi kar sakte the 
// In a React app (or any web application), the concept of "same-origin policy" applies by default. It means that web pages can only make requests to resources (such as APIs) on the same domain and port from which the web page was served. This policy is in place to prevent malicious scripts on one website from accessing sensitive information on another website.

// However, there are legitimate cases where a React app needs to make requests to APIs hosted on a different domain or port. For example, if your React app is hosted on http://localhost:3000 and you want to make requests to an API hosted on http://api.example.com, the browser's same-origin policy will block those requests by default.


app.use(express.json())

app.use(cors())

// Available Routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))
app.get('/',(req,res)=>{
  res.send('Hello hii!')
})

app.listen(port, () => {
  console.log(`iNotebook backend listening at http://localhost:${port}`)
})
connectToMongo();