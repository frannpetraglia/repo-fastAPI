from sqlalchemy.orm import Session
from models import Aula, Materia, Asignar_Aulas_Materias, re
from sqlalchemy import func
from sqlalchemy.exc import IntegrityError, SQLAlchemyError
from schemas import AulaData, MateriaData, Asignar_Aulas_Materias_Data
from fastapi import HTTPException, status

#funciones para realizar acciones en la base de datos
#aqui interactuo directamente con la base de datos


#**LEER**

#muestra todas las aulas
def get_Aulas(db: Session):
    try:
        return db.query(Aula).all()
    except SQLAlchemyError as e:
        raise HTTPException(status_code=500, detail=f"Error al recuperar las aulas de la base de datos: {str(e)}")

#muestra todas las materias
def get_Materias(db: Session):
    try:
        return db.query(Materia).all()
    except SQLAlchemyError as e:
        raise HTTPException(status_code=500, detail=f"Error al recuperar las materias de la base de datos: {str(e)}")

#muestra todas las clases
def get_Asignar_Aulas_Materias(db: Session):
    try:
        return db.query(Asignar_Aulas_Materias).all()
    except SQLAlchemyError as e:
        raise HTTPException(status_code=500, detail=f"Error al recuperar las clases activas de la base de datos: {str(e)}")

#muestra las aulas segun el nombre escrito
def get_Aula_by_nombre(db: Session, nom: str):
    try:
        return db.query(Aula).filter(Aula.nombre.ilike(f"%{nom}%")).all()
    except SQLAlchemyError as e:
        raise HTTPException(status_code=500, detail=f"Error al buscar el aula por nombre en la base de datos: {str(e)}")

#muestra las materias segun el nombre escrito
def get_Materia_by_nombre(db: Session, nom: str):
    try:
        return db.query(Materia).filter(Materia.nombre.ilike(f"%{nom}%")).all()
    except SQLAlchemyError as e:
        raise HTTPException(status_code=500, detail=f"Error al buscar la materia por nombre en la base de datos: {str(e)}")

#muestra las aulas según su id
def get_Aula_by_id(db: Session, id: int):
    try:
        return db.query(Aula).filter(Aula.id == id).first()
    except SQLAlchemyError as e:
        raise HTTPException(status_code=500, detail=f"Error al buscar el aula por ID en la base de datos: {str(e)}")

#muestra las materias según su id
def get_Materia_by_id(db: Session, id: int):
    try:
        return db.query(Materia).filter(Materia.id == id).first()
    except SQLAlchemyError as e:
        raise HTTPException(status_code=500, detail=f"Error al buscar la materia por ID en la base de datos: {str(e)}")

#LOS GET_CLASES_ACTIVAS... SON LOS BUSCADORES DE LA CARTELERA
#muestra las clases activas de una materia, buscada segun el nombre de la materia
#*******revisar limite de resultados, para que no me explote la app*****

def get_clases_activas_por_nombre_materia(db: Session, nombre_materia: str):
    try:
        #patrón de expresión regular para el nombre de la materia
        patron_regex = f'%{re.escape(nombre_materia)}%'  # eliminar caracteres especiales
        # Busqueda del nombre mediante ilike con la expresión regular
        return db.query(Asignar_Aulas_Materias).\
            join(Materia, Asignar_Aulas_Materias.id_materia == Materia.id).\
            filter(func.lower(Materia.nombre).ilike(func.lower(patron_regex))).all()
    except SQLAlchemyError as e:
        raise HTTPException(status_code=500, detail=f"Error al buscar las clases activas por nombre de materia en la base de datos: {str(e)}")

#muestra las clases activas de tal día. Y las busca por minúsculas
def get_clases_activas_por_dia(db: Session, dia: str):
    try:
        return db.query(Asignar_Aulas_Materias).filter(func.lower(Asignar_Aulas_Materias.dia) == dia.lower()).all()
    except SQLAlchemyError as e:
        raise HTTPException(status_code=500, detail=f"Error al buscar las clases activas por día en la base de datos: {str(e)}")

#mustra las clases activas de tal aula. Y las busca por minuscula
def get_clases_activas_por_nombre_aula(db: Session, nombre_aula: str):
    try:
        nombre_aula_lower = nombre_aula.lower() 
        return db.query(Asignar_Aulas_Materias).join(Aula).filter(func.lower(Aula.nombre) == nombre_aula_lower).all()
    except SQLAlchemyError as e:
        raise HTTPException(status_code=500, detail=f"Error al buscar las clases activas por nombre de aula en la base de datos: {str(e)}")

#**CREAR**
def create_Aula(db: Session, aula: AulaData):
    try:
        nuevo_Aula = Aula(nombre=aula.nombre)
        db.add(nuevo_Aula)
        db.commit()
        return nuevo_Aula
    except IntegrityError as e:
        db.rollback()  
        raise HTTPException(status_code=400, detail=f"Error de integridad, posible id duplicado: {e.orig.diag.message_detail}")
    except SQLAlchemyError as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=f"Error interactuando con la base de datos: {str(e)}")
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=f"Error inesperado: {str(e)}")

def create_Materia(db: Session, materia: MateriaData):
    try:
        nueva_Materia = Materia(nombre=materia.nombre, carrera=materia.carrera)
        db.add(nueva_Materia)
        db.commit()
        return nueva_Materia
    except IntegrityError as e:
        db.rollback() 
        raise HTTPException(status_code=400, detail=f"Error de integridad, posible id duplicado: {e.orig.diag.message_detail}")
    except SQLAlchemyError as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=f"Error interactuando con la base de datos: {str(e)}")
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=f"Error inesperado: {str(e)}")

def create_Clase(db: Session, clase: Asignar_Aulas_Materias_Data):
    try:
        nueva_clase = Asignar_Aulas_Materias(
            id_aula=clase.id_aula,
            id_materia=clase.id_materia,
            dia=clase.dia,
            hora_inicial=clase.hora_inicial,
            hora_final=clase.hora_final
        )
        db.add(nueva_clase)
        db.commit()
        return nueva_clase
    except IntegrityError as e:
        db.rollback()  
        print(f"Error de integridad: {e}")
        raise ValueError("Error de integridad, verifica las claves foráneas y restricciones.")
    except SQLAlchemyError as e:
        db.rollback()
        print(f"Error general de SQLAlchemy: {e}")
        raise ValueError("Error al interactuar con la base de datos.")

#**EDITAR**

#para editar un aula
def editar_Aula(db: Session, id: int, nueva_info: AulaData):
    aula = db.query(Aula).filter(Aula.id == id).first()
    if aula:
        try:
            aula.nombre = nueva_info.nombre
            db.commit()
            return aula
        except IntegrityError:
            db.rollback()
            raise HTTPException(status_code=400, detail="Ya existe un aula con ese nombre.")
    else:
        raise HTTPException(status_code=404, detail="Aula no encontrada.")

#para editar una materia
def editar_Materia(db: Session, id: int, nueva_info: MateriaData):
    materia = db.query(Materia).filter(Materia.id == id).first()
    if materia:
        try:
            materia.nombre = nueva_info.nombre
            materia.carrera = nueva_info.carrera
            db.commit()
            return materia
        except IntegrityError:
            db.rollback()
            raise HTTPException(status_code=400, detail="Ya existe una materia con ese nombre.")
    else:
        raise HTTPException(status_code=404, detail="Materia no encontrada.")
    
#para editar una clase activa
def editar_Clase_Activa(db: Session, id_aula: int, id_materia: int, nueva_info: Asignar_Aulas_Materias_Data):
    clase_activa = db.query(Asignar_Aulas_Materias).filter_by(id_aula=id_aula, id_materia=id_materia).first()
    if clase_activa:
        try:
            clase_activa.dia = nueva_info.dia
            clase_activa.hora_inicial = nueva_info.hora_inicial
            clase_activa.hora_final = nueva_info.hora_final
            db.commit()
            return clase_activa
        except IntegrityError:
            db.rollback()
            raise HTTPException(status_code=400, detail="Error de integridad al actualizar la clase activa.")
    else:
        raise HTTPException(status_code=404, detail="Clase activa no encontrada.")

#**BORRAR**

#borrar una materia por su nombre. Las paso a minusculas
def delete_materia_by_nombre(db: Session, nombre: str):
    if not isinstance(nombre, str):  # Verificar si el nombre no es un str
        raise HTTPException(status_code=400, detail="El nombre debe ser una cadena de caracteres.")
    
    nombre_lower = nombre.lower()  # Convertir el nombre a minúsculas
    materia = db.query(Materia).filter(func.lower(Materia.nombre) == nombre_lower).first()
    if materia:
        try:
            db.delete(materia)
            db.commit()
            return {"message": "Materia eliminada exitosamente"}
        except IntegrityError:
            db.rollback()
            raise HTTPException(status_code=400, detail="Error de integridad al eliminar la materia.")
    else:
        raise HTTPException(status_code=404, detail="Materia no encontrada.")
    
#borrar un aula por su nombre. Paso las variables a minusculas
def delete_aula_by_nombre(db: Session, nombre: str):
    if not isinstance(nombre, str):  # Verificar si el nombre no es un str
        raise HTTPException(status_code=400, detail="El nombre debe ser una cadena de caracteres.")
    
    nombre_lower = nombre.lower()  # Convertir el nombre a minúsculas
    aula = db.query(Aula).filter(func.lower(Aula.nombre) == nombre_lower).first()
    if aula:
        try:
            db.delete(aula)
            db.commit()
            return {"message": "Aula eliminada exitosamente"}
        except IntegrityError:
            db.rollback()
            raise HTTPException(status_code=400, detail="Error de integridad al eliminar el aula.")
    else:
        raise HTTPException(status_code=404, detail="Aula no encontrada.")
    
#borra una materia pidiendo su ID
def delete_materia_by_id(db: Session, materia_id: int):
    materia = db.query(Materia).filter(Materia.id == materia_id).first()
    if materia:
        try:
            db.delete(materia)
            db.commit()
            return {"message": "Materia eliminada exitosamente"}
        except IntegrityError:
            db.rollback()
            raise HTTPException(status_code=400, detail="Error de integridad al eliminar la materia.")
    else:
        raise HTTPException(status_code=404, detail="Materia no encontrada.")
    
#borrar un aula pidiendo el ID
def delete_aula_by_id(db: Session, aula_id: int):
    aula = db.query(Aula).filter(Aula.id == aula_id).first()
    if aula:
        try:
            db.delete(aula)
            db.commit()
            return {"message": "Aula eliminada exitosamente"}
        except IntegrityError:
            db.rollback()
            raise HTTPException(status_code=400, detail="Error de integridad al eliminar el aula.")
    else:
        raise HTTPException(status_code=404, detail="Aula no encontrada.")
    

#borrar una clase pidiendo todos los datos
#esto porque una misma materia se puede dar en una clase en mas de un dia, o en mas de 1 vez en un mismo dia
def delete_clase(db: Session, id_aula: int, id_materia: int, dia: str, hora_inicial: int, hora_final: int):
    clase = db.query(Asignar_Aulas_Materias).filter(
        Asignar_Aulas_Materias.id_aula == id_aula,
        Asignar_Aulas_Materias.id_materia == id_materia,
        Asignar_Aulas_Materias.dia == dia,
        Asignar_Aulas_Materias.hora_inicial == hora_inicial,
        Asignar_Aulas_Materias.hora_final == hora_final
    ).first()
    if clase:
        db.delete(clase)
        db.commit()
        return {"message": "Clase eliminada exitosamente"}
    else:
        raise HTTPException(status_code=404, detail="Clase no encontrada.")
    
