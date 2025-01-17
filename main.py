from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel

class Memo(BaseModel):
    id:str
    content:str

app = FastAPI()

memos = []

@app.post('/memos')
def create_memo(memo:Memo):
    memos.append(memo)
    return '메모 추가 성공'

@app.get('/memos')
def read_memo():
    return memos

@app.put('/memo/{id}')
def put_memo(req_memo:Memo):
    for memo in memos:
        if(memo.id == req_memo.id):
            memo.content = req_memo.content
            return "성공했습니다."
        return '그런 메모는 없습니다'
    
@app.delete('/memo/{memo_id}')
def del_memo(memo_id):
    for index,memo in enumerate(memos):
        if(memo.id == memo_id):
            memos.pop(index)
            return '성공했습니다.'
        return '그런 메모는 없습니다.'

    

app.mount('/',StaticFiles(directory='static',html=True),name='static')