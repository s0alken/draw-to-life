
# Draw to Life

Draw to Life is an AI-powered drawing application that can turn your sketches into realistic images. You can draw directly on the canvas and download the result image. Check out the live demo [HERE](https://draw-to-life.netlify.app/).

![screenshot](https://user-images.githubusercontent.com/57046544/226466361-1583ee29-953a-4ae8-b2eb-6f55f78844f7.png)

## Technologies used
 - [React](https://es.reactjs.org/)
 - [Tailwind CSS](https://tailwindcss.com/)
 - [Framer Motion](https://www.framer.com/motion/)
 - [Express](https://expressjs.com/)
 - [Node](https://nodejs.org/en/)
 - [Cloudinary](https://cloudinary.com/)

## How it works

Draw to Life uses a [ControlNet](https://github.com/lllyasviel/ControlNet) model hosted on Replicate to generate refined images using drawings as a template and a text prompt. The app allows you to draw directly on the canvas and sends the image to the model through an Express Route using the [Replicate API](https://replicate.com/docs).

## Running locally

### Get your Cloudinary API Keys

To get started, you will need a Cloudinary account and API keys. Follow these steps to retrieve your keys:

1. Go to [Cloudinary](https://cloudinary.com/) and create an account.
2. Go to "Dashboard" and copy your Cloud Name, API Key, and API Secret.

### Get your Replicate API key

Next, you will need to sign up for a Replicate account and obtain an API key. Follow these steps to retrieve your key:

1. Create an account on [Replicate](https://replicate.com/).
2. Go to "Account" in the navbar.
3. Copy your API token.

### Set the .env file
After obtaining your keys, create a .env file in the root of the server directory and set your keys as shown here:

```bash
CLOUDINARY_CLOUD_NAME="YOUR_CLOUDINARY_CLOUD_NAME_HERE"
CLOUDINARY_API_KEY="YOUR_CLOUDINARY_API_KEY_HERE"
CLOUDINARY_API_SECRET="YOUR_CLOUDINARY_API_SECRET_HERE"
REPLICATE_API_TOKEN="YOUR_REPLICATE_API_TOKEN_HERE"
```

### Install dependencies in both client and server folders

Run the following command to install the necessary dependencies in both the client and server folders:

```bash
  npm install
```

### Start the server (available at http://localhost:5000)

Run the following command to start the server:

```bash
  npm start
```

### Start the client (available at http://localhost:5173)

Run the following command to start the client:

```bash
  npm run dev
```
