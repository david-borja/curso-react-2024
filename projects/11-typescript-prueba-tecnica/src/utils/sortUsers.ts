import type { User } from '../types'

export function sortUsers(users: User[]) {
  console.log('Sorting users')
  return users.toSorted((a, b) => a.location.country.localeCompare(b.location.country))
}
