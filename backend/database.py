from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, declarative_base

                    #apps                usuario   passw   puerto   nombre bd
URL_CONNECTION =  "postgresql+psycopg2://postgres:franco@localhost/facultad"

engine = create_engine(URL_CONNECTION)

localSession = sessionmaker(autoflush=False, autocommit=False, bind=engine)

Base = declarative_base()