const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const songRoutes = require('./app/routes/songRoutes');
const playlistRoutes = require('./app/routes/playlistRoutes');

const app = express();
const port = 8000;

app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', cors(), songRoutes);
app.use('/api', cors(), playlistRoutes);

app.listen(port, () => console.log(`Server is running on port ${port}`));