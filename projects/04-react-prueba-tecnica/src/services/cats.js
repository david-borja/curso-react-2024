const CAT_ENDPOINT_RANDOM_FACT = 'https://catfact.ninja/fact'
export const CAT_PREFIX_IMAGE_URL = 'https://cataas.com/cat'

export function getRandomFact () {
  return fetch(CAT_ENDPOINT_RANDOM_FACT)
    .then(res => {
      if (!res.ok) throw new Error('Error getting random fact')
      return res.json()
    })
    .then(data => {
      console.log(data)
      const { fact } = data
      return fact
    }).catch((error) => {
      console.error(error)
    })
}

export function getCatImageWithWords ({ words }) {
  return fetch(`${CAT_PREFIX_IMAGE_URL}/says/${words}?size=50&color=red&json=true`)
    .then(res => {
      if (!res.ok) throw new Error('Error getting image with words')
      return res.json()
    }).then(data => {
      const { url } = data
      return url
    }).catch((error) => {
      console.error(error)
    })
}
