## Description
Abstracción de manejo de eventos, su objetivo de la librería de event-lib es publicar y escuchar mensajes.<br>

Instalación del paquete.
```
npm install event-lib
```

Para hacer uso de la librería se debe agregar las siguientes variables.
```
#AWS
EVENT_AWS_REGION="us-east-1"

#Provider
PROVIDER="AWS"
```

### Producer
Variables del producer.

```
#Producer
EVENT_CONNECT_STRING=""
SOURCE_NAME=""
```

En la variable de 'EVENT_CONNECT_STRING' se asigna el valor de arn del SNS. <br>
En la variable de 'SOURCE_NAME' se asigna el nombre del microservicio quien envia el mensaje. Ejemplo SOURCE_NAME='hook-service'. <br>


Ejemplo de uso del método de publishMessage.

```
 eventName='Nombre del evento tiene que estar definido en pasado.' ejemplo 'transaction-approved'
 publishMessage(eventName, JSON.stringify(payload))
      .then((response) => {
        
      })
      .catch((error) => {
        
      })
```

### Consumer
Variables del consumer.
```
#Consumer
EVENT_CONNECT_STRING=""
EVENT_FILTER_SOURCE = ""
```
En la variable de 'EVENT_CONNECT_STRING' se asigna el url del SQS. <br>
En la variable de 'EVENT_FILTER_SOURCE' se asigna el nombre del filtro del mensaje. Ejemplo EVENT_FILTER_SOURCE="hook-service" en caso que exista mas de un filtro puede ir separado entre comas.


Ejemplo de uso del método de Subscribe Message.
```
  subscribeMessage(async (error, data) => {
    
      if (data) {
       
      }
      if (error){

      }
    });
```

