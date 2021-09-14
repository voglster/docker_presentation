FROM python:3.9-slim
RUN pip install --no-cache-dir hug pymongo
WORKDIR /app
ENV PYTHONUNBUFFERED=1
ADD . /app
EXPOSE 8005
CMD ["hug","-f","app.py"]
