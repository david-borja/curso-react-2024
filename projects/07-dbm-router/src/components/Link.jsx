import { BUTTONS, EVENTS } from '../enums'

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

export function Link ({ resetScroll = false, target, to, ...props }) {
  const handleClick = (event) => {
    const isMainEvent = event.button === BUTTONS.PRIMARY // primary click (botón izquierdo en diestros)
    const isModifiedEvent = event.metaKey || event.altKey || event.ctrlKey || event.shiftKey

    // si el target que ha puesto se tiene que abrir en sí mismo o es un evento modificado, dejamos que el navegador lo maneje
    // por ejemplo, si es target="_blank", que abra una nueva pestaña
    const isManageableEvent = target === undefined || target === '_self'

    if (isMainEvent && isManageableEvent && !isModifiedEvent) {
      event.preventDefault()
      navigate(to) // navegación con SPA
      if (resetScroll) window.scrollTo(0, 0) // reseteamos el scroll a la parte superior
    }
  }
  // el ancor renderiza bien el children debido al spread de props
  // porque esto está haciendo children={props.children}
  return <a onClick={handleClick} href={to} target={target} {...props} />
}
