const express = require('express');
const app = express();

console.log('Testing Express with PORT environment variable...');

app.use(express.json());

app.post('/api/users', (req, res) => {
    console.log('Received request:', req.body);
    res.json({ success: true });
});

const port = process.env.PORT || 300;
console.log('Listening on port:', port);

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
