const express = require('express'); // Import the Express module
const app = express(); // Create an Express application instance
const PORT = process.env.PORT || 3000; // Define the port, using environment variable if available

// Define a route for the root URL (/)
app.get('/', (req, res) => {
    res.send('con song');
});

app.get('/getdata', (req, res) => {
    res.send(req.query.data);
});

// Start the server and listen for incoming requests on the specified port
app.listen(PORT, () => {
    console.log(`Server is listening at http://localhost:${PORT}`);
});