from fastapi import FastAPI
from pydantic import BaseModel
import crud 
from database import engine, localSession
from schemas import MateriaData, MateriaId, AulaData, AulaId, Asignar_Aulas_Materias_Data
from models import Base, Materia, Aula, Asignar_Aulas_Materias

#para crear las tablas en la base de dato si no estan creadas
Base.metadata.create_all(bind=engine)

app = FastAPI()

#cada vez que llamo a esta funcion, abro una sesion en mi bd
def get_db():
    db = localSession()
    try:
        yield db 
    finally:
        db.close()
  

@app.get("/")
def index():
    return {"message" : "Este es el index"}

@app.get("/Aula/{id}")
def mostrarAula(id: int):
    return {"Aula" : id}

@app.get("/Materia/{id}")
def mostrarMateria(id: int):
    return {"Materia" : id}

@app.get("/Materia/{id}/{nombre}")
def mostrarMateriaxNombre(id: int, nom: str):
    return {
        "ID" : id,
        "Materia" : nom
    }

@app.get("/Aula/{id}/{nombre}")
def mostrarAulaxNombre(id: int, nom: str):
    return {
        "ID" : id,
        "Aula" : nom
    }


@app.post("/Aula")
def insertarAula(aula: Aula):
    return {"message": f"Aula {aula.nombre} insertada"}

@app.post("/Materia")
def insertarMateria(materia: Materia):
    return {"message": f"Materia {materia.nombre} insertada"}

@app.post("/Clases")
def insertarClase(clase: Asignar_Aulas_Materias):
    return {"message": f"Clase insertada. ID aula {clase.id_aula} ID materia {clase.id_materia}"}


    