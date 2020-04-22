
# Movie  Search

Aplicación Web desarrollada en [React](https://es.reactjs.org/) para consultar películas y agregarlas a tus favoritos, utilizando [OMDb API](http://www.omdbapi.com/)

### Pre requisitos

1. abrir una terminal en la carpeta raíz del proyecto.
2. `npm  install` para instalar las dependencias.
3. `cp example.env .env` para crear el archivo de configuración con las [variables de entorno](#Variables-de-entorno).
4. editar el archivo `.env` y completar las [variables de entorno](#Variables-de-entorno) que son necesarias para levantar la aplicación.

### Desplegar en modo Desarrollo (dev)
* `npm  start`
* ingresar a `localhost:3000` (por defecto).

### Variables de entorno

| Variable | Descripción | Valores permitidos | Obligatorio |
| :---------: | :-----------------------------------------------------: | :-------------------------: | :--------------: |
| REACT_APP_BASE_URL | url base de [OMDb API](http://www.omdbapi.com/) | por defecto `http://www.omdbapi.com/` |:white_check_mark:|
| REACT_APP_APIKEY | api  key de [OMDb API](http://www.omdbapi.com/) | `<your_api_key>` |:white_check_mark:|

#### configuración mínima de variables de entorno
```
###
# .env
###

REACT_APP_BASE_URL=http://www.omdbapi.com/
REACT_APP_APIKEY=<your_api_key>
```

## Pendientes
* No se esta actualizando el estado de los componentes padres, por ende para ver los resultados de los favoritos es necesario refrescar la página.
* El estado del icono de favoritos no persiste cuando se refresca la página.
* En algunos elementos del listado de películas el elemento para agregar a favoritos se descuadra.
* Las consultas con `fetch` no están capturando los casos sin éxito con un `catch`.
