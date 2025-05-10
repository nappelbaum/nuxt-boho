import nuxtStorage from 'nuxt-storage';

export function setFavorites(favorites) {
  nuxtStorage.localStorage.setData(
    'boho-favorites',
    JSON.stringify(favorites),
    1000,
    'd'
  )
}

export function deleteFavorites() {
  nuxtStorage.localStorage.removeItem('boho-favorites')
}

export function getFavorites() {
  if (nuxtStorage.localStorage.getData('boho-favorites')) {
    return JSON.parse(nuxtStorage.localStorage.getData('boho-favorites'))
  } else {
    return []
  }
}
