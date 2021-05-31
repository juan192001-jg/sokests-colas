# Sistema de Tickets

La aplicación genera tickets con un número para ser atendida por los asesores en cada uno de sus escritorios. El sistema despliega 4 tipos de vistas.

**Home:** Despliega las opciones básicas de la aplicación:
 - Ir a Pantalla.
 - Ir a Escritorio. 
 - Crear Ticket.

**Pantalla:** Despliega el # del Ticket de llamado y el Escritorio donde será atendido el usuario así como otros turnos que van a ser atendidos.

**Escritorio:** Despliega la interfaz de la persona que atiende al usuario poseedor del Ticket y le da la opción de hacer el llamado para atender al siguiente ticket.

**Crear Ticket**: Despliega una interfaz para que el usuario solicite un turno que generará un número de Ticket.

## Instalación


```
npm install
```

Para ejecutar la aplicación lance el siguiente comando.
```
node ./server/server
```