#!/bin/bash

echo " Bienvenido a despligue de aplicaciones 1.0.clash"
echo " Por favor no se olvide de configurar el archivo Configurations antes de ejecutar el script"
echo " Presione el numero de la accion que desea ejecutar:"
echo " 1) Desplegar Docker solo  frontend"
echo " 2) Desplegar Docker solo Backend"
echo " 3) Desplegar Ambos entornos"
echo " 4) Detener frontend"
echo " 5) Detener BackEnd"
echo " 6) Detener Ambos entornos"
echo " 7) Visualizar todos los Docker iniciados"
echo " 0) Salir"

while :
do
    read INPUT_STRING
    case "$INPUT_STRING" in
        1)
            echo Desplegando frontend
	    wait 1
	    xterm -hold -e 'docker-compose -f frontend/docker-compose.yml up' &
 	    echo Seleccione otra opcion: 
            ;;

        2)
            echo Desplegando Backend
            wait 1
	    xterm -hold -e 'docker-compose -f backend/docker-compose.yml up' &
	    echo Seleccione otra opcion: 
            ;;

        3)
            echo Desplegando Ambos entornos
	    wait 1
	    xterm -hold -e 'docker-compose -f docker-compose-integrado.yml up' &
	    echo Seleccione otra opcion: 
            ;;

        4)
            echo Detener frontend
	    wait 1
	    docker-compose -f frontend/docker-compose.yml stop
	    docker-compose -f frontend/docker-compose.yml rm --force
	    echo Seleccione otra opcion: 
            ;;

        5)
            echo Detener BackEnd
	    wait 1
	    docker-compose -f backend/docker-compose.yml stop
	    docker-compose -f backend/docker-compose.yml rm --force
	    echo Seleccione otra opcion: 
            ;;

        6)
            echo Detener Ambos
	    wait 1
	    docker-compose -f docker-compose-integrado.yml stop
	    docker-compose -f docker-compose-integrado.yml rm --force
	    echo Seleccione otra opcion: 
            ;;

        7)
            echo Visualizar todos los Docker iniciados
	    wait 1
	    docker ps
	    echo Seleccione otra opcion: 
            ;;
	

        0)
            exit 1 
    	    ;;

        *)
            echo " Presione el numero de la accion que desea ejecutar:"
            echo " 1) Desplegar Docker solo  frontend"
            echo " 2) Desplegar Docker solo Backend"
            echo " 3) Desplegar Ambos entornos"
            echo " 4) Detener FrontEnd"
            echo " 5) Detener BackEnd"
            echo " 6) Detener Ambos entornos"
            echo " 7) Visualizar todos los Docker iniciados"
            echo " 0) Salir"
            ;;
    esac
done
