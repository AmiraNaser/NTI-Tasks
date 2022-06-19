require('dotenv').config();
const PORT = process.env.PORT;
const app  = require('./src/app');
app.listen(PORT, ()=> console.log(`Server running on host http://localhost:${PORT}`));