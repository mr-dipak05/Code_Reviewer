require('dotenv').config();
const app = require('./src/app.js');

app.listen(5173, () => {
  console.log("Server is running on http://localhost:5173");
})
