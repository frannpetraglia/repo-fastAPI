from pydantic import BaseModel

#esquemas para los datos que uso en fastapi
#estas clases no representan tablas en la bd
#estas las uso en los endpoint de crud.py para crear, eliminar las clases en la base de datos
#las tablas de la bd estan en models.py

class MateriaData(BaseModel):
    nombre: str
    carrera: str

class MateriaId(MateriaData):
    id: int

class AulaData(BaseModel):
    nombre: str

class AulaId(AulaData):
    id: int


#aqui no se valida que los dos ids existan, eso lo hago en crud.py
class Asignar_Aulas_Materias_Data(BaseModel):
    id_aula: int
    id_materia: int
    dia: str
    hora_inicial: int
    hora_final: int

class Asignar_Aulas_Materias_Id(Asignar_Aulas_Materias_Data):
    id: int