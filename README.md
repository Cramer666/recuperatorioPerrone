# Evaluación Desarrollo de Aplicaciones: Backend

Bienvenido a la evaluación de **Desarrollo de Aplicaciones**, en la parte de backend. Este proyecto consiste en un servidor de Express 5 que corre sobre Node.JS.

1. Que las formas alternativas para cada digimon puedan ser muchas, y no solo una.
   Los endpoints de creacion y edición deberían actuar de forma acorde.

   Cambie alternateForm por un array, asi puede tener varias formas.
   Toque el modelo, el service y el repo para que manejen listas de ids.
   Los endpoints ya andaban, así que no hice nada ahi.
   Y en el delete lo saque de las listas de los que lo tenian como forma alternativa.
   Al parecer anda bien, probe en postman y lo acepta al crear nuevos Digimons.

2. Al editar o crear, si se le agrega una forma alternativa a un digimon, la forma alternativa debe tener el digimon editado o creado como su alternativa también  (Dejando la relación hacia ambos lados, de manera consistente).

   Para esto lo maneje en el servicio del backend. Cuando creo o edito un digimon y le agrego formas alternativas, tambien actualizo cada una para q tengan como alternativa al digimon original. O sea, la relacion va para los dos lados. Lo hago cuando guardas/editas y check q se actualicen los dos.Aca funca, ahora paso al front q no muestra nada jaja
   bueh, no era nada, es q soy muy despistada y me olvide de "plurificar" (? una palabra en el modelo del front je

3. Agregar campos de control, createdAt, updatedAt, como timestamps para control.

   En el modelo agregue los campos createdAt y updatedAt para controlar cuando se crea y actualiza cada digimon. En el repositorio, cuando creo un digimon le agrego los dos timestamps con el new Date(), justo antes de hacer insertOne. Y cuando edito, le actualizo el updatedAt (pero no el createdAt). Yasi me pongo la gorra y controlo cuando se creo y cuando fue la ultima vez que se modifico un digi.

4. Agregar la posibilidad de "soft delete" (desde una variable de entorno en el .env del back). Al hacer soft delete, en lugar de borrar completamente el elemento, solo se marca como deletedAt con el timestamp actual. Ojo, los listados siempre deben dar elementos no borrados.

   Bueno,ahora cuando borro un digimon,en teoria, si SOFT_DELETE=true en el .env, no se elimina sino que se marca con deletedAt (deberia se la fecha actual pero pasaron cosas xD). Osea se muestran solo los activos por defecto, pero si SOFT_DELETE=true muestra todos (hasta los q borre). Cambie en el repository para que filtre automaticamente segun la variable. Lo probe en Postman y anda dudosamente, tengo que revisarlo, pero por ahora tengo esto...

   PD: AGUANTE POKEMON!!

