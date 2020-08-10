import { bookScalar, authorScalar, resultUnion } from './scalars'
import { query } from './queries'
import { mutation } from './mutations'

export const schemas = [bookScalar, authorScalar, resultUnion, query, mutation];
