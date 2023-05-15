/**
 * Request used to search for virtual card transactions.
 */
export interface SearchVirtualCardsTransactionsRequest {
  /**
   * ID of the user that owns the transactions.
   */
  userId: string
  /**
   * Last 4 digits of card number.
   */
  last4: string
  /**
   * Starting date range of transactions to search.
   */
  startDate: Date
  /**
   * Ending date range of transactions to search.
   */
  endDate: Date
  /**
   * Max number of transaction records to fetch.
   */
  limit?: number | null
  /**
   * Token indicating the start of the next batch
   * of records to fetch.
   */
  nextToken?: string | null
}
