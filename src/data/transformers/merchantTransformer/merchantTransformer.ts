import { Merchant as MerchantGraphQL } from '../../../gen/graphqlTypes'
import { Merchant as MerchantEntity } from '../../../entities/merchant'

/**
 * Utility transformer class, responsible for transforming between
 * `Merchant` Entity and GraphQL types.
 *
 * @export
 * @class MerchantTransformer
 */
export class MerchantTransformer {
  /**
   * Transform a `Merchant` GraphQL type to its Entity type.
   *
   * @static
   * @param {MerchantGraphQL} graphql
   * @returns {MerchantEntity}
   * @memberof MerchantTransformer
   */
  public static toEntity(graphql: MerchantGraphQL): MerchantEntity {
    return {
      id: graphql.id,
      mcc: graphql.mcc,
      country: graphql.country,
      city: graphql.city ?? undefined,
      state: graphql.state ?? undefined,
      postalCode: graphql.postalCode ?? undefined,
    }
  }

  /**
   * Transform a `Merchant` Entity type to its GraphQL type.
   *
   * @static
   * @param {MerchantEntity} entity
   * @returns {MerchantGraphQL}
   * @memberof MerchantTransformer
   */
  public static toGraphQL(entity: MerchantEntity): MerchantGraphQL {
    return {
      __typename: 'Merchant',
      id: entity.id,
      mcc: entity.mcc,
      country: entity.country,
      city: entity.city,
      state: entity.state,
      postalCode: entity.postalCode,
    }
  }
}
