import {
  BankAccountFundingSource as BankAccountFundingSourceGraphQL,
  BankAccountType as BankAccountTypeGraphQL,
} from '../../../gen/graphqlTypes'
import { FundingSourceStateTransformer } from '../fundingSourceStateTransformer'
import { SignedAuthorizationTextTransformer } from '../signedAuthorizationTextTransformer'
import { BankAccountType as BankAccountTypeEntity } from '../../../entities/bankAccountType'
import { BankAccountFundingSource as BankAccountFundingSourceEntity } from '../../../entities/bankAccountFundingSource'

/**
 * Utility transformer class responsible for transforming between a
 * `BankAccountFundingSource` GraphQL and Entity types.
 *
 * @export
 * @class BankAccountFundingSourceTransformer
 */
export class BankAccountFundingSourceTransformer {
  /**
   * Transform a `BankAccountFundingSource` GraphQL type to its Entity type.
   *
   * @static
   * @param {BankAccountFundingSourceGraphQL} graphql
   * @returns {BankAccountFundingSourceEntity}
   * @memberof BankAccountFundingSourceTransformer
   */
  public static toEntity(
    graphql: BankAccountFundingSourceGraphQL,
  ): BankAccountFundingSourceEntity {
    return {
      id: graphql.id,
      owner: graphql.owner,
      version: graphql.version,
      createdAt: new Date(graphql.createdAtEpochMs),
      updatedAt: new Date(graphql.updatedAtEpochMs),
      bankAccountType:
        BankAccountFundingSourceTransformer.toEntityBankAccountType(
          graphql.bankAccountType,
        ),
      currency: graphql.currency,
      state: FundingSourceStateTransformer.toEntity(graphql.state),
      last4: graphql.last4,
      fingerprint: graphql.fingerprint,
      authorization: SignedAuthorizationTextTransformer.toEntity(
        graphql.authorization,
      ),
    }
  }

  /**
   * Transform a `BankAccountFundingSource` Entity type to its GraphQL type.
   *
   * @static
   * @param {BankAccountFundingSourceEntity} entity
   * @returns {BankAccountFundingSourceGraphQL}
   * @memberof BankAccountFundingSourceTransformer
   */
  public static toGraphQL(
    entity: BankAccountFundingSourceEntity,
  ): BankAccountFundingSourceGraphQL {
    return {
      __typename: 'BankAccountFundingSource',
      id: entity.id,
      owner: entity.owner,
      version: entity.version,
      createdAtEpochMs: entity.createdAt.getTime(),
      updatedAtEpochMs: entity.updatedAt.getTime(),
      bankAccountType:
        BankAccountFundingSourceTransformer.toGraphQLBankAccountType(
          entity.bankAccountType,
        ),
      currency: entity.currency,
      state: FundingSourceStateTransformer.toGraphQL(entity.state),
      last4: entity.last4,
      fingerprint: entity.fingerprint,
      authorization: SignedAuthorizationTextTransformer.toGraphQL(
        entity.authorization,
      ),
    }
  }

  /**
   * Transform a `BankAccountType` GraphQL type to its Entity type.
   *
   * @static
   * @param {BankAccountTypeGraphQL} graphql
   * @returns {BankAccountTypeEntity}
   * @memberof BankAccountFundingSourceTransformer
   */
  private static toEntityBankAccountType(
    graphql: BankAccountTypeGraphQL,
  ): BankAccountTypeEntity {
    switch (graphql) {
      case BankAccountTypeGraphQL.Checking:
        return BankAccountTypeEntity.Checking
      case BankAccountTypeGraphQL.Savings:
        return BankAccountTypeEntity.Savings
      case BankAccountTypeGraphQL.Other:
        return BankAccountTypeEntity.Other
    }
  }

  /**
   * Transform a `BankAccountType` Entity type to its GraphQL type.
   *
   * @static
   * @param {BankAccountTypeEntity} entity
   * @returns {BankAccountTypeGraphQL}
   * @memberof BankAccountFundingSourceTransformer
   */
  private static toGraphQLBankAccountType(
    entity: BankAccountTypeEntity,
  ): BankAccountTypeGraphQL {
    switch (entity) {
      case BankAccountTypeEntity.Checking:
        return BankAccountTypeGraphQL.Checking
      case BankAccountTypeEntity.Savings:
        return BankAccountTypeGraphQL.Savings
      case BankAccountTypeEntity.Other:
        return BankAccountTypeGraphQL.Other
    }
  }
}
