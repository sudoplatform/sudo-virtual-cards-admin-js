import { CardState as CardStateGraphQL } from '../../../gen/graphqlTypes'
import { CardState as CardStateEntity } from '../../../entities/cardState'

/**
 * Utility transformer class, responsible for transforming between
 * `CardState` GraphQL and Entity types.
 *
 * @export
 * @class CardStateTransformer
 */
export class CardStateTransformer {
  /**
   * Transform a CardState GraphQL type to its Entity type.
   *
   * @static
   * @param {CardStateGraphQL} graphql
   * @returns {CardStateEntity}
   * @memberof CardStateTransformer
   */
  public static toEntity(graphql: CardStateGraphQL): CardStateEntity {
    switch (graphql) {
      case CardStateGraphQL.Issued:
        return CardStateEntity.Issued
      case CardStateGraphQL.Failed:
        return CardStateEntity.Failed
      case CardStateGraphQL.Closed:
        return CardStateEntity.Closed
      case CardStateGraphQL.Suspended:
        return CardStateEntity.Suspended
    }
  }

  /**
   * Transform a CardState Entity type to its GraphQL type.
   *
   * @static
   * @param {CardStateEntity} entity
   * @returns {CardStateGraphQL}
   * @memberof CardStateTransformer
   */
  public static toGraphQL(entity: CardStateEntity): CardStateGraphQL {
    switch (entity) {
      case CardStateEntity.Issued:
        return CardStateGraphQL.Issued
      case CardStateEntity.Failed:
        return CardStateGraphQL.Failed
      case CardStateEntity.Closed:
        return CardStateGraphQL.Closed
      case CardStateEntity.Suspended:
        return CardStateGraphQL.Suspended
    }
  }
}
