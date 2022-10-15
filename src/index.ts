// imports
import express from 'express';
import { promises as fs } from 'fs';
// initialize app
const app = express();
const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
app.get('/api', (req, res) => {
    res.send('hello world');
});
