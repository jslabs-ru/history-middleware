const express = require('express');
const history = require('connect-history-api-fallback');
const path = require('path');

const app = express();

const staticFileMiddleware = express.static('public');
app.use(staticFileMiddleware);

const historyMiddleware = history({
    disableDotRule: true,
    verbose: true
});

app.use((req, res, next) => {
    if (req.path.match(/^\/api\/v1\//)) {
        next();
    } else {
        historyMiddleware(req, res, next);
    }
});

app.use(staticFileMiddleware);

app.get('/api/v1/users', (req, res) => {
    res.json([
        'Alice',
        'Robert',
        'John',
        'Lucy',
        'Michael'
    ]);
});

const PORT = 5555;

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});
