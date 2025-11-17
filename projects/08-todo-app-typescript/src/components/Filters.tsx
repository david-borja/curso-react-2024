import type { JSX } from 'react'
import type { FilterValue } from '../types'
import { FILTERS_BUTTONS } from '../enums'

interface Props {
  onFilterChange: (filter: FilterValue) => void
  filterSelected: FilterValue
}

export function Filters(
  { filterSelected, onFilterChange }: Props
): JSX.Element {

  return (
    <ul className='filters'>
      {
        Object.entries(FILTERS_BUTTONS).map(([key, { href, literal }]) => {
          const isSelected = key === filterSelected
          const className = isSelected ? 'selected' : ''

          return (
            <li key={key}>
              <a
                href={href}
                className={className}
                onClick={(event) => {
                  event.preventDefault()
                  onFilterChange(key as FilterValue)
                }}
              >
                {literal}
              </a>
            </li>
          )
        })
      }
    </ul>
  )
}