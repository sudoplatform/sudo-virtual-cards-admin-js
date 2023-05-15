import { CardStateTransformer } from './cardStateTransformer'
import { CardState as CardStateEntity } from '../../../entities/cardState'
import { CardState as CardStateGraphQL } from '../../../gen/graphqlTypes'

export const defaultCardStateEntity = CardStateEntity.Closed
export const defaultCardStateGraphQL = CardStateGraphQL.Closed

describe('CardStateTransformer tests', () => {
  it.each`
    entity                       | graphQL
    ${CardStateEntity.Closed}    | ${CardStateGraphQL.Closed}
    ${CardStateEntity.Failed}    | ${CardStateGraphQL.Failed}
    ${CardStateEntity.Issued}    | ${CardStateGraphQL.Issued}
    ${CardStateEntity.Suspended} | ${CardStateGraphQL.Suspended}
  `(
    'should transform entity ($entity) to graphQL ($graphQL)',
    ({ entity, graphQL }) => {
      expect(CardStateTransformer.toGraphQL(entity)).toStrictEqual(graphQL)
    },
  )

  it.each`
    graphQL                       | entity
    ${CardStateGraphQL.Closed}    | ${CardStateEntity.Closed}
    ${CardStateGraphQL.Failed}    | ${CardStateEntity.Failed}
    ${CardStateGraphQL.Issued}    | ${CardStateEntity.Issued}
    ${CardStateGraphQL.Suspended} | ${CardStateEntity.Suspended}
  `(
    'should transform graphQL ($graphQL) to entity ($entity)',
    ({ graphQL, entity }) => {
      expect(CardStateTransformer.toEntity(graphQL)).toStrictEqual(entity)
    },
  )
})
