import hug
from pymongo import MongoClient
import os
from hug.middleware import CORSMiddleware
from pprint import pprint

api = hug.API(__name__)
api.http.add_middleware(CORSMiddleware(api))

mongodb_host = os.environ.get("DB_HOST", "localhost")

pprint(dict(os.environ))

client = MongoClient(mongodb_host, 27017)
db = client.presentation_db

@hug.get('/echo')
def echo_ep(msg: str="you didnt provide a msg to echo!"):
    return msg

@hug.get('/save')
def save_message_endpoint(msg: str):
    db.messages.insert_one({'msg': msg})

@hug.get('/clear')
def clear_msg_endpoint():
    db.messages.delete_many({})

@hug.get('/get')
def save_message_endpoint():
    data = list(db.messages.find({}))
    for row in data:
        row['id'] = str(row['_id'])
        del row['_id']
    return data

hug.API(__name__).http.serve(port=8005)