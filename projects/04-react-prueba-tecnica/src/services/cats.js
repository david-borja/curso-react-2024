const CAT_ENDPOINT_RANDOM_FACT = 'https://catfact.ninja/fact'

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
  return fetch(`https://cataas.com/cat/says/${words}?size=50&color=red&json=true`)
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
