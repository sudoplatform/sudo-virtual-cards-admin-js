import { GetVirtualCardsActiveResponse as GetVirtualCardsActiveResponseGraphQL } from '../../../gen/graphqlTypes'
import { GetVirtualCardsActiveResponse as GetVirtualCardsActiveResponseEntity } from '../../../virtualCardsAdmin/response/getVirtualCardsActiveResponse'

/**
 * Utility transformer class, responsible for transforming between
 * `GetVirtualCardsActiveResponse` Entity and GraphQL types.
 *
 * @export
 * @class GetVirtualCardsActiveResponseTransformer
 */
export class GetVirtualCardsActiveResponseTransformer {
  /**
   * Transform a `GetVirtualCardsActiveResponse` GraphQL type to its Entity type.
   *
   * @static
   * @param {GetVirtualCardsActiveResponseGraphQL} graphql
   * @returns {GetVirtualCardsActiveResponseEntity}
   * @memberof GetVirtualCardsActiveResponseTransformer
   */
  public static toEntity(
    graphql: GetVirtualCardsActiveResponseGraphQL,
  ): GetVirtualCardsActiveResponseEntity {
    return {
      startDate: new Date(graphql.startDate),
      endDate: new Date(graphql.endDate),
      timeZone: graphql.timeZone ?? 'UTC',
      activeCards: graphql.activeCards,
    }
  }

  /**
   * Transform a `GetVirtualCardsActiveResponse` Entity type to its GraphQL type.
   *
   * @static
   * @param {GetVirtualCardsActiveResponseEntity} entity
   * @returns {GetVirtualCardsActiveResponseGraphQL}
   * @memberof GetVirtualCardsActiveResponseTransformer
   */
  public static toGraphQL(
    entity: GetVirtualCardsActiveResponseEntity,
  ): GetVirtualCardsActiveResponseGraphQL {
    return {
      __typename: 'GetVirtualCardsActiveResponse',
      startDate: entity.startDate.toISOString(),
      endDate: entity.endDate.toISOString(),
      timeZone: entity.timeZone ?? 'UTC',
      activeCards: entity.activeCards,
    }
  }
}
