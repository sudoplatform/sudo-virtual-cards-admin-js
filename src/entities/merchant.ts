export interface Merchant {
  /**
   * ID of the merchant that a transaction was against.
   */
  id: string
  /**
   * Merchant Category Code (MCC) that the  merchant belongs to.
   */
  mcc: string
  /**
   * Country that the merchant charging the virtual card is in.
   */
  country: string
  /**
   * City that the merchant charging the virtual card is in.
   */
  city?: string
  /**
   * State that the merchant charging the virtual card is in.
   */
  state?: string
  /**
   * Postal code that the merchant charging the virtual card is in.
   */
  postalCode?: string
}
