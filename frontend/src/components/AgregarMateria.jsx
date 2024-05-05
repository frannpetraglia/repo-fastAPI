import React from "react";
import {Button, Center, FormControl, FormHelperText, FormLabel, Input, InputGroup, VStack} from '@chakra-ui/react';


function AgregarMateria(){

    return(
        <VStack>
            <Center
                fontWeight='bold'
                fontSize={[10,30]}
            >
                Agregar una Materia
            </Center>
            <FormControl>
                <FormLabel
                    fontWeight={'bold'}
                    fontSize={[8,20]}
                >
                    Nombre de la Materia
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
                    Nombre de la Carrera
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
                Agregar
            </Button>
        </VStack>
    )
}

export default AgregarMateria;