import { PlaidAccountMetadata as PlaidAccountMetadataGraphQL } from '../../../gen/graphqlTypes'
import { PlaidAccountMetadata as PlaidAccountMetadataEntity } from '../../../entities/plaidAccountMetadata'

/**
 * Utility transformer class, responsible for transforming between
 * `PlaidAccountMetadata` GraphQL and Entity types.
 *
 * @export
 * @class PlaidAccountMetadataTransformer
 */
export class PlaidAccountMetadataTransformer {
  /**
   * Transform a `PlaidAccountMetadata` GraphQL type to its Entity type.
   *
   * @static
   * @param {PlaidAccountMetadataGraphQL} graphql
   * @returns {PlaidAccountMetadataEntity}
   * @memberof PlaidAccountMetadataTransformer
   */
  public static toEntity(
    graphql: PlaidAccountMetadataGraphQL,
  ): PlaidAccountMetadataEntity {
    return {
      accountId: graphql.accountId,
      subtype: graphql.subtype ?? undefined,
    }
  }

  /**
   * Transform a `PlaidAccountMetadata` Entity type to its GraphQL type.
   *
   * @static
   * @param {PlaidAccountMetadataEntity} entity
   * @returns {PlaidAccountMetadataGraphQL}
   * @memberof PlaidAccountMetadataTransformer
   */
  public static toGraphQL(
    entity: PlaidAccountMetadataEntity,
  ): PlaidAccountMetadataGraphQL {
    return {
      __typename: 'PlaidAccountMetadata',
      accountId: entity.accountId,
      subtype: entity.subtype,
    }
  }
}
