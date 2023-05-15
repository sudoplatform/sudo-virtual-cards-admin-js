import { SignedAuthorizationText as SignedAuthorizationTextEntity } from '../../../entities/signedAuthorizationText'
import { SignedAuthorizationText as SignedAuthorizationTextGraphQL } from '../../../gen/graphqlTypes'

/**
 * Utility transformer class, responsible for transforming between
 * `SignedAuthorizationText` GraphQL and Entity types.
 *
 * @export
 * @class SignedAuthorizationTextTransformer
 */
export class SignedAuthorizationTextTransformer {
  /**
   * Transform a `SignedAuthorizationText` GraphQL type to its Entity type.
   *
   * @static
   * @param {SignedAuthorizationTextGraphQL} graphql
   * @returns {SignedAuthorizationTextEntity}
   * @memberof SignedAuthorizationTextTransformer
   */
  public static toEntity(
    graphql: SignedAuthorizationTextGraphQL,
  ): SignedAuthorizationTextEntity {
    return {
      data: graphql.data,
      signature: graphql.signature,
      algorithm: graphql.algorithm,
      keyId: graphql.keyId,
      content: graphql.content,
      contentType: graphql.contentType,
      language: graphql.language,
    }
  }

  /**
   * Transform a `SignedAuthorizationText` Entity type to its GraphQL type.
   *
   * @static
   * @param {SignedAuthorizationTextEntity} entity
   * @returns {SignedAuthorizationTextGraphQL}
   * @memberof SignedAuthorizationTextTransformer
   */
  public static toGraphQL(
    entity: SignedAuthorizationTextEntity,
  ): SignedAuthorizationTextGraphQL {
    return {
      __typename: 'SignedAuthorizationText',
      data: entity.data,
      signature: entity.signature,
      algorithm: entity.algorithm,
      keyId: entity.keyId,
      content: entity.content,
      contentType: entity.contentType,
      language: entity.language,
    }
  }
}
