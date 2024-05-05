import React from "react";
import { Button, Center, FormControl, FormHelperText, FormLabel, Input, InputGroup, Select, VStack } from "@chakra-ui/react";

function ModificarMateria(){

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
                    <Select placeholder="Elija la que desea modificar">
                        <option>Fisica 1</option>
                        <option>Matematica 1</option>
                        <option>Logica 2</option>
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
                    <Input variant={'outline'} placeholder="Ingrese aqui el nombre de la materia" />
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
                    <Input variant={'outline'} placeholder="Ingrese aqui el nombre de la carrera" />
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
            >
                Modificar
            </Button>
        </VStack>
    )
}

export default ModificarMateria;