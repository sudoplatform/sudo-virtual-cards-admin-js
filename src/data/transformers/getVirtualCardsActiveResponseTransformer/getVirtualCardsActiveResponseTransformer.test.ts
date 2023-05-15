import { GetVirtualCardsActiveResponseTransformer } from './getVirtualCardsActiveResponseTransformer'
import { GetVirtualCardsActiveResponse as GetVirtualCardsActiveResponseEntity } from '../../../virtualCardsAdmin/response/getVirtualCardsActiveResponse'
import { GetVirtualCardsActiveResponse as GetVirtualCardsActiveResponseGraphQL } from '../../../gen/graphqlTypes'

const now = new Date()
const timeZone = 'australia/brisbane'
const activeCards = [1, 0, 1]

export const defaultGetVirtualCardsActiveResponseEntity: GetVirtualCardsActiveResponseEntity =
  {
    startDate: now,
    endDate: now,
    timeZone,
    activeCards,
  }

export const defaultGetVirtualCardsActiveResponseGraphql: GetVirtualCardsActiveResponseGraphQL =
  {
    __typename: 'GetVirtualCardsActiveResponse',
    startDate: now.toISOString(),
    endDate: now.toISOString(),
    timeZone,
    activeCards,
  }

describe('GetVirtualCardsActiveResponseTransformer tests', () => {
  it('should transform from entity to graphql', () => {
    expect(
      GetVirtualCardsActiveResponseTransformer.toGraphQL(
        defaultGetVirtualCardsActiveResponseEntity,
      ),
    ).toEqual(defaultGetVirtualCardsActiveResponseGraphql)
  })

  it('should transform from graphql to entity', () => {
    expect(
      GetVirtualCardsActiveResponseTransformer.toEntity(
        defaultGetVirtualCardsActiveResponseGraphql,
      ),
    ).toEqual(defaultGetVirtualCardsActiveResponseEntity)
  })
})
