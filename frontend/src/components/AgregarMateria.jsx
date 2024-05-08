import React, { useState } from "react";
import axios from "axios";
import {Button, Center, FormControl, FormHelperText, FormLabel, Input, InputGroup, VStack} from '@chakra-ui/react';


function AgregarMateria(){

    const [nombreMateria, setNombreMateria] = useState("");
    const [nombreCarrera, setNombreCarrera] = useState("");

    const handleAgregarMateria = async () => {

        // Verificar si los campos están vacíos
        if (!nombreMateria || !nombreCarrera) {
            alert("Los campos no pueden estar vacíos.");
            return;
        }

        try {
            // Realizar la solicitud POST al endpoint de la API
            await axios.post("http://localhost:5555/api/materias/crear-materia", { nombre: nombreMateria, carrera: nombreCarrera });
            // Si la solicitud es exitosa, limpiar los campos de entrada
            setNombreMateria("");
            setNombreCarrera("");
            alert("¡Materia agregada exitosamente!");
            await window.location.reload();
        } catch (error) {
            // Manejar errores de solicitud
            alert("Error al agregar la materia. Por favor, inténtelo de nuevo.");
            console.error("Error:", error);
        }
    };

    return(
        <VStack>
            <Center
                fontWeight='bold'
                fontSize={[10,30]}
            >
                Agregar una Materia
            </Center>
            <FormControl>
                <FormLabel
                    fontWeight={'bold'}
                    fontSize={[8,20]}
                >
                    Nombre de la Materia
                </FormLabel>
                <InputGroup>
                    <Input
                        variant={'outline'}
                        placeholder="Ingrese aquí el nombre de la materia"
                        value={nombreMateria}
                        onChange={(e) => setNombreMateria(e.target.value)}
                    />
                </InputGroup>
            </FormControl>
            <FormControl>
                <FormLabel
                    fontWeight={'bold'}
                    fontSize={[8,20]}
                >
                    Nombre de la Carrera
                </FormLabel>
                <InputGroup>
                    <Input
                        variant={'outline'}
                        placeholder="Ingrese aquí el nombre de la carrera"
                        value={nombreCarrera}
                        onChange={(e) => setNombreCarrera(e.target.value)}
                    />
                </InputGroup>
                <FormHelperText>La materia estara asociada a esta carrera</FormHelperText>
            </FormControl>
            <Button
                p={3}
                backgroundColor={'#23c865'}
                color={'#000502'}
                _hover={{
                    color:'#e8e8f1',
                    background: '#851ab6',
                    transition: 'filter 300ms'
                }}           
                onClick={handleAgregarMateria} // Llamar a la función para agregar la materia
            >
                Agregar
            </Button>
        </VStack>
    )
}

export default AgregarMateria;