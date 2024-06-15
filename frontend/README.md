## Getting Started

First, install the dependencies:

```
npm install
```
Second, Add .env file in the ./frontend/ folder
```
# The backend API for chat endpoint.
NEXT_PUBLIC_CHAT_API=http://localhost:8000/api/chat
```

Third, generate the embeddings of the documents in the `./data` directory (if this folder exists - otherwise, skip this step):

```
npm run generate
```

Fourth, run the development server:

```
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
