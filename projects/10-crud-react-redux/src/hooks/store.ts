import { useDispatch, useSelector, type TypedUseSelectorHook } from 'react-redux'
import type { AppDispatch, RootState } from '../store'

// Aunque no utilicemos TS, esta capa de abstracción es buena práctica, porque nos permite
// no utilizar directamente los hooks de react-redux, y si en el futuro queremos

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export const useAppDispatch: () => AppDispatch = useDispatch