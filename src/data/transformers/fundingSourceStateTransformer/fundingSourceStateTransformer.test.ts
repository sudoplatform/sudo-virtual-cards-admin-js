import { FundingSourceStateTransformer } from './fundingSourceStateTransformer'
import { FundingSourceState as FundingSourceStateEntity } from '../../../entities/fundingSourceState'
import { FundingSourceState as FundingSourceStateGraphQL } from '../../../gen/graphqlTypes'

export const defaultFundingSourceStateEntity = FundingSourceStateEntity.Active
export const defaultFundingSourceStateGraphQL = FundingSourceStateGraphQL.Active

describe('FundingSourceStateTransformer tests', () => {
  it.each`
    entity                               | graphQL
    ${FundingSourceStateEntity.Active}   | ${FundingSourceStateGraphQL.Active}
    ${FundingSourceStateEntity.Inactive} | ${FundingSourceStateGraphQL.Inactive}
  `(
    'should transform entity ($entity) to graphQL ($graphQL)',
    ({ entity, graphQL }) => {
      expect(FundingSourceStateTransformer.toGraphQL(entity)).toStrictEqual(
        graphQL,
      )
    },
  )

  it.each`
    graphQL                               | entity
    ${FundingSourceStateGraphQL.Active}   | ${FundingSourceStateEntity.Active}
    ${FundingSourceStateGraphQL.Inactive} | ${FundingSourceStateEntity.Inactive}
  `(
    'should transform graphQL ($graphQL) to entity ($entity)',
    ({ graphQL, entity }) => {
      expect(FundingSourceStateTransformer.toEntity(graphQL)).toStrictEqual(
        entity,
      )
    },
  )
})
