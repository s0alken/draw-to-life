import express from 'express';
import bodyParser from 'body-parser';
import { v2 as cloudinary } from 'cloudinary';
import * as dotenv from 'dotenv';
import cors from 'cors';
import axios from 'axios';

const PORT = process.env.PORT || 5000;

const app = express();

dotenv.config();

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

app.get('/', function (req, res) {
    res.json({ hello: "friends!" });
})

app.post('/upload', async (req, res) => {
    try {
        const { prompt, drawing } = req.body;

        const image = await cloudinary.uploader.upload(drawing);

        const response = await axios.post('https://api.replicate.com/v1/predictions', {
            version: "435061a1b5a4c1e26740464bf786efdfa9cb3a3ac488595a2de23e143fdb0117",
            input: { prompt, image: image.secure_url }
        }, {
            headers: {
                Authorization: `Token ${process.env.REPLICATE_API_TOKEN}`
            }
        })

        console.log(response.data);
        res.json(response.data)
    } catch (error) {

    }
});

app.get('/prediction/:id', async (req, res) => {

    try {
        const { id } = req.params;

        console.log("prediction id:", id)

        const response = await axios.get(`https://api.replicate.com/v1/predictions/${id}`, {
            headers: {
                Authorization: `Token ${process.env.REPLICATE_API_TOKEN}`
            }
        })

        console.log(response.data);
        res.json(response.data)
    } catch (error) {
        console.log(error);
    }
});

app.listen(PORT, () => console.log(`App listening on http://localhost:${PORT}`));