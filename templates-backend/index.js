const express = require('express')
const app = express();
const cors = require('cors');
const tagsRoutes = require('./routes/tagsRoutes');
const sortJobsByRoutes = require('./routes/sortJobsByRoutes')
const dbconnect = require('./database/db');


// Middleware
app.use(cors());
app.use(express.json());

// routes for tags
app.use('/tags', tagsRoutes);

// routes for sort jobs
app.use('/sortjobs', sortJobsByRoutes);



// database connect
dbconnect()

const port = process.env.PORT || 7500;
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})