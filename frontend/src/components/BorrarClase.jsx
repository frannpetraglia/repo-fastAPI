import React from "react";
import { Button, Center, FormControl, FormHelperText, FormLabel, InputGroup, Select, VStack } from "@chakra-ui/react";

function BorrarClase(){

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
                    <Select placeholder="Elija la que desea eliminar">
                        <option>Datos clase 1</option>
                        <option>Datos clase 2</option>
                        <option>Datos clase 3</option>
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
            >
                Borrar
            </Button>
        </VStack>
    )
}

export default BorrarClase;