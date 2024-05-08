import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Center, FormControl, FormLabel, HStack, Input,
    InputGroup, InputRightElement, Select, VStack } from "@chakra-ui/react";
import{
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
} from "@chakra-ui/react";


function Cartelera(){

    const [clases, setClases] = useState([]);
    const [aulaNombres, setAulaNombres] = useState({});
    const [materiaNombres, setMateriaNombres] = useState({});
    //para buscar por materia
    const [nombreMateria, setNombreMateria] = useState("");
    //para buscar por aula
    const [nombreAula, setNombreAula] = useState("");
    //para buscar por dia
    const [selectedDia, setSelectedDia] = useState("");
  
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

    const handleBuscarMateria = async () => {

        if (!nombreMateria.trim()) {
            alert("Para realizar la busqueda, el campo Nombre de la Materia no puede estar vacío");
            return;
        }

        try {
            const response = await axios.get(`http://localhost:5555/api/clases/buscar-por-materia/${nombreMateria}`);
            setClases(response.data);
        } catch (error) {
            console.error("Error buscando clases por materia:", error);
        }
    };

    const handleBuscarAula = async () => {
        if (!nombreAula.trim()) {
            alert("Para la busqueda, el campo Nombre del Aula no puede estar vacío");
            return;
        }

        try {
            const response = await axios.get(`http://localhost:5555/api/clases/buscar-por-aula/${nombreAula}`);
            setClases(response.data);
        } catch (error) {
            console.error("Error buscando clases por aula:", error);
        }
    };

    const handleBuscarDia = async () => {
        if (!selectedDia) {
            alert("Por favor, seleccione un día para realizar la búsqueda");
            return;
        }

        try {
            const response = await axios.get(`http://localhost:5555/api/clases/buscar-por-dia/${selectedDia}`);
            setClases(response.data);
        } catch (error) {
            console.error("Error buscando clases por día:", error);
        }
    };

    return(
        <VStack>
            <Center
                fontWeight='bold'
                fontSize={[10,30]}
            >
                Cartelera Informativa
            </Center>
            <HStack>
                <FormControl>
                    <FormLabel
                        fontWeight={'bold'}
                        fontSize={[8,20]}
                    >
                        Buscar por Materia
                    </FormLabel>
                    <InputGroup>
                        <Input 
                            placeholder="Nombre de la Materia" 
                            rounded="full" 
                            border="1px solid black"
                            _hover={
                                {
                                    border: "1px solid #28d77a",
                                }
                            }
                            value={nombreMateria}
                            onChange={(e) => setNombreMateria(e.target.value)}
                        />
                        <InputRightElement>
                            <Button
                                rounded="full" 
                                bgColor={"#28d77a"}
                                children="🔍"
                                _hover={{
                                    border: "1px solid #28d77a",
                                    color:'#e8e8f1',
                                    background: '#09f276',
                                    transition: 'filter 300ms'
                                }} 
                                onClick={handleBuscarMateria}
                            >
                            </Button>
                        </InputRightElement>
                    </InputGroup>
                </FormControl>
                <FormControl>
                    <FormLabel
                        fontWeight={'bold'}
                        fontSize={[8,20]}
                    >
                        Buscar por Aula
                    </FormLabel>
                    <InputGroup>
                        <Input 
                            placeholder="Nombre del Aula" 
                            rounded="full" 
                            border="1px solid black"
                            _hover={
                                {
                                    border: "1px solid #28d77a",
                                }
                            }
                            value={nombreAula}
                            onChange={(e) => setNombreAula(e.target.value)}
                        />
                        <InputRightElement>
                            <Button
                                rounded="full" 
                                bgColor={"#28d77a"}
                                children="🔍"
                                _hover={{
                                    border: "1px solid #28d77a",
                                    color:'#e8e8f1',
                                    background: '#09f276',
                                    transition: 'filter 300ms'
                                }} 
                                onClick={handleBuscarAula}
                            >
                            </Button>
                        </InputRightElement>
                    </InputGroup>
                </FormControl>
                <FormControl>
                    <FormLabel
                        fontWeight={'bold'}
                        fontSize={[8,20]}
                    >
                        Buscar por Dia
                    </FormLabel>
                    <InputGroup>
                        <Select 
                            placeholder="Seleccione el dia" 
                            rounded="full"
                            border="1px solid black"
                            _hover={
                                {
                                    border: "1px solid #28d77a",
                                }
                            }
                            value={selectedDia}
                            onChange={(e) => setSelectedDia(e.target.value)}
                        >
                            <option value="LUNES">LUNES</option>
                            <option value="MARTES">MARTES</option>
                            <option value="MIERCOLES">MIÉRCOLES</option>
                            <option value="JUEVES">JUEVES</option>
                            <option value="VIERNES">VIERNES</option>
                            <option value="SABADO">SÁBADO</option>
                        </Select>
                        <InputRightElement>
                            <Button
                                rounded="full" 
                                bgColor={"#28d77a"}
                                children="🔍"
                                _hover={{
                                    border: "1px solid #28d77a",
                                    color:'#e8e8f1',
                                    background: '#09f276',
                                    transition: 'filter 300ms'
                                }} 
                                onClick={handleBuscarDia}
                            >
                            </Button>
                        </InputRightElement>
                    </InputGroup>
                </FormControl>
            </HStack>
            <Table mt={2} border={'1px solid black'} >
                <Thead
                    bgColor={'#23c865'}
                    border={'1px solid black'}                    
                >
                    <Tr>
                        <Th border={'1px solid black'} color={'#000502'}>Dia</Th>
                        <Th border={'1px solid black'} color={'#000502'}>Aula</Th>
                        <Th border={'1px solid black'} color={'#000502'}>Materia</Th>
                        <Th border={'1px solid black'} color={'#000502'}>Horario</Th>
                    </Tr>
                </Thead>
                <Tbody border={'1px solid black'}>
                    {clases.map(clase => (
                        <Tr key={clase.id} border={'1px solid black'}>
                            <Td>{clase.dia}</Td>
                            <Td>{aulaNombres[clase.id_aula]}</Td>
                            <Td>{materiaNombres[clase.id_materia]}</Td>
                            <Td>{`De ${clase.hora_inicial} hs a ${clase.hora_final} hs`}</Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
        </VStack>
    )
}

export default Cartelera;