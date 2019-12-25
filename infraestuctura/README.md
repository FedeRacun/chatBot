# Utilizar Despligue de Entornos 

## Maintained by: [Equipo DevOps]
### Configurar el archivo  "Configuration" con las variables necesarias y sus respectivos volumenes.
Se debe tener clonado el repositorio/s con el que se va a trabajar

```
#Volumenes:

FRONT=/path-del-codigo-frontend    
 #Ejemplo FRONT=/home/pfernandez/Infraestructura 
BACK=/path-del-codigo-backend
 #Ejemplo BACK=/home/pfernandez/Infraestructura/backend/backend-vol


```

### Para Iniciar nuestras instancias en OS Ubuntu
 `sh IniciarEntorno.sh`


### El stack cuenta con ejemplo en cada uno de los entornos
El ejemplo se inicia en localhost:4201.
Para ejecutar dichos ejemplos no debe olvidarse de utilizar los path correspondientes:

"ruta en donde se clono el proyecto infraestructura"/frontend/frontend-vol





# Usar compose

## Maintained by: [Equipo DevOps]
### Construir imagenes
 `docker-compose build`.
### Iniciar instancias
 `docker-compose up`.
### Detener instancias
 `docker-compose stop`.
### remover las instancias
`docker-compose rm --force`
