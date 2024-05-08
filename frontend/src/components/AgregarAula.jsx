import React, { useState } from "react";
import axios from "axios";
import {Button, Center, FormControl, FormHelperText, FormLabel, Input, InputGroup, VStack} from '@chakra-ui/react';

function AgregarAula(){

    const [nombreAula, setNombreAula] = useState("");

    const handleAgregarAula = async () => {

        if(!nombreAula){
            alert("El campo de nombre no puede estar vacío");
            return;
        }

        try {
            await axios.post("http://localhost:5555/api/aulas/crear-aula", { nombre: nombreAula });
            setNombreAula("");
            alert("¡Aula agregada exitosamente!");
        } catch (error) {
            
            alert("Error al agregar el aula. Por favor, inténtelo de nuevo.");
            console.error("Error:", error);
        }
    };


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
                    <Input
                        variant={'outline'}
                        placeholder="Ingrese aquí el nombre del aula"
                        value={nombreAula}
                        onChange={(e) => setNombreAula(e.target.value)}
                    />
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
                onClick={handleAgregarAula}      
            >
                Agregar
            </Button>
        </VStack>
    )
}

export default AgregarAula;