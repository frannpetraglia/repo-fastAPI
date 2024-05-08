import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Center, FormControl, FormHelperText, FormLabel, Input, InputGroup, Select, VStack } from "@chakra-ui/react";


function ModificarAula(){

    const [aulas, setAulas] = useState([]);
    const [selectedAula, setSelectedAula] = useState("");
    const [nuevoNombre, setNuevoNombre] = useState("");

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

    const handleModificarAula = async () => {
        try {
            const aulaSeleccionada = aulas.find(aula => aula.id === parseInt(selectedAula)); // Convertir el ID a entero
            if (!aulaSeleccionada) {
                alert("Aula no válida. Por favor, seleccione un aula válida.");
                return;
            }
            
            await axios.put(`http://localhost:5555/api/aulas/editar-aula/${aulaSeleccionada.id}`, { nombre: nuevoNombre });
            alert("¡Aula modificada exitosamente!");
            await window.location.reload();
        } catch (error) {
            alert("Error al modificar el aula. Por favor, inténtelo de nuevo.");
            console.error("Error:", error);
        }
    };
    
    return(
        <VStack>

            <Center
                fontWeight='bold'
                fontSize={[10,30]}
            >
                Modificar un Aula
            </Center>
            <FormControl>
                <FormLabel
                    fontWeight={'bold'}
                    fontSize={[8,20]}
                >
                    Seleccione un Aula
                </FormLabel>
                <InputGroup>
                    <Select value={selectedAula} onChange={(e) => setSelectedAula(e.target.value)} placeholder="Elija la que desea modificar">
                        {aulas.map((aula) => (
                            <option key={aula.id} value={aula.id}>{aula.nombre}</option>
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
                    Nuevo nombre para el Aula
                </FormLabel>
                <InputGroup>
                <Input 
                    value={nuevoNombre} onChange={(e) => setNuevoNombre(e.target.value)} 
                    variant={'outline'} 
                    placeholder="Ingrese aquí el nuevo nombre del aula" 
                />
                </InputGroup>
                <FormHelperText>Las aulas generalmente llevan el caracter A-B segun el piso, y su numero</FormHelperText>                
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
                onClick={handleModificarAula}    
            >
                Modificar
            </Button>
        </VStack>
    )
}

export default ModificarAula;