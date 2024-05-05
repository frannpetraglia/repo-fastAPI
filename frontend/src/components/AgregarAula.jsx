import React from "react";
import {Button, Center, FormControl, FormHelperText, FormLabel, Input, InputGroup, VStack} from '@chakra-ui/react';

function AgregarAula(){

    return(
        <VStack>
            <Center
                fontWeight='bold'
                fontSize={[10,30]}
            >
                Agregar un Aula
            </Center>
            <FormControl>
                <FormLabel
                    fontWeight={'bold'}
                    fontSize={[8,20]}
                >
                    Nombre del Aula
                </FormLabel>
                <InputGroup>
                    <Input variant={'outline'} placeholder="Ingrese aqui el nombre del aula" />
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
            >
                Agregar
            </Button>
        </VStack>
    )
}

export default AgregarAula;