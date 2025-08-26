/**
 * Utilidades y funciones helper
 */

import type { ImageProps, ContactInfoProps, FormFieldProps } from '../types';
// Nota: funciones de email/phone/format/sanitize movidas a `validation.ts` y `format.ts`.

/**
 * Valida props de imagen
 */
export function validateImageProps(props: ImageProps): boolean {
  return !!(props.src && props.alt);
}

/**
 * Valida props de contacto
 */
export function validateContactProps(props: ContactInfoProps): boolean {
  return !!(props.icon && props.title && props.content);
}

/**
 * Valida props de formulario
 */
export function validateFormProps(props: FormFieldProps): boolean {
  return !!(props.id && props.name && props.type && props.label);
}

/**
 * Obtiene el año actual
 */
export function getCurrentYear(): number {
  return new Date().getFullYear();
}

// Eliminado calculateAge y helpers trasladados; este archivo queda como compat layer.
