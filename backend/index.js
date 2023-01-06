//import misc
const express = require('express');
const app = express();
const port = 4000;

//import routes
const open = require('./routes/open');
const secure = require('./routes/secure');
const admin = require('./routes/admin');

//middleware
app.use('/api/open', open);
app.use('/api/secure', secure);
app.use('/api/admin', admin);

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
