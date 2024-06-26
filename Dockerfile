FROM python:alpine

RUN mkdir /app

WORKDIR /app

ENV VIRTUAL_ENV=/app/.venv
RUN python3 -m venv $VIRTUAL_ENV
ENV PATH="$VIRTUAL_ENV/bin:$PATH"

RUN pip install --upgrade pip
COPY requirements/requirements.txt .
RUN pip install -r requirements.txt

COPY api.py .
COPY ./src ./src

CMD ["uvicorn", "api:app", "--host", "0.0.0.0"]