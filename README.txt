TFE Gabriel Blanco Noce

Esta es una web que te permitira crear tus propios Drones y Parcelas. 
Para luego asignar los drones a la fumigacion de las parcelas.

Para poder desplegarlo:

PASO 1:

 Descomprimir el RAR y acceder a la carpeta atravez del terminal

PASO 2:

Una vez dentro de la carpeta ejecutar el siguiente comando
 ' npx hardhat node '

Esto te desplegara un nodo blockchain local para trabajar con mas facilidad

PASO 3:

Una vez el nodo este corriendo correctamente, ejecutar el siguiente comando
 ' npx hardhat run scripts/deploy.js --network hardhat '

Esto desplegara los contratos y te dara las address de las mismas.

PASO 4: 

Dirigete al archivo "address.json" que se encuestra en la carpeta "src". 
Ahi dentro podras pegar el address del contrato gestion que desplegaste anteriormente.

PASO 5:

Una ves hayas actualizado la address, guardalo y ejecuta el siguiente comando.
 'npm start'

Esto desplegara la web de react.

PASO 6:

Una vez se despliegue correctamente la web procedes a conectar tu metamask con el nodo localhost.

Y ya podras interaactuar con la web con total normalidad.
