import React from "react";
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
                        >
                            <option>LUNES</option>
                            <option>MARTES</option>
                            <option>MIERCOLES</option>
                            <option>JUEVES</option>
                            <option>VIERNES</option>
                            <option>SABADO</option>
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
                            >
                            </Button>
                        </InputRightElement>
                    </InputGroup>
                </FormControl>
            </HStack>
            <Table border={'1px solid black'}>
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
                    <Tr>
                        <Td>LUNES</Td>
                        <Td>A01</Td>
                        <Td>Fisica 1</Td>
                        <Td>8 hs a 10 hs</Td>
                    </Tr>
                    <Tr>
                        <Td>LUNES</Td>
                        <Td>A02</Td>
                        <Td>Matematica 1</Td>
                        <Td>9 hs a 10 hs</Td>
                    </Tr>
                    <Tr>
                        <Td>MARTES</Td>
                        <Td>A03</Td>
                        <Td>Logica 2</Td>
                        <Td>14 hs a 16 hs</Td>
                    </Tr>
                </Tbody>
            </Table>
        </VStack>
    )
}

export default Cartelera;