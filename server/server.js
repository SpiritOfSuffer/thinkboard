const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

//Port definition
const port = process.env.PORT || 5000;

//Creating an express app
const app = express();

//Middleware
app.use(bodyParser.json());
app.use(cors());

//
const posts = require('./routes/api/posts')
app.use('/api/posts', posts);

//Creating a server, which listen the defined port
app.listen(port, () => console.log(`Server is up on port ${port}`));





