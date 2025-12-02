import { SortBy, type User } from '../types.d'

const compareProperties: Record<string, (user: User) => string> = {
  [SortBy.COUNTRY]: user => user.location.country,
  [SortBy.NAME]: user => user.name.first,
  [SortBy.LAST_NAME]: user => user.name.last
}

export function sortUsers(users: User[], sortBy: SortBy): User[] {
  return users.toSorted((a, b) => {
    const extractProperty = compareProperties[sortBy]
    const compareA = extractProperty(a)
    const compareB = extractProperty(b)
    return compareA.localeCompare(compareB)
  })
}
