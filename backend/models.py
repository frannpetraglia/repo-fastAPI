from sqlalchemy import Column, String, Integer, Table, ForeignKey, UniqueConstraint, ForeignKeyConstraint
from sqlalchemy.orm import relationship
from database import Base, localSession

#crea las tablas de la base de datos

class Materia(Base):
    __tablename__ = 'materia'
    id = Column(Integer, primary_key=True, index=True)
    nombre = Column(String(50), index=True, unique=True)
    carrera = Column(String(70))
    aulas = relationship("Asignar_Aulas_Materias", back_populates="materia", cascade="all, delete", passive_deletes=True)
    

class Aula(Base):
    __tablename__ = 'aula'
    id = Column(Integer, primary_key=True, index=True)
    nombre = Column(String(15), unique=True)
    materias = relationship("Asignar_Aulas_Materias", back_populates="aula", cascade="all, delete", passive_deletes=True)



class Asignar_Aulas_Materias(Base):
    __tablename__ = 'asignar_aulas_materias'
    id = Column(Integer, primary_key=True, index=True)
    id_aula = Column(Integer, ForeignKey('aula.id'))
    id_materia = Column(Integer, ForeignKey('materia.id'))
    dia = Column(String(10))
    hora_inicial = Column(Integer)
    hora_final = Column(Integer)

    aula = relationship('Aula')
    materia = relationship('Materia')

    __table_args__ = (
        ForeignKeyConstraint([id_aula], ['aula.id'], name='fk_aula_id'),
        ForeignKeyConstraint([id_materia], ['materia.id'], name='fk_materia_id')
    )