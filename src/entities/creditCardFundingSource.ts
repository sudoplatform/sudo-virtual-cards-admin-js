import { CommonObject } from './commonObject'
import { FundingSourceState } from './fundingSourceState'
import { CreditCardNetwork } from './creditCardNetwork'
import { CardType } from './cardType'

/**
 * Domain-level representation of an admin Credit Card Funding Source.
 *
 * @export
 * @interface CreditCardFundingSource
 */
export interface CreditCardFundingSource extends CommonObject {
  /**
   * Current state of funding source.
   */
  state: FundingSourceState
  /**
   * Currency that funding source is denominated in.
   */
  currency: string
  /**
   * Contains the unique fingerprint of a funding source.
   *
   * This is calculated on creation of the funding source (completeFundingSource).
   * Fingerprint is intentionally obfuscated from the user and client and will
   * be null if it is received/retrieved by any means that is NOT from the data
   * source itself.
   *
   * @type {string}
   * @memberof FundingSource
   */
  fingerprint: string
  /**
   * Last 4 digits of a user's credit card.
   */
  last4: string
  /**
   * Card network of a funding source.
   */
  network: CreditCardNetwork
  /**
   * Card type.
   */
  cardType: CardType
}
