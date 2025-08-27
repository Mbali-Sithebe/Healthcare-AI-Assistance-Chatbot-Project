# Healthcare-AI-Assistance-Chatbot-Project

Hounors Project (DIGA4002A)

1. Step 1 – Clone the Repository:
   git clone https://github.com/mbale/Healthcare-AI-Assistance-Chatbot-Project.git

2.Step 2 – Set Up Python Environment

- conda create -n medibot python=3.12 -y
- conda activate medibot

3. Step 3 – Install Dependencies

- pip install -r requirements.txt

4. Step 4 – Configure Environment Variables

- bPINECONE_API_KEY="your_pinecone_api_key_here"
- OPENAI_API_KEY="your_openai_api_key_here"

5. Step 5 – Store Embeddings

- python store_index.py

6. Step 6 – Run the Chatbot

- Finally, start the chatbot server: python app.py
- hen open your browser and navigate to: http://localhost:5000

TECH STACK USED: 
- Python
- LangChain
- Flask
- GPT (OpenAI)
- Pinecone

Optional: AWS Deployment (CI/CD)
- AWS_ACCESS_KEY_ID  
- AWS_SECRET_ACCESS_KEY  
- AWS_DEFAULT_REGION  
- ECR_REPO  
- PINECONE_API_KEY  
- OPENAI_API_KEY  

LOCATE FILE: cd "C:\Users\mbale\github\Healthcare-AI-Assistance-Chatbot-Project"
