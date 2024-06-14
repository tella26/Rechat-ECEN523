## Final project for ECEN 523 (NLP), Santa Clara University, Santa Clara, CA.
## Rechat: Research chat assistant

Steps to setup Rechat and Getting started:

Install and setup Ollama:
https://ollama.com/download

Setup API keys, LLMs etc in backend/.env file. By default we are using phi3. So phi3 should be installed on your machine.
```
ollama pull phi3
```

We are using nomic-embed-text as the default embedding model.
```
ollama pull nomic-embed-text
```

Again, you can change it to any embedding model. Make changes to backend/.env file.

Start the backend as described in the [backend README](./backend/README.md).

Run the development server of the frontend as described in the [frontend README](./frontend/README.md).

Open [http://localhost:3000](http://localhost:3000) with your browser to see Rechat.

Upload PDF files ( < 1 MB) and optionally bibliography. Ask Rechat to write intoduction, methodology, results etc. It will pull relevant information based on the files that you input. You can also query it multiple times and it remembers the previous queries.

Note: 
Change LLMs in backend/.env file. We are using ollama for serving local LLMs. One can also use cloud hosted private LLMs by OpenAI, Google etc.

For better results, clean up vector database before running backend each time. 
Run backend/cleanup_db.py for the cleanup. We couldn't integrate it in typeScript, we were getting some dependencies errors.
requests and dotenv python package will be needed for this:
```
pip install requests
pip install python-dotenv
```
Wait for 2 mins for the effect to take place and then refresh http://localhost:3000 to use Rechat from fresh.

References:
https://ts.llamaindex.ai/
