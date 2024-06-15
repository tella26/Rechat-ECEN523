## Getting Started

First, install the dependencies:

```
npm install
```

Second , You will create a file and name it .env file on /backend/ folder. This is where all the configurations goes. All the config are there except the OpenAI API key to run the app.
```
# The Llama Cloud API key.
LLAMA_CLOUD_API_KEY=llx-7b0rlfNoUxSdC6jYHrts5jLWLApBykj6ASbbrOaniupa8g6V

# The provider for the AI models to use.
MODEL_PROVIDER=openai
# MODEL_PROVIDER=ollama # To use ollama, you need Ollama server running in your dev mode

# The name of LLM model to use.
MODEL=gpt-3.5-turbo
# MODEL=llama3:latest # For llama3 model
# MODEL=phi3 # For Phi3 model

# Name of the embedding model to use.
# EMBEDDING_MODEL=text-embedding-3-large
# EMBEDDING_MODEL=llama3:latest
EMBEDDING_MODEL=nomic-embed-text

# Dimension of the embedding model to use.
EMBEDDING_DIM=1024
# EMBEDDING_DIM=768 # Change to this when using Llama3

# The OpenAI API key to use.
OPENAI_API_KEY= # Create an OpenAI keys otherwise the app will not work.

# Temperature for sampling from the model.
# LLM_TEMPERATURE=0.7 

# Maximum number of tokens to generate.
# LLM_MAX_TOKENS= 1000

# The number of similar embeddings to return when retrieving documents.
TOP_K=3

# The qualified REST URL of the Qdrant server. Eg: http://localhost:6333. You can change this to your settings.
QDRANT_URL= https://52f95001-dea7-4b3d-acaf-b1eec153a79e.us-east4-0.gcp.cloud.qdrant.io

# The name of Qdrant collection to use.
QDRANT_COLLECTION= rechatdb

# Optional API key for authenticating requests to Qdrant.
QDRANT_API_KEY= TT6EMXzVwKjZqOxdwOTbY_9Q5F1QzvTSZOD3izIE2UcYLbWWxdPeDw  

# Timeout settings
TIMEOUT = 60000


```

Third, generate the embeddings of the documents in the `./data` directory (if this folder exists - otherwise, skip this step):

```
npm run generate
```

Fourth, run the development server:

```
npm run dev
```
