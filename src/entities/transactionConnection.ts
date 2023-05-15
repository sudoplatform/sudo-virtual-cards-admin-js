import { Transaction } from './transaction'

/**
 * Domain-level representation of a TransactionConnection.
 *
 * Used to keep a list of Transactions and a nextToken to
 * support pagination.
 *
 * @export
 * @interface TansactionConnection
 */
export interface TransactionConnection {
  items: Transaction[]
  nextToken?: string | null
}
