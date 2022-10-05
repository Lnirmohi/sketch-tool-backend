require('dotenv').config();
const express = require('express');
const cors = require('cors');
const Sketch = require('./models/sketch');
const usersRouter = require('./controllers/users');
const loginRuter = require('./controllers/login')

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/users', usersRouter);
app.use('/api/login', loginRuter);

app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
});