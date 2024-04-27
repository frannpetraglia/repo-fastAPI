from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()


class Aula(BaseModel):
    id: int
    nombre: str

class Materia(BaseModel):
    id: int
    nombre: str
    carrera: str

@app.get("/")
def index():
    return {"message" : "Hola"}

@app.get("/Aula/{id}")
def mostrarAula(id: int):
    return {"Aula" : id}

@app.post("/Aula")
def insertarAula(aula: Aula):
    return {"message": f"Aula {aula.nombre} insertada"}
    