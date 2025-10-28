import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import characterRouter from './routes/characterRouter.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 2025;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/characters", characterRouter);

// Serve the frontend `index.html` at the project root
app.use(express.static(__dirname));
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
    console.log("Press Ctrl+C to end this process.");
});