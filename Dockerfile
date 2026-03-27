FROM python:3.11-slim

WORKDIR /app

RUN apt-get update && \
    apt-get install -y postgresql-client && \
    rm -rf /var/lib/apt/lists/*

COPY requirements.txt .

RUN pip install --no-cache-dir pytest httpx

RUN pip install --no-cache-dir -r requirements.txt

RUN pip install --upgrade pip

RUN pip install bcrypt==4.0.1 passlib==1.7.4 python-jose[cryptography]

COPY . .

EXPOSE 8000

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]

