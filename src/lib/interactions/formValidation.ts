// Accesible form validation utilities reusing central regex rules
import { VALIDATION_RULES_WITH_REGEX } from '../constants-loader';

interface FieldConfig {
  name: string;
  input: HTMLInputElement | HTMLTextAreaElement | null;
  errorEl: HTMLElement | null;
  validate: () => boolean;
}

export function initContactForm(formId = 'contactForm') {
  const form = document.getElementById(formId) as HTMLFormElement | null;
  if (!form) return;

  const nombre = form.querySelector<HTMLInputElement>('#nombre');
  const email = form.querySelector<HTMLInputElement>('#email');
  const telefono = form.querySelector<HTMLInputElement>('#telefono');
  const mensaje = form.querySelector<HTMLTextAreaElement>('#mensaje');

  const nombreError = form.querySelector<HTMLElement>('#nombre-error');
  const emailError = form.querySelector<HTMLElement>('#email-error');
  const telefonoError = form.querySelector<HTMLElement>('#telefono-error');
  const mensajeError = form.querySelector<HTMLElement>('#mensaje-error');

  function setError(el: HTMLElement | null, input: HTMLInputElement | HTMLTextAreaElement | null, msg: string) {
    if (!el || !input) return false;
    el.textContent = msg;
    el.setAttribute('role', 'alert');
    input.setAttribute('aria-invalid', 'true');
    const id = el.getAttribute('id');
    if (id) {
      const describedby = input.getAttribute('aria-describedby');
      if (!describedby || !describedby.split(/\s+/).includes(id)) {
        input.setAttribute('aria-describedby', (describedby ? describedby + ' ' : '') + id);
      }
    }
    return false;
  }
  function clearError(el: HTMLElement | null, input: HTMLInputElement | HTMLTextAreaElement | null) {
    if (!el || !input) return true;
    if (el.textContent) el.textContent = '';
    el.removeAttribute('role');
    input.removeAttribute('aria-invalid');
    // no removemos aria-describedby para mantener referencia estable
    return true;
  }

  const fields: FieldConfig[] = [
    {
      name: 'nombre',
      input: nombre,
      errorEl: nombreError,
      validate: () => {
        const v = nombre?.value.trim() || '';
        if (!v) return setError(nombreError, nombre, 'El nombre es obligatorio');
        if (v.length < 2) return setError(nombreError, nombre, 'Mínimo 2 caracteres');
        return clearError(nombreError, nombre);
      }
    },
    {
      name: 'email',
      input: email,
      errorEl: emailError,
      validate: () => {
        const v = email?.value.trim() || '';
        if (!v) return setError(emailError, email, 'El email es obligatorio');
        if (!VALIDATION_RULES_WITH_REGEX.email.test(v)) return setError(emailError, email, 'Email inválido');
        return clearError(emailError, email);
      }
    },
    {
      name: 'telefono',
      input: telefono,
      errorEl: telefonoError,
      validate: () => {
        const v = telefono?.value.trim() || '';
        if (!v) return setError(telefonoError, telefono, 'El teléfono es obligatorio');
        if (!VALIDATION_RULES_WITH_REGEX.phone.test(v)) return setError(telefonoError, telefono, 'Formato inválido (+56 9 xxxx xxxx)');
        return clearError(telefonoError, telefono);
      }
    },
    {
      name: 'mensaje',
      input: mensaje,
      errorEl: mensajeError,
      validate: () => {
        const v = mensaje?.value.trim() || '';
        if (!v) return setError(mensajeError, mensaje, 'El mensaje es obligatorio');
        const words = v.split(/\s+/).filter(Boolean);
        if (words.length < 5) return setError(mensajeError, mensaje, `Mínimo 5 palabras (actual: ${words.length})`);
        return clearError(mensajeError, mensaje);
      }
    }
  ];

  // Real-time validation
  fields.forEach(f => {
    f.input?.addEventListener('input', f.validate);
    f.input?.addEventListener('blur', f.validate);
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const allValid = fields.map(f => f.validate()).every(Boolean);
    if (!allValid) return;

    const submitBtn = form.querySelector('button[type="submit"]');
    const textSpan = submitBtn?.querySelector('span');
    const original = textSpan?.textContent || 'Enviar';
    if (textSpan) textSpan.textContent = 'Enviando...';
    if (submitBtn) (submitBtn as HTMLButtonElement).disabled = true;

    const data = new FormData(form);
    fetch(form.action, { method: 'POST', body: data, headers: { Accept: 'application/json' } })
      .then(r => {
        if (!r.ok) throw new Error('Error envío');
        const success = document.getElementById('success-message');
        success?.classList.add('show');
        setTimeout(() => success?.classList.remove('show'), 4000);
        form.reset();
        fields.forEach(f => clearError(f.errorEl, f.input));
      })
      .catch(err => {
        console.error(err);
        alert('Error al enviar, inténtalo nuevamente.');
      })
      .finally(() => {
        if (textSpan) textSpan.textContent = original;
        if (submitBtn) (submitBtn as HTMLButtonElement).disabled = false;
      });
  });
}

export default initContactForm;
