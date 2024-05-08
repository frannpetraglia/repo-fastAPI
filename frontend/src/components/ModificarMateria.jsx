import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Center, FormControl, FormHelperText, FormLabel, Input, InputGroup, Select, VStack } from "@chakra-ui/react";

function ModificarMateria(){

    const [materias, setMaterias] = useState([]);
    const [selectedMateria, setSelectedMateria] = useState("");
    const [nuevoNombre, setNuevoNombre] = useState("");
    const [nuevaCarrera, setNuevaCarrera] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:5555/api/materias/");
                setMaterias(response.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, []);

    const handleModificarMateria = async () => {
        try {
            await axios.put(`http://localhost:5555/api/materias/editar-materia/${selectedMateria}`, { nombre: nuevoNombre, carrera: nuevaCarrera });
            alert("¡Materia modificada exitosamente!");
            await window.location.reload();
        } catch (error) {
            alert("Error al modificar la materia. Por favor, inténtelo de nuevo.");
            console.error("Error:", error);
        }
    };

    return(
        <VStack>

            <Center
                fontWeight='bold'
                fontSize={[10,30]}
            >
                Modificar una Materia
            </Center>
            <FormControl>
                <FormLabel
                    fontWeight={'bold'}
                    fontSize={[8,20]}
                >
                    Seleccione una Materia
                </FormLabel>
                <InputGroup>
                    <Select value={selectedMateria} onChange={(e) => setSelectedMateria(e.target.value)} placeholder="Elija la que desea modificar">
                        {materias.map((materia) => (
                            <option key={materia.id} value={materia.id}>{materia.nombre}</option>
                        ))}
                    </Select>
                </InputGroup>
                <FormHelperText>Si no la encuentra aqui, verifique que estuviera previamente creada</FormHelperText>
            </FormControl>
            <FormControl>
                <FormLabel
                    fontWeight={'bold'}
                    fontSize={[8,20]}
                >
                    Nuevo nombre de la Materia
                </FormLabel>
                <InputGroup>
                    <Input 
                        value={nuevoNombre} onChange={(e) => setNuevoNombre(e.target.value)} 
                        variant={'outline'} 
                        placeholder="Ingrese aquí el nuevo nombre de la materia" 
                    />
                </InputGroup>               
            </FormControl>
            <FormControl>
                <FormLabel
                    fontWeight={'bold'}
                    fontSize={[8,20]}
                >
                    Nombre de la carrera
                </FormLabel>
                <InputGroup>
                    <Input 
                        value={nuevaCarrera} onChange={(e) => setNuevaCarrera(e.target.value)} 
                        variant={'outline'} 
                        placeholder="Ingrese aquí el nombre de la carrera" 
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
                onClick={handleModificarMateria}
            >
                Modificar
            </Button>
        </VStack>
    )
}

export default ModificarMateria;