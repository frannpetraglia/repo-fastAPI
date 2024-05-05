import React from "react";
import { Button, Center, FormControl, FormHelperText, FormLabel, InputGroup, Select, Text, VStack } from "@chakra-ui/react";


function BorrarAula(){

    return(
        <VStack>
            <Center
                fontWeight='bold'
                fontSize={[10,30]}
            >
                Borrar un Aula
            </Center>
            <FormControl>
                <FormLabel
                    fontWeight={'bold'}
                    fontSize={[8,20]}
                >
                    Seleccione un Aula
                </FormLabel>
                <InputGroup>
                    <Select placeholder="Elija la que desea eliminar">
                        <option>A01</option>
                        <option>A02</option>
                        <option>A03</option>
                    </Select>
                </InputGroup>
                <FormHelperText>Si no la encuentra aqui, verifique que estuviera previamente creada</FormHelperText>
            </FormControl>
            <Text>Recuerde que al eliminar un Aula, todas sus clases asociadas desapareceran</Text>
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

export default BorrarAula;