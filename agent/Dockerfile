FROM pytorch/pytorch:2.3.0-cuda11.8-cudnn8-runtime

WORKDIR /app

COPY . /app

RUN pip install --upgrade pip &&\
    pip install --no-cache-dir --upgrade -r /app/requirements.txt

RUN apt-get update && apt-get install -y git

EXPOSE 5000

EXPOSE 9999