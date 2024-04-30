from fastapi import Depends, FastAPI
from fastapi import HTTPException, status
from sqlalchemy.orm import Session
from pydantic import BaseModel
import crud 
from database import engine, localSession
from schemas import MateriaData, MateriaId, AulaData, AulaId, Asignar_Aulas_Materias_Data, Asignar_Aulas_Materias_Id
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
def root():
    return {"message" : "Este es el index"}


#LECTURA DE DATOS
#este endpoint pide todas las aulas, a traves de la funcion definida en crud
@app.get("/api/aulas/", response_model=list[AulaId])
def get_aulas(db: Session = Depends(get_db)):         #abro sesion en la db con Session. Depends es para la inyeccion de dependencias
    return crud.get_Aulas(db=db)                                           #pido los datos a traves de la funcion definida en crud

#pide un aula segun su id
@app.get("/api/aulas/{id: int}")
def get_aula_by_id(id, db: Session = Depends(get_db)):
    aula_by_id = crud.get_Aula_by_id(db=db, id=id)
    if aula_by_id:
        return aula_by_id
    raise HTTPException(status_code=404, detail= "aula no encontada!")  

#pide todas las materias
@app.get("/api/materias/", response_model=list[MateriaId])
def get_materias(db: Session = Depends(get_db)):
    return crud.get_Materias(db=db)

#pide una materia segun el id
@app.get("/api/materias/{id: int}")
def get_materia_by_id(id, db: Session = Depends(get_db)):
    materia_by_id = crud.get_Materia_by_id(db=db, id=id)
    if materia_by_id:
        return materia_by_id
    raise HTTPException(status_code=404, detail= "materia no encontrada!")

#pide todas las clases
@app.get("/api/clases/", response_model=list[Asignar_Aulas_Materias_Id])
def get_clases(db: Session = Depends(get_db)):
    return crud.get_Asignar_Aulas_Materias(db=db)

#pide una clase segun su id
@app.get("/api/clases/{id: int}")
def get_clase_by_id(id, db: Session = Depends(get_db)):
    clase_by_id = crud.get_clase_activa_by_id(db=db, id=id)
    if clase_by_id:
        return clase_by_id
    raise HTTPException(status_code=404, detail= "clase no encontrada!")

#desp veo como lo uso
#pide todas las clases activas de una materia segun su nombre
@app.get("/api/clases/por-materia/{nom}", response_model=list[Asignar_Aulas_Materias_Id])
def get_clases_por_nombre_materia(nom: str, db: Session = Depends(get_db)):
    if not nom:
        raise HTTPException(status_code=400, detail="El nombre de la materia no puede estar vacío")    
    
    clases_x_materia = crud.get_clases_activas_por_nombre_materia(db=db, nombre_materia=nom)
    if not clases_x_materia:
        raise HTTPException(status_code=404, detail="No se encontraron clases para la materia especificada")
    
    return clases_x_materia


#pide todas las clases activas de un aula segun su nombre
@app.get("/api/clases/por-aula/{nom}", response_model=list[Asignar_Aulas_Materias_Id])
def get_clases_por_nombre_aula(nom: str, db: Session = Depends(get_db)):
    if not nom:
        raise HTTPException(status_code=400, detail="El nombre del aula no puede estar vacío")    
    
    clases_x_aula = crud.get_clases_activas_por_nombre_aula(db=db, nombre_aula=nom)
    if not clases_x_aula:
        raise HTTPException(status_code=404, detail="No se encontraron clases para el aula especificado")
    
    return clases_x_aula

#pide todas las clases activas de un dia especifico
@app.get("/api/clases/por-dia/{dia}", response_model=list[Asignar_Aulas_Materias_Id])
def get_clases_por_dia(dia: str, db: Session = Depends(get_db)):
    if not dia:
        raise HTTPException(status_code=400, detail="El string dia no puede estar vacío")   
    
    clases_x_dia = crud.get_clases_activas_por_dia(db=db, dia=dia)
    if not clases_x_dia:
        raise HTTPException(status_code=404, detail="No se encontraron clases para el dia especificado")
    
    return clases_x_dia

#ESCRITURA DE DATOS


    

    