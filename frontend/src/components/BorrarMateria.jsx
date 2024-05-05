import React from "react";
import { Button, Center, FormControl, FormHelperText, FormLabel, InputGroup, Select, Text, VStack } from "@chakra-ui/react";

function BorrarMateria(){

    return(
        <VStack>
            <Center
                fontWeight='bold'
                fontSize={[10,30]}
            >
                Borrar una Materia
            </Center>
            <FormControl>
                <FormLabel
                    fontWeight={'bold'}
                    fontSize={[8,20]}
                >
                    Seleccione una Materia
                </FormLabel>
                <InputGroup>
                    <Select placeholder="Elija la que desea eliminar">
                        <option>Fisica 1</option>
                        <option>Matematica 1</option>
                        <option>Logica 2</option>
                    </Select>
                </InputGroup>
                <FormHelperText>Si no la encuentra aqui, verifique que estuviera previamente creada</FormHelperText>
            </FormControl>
            <Text>Recuerde que al eliminar una Materia, todas sus clases asociadas desapareceran</Text>
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

export default BorrarMateria;