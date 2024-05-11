FROM python:alpine

RUN mkdir /app

WORKDIR /app

COPY requirements/requirements.txt .
RUN pip install -r requirements.txt

COPY api.py .
COPY ./src ./src

CMD ["uvicorn", "api:app", "--host", "0.0.0.0"]