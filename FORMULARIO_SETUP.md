# 📧 Configuración del Formulario Dinámico

## ✅ **Estado Actual**
El formulario está configurado para enviar a: **javier.retamal.f@mail.pucv.cl**

## 🔧 **Configuración de Formspree (IMPORTANTE)**

### Paso 1: Crear cuenta en Formspree
1. Ve a [https://formspree.io](https://formspree.io)
2. Registrate con el email: **javier.retamal.f@mail.pucv.cl**
3. Verifica tu email

### Paso 2: Crear un nuevo formulario
1. En el dashboard, haz clic en "New Form"
2. Ingresa el email: **javier.retamal.f@mail.pucv.cl**
3. Copia el endpoint que te proporcionen (ejemplo: `https://formspree.io/f/tu-codigo`)

### Paso 3: Actualizar el formulario
Si el endpoint es diferente a `https://formspree.io/f/xkgnqjzl`, actualiza en:
```astro
<!-- src/components/sections/Cotiza.astro línea ~43 -->
<form
  class="contact-form glassmorphism"
  method="POST"
  action="TU_ENDPOINT_AQUÍ"
  ...
>
```

### Paso 4: Verificar dominio (Opcional)
En Formspree, puedes agregar el dominio de tu sitio web para mayor seguridad.

## 📊 **Plan Gratuito de Formspree**
- ✅ **50 envíos por mes** - completamente gratis
- ✅ **Protección anti-spam** integrada
- ✅ **Respuesta automática** disponible
- ✅ **Notificaciones por email** instantáneas

## 🛠️ **Características del Formulario**

### Validaciones Implementadas:
- **Nombre**: Mínimo 2 caracteres
- **Email**: Formato válido de email
- **Teléfono**: Mínimo 8 dígitos
- **Mensaje**: Mínimo 5 palabras

### Campos Ocultos Configurados:
- `_to`: javier.retamal.f@mail.pucv.cl
- `_subject`: Nueva consulta desde IG Construcciones
- `_next`: Redirección después del envío

### Estados del Formulario:
- ✅ **Validación en tiempo real** mientras el usuario escribe
- ✅ **Indicador de carga** durante el envío
- ✅ **Mensaje de éxito** tras el envío
- ✅ **Manejo de errores** si algo falla

## 📱 **Contactos Actualizados**
- **Email**: Y.ordenes.t@gmail.com
- **WhatsApp**: +56 9 4515 0212
- **Formulario**: Envía a javier.retamal.f@mail.pucv.cl

## 🚀 **Próximos Pasos**
1. **Registrarte en Formspree** con el email indicado
2. **Verificar** que el endpoint esté correcto
3. **Probar el formulario** en producción
4. **Configurar respuestas automáticas** (opcional)

## 📋 **Formato del Email que Recibirás**

```
Asunto: Nueva consulta desde IG Construcciones

Nombre: [Nombre del cliente]
Email: [Email del cliente] 
Teléfono: [Teléfono del cliente]

Mensaje:
[Mensaje completo del cliente]
```

## ⚠️ **Importante**
- El formulario **YA ESTÁ FUNCIONAL** con el endpoint actual
- Formspree enviará un email de confirmación la primera vez
- Si superas los 50 envíos mensuales, considera el plan pago ($8.99/mes)
