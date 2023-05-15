import { Owner as OwnerGraphQL } from '../../../gen/graphqlTypes'
import { Owner as OwnerEntity } from '../../../entities/owner'

/**
 * Utility transformer class, responsible for transforming between
 * `Owner` Entity and GraphQL types.
 *
 * @export
 * @class OwnerTransformer
 */
export class OwnerTransformer {
  /**
   * Transform an `Owner` GraphQL type to its Entity type.
   *
   * @static
   * @param {OwnerGraphQL} graphql
   * @returns {OwnerEntity}
   * @memberof OwnerTransformer
   */
  public static toEntity(graphql: OwnerGraphQL): OwnerEntity {
    return {
      id: graphql.id,
      issuer: graphql.issuer,
    }
  }

  /**
   * Transform an `Owner` Entity type to its GraphQL type.
   *
   * @static
   * @param {OwnerEntity} entity
   * @returns {OwnerGraphQL}
   * @memberof OwnerTransformer
   */
  public static toGraphQL(entity: OwnerEntity): OwnerGraphQL {
    return {
      __typename: 'Owner',
      id: entity.id,
      issuer: entity.issuer,
    }
  }
}
