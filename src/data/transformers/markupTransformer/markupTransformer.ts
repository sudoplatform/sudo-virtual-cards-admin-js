import { Markup as MarkupEntity } from '../../../entities/markup'
import { Markup as MarkupGraphQL } from '../../../gen/graphqlTypes'

/**
 * Utility transformer class, responsible for transforming between
 * `Markup` Entity and GraphQL types.
 *
 * @export
 * @class MarkupTransformer
 */
export class MarkupTransformer {
  /**
   * Transform a `Markup` GraphQL type to its Entity type.
   *
   * @static
   * @param {MarkupGraphQL} graphql
   * @returns {MarkupEntity}
   * @memberof MarkupTransformer
   */
  public static toEntity(graphql: MarkupGraphQL): MarkupEntity {
    return {
      percent: +graphql.percent,
      flat: +graphql.flat,
      minCharge: graphql.minCharge ? +graphql.minCharge : undefined,
    }
  }

  /**
   * Transform a `Markup` Entity type to its GraphQL type.
   *
   * @static
   * @param {MarkupEntity} entity
   * @returns {MarkupGraphQL}
   * @memberof MarkupTransformer
   */
  public static toGraphQL(entity: MarkupEntity): MarkupGraphQL {
    return {
      __typename: 'Markup',
      percent: entity.percent.toString(),
      flat: entity.flat.toString(),
      minCharge: entity.minCharge ? entity.minCharge.toString() : undefined,
    }
  }
}
