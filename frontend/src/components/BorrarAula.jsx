import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Center, FormControl, FormHelperText, FormLabel, InputGroup, Select, Text, VStack } from "@chakra-ui/react";


function BorrarAula(){

    const [aulas, setAulas] = useState([]);
    const [selectedAula, setSelectedAula] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:5555/api/aulas/");
                setAulas(response.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, []);

    const handleBorrarAula = async () => {

        if(!selectedAula){
            alert("Debe seleccionar un Aula para poder borrar");
            return;
        }

        try {
            await axios.delete(`http://localhost:5555/api/aulas/borrar-aula-por-nombre/${selectedAula}`);
            alert("¡Aula eliminada exitosamente!");
            await window.location.reload();
        } catch (error) {
            alert("Error al eliminar el aula. Por favor, inténtelo de nuevo.");
            console.error("Error:", error);
        }
    };


    return(
        <VStack>
            <Center
                fontWeight='bold'
                fontSize={[10,30]}
            >
                Borrar un Aula
            </Center>
            <FormControl>
                <FormLabel
                    fontWeight={'bold'}
                    fontSize={[8,20]}
                >
                    Seleccione un Aula
                </FormLabel>
                <InputGroup>
                    <Select value={selectedAula} onChange={(e) => setSelectedAula(e.target.value)} placeholder="Elija la que desea eliminar">
                        {aulas.map((aula) => (
                            <option key={aula.id} value={aula.nombre}>{aula.nombre}</option>
                        ))}
                    </Select>
                </InputGroup>
                <FormHelperText>Si no la encuentra aqui, verifique que estuviera previamente creada</FormHelperText>
            </FormControl>
            <Text>Recuerde que al eliminar un Aula, todas sus clases asociadas desapareceran</Text>
            <Button
                p={3}
                backgroundColor={'#23c865'}
                color={'#000502'}
                _hover={{
                    color:'#e8e8f1',
                    background: '#851ab6',
                    transition: 'filter 300ms'
                }}        
                onClick={handleBorrarAula}   
            >
                Borrar
            </Button>
        </VStack>
    )
}

export default BorrarAula;