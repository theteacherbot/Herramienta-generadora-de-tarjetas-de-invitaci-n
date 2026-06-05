# Generador de Imágenes AI - Configuración de Clave API (BYOP)

Esta aplicación utiliza el API de generación de imágenes de **Pollinations.ai**. Para garantizar la seguridad de tu clave de API (`API_key`) y evitar exponerla públicamente en repositorios de código, la aplicación está diseñada bajo el modelo **Bring Your Own Password/Password (BYOP)**.

## ¿Cómo funciona la seguridad de la API Key?

1. **Almacenamiento Local Seguro**: Tu API Key no se guarda en ningún servidor intermedio ni está hardcodeada en los archivos de la aplicación. Se guarda directamente en tu propio navegador mediante `localStorage`.
2. **Petición Directa (Cliente-Servidor)**: El navegador realiza la petición HTTPS POST directamente a los servidores seguros de Pollinations.ai (`https://gen.pollinations.ai`). Nadie más tiene acceso a tu clave.

## Pasos para Configurar tu API Key

1. **Obtener la Clave**: Si aún no tienes una, regístrate en [Pollinations.ai](https://pollinations.ai/) para obtener tus credenciales / clave de API de desarrollador.
2. **Introducir en la Aplicación**: Abre el archivo `index.html` en tu navegador.
3. **Guardar**: En el panel de control a la izquierda de la pantalla, verás un campo etiquetado como **Clave API de Pollinations**. Escribe o pega tu clave allí.
4. **Persistencia**: La clave se guardará automáticamente en tu navegador. Si vuelves a abrir la aplicación más tarde, no tendrás que volver a introducirla (a menos que borres el historial/datos de navegación).

---
*Plantilla diseñada por el profesor Édgar Herrera con fines educativos.*
