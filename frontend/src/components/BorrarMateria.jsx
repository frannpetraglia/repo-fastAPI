import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Center, FormControl, FormHelperText, FormLabel, InputGroup, Select, Text, VStack } from "@chakra-ui/react";

function BorrarMateria(){

    const [materias, setMaterias] = useState([]);
    const [selectedMateria, setSelectedMateria] = useState("");

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

    const handleBorrarMateria = async () => {

        if(!selectedMateria){
            alert("Debe seleccionar una Materia para poder eliminarla");
            return;
        }

        try {
            await axios.delete(`http://localhost:5555/api/materias/borrar-materia-por-nombre/${selectedMateria}`);
            alert("¡Materia eliminada exitosamente!");
            await window.location.reload();
        } catch (error) {
            alert("Error al eliminar la materia. Por favor, inténtelo de nuevo.");
            console.error("Error:", error);
        }
    };

    return(
        <VStack>
            <Center
                fontWeight='bold'
                fontSize={[10,30]}
            >
                Borrar una Materia
            </Center>
            <FormControl>
                <FormLabel
                    fontWeight={'bold'}
                    fontSize={[8,20]}
                >
                    Seleccione una Materia
                </FormLabel>
                <InputGroup>
                    <Select value={selectedMateria} onChange={(e) => setSelectedMateria(e.target.value)} placeholder="Elija la que desea eliminar">
                        {materias.map((materia) => (
                            <option key={materia.id} value={materia.nombre}>{materia.nombre}</option>
                        ))}
                    </Select>
                </InputGroup>
                <FormHelperText>Si no la encuentra aqui, verifique que estuviera previamente creada</FormHelperText>
            </FormControl>
            <Text>Recuerde que al eliminar una Materia, todas sus clases asociadas desapareceran</Text>
            <Button
                p={3}
                backgroundColor={'#23c865'}
                color={'#000502'}
                _hover={{
                    color:'#e8e8f1',
                    background: '#851ab6',
                    transition: 'filter 300ms'
                }}      
                onClick={handleBorrarMateria}     
            >
                Borrar
            </Button>
        </VStack>
    )
}

export default BorrarMateria;