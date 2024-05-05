import React from "react";
import {Button, Center, FormControl, FormHelperText, FormLabel, HStack, Input, 
    InputGroup, NumberInput, NumberInputField, Select, VStack} from '@chakra-ui/react';

function AgregarClase(){

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
                    <Select placeholder="Elija un Aula">
                        <option>A01</option>
                        <option>A02</option>
                        <option>A03</option>
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
                    <Select placeholder="Elija una Materia">
                        <option>Fisica 1</option>
                        <option>Matematica 1</option>
                        <option>Logica 2</option>
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
                    <Select placeholder="Elija un dia">
                        <option>LUNES</option>
                        <option>MARTES</option>
                        <option>MIERCOLES</option>
                        <option>JUEVES</option>
                        <option>VIERNES</option>
                        <option>SABADO</option>
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
                        <NumberInput min={7} max={22}>
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
                        <NumberInput min={8} max={23}>
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
            >
                Agregar
            </Button>
        </VStack>
    )
}

export default AgregarClase;