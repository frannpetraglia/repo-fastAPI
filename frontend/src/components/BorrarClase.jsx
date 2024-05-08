import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Center, FormControl, FormHelperText, FormLabel, InputGroup, Select, VStack } from "@chakra-ui/react";

function BorrarClase(){

    const [clases, setClases] = useState([]);
    const [selectedClase, setSelectedClase] = useState();
    const [aulaNombres, setAulaNombres] = useState({});
    const [materiaNombres, setMateriaNombres] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const responseClases = await axios.get("http://localhost:5555/api/clases/");
                setClases(responseClases.data);

                const responseAulas = await axios.get("http://localhost:5555/api/aulas/");
                const aulaNombresObj = {};
                responseAulas.data.forEach((aula) => {
                    aulaNombresObj[aula.id] = aula.nombre;
                });
                setAulaNombres(aulaNombresObj);

                const responseMaterias = await axios.get("http://localhost:5555/api/materias/");
                const materiaNombresObj = {};
                responseMaterias.data.forEach((materia) => {
                    materiaNombresObj[materia.id] = materia.nombre;
                });
                setMateriaNombres(materiaNombresObj);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, []);

    async function eliminarLaClase(){
        
        if (!selectedClase) {
            alert("Debe seleccionar una clase antes de eliminar.");
            return;
        }
    
        try {
        await axios.delete(`http://localhost:5555/api/clases/borrar-clase-por-id/${selectedClase}`);
        alert("¡Clase eliminada exitosamente!");
        await window.location.reload();
        } catch (error) {
        alert("Error al eliminar la clase. Por favor, inténtelo de nuevo.");
        console.error("Error:", error);
    }
    }


    function claseElegida(e){
        setSelectedClase(e.target.value);

    }


    return(
        <VStack>
            <Center
                fontWeight='bold'
                fontSize={[10,30]}
            >
                Borrar una Clase
            </Center>
            <FormControl>
                <FormLabel
                    fontWeight={'bold'}
                    fontSize={[8,20]}
                >
                    Seleccione una Clase
                </FormLabel>
                <InputGroup>
                    <Select onChange={claseElegida} placeholder="Elija la que desea eliminar">
                        {clases.map((clase) => (
                            <option key={clase.id} value={clase.id}>
                                {`Aula: ${aulaNombres[clase.id_aula]}, ${materiaNombres[clase.id_materia]}. El día ${clase.dia} de ${clase.hora_inicial} hs a ${clase.hora_final} hs`}
                            </option>
                        ))}
                    </Select>
                </InputGroup>
                <FormHelperText>Si no la encuentra aqui, verifique que estuviera previamente creada</FormHelperText>
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
                onClick={eliminarLaClase}
            >
                Borrar
            </Button>
        </VStack>
    )
}

export default BorrarClase;