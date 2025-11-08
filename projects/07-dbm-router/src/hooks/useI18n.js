const i18n = {
  es: {
    title: 'Acerca de',
    button: 'Ir a la Home',
    description: 'Hola! Esta es la página About'
  },
  en: {
    title: 'About',
    button: 'Go to Home',
    description: 'Hello! This is the About page'
  },
  fr: {
    title: 'À propos',
    button: 'Aller à l\'accueil',
    description: 'Bonjour! Ceci est la page À propos'
  }
}

export function useI18n (lang) {
  return i18n[lang] || i18n.en
}
