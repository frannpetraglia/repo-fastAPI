from sqlalchemy import Column, String, Integer, Table, ForeignKey, UniqueConstraint, ForeignKeyConstraint
from sqlalchemy.orm import relationship
from database import Base, localSession


class Materia(Base):
    __tablename__ = 'materia'
    id = Column(Integer, primary_key=True, index=True)
    nombre = Column(String, unique=True)

class Aula(Base):
    __tablename__ = 'aula'
    id = Column(Integer, primary_key=True, index=True)
    nombre = Column(String, unique=True)

class Asignar_Aulas_Materias(Base):
    __tablename__ = 'asignar_aulas_materias'
    id_aula = Column(Integer, ForeignKey('aula.id'), primary_key=True)
    id_materia = Column(Integer, ForeignKey('materia.id'), primary_key=True)
    dia = Column(String)
    hora_inicial = Column(Integer)
    hora_final = Column(Integer)

    aula = relationship('Aula', back_populates='materias')
    materia = relationship('Materia', back_populates='aulas')

    __table_args__ = (
        ForeignKeyConstraint([id_aula], ['aula.id'], name='fk_aula_id'),
        ForeignKeyConstraint([id_materia], ['materia.id'], name='fk_materia_id')
    )