const express = require('express');
const app = express(); //just adding a comment to update my github

// test route
app.get('/test', (req, res) => {
    res.json({ message: 'Express is working! JOMARI C. Marson' });
});

// Start the server on port 3000
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
