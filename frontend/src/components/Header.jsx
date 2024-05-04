import React from "react";
import { Link } from "react-router-dom";
import {Box, Button, Center, Flex, HStack, Image, ListItem,
    Menu, MenuButton, MenuItem, MenuList, Stack, VStack, Wrap} from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';

import logoUTN from '/public/logo-utn-frp-sin-fondo.png';

function Header(){

    return(
        
        <Stack
            direction="column"
            marginTop={0}            
            p={5}
            bgGradient="linear(to-r, rgba(12,148,76,1) 0%, rgba(26,182,96,1) 25%, rgba(35,200,101,1) 50%, rgba(26,182,96,1) 75%, rgba(12,148,76,1) 100%)"
        >   
            <HStack>
            <Box
               p={3}
            >
                <Image src={logoUTN} alt='logo UTN'/>
            </Box>
            <Center
                fontWeight='bold'
                fontSize={[10,40]}
                color={'#9100ff'}
            >
                UTN FACULTAD REGIONAL PARANA
            </Center>
            <Box
                p={3}
            >
                <Image src={logoUTN} alt='logo UTN'/>
            </Box>
            </HStack>

            <Flex
                flexDirection={['column','row']}
                alignItems='center'
                justifyContent='center'
                width='100%'
            >
                <HStack
                    spacing={[2,10]}
                >
                    <Menu _hover={{ bgColor:"fff", borderColor: "#9100ff" }}>
                        <MenuButton color={'#9100ff'} as={Button} rightIcon={<ChevronDownIcon />}>
                            Aulas
                        </MenuButton>
                        <MenuList>
                            <MenuItem>
                                <Link to="/AgregarAula">
                                    Agregar Aula
                                </Link>
                            </MenuItem>
                            <MenuItem>
                                <Link to="/ModificarAula">
                                    Modificar Aula
                                </Link>
                            </MenuItem>
                            <MenuItem>
                                <Link to="/BorrarAula">
                                    Borrar Aula
                                </Link>
                            </MenuItem>
                        </MenuList>
                    </Menu>
                    <Button color={'#9100ff'}>
                        <Link to="/Cartelera">
                            Cartelera
                        </Link>
                    </Button>
                    <Menu>
                        <MenuButton color={'#9100ff'} as={Button} rightIcon={<ChevronDownIcon />}>
                            Clases
                        </MenuButton>
                        <MenuList>
                            <MenuItem>
                                <Link to="/AgregarClase">
                                    Agregar Clase
                                </Link>
                            </MenuItem>
                            <MenuItem>
                                <Link to="/BorrarClase">
                                    Borrar Clase
                                </Link>
                            </MenuItem>
                        </MenuList>
                    </Menu>
                    <Menu>
                        <MenuButton color={'#9100ff'} as={Button} rightIcon={<ChevronDownIcon />}>
                            Materias
                        </MenuButton>
                        <MenuList>
                            <MenuItem>
                                <Link to="/AgregarMateria">
                                    Agregar Materia
                                </Link>
                            </MenuItem>
                            <MenuItem>
                                <Link to="/ModificarMateria">
                                    Modificar Materia
                                </Link>
                            </MenuItem>
                            <MenuItem>
                                <Link to="/BorrarMateria">
                                    Borrar Materia
                                </Link>
                            </MenuItem>
                        </MenuList>
                    </Menu>
                </HStack>
            </Flex>
        </Stack>
    )
}

export default Header;