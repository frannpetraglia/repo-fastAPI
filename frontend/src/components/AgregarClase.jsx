import React, { useState, useEffect } from "react";
import axios from "axios";
import {Button, Center, FormControl, FormHelperText, FormLabel, HStack, Input, 
    InputGroup, NumberInput, NumberInputField, Select, VStack} from '@chakra-ui/react';

function AgregarClase(){

    const [aulas, setAulas] = useState([]);
    const [materias, setMaterias] = useState([]);
    // Estados para almacenar los valores seleccionados
    const [selectedAula, setSelectedAula] = useState("");
    const [selectedMateria, setSelectedMateria] = useState("");
    const [selectedDia, setSelectedDia] = useState("");
    const [horaInicio, setHoraInicio] = useState(7);
    const [horaFin, setHoraFin] = useState(8);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const responseAulas = await axios.get("http://localhost:5555/api/aulas/");
                setAulas(responseAulas.data);
                
                const responseMaterias = await axios.get("http://localhost:5555/api/materias/");
                setMaterias(responseMaterias.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, []);

    const handleAgregarClase = async () => {
        
        if(!selectedAula || !selectedMateria || !selectedDia){
            alert("Asegúrese de completar todos los campos antes de terminar");
            return;
        }


        // Realizar solicitud POST para agregar la clase con los valores seleccionados
        try {
            await axios.post("http://localhost:5555/api/clases/crear-clase", {
                id_aula: selectedAula,
                id_materia: selectedMateria,
                dia: selectedDia,
                hora_inicial: horaInicio,
                hora_final: horaFin
            });
            alert("¡Clase agregada exitosamente!");
            await window.location.reload();
        } catch (error) {
            alert("Error al agregar la clase. Por favor, inténtelo de nuevo.");
            console.error("Error:", error);
        }
    };

    return(
        <VStack>

            <Center
                fontWeight='bold'
                fontSize={[10,30]}
            >
                Agregar una Clase
            </Center>
            <FormControl>
                <FormLabel
                    fontWeight={'bold'}
                    fontSize={[8,20]}
                >
                    Seleccione un Aula
                </FormLabel>
                <InputGroup>
                    <Select 
                        placeholder="Seleccione un Aula"
                        value={selectedAula} 
                        onChange={(e) => setSelectedAula(e.target.value)}
                    >
                        {aulas.map((aula) => (
                            <option key={aula.id} value={aula.id}>{aula.nombre}</option>
                        ))}
                    </Select>
                </InputGroup>
                <FormHelperText>El aula donde se dictara la clase</FormHelperText>
            </FormControl>
            <FormControl>
                <FormLabel
                    fontWeight={'bold'}
                    fontSize={[8,20]}
                >
                    Seleccione una Materia
                </FormLabel>
                <InputGroup>
                    <Select 

                        placeholder="Seleccione una Materia"
                        value={selectedMateria} 
                        onChange={(e) => setSelectedMateria(e.target.value)}
                        
                    >
                        {materias.map((materia) => (
                            <option key={materia.id} value={materia.id}>{materia.nombre}</option>
                        ))}
                    </Select>
                </InputGroup>
                <FormHelperText>La materia de la clase en cuestion</FormHelperText>
            </FormControl>
            <FormControl>
                <FormLabel
                    fontWeight={'bold'}
                    fontSize={[8,20]}
                >
                    Seleccione el Dia
                </FormLabel>
                <InputGroup>
                    <Select 
                        placeholder="Seleccione el dia"
                        value={selectedDia} 
                        onChange={(e) => setSelectedDia(e.target.value)}
                        >
                        <option value="LUNES">Lunes</option>
                        <option value="MARTES">Martes</option>
                        <option value="MIERCOLES">Miércoles</option>
                        <option value="JUEVES">Jueves</option>
                        <option value="VIERNES">Viernes</option>
                        <option value="SABADO">Sábado</option>
                    </Select>
                </InputGroup>
                <FormHelperText>El dia en el que se dictara la clase</FormHelperText>
            </FormControl>
            <HStack>
                <FormControl>
                    <FormLabel
                        fontWeight={'bold'}
                        fontSize={[8,20]}
                    >
                        Hora Inicio
                    </FormLabel>
                    <InputGroup>
                        <NumberInput min={7} max={22} value={horaInicio} onChange={setHoraInicio}>
                            <NumberInputField />
                        </NumberInput>
                    </InputGroup>
                </FormControl>
                <FormControl>
                    <FormLabel
                        fontWeight={'bold'}
                        fontSize={[8,20]}
                    >
                        Hora Fin
                    </FormLabel>
                    <InputGroup>
                        <NumberInput min={8} max={23} value={horaFin} onChange={setHoraFin}>
                            <NumberInputField />
                        </NumberInput>
                    </InputGroup>
                </FormControl>
            </HStack>
            <Button
                p={3}
                backgroundColor={'#23c865'}
                color={'#000502'}
                _hover={{
                    color:'#e8e8f1',
                    background: '#851ab6',
                    transition: 'filter 300ms'
                }}    
                onClick={handleAgregarClase}       
            >
                Agregar
            </Button>
        </VStack>
    )
}

export default AgregarClase;