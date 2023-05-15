import { TransactionConnection as TransactionConnectionGraphQL } from '../../../gen/graphqlTypes'
import { TransactionConnection as TransactionConnectionEntity } from '../../../entities/transactionConnection'
import { TransactionTransformer } from '../transactionTransformer'

/**
 * Utility transformer class, responsible for transforming between
 * `TransactionConnection` GraphQL and Entity types.
 *
 * @export
 * @class TransactionConnectionTransformer
 */
export class TransactionConnectionTransformer {
  /**
   * Transform a `TransactionConnection` GraphQL type to its Entity type.
   *
   * @static
   * @param {TransactionConnectionGraphQL} graphql
   * @returns {TransactionConnectionEntity}
   * @memberof TransactionConnectionTransformer
   */
  public static toEntity(
    graphql: TransactionConnectionGraphQL,
  ): TransactionConnectionEntity {
    return {
      items: graphql.items.map((transaction) =>
        TransactionTransformer.toEntity(transaction),
      ),
      nextToken: graphql.nextToken ?? undefined,
    }
  }

  /**
   * Transform a `TransactionConnection` Entity type to its GraphQL type.
   *
   * @static
   * @param {TransactionConnectionEntity} entity
   * @returns {TransactionConnectionGraphQL}
   * @memberof TransactionConnectionTransformer
   */
  public static toGraphQL(
    entity: TransactionConnectionEntity,
  ): TransactionConnectionGraphQL {
    return {
      __typename: 'TransactionConnection',
      items: entity.items.map((transaction) =>
        TransactionTransformer.toGraphQL(transaction),
      ),
      nextToken: entity.nextToken,
    }
  }
}
