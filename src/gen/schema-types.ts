export type Maybe<T> = T | null
export type InputMaybe<T> = Maybe<T>
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string }
  String: { input: string; output: string }
  Boolean: { input: boolean; output: boolean }
  Int: { input: number; output: number }
  Float: { input: number; output: number }
}

/** Request used to accept a pending funding source from the given ID. */
export type AcceptPendingFundingSourceRequest = {
  id: Scalars['ID']['input']
  identityOptions?: InputMaybe<FundingSourceIdentityOptions>
  /**
   * Optional flag to indicate whether to automatically update cards that have an
   * inactive funding source with the new funding source. The default value is true
   */
  updateCardFundingSource?: InputMaybe<Scalars['Boolean']['input']>
}

export type BankAccountFundingSource = {
  __typename?: 'BankAccountFundingSource'
  /** The signed authorization providing authority to transact on the bank account. */
  authorization: SignedAuthorizationText
  /** Bank account type */
  bankAccountType: BankAccountType
  /**
   * Time in milliseconds since 1970-01-01T00:00:00Z when object
   * was created
   */
  createdAtEpochMs: Scalars['Float']['output']
  /**
   * Billing currency of the funding source as 3 character ISO
   * currency code.
   */
  currency: Scalars['String']['output']
  /** Fingerprint of the funding source. Used to detect duplicates. */
  fingerprint: Scalars['ID']['output']
  /** Flags associated with funding source */
  flags: Array<FundingSourceFlags>
  /** ID of the object */
  id: Scalars['ID']['output']
  /** ID of the user which owns the object. */
  owner: Scalars['ID']['output']
  /** State of funding source */
  state: FundingSourceState
  /**
   * Defined only if the bank account funding source has the UNFUNDED flag set.
   *
   * The amount by which this funding source is unfunded, in the funding source currency.
   */
  unfundedAmount?: Maybe<UserCurrencyAmount>
  /**
   * Time in milliseconds since 1970-01-01T00:00:00Z when object
   * last updated
   */
  updatedAtEpochMs: Scalars['Float']['output']
  /** Update version of the object */
  version: Scalars['Int']['output']
}

export enum BankAccountType {
  Checking = 'CHECKING',
  Other = 'OTHER',
  Savings = 'SAVINGS',
}

/** Request used to cancel a funding source from the given ID. */
export type CancelFundingSourceRequest = {
  id: Scalars['ID']['input']
}

export enum CardState {
  Closed = 'CLOSED',
  Failed = 'FAILED',
  Issued = 'ISSUED',
  Suspended = 'SUSPENDED',
}

export enum CardType {
  Credit = 'CREDIT',
  Debit = 'DEBIT',
  Other = 'OTHER',
  Prepaid = 'PREPAID',
}

export type ChargeServiceFeeForVirtualCardInput = {
  amount: UserCurrencyAmountInput
  causeId: Scalars['String']['input']
  feeReason: FeeReason
}

export type CreditCardFundingSource = {
  __typename?: 'CreditCardFundingSource'
  /** Type of card */
  cardType: CardType
  /**
   * Time in milliseconds since 1970-01-01T00:00:00Z when object
   * was created
   */
  createdAtEpochMs: Scalars['Float']['output']
  /**
   * Billing currency of the funding source as 3 character ISO
   * currency code.
   */
  currency: Scalars['String']['output']
  /** Fingerprint of the funding source. Used to detect duplicates. */
  fingerprint: Scalars['ID']['output']
  /** Flags associated with funding source */
  flags: Array<FundingSourceFlags>
  /** ID of the object */
  id: Scalars['ID']['output']
  /** Last 4 digits of user's credit card */
  last4: Scalars['String']['output']
  /** Card network of card */
  network: CreditCardNetwork
  /** ID of the user which owns the object. */
  owner: Scalars['ID']['output']
  /** State of funding source */
  state: FundingSourceState
  /**
   * Time in milliseconds since 1970-01-01T00:00:00Z when object
   * last updated
   */
  updatedAtEpochMs: Scalars['Float']['output']
  /** Update version of the object */
  version: Scalars['Int']['output']
}

export enum CreditCardNetwork {
  Amex = 'AMEX',
  Diners = 'DINERS',
  Discover = 'DISCOVER',
  Jcb = 'JCB',
  Mastercard = 'MASTERCARD',
  Other = 'OTHER',
  Unionpay = 'UNIONPAY',
  Visa = 'VISA',
}

/** Request used to delete a provisional funding source with the given ID. */
export type DeleteProvisionalFundingSourceRequest = {
  id: Scalars['ID']['input']
}

/** Response associated with deletion of a single provisional funding source. */
export type DeleteProvisionalFundingSourceResponse = {
  __typename?: 'DeleteProvisionalFundingSourceResponse'
  /** ID of the provisional funding source that was deleted. */
  id: Scalars['ID']['output']
}

/** Request used to request deletion of virtual cards data associated with a given owner. */
export type DeleteVirtualCardsDataRequest = {
  deletionType: Scalars['String']['input']
  inactiveSinceEpochMs?: InputMaybe<Scalars['Float']['input']>
  owner: Scalars['String']['input']
}

/** Response associated with deletion of virtual cards data associated with a given owner. */
export type DeleteVirtualCardsDataResponse = {
  __typename?: 'DeleteVirtualCardsDataResponse'
  status: Scalars['String']['output']
}

export enum FeeReason {
  FundingAccountClosed = 'FUNDING_ACCOUNT_CLOSED',
  FundingDispute = 'FUNDING_DISPUTE',
  InsufficientFunds = 'INSUFFICIENT_FUNDS',
  ReclaimAbandonedTransaction = 'RECLAIM_ABANDONED_TRANSACTION',
  VirtualCardDispute = 'VIRTUAL_CARD_DISPUTE',
}

export type FundingSource = BankAccountFundingSource | CreditCardFundingSource

/**
 * UNFUNDED: Funding source has been flagged as unusable due to insufficient funds available
 * in the funding source. Funding sources with this flag are limited on authorizations due
 * to UNFUNDED velocity policy. Funding sources with this flag can be recovered if funds
 * are added to the funding source and any outstanding debits retried.
 *
 * REFRESH: Funding source requires a provider-specific refresh.
 */
export enum FundingSourceFlags {
  Refresh = 'REFRESH',
  Unfunded = 'UNFUNDED',
}

export type FundingSourceIdentityOptions = {
  fingerprint?: InputMaybe<Scalars['String']['input']>
}

/**
 * ACTIVE: Funding source is completely set up and in a state suitable
 * for funding virtual card transactions
 *
 * INACTIVE: Funding source is inactive. Is not usable for funding of new transactions
 * but may receive refunds or additional charges on partially complete transactions.
 */
export enum FundingSourceState {
  Active = 'ACTIVE',
  Inactive = 'INACTIVE',
}

/** Type of funding source backing a provisional funding source. */
export enum FundingSourceType {
  BankAccount = 'BANK_ACCOUNT',
  CreditCard = 'CREDIT_CARD',
}

export type ListFundingSourcesBySubRequest = {
  sub: Scalars['String']['input']
}

/** Request used to list provisional funding sources belonging to a given owner. */
export type ListProvisionalFundingSourcesBySubRequest = {
  /** ID of the owner (sub) whose provisional funding sources should be listed. */
  sub: Scalars['ID']['input']
}

export type ListVirtualCardsBySubRequest = {
  sub: Scalars['String']['input']
}

export type ListVirtualCardsBySudoRequest = {
  sudoId: Scalars['String']['input']
}

/** Representation of a markup formula. */
export type Markup = {
  __typename?: 'Markup'
  /**
   * Flat amount applied in calculating total markup in minor
   * currency unit of billed currency in containing transaction detail.
   * e.g. 31 for $0.31
   */
  flat: Scalars['String']['output']
  /**
   * The minimum charge that will be made to the funding source. For example,
   * if a small charge of $0.10 were made with a 2.99%+$0.31 fee formula
   * then the resultant fee would be $0.31 cents resulting in an expected
   * funding source charge of $0.41 cents. If minCharge is set and more than
   * this amount then the minCharge will be charged instead.
   */
  minCharge?: Maybe<Scalars['String']['output']>
  /**
   * Floating point percentage amount applied in calculating
   * total markup multiple by 1000. For example: 2990 for 2.99%.
   * 1/1000th of a percent is the smallest granularity that can be
   * represented.
   */
  percent: Scalars['String']['output']
}

export type Merchant = {
  __typename?: 'Merchant'
  /** City that the merchant charging the virtual card is in. */
  city?: Maybe<Scalars['String']['output']>
  /** Country that the merchant charging the virtual card is in. */
  country: Scalars['String']['output']
  /** ID of the merchant that a transaction was against. */
  id: Scalars['ID']['output']
  /** Merchant Category Code (MCC) that the  merchant belongs to. */
  mcc: Scalars['String']['output']
  /** Postal code that the merchant charging the virtual card is in. */
  postalCode?: Maybe<Scalars['String']['output']>
  /** State that the merchant charging the virtual card is in. */
  state?: Maybe<Scalars['String']['output']>
}

export type Mutation = {
  __typename?: 'Mutation'
  /** Accept a pending funding source with a given ID. */
  acceptPendingFundingSource: FundingSource
  /** Cancel a funding source with a given funding source id. */
  cancelFundingSource: FundingSource
  /** Charge a service fee against a virtual card. */
  chargeServiceFeeForVirtualCard: Transaction
  /** Delete a single provisional funding source with the given ID. */
  deleteProvisionalFundingSource: DeleteProvisionalFundingSourceResponse
  /** Delete virtual cards data associated with a given owner. */
  deleteVirtualCardsData: DeleteVirtualCardsDataResponse
  /** Refund a service fee previously charged against a virtual card. */
  refundServiceFeeForVirtualCard: Transaction
}

export type MutationAcceptPendingFundingSourceArgs = {
  input: AcceptPendingFundingSourceRequest
}

export type MutationCancelFundingSourceArgs = {
  input: CancelFundingSourceRequest
}

export type MutationChargeServiceFeeForVirtualCardArgs = {
  input?: InputMaybe<ChargeServiceFeeForVirtualCardInput>
}

export type MutationDeleteProvisionalFundingSourceArgs = {
  input: DeleteProvisionalFundingSourceRequest
}

export type MutationDeleteVirtualCardsDataArgs = {
  input: DeleteVirtualCardsDataRequest
}

export type MutationRefundServiceFeeForVirtualCardArgs = {
  input?: InputMaybe<RefundServiceFeeForVirtualCardInput>
}

/** Owner Id derived from the owner proof. */
export type Owner = {
  __typename?: 'Owner'
  id: Scalars['String']['output']
  issuer: Scalars['String']['output']
}

/**
 * Admin representation of a provisional funding source. Excludes sensitive
 * provisioning/completion material and only exposes attributes useful for
 * administrative listing and deletion decisions.
 */
export type ProvisionalFundingSource = {
  __typename?: 'ProvisionalFundingSource'
  /** Type of card, if known. */
  cardType?: Maybe<CardType>
  /**
   * Time in milliseconds since 1970-01-01T00:00:00Z when object
   * was created
   */
  createdAtEpochMs: Scalars['Float']['output']
  /** Currency of this provisional funding source. */
  currency: Scalars['String']['output']
  /** ID of the object */
  id: Scalars['ID']['output']
  /** Last four digits of the card after setup completes or fails, if known. */
  last4?: Maybe<Scalars['String']['output']>
  /** ID of the user which owns the object. */
  owner: Scalars['ID']['output']
  /** Name of the funding source provider. */
  providerName: Scalars['String']['output']
  /** State of this provisional funding source. */
  state: ProvisionalFundingSourceState
  /** Reason for the state of this provisional funding source. */
  stateReason: StateReason
  /** Type of the funding source being provisioned. */
  type: FundingSourceType
  /**
   * Time in milliseconds since 1970-01-01T00:00:00Z when object
   * last updated
   */
  updatedAtEpochMs: Scalars['Float']['output']
  /** Update version of the object */
  version: Scalars['Int']['output']
}

/**
 * State of a provisional funding source.
 *
 * PROVISIONING: Provisional funding source setup has commenced.
 * PENDING: Provisional funding source setup is pending review.
 * PROVISIONED: Provisional funding source setup has progressed and is ready for completion.
 * COMPLETED: Provisional funding source setup is complete.
 * FAILED: Provisional funding source is in a failed state.
 */
export enum ProvisionalFundingSourceState {
  Completed = 'COMPLETED',
  Failed = 'FAILED',
  Pending = 'PENDING',
  Provisioned = 'PROVISIONED',
  Provisioning = 'PROVISIONING',
}

export type Query = {
  __typename?: 'Query'
  listFundingSourcesBySub: Array<FundingSource>
  /** List the provisional funding sources belonging to a given owner. */
  listProvisionalFundingSourcesBySub: Array<ProvisionalFundingSource>
  listVirtualCardsBySub: Array<VirtualCard>
  listVirtualCardsBySudo: Array<VirtualCard>
  searchVirtualCardsTransactions: TransactionResponse
}

export type QueryListFundingSourcesBySubArgs = {
  input: ListFundingSourcesBySubRequest
}

export type QueryListProvisionalFundingSourcesBySubArgs = {
  input: ListProvisionalFundingSourcesBySubRequest
}

export type QueryListVirtualCardsBySubArgs = {
  input: ListVirtualCardsBySubRequest
}

export type QueryListVirtualCardsBySudoArgs = {
  input: ListVirtualCardsBySudoRequest
}

export type QuerySearchVirtualCardsTransactionsArgs = {
  input: SearchVirtualCardsTransactionsRequest
}

export type RefundServiceFeeForVirtualCardInput = {
  amount: UserCurrencyAmountInput
  feeId: Scalars['String']['input']
}

/** Request used to search for virtual card transactions. */
export type SearchVirtualCardsTransactionsRequest = {
  /** Ending date range of transactions to search. */
  endDate: Scalars['String']['input']
  /** Last 4 digits of card number. */
  last4: Scalars['String']['input']
  /** Max number of transaction records to fetch */
  limit?: InputMaybe<Scalars['Int']['input']>
  /**
   * Token indicating the start of the next batch
   * of records to fetch.
   */
  nextToken?: InputMaybe<Scalars['String']['input']>
  /** Starting date range of transactions to search. */
  startDate: Scalars['String']['input']
  /** ID of the user that owns the transactions. */
  userId: Scalars['ID']['input']
}

export type SignedAuthorizationText = {
  __typename?: 'SignedAuthorizationText'
  /** Algorithm used to generate the signature. */
  algorithm: Scalars['String']['output']
  /** Full content of the agreement */
  content: Scalars['String']['output']
  /** Content type of the agreement. For example text/plain or text/html. */
  contentType: Scalars['String']['output']
  /**
   * Data that is signed. This is a serialised JSON document of the form:
   * {
   *   "hash":"<base64-encoded-hash-of-authorization-agreement-text-agreed-to>",
   *   "hashAlgorithm":"<algorithm-used-to-hash-the-agreement-text>",
   *   "signedAt":"<ISO8601-UTC-timestamp-of-time-signature-generated>",
   *   "account":"<unique-identifier-of-account-agreement-pertains-to>",
   * }
   */
  data: Scalars['String']['output']
  /**
   * ID of public key registered with the virtual cards service corresponding
   * to the private key used to generate the signature
   */
  keyId: Scalars['String']['output']
  /** RFC 5646 language tag specifying the language of the agreement */
  language: Scalars['String']['output']
  /** Base64 encoded signature of the data */
  signature: Scalars['String']['output']
}

export enum StateReason {
  Admin = 'ADMIN',
  Deletion = 'DELETION',
  Entitlement = 'ENTITLEMENT',
  Locked = 'LOCKED',
  Processing = 'PROCESSING',
  Suspicious = 'SUSPICIOUS',
  Unknown = 'UNKNOWN',
  Unlocked = 'UNLOCKED',
  User = 'USER',
}

export type Transaction = {
  __typename?: 'Transaction'
  /**
   * Amount of this transaction as billed to the card in
   * the card's denominated currency.
   */
  billedAmount: UserCurrencyAmount
  /** ID of transaction causing fee if transaction of type FEE */
  causeId?: Maybe<Scalars['String']['output']>
  /**
   * Time in milliseconds since 1970-01-01T00:00:00Z when object
   * was created.
   */
  createdAtEpochMs: Scalars['Float']['output']
  /** Decline reason if transaction of type DECLINE. */
  declineReason?: Maybe<Scalars['String']['output']>
  /**
   * List of details about this transaction depending on transaction type.
   * Pending, complete and refund transactions will always have detail.
   * Decline will have detail if an attempt was made to charge the
   * funding source.
   */
  detail?: Maybe<Array<TransactionDetail>>
  /** ID of fee being refunded if transaction of type FEE_REFUND */
  feeId?: Maybe<Scalars['String']['output']>
  /** Fee reason if transaction of type FEE */
  feeReason?: Maybe<FeeReason>
  /** ID of the object. */
  id: Scalars['ID']['output']
  /** Details excluding the name of the merchant. */
  merchant?: Maybe<Merchant>
  /** ID of the user which owns the object. */
  owner: Scalars['ID']['output']
  /**
   * Amount of this transaction as charged by the merchant
   * in the merchant's currency.
   */
  transactedAmount: UserCurrencyAmount
  /** Time at which transaction occurred. */
  transactedAtEpochMs: Scalars['String']['output']
  /** Type of this transaction. */
  type: TransactionType
  /**
   * Time in milliseconds since 1970-01-01T00:00:00Z when object
   * last updated.
   */
  updatedAtEpochMs: Scalars['Float']['output']
}

export type TransactionConnection = {
  __typename?: 'TransactionConnection'
  items: Array<Transaction>
  nextToken?: Maybe<Scalars['String']['output']>
}

/**
 * Transaction detail. Depending on transaction type will detail
 * things like fees, real credit card transaction details etc.
 */
export type TransactionDetail = {
  __typename?: 'TransactionDetail'
  /** Amount charged or refunded to the funding source. */
  fundingSourceAmount: UserCurrencyAmount
  /** ID of funding source that funded this item. */
  fundingSourceId: Scalars['ID']['output']
  /** Last 4 digits of a user's credit card. */
  fundingSourceLast4: Scalars['String']['output']
  /** Card network of a funding source. */
  fundingSourceNetwork: CreditCardNetwork
  /** Markup formula applied to billedAmount. */
  markup: Markup
  /** Amount of the service fee applied to the transacted amount. */
  serviceFee: UserCurrencyAmount
  /** Time at which transaction detail charge settled (set when state is no longer PENDING) */
  settledAtEpochMs?: Maybe<Scalars['Float']['output']>
  /** Time at which transaction detail charge occurred if any */
  transactedAtEpochMs?: Maybe<Scalars['Float']['output']>
  /** Amount merchant charged virtual card. */
  virtualCardAmount: UserCurrencyAmount
}

export type TransactionResponse = {
  __typename?: 'TransactionResponse'
  /**
   * State of virtual card which define issued, failed
   * and closed states of virtual cards.
   */
  cardState: CardState
  /** ID of card data is returned for */
  id: Scalars['ID']['output']
  /** Last 4 digits of card number. */
  last4: Scalars['String']['output']
  /** List of paginated transactions. */
  transactions: TransactionConnection
}

export enum TransactionType {
  Chargeback = 'CHARGEBACK',
  Complete = 'COMPLETE',
  Decline = 'DECLINE',
  Fee = 'FEE',
  FeeRefund = 'FEE_REFUND',
  Pending = 'PENDING',
  Refund = 'REFUND',
  Reversal = 'REVERSAL',
}

export type UserCurrencyAmount = {
  __typename?: 'UserCurrencyAmount'
  /** Amount of currency amount in currency's decimal unit. */
  amount: Scalars['Float']['output']
  /** Currency of currency amount. */
  currency: Scalars['String']['output']
}

export type UserCurrencyAmountInput = {
  /** Amount of currency amount in currency's decimal unit. */
  amount: Scalars['Float']['input']
  /** Currency of currency amount. */
  currency: Scalars['String']['input']
}

/** Admin representation of a virtual card. */
export type VirtualCard = {
  __typename?: 'VirtualCard'
  /** Time since epoch in which the virtual card will no longer be valid in system. */
  activeToEpochMs: Scalars['Float']['output']
  /**
   * Public key encryption algorithm specifier. See Sudo Platform documentation
   * for set of allowed values.
   */
  algorithm: Scalars['String']['output']
  /** Time since epoch in which the card was cancelled. */
  cancelledAtEpochMs?: Maybe<Scalars['Float']['output']>
  /**
   * Time in milliseconds since 1970-01-01T00:00:00Z when object
   * was created
   */
  createdAtEpochMs: Scalars['Float']['output']
  /** A representation of the currency of the virtual card (i.e. USD, CAD, AUD). */
  currency: Scalars['String']['output']
  /**
   * ID of funding source that will be used to fund activity on
   * the card.
   */
  fundingSourceId: Scalars['ID']['output']
  /** ID of the object */
  id: Scalars['ID']['output']
  /** Client generated key ID for the public key. */
  keyId: Scalars['String']['output']
  /**
   * Client generated key ring ID for the public key ring used
   * for sealing this card and transactions information for this
   * card.
   */
  keyRingId: Scalars['ID']['output']
  /** Last 4 digits of card number. */
  last4: Scalars['String']['output']
  /** ID of the user which owns the object. */
  owner: Scalars['ID']['output']
  /**
   * Array of owner Ids that are extracted from the owner proofs
   * to tie a virtual card to a Sudo.
   */
  owners: Array<Owner>
  /** State of virtual card which define incomplete, provisioning and expiry processing of virtual cards. */
  state: CardState
  /** Reason for transition to state. */
  stateReason: StateReason
  /**
   * Time in milliseconds since 1970-01-01T00:00:00Z when object
   * last updated
   */
  updatedAtEpochMs: Scalars['Float']['output']
  /** Update version of the object */
  version: Scalars['Int']['output']
}
