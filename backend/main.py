from fastapi import Depends, FastAPI
from fastapi import HTTPException, status
from sqlalchemy.orm import Session
from pydantic import BaseModel
import crud 
from database import engine, localSession, Base
from schemas import MateriaData, MateriaId, AulaData, AulaId, Asignar_Aulas_Materias_Data, Asignar_Aulas_Materias_Id
from models import Materia, Aula, Asignar_Aulas_Materias

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
@app.get("/api/clases/buscar-por-materia/{nom}", response_model=list[Asignar_Aulas_Materias_Id])
def get_clases_por_nombre_materia(nom: str, db: Session = Depends(get_db)):
    if not nom:
        raise HTTPException(status_code=400, detail="El nombre de la materia no puede estar vacío")    
    
    clases_x_materia = crud.get_clases_activas_por_nombre_materia(db=db, nombre_materia=nom)
    if not clases_x_materia:
        raise HTTPException(status_code=404, detail="No se encontraron clases para la materia especificada")
    
    return clases_x_materia


#pide todas las clases activas de un aula segun su nombre
@app.get("/api/clases/buscar-por-aula/{nom}", response_model=list[Asignar_Aulas_Materias_Id])
def get_clases_por_nombre_aula(nom: str, db: Session = Depends(get_db)):
    if not nom:
        raise HTTPException(status_code=400, detail="El nombre del aula no puede estar vacío")    
    
    clases_x_aula = crud.get_clases_activas_por_nombre_aula(db=db, nombre_aula=nom)
    if not clases_x_aula:
        raise HTTPException(status_code=404, detail="No se encontraron clases para el aula especificado")
    
    return clases_x_aula

#pide todas las clases activas de un dia especifico
@app.get("/api/clases/buscar-por-dia/{dia: str}", response_model=list[Asignar_Aulas_Materias_Id])
def get_clases_por_dia(dia: str, db: Session = Depends(get_db)):
    if not dia:
        raise HTTPException(status_code=400, detail="El string dia no puede estar vacío")   
    
    clases_x_dia = crud.get_clases_activas_por_dia(db=db, dia=dia)
    if not clases_x_dia:
        raise HTTPException(status_code=404, detail="No se encontraron clases para el dia especificado")
    
    return clases_x_dia

#ESCRITURA DE DATOS

    
@app.post("/api/aulas/crear-aula", response_model= AulaData, status_code=status.HTTP_201_CREATED)
def crear_aula(aula: AulaData, db: Session = Depends(get_db)):
    # para fijarme si el aula ya existe
    aulas_existente = crud.get_Aula_by_nombre_completo(db, aula.nombre)
    if aulas_existente:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="ya hay un aula con ese nombre")

    try:
        nueva_aula = crud.create_Aula(db=db, aula=aula)
        return nueva_aula  # Si se crea sin problemas, devuelve 201
    except HTTPException as he:
        raise he  # Ya lo manejo en crud, solo lo dejo para q se propague aca
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=f"Error inesperado: {str(e)}")

    
@app.post("/api/materias/crear-materia", response_model=MateriaData, status_code=status.HTTP_201_CREATED)
def crear_materia(materia: MateriaData, db: Session = Depends(get_db)):
    # Comprobar si la materia ya existe
    materias_existente = crud.get_Materia_by_nombre_completo(db, materia.nombre)
    if materias_existente:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="El nombre de la materia ya existe")

    try:
        nueva_materia = crud.create_Materia(db=db, materia=materia)
        return nueva_materia  # Si se crea sin problemas, devuelve 201
    except HTTPException as he:
        raise he # muestro la excepcion HTTP directamente si fue levantada en crud
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=f"Error inesperado: {str(e)}")
    
@app.post("/api/clases/crear-clase", response_model= Asignar_Aulas_Materias_Data, status_code=status.HTTP_201_CREATED)
def crear_clase(clase: Asignar_Aulas_Materias_Data, db: Session = Depends(get_db)):
    try:
        nueva_clase = crud.create_Clase(db=db, clase=clase)
        return nueva_clase
    except ValueError as ve:  #maneje otras excepciones en crud, dejo aqui las http
        raise HTTPException(status_code=400, detail=str(ve))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error inesperado: {str(e)}")


#EDITAR DATOS

#endpoint para editar un aula 

@app.put("/api/aulas/editar-aula/{id: int}", response_model= AulaData, status_code=status.HTTP_200_OK)
def editar_aula(id: int, nueva_info: AulaData, db: Session = Depends(get_db)):
    try:
        aula_actualizada = crud.editar_Aula(db=db, id=id, nueva_info=nueva_info)
        return aula_actualizada
    except HTTPException as e:
        raise e  #para relanzar las excepciones por errores de integridad y no encontradas, ya lanzadas en el crud
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error inesperado: {str(e)}")
    

#para editar una materia
    
@app.put("/api/materias/editar-materia/{id: int}", response_model= MateriaData, status_code=status.HTTP_200_OK)
def editar_materia(id: int, nueva_info: MateriaData, db: Session = Depends(get_db)):
    try:
        materia_actualizada = crud.editar_Materia(db=db, id=id, nueva_info=nueva_info)
        return materia_actualizada
    except HTTPException as e:
        raise e  #para relanzar las excepciones por errores de integridad y no encontradas, ya lanzadas en el crud
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error inesperado: {str(e)}")
    
#para editar una clase activa

@app.put("/api/clases/editar-clase/{id: int}", response_model= Asignar_Aulas_Materias_Data, status_code=status.HTTP_200_OK)
def editar_clase(id: int, nueva_info: Asignar_Aulas_Materias_Data, db: Session = Depends(get_db)):
    clase_actualizada = crud.editar_Clase_Activa(db=db, id=id, nueva_info=nueva_info)
    if clase_actualizada:
        return clase_actualizada
    else:
        raise HTTPException(status_code=404, detail=f"No se encontró la clase activa con el id {id}")


#ELIMINAR DATOS

#eliminar una materia por el nombre
@app.delete("/api/materias/borrar-materia-por-nombre/{nom}", status_code=200)
def delete_materia_by_nombre(nom: str, db: Session = Depends(get_db)):
    try:
        resultado = crud.delete_materia_by_nombre(db=db, nom=nom)
        return resultado
    except HTTPException as e:
        raise e  # Esto asegura que se lance como una excepción HTTP
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error inesperado: {str(e)}")  # Para capturar cualquier otra excepción
    
#eliminar una materia por su id
@app.delete("/api/materias/borrar-materia-por-id/{id: int}", status_code=200)
def delete_materia_by_id(id: int, db: Session = Depends(get_db)):
    try:
        resultado = crud.delete_materia_by_id(db=db, id=id)
        return resultado
    except HTTPException as e:
        return e
    
#eliminar un aula por su nombre 
@app.delete("/api/aulas/borrar-aula-por-nombre/{nom}", status_code=200)
def borrar_aula_by_nombre(nom: str, db: Session = Depends(get_db)):
    try:
        resultado = crud.delete_aula_by_nombre(db=db, nom=nom)
        return resultado
    except HTTPException as e:
        return e   
    
#eliminar un aula por el id

@app.delete("/api/aulas/borrar-aula-por-id/{id: int}", status_code=200)
def borrar_aula_by_id(id: int, db: Session = Depends(get_db)):
    try:
        res = crud.delete_aula_by_id(db=db, id=id)
        return res
    except HTTPException as e:
        return e    
    
#eliminar una clase segun su id

@app.delete("/api/clases/borrar-clase-por-id/{id: int}", status_code= 200)
def borrar_clase_por_id(id: int, db: Session = Depends(get_db)):
    try:
        res = crud.delete_clase(db=db, id=id)
        return res
    except HTTPException as e:
        return e
    


    

    

    