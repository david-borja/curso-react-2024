import { EVENTS } from '../enums'

export function navigate (href) {
  // el primer argumento es el estado que queremos guardar en el historial
  // el segundo argumento es el título de la página (actualmente ignorado por la mayoría de los navegadores)
  // el tercer argumento es la URL que queremos mostrar en la barra de direcciones
  window.history.pushState({}, '', href)
  // no hay una forma nativa de poder escuchar este evento de pushState en JavaScript

  // creamos un evento personalizado para que el navegador nos avise que hemos cambiado de URL
  const navigationEvent = new Event(EVENTS.PUSHSTATE)
  window.dispatchEvent(navigationEvent)
}
