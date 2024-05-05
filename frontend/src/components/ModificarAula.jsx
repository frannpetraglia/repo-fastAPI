import React from "react";
import { Button, Center, FormControl, FormHelperText, FormLabel, Input, InputGroup, Select, VStack } from "@chakra-ui/react";


function ModificarAula(){

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
                    <Select placeholder="Elija la que desea modificar">
                        <option>A01</option>
                        <option>A02</option>
                        <option>A03</option>
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
                Modificar
            </Button>
        </VStack>
    )
}

export default ModificarAula;