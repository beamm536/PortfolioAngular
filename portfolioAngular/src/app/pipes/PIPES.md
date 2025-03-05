# SOLUCIÓN PARA ACTUALIZAR LOS PROYECTOS --> titulo

Al igual que si lo hacemos por id, este se tendria que pasar
por la URL, hacemos lo mismo pero con el titulo. El único inconveniente es que para que se pase por URL, no puede tener espacios ni caracteres raros, y si es en minusculas mejor. 


Por lo que la solución es incorporar un PIPE que nos va a permitir incorporar esta logica en nuestro objetivo de manipulacion de datos desde nuestro formulario de la plantilla HTML.

**con lo que conseguimos => formatear y transformar datos de manera rapida y sencilla**

> Como lo hemos incluido?
    Creamos como si fuera componente desde la cmd ejecutada como administrador, pero en este caso un pipe personalizado:
    `ng g pipe pipes/[nombre-de-nuesttro-pipe]`