/*
 * Copyright © 2023 Anonyome Labs, Inc. All rights reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/* eslint-disable tree-shaking/no-side-effects-in-initialization */

import {
  BankAccountFundingSource,
  BankAccountType,
  CardState,
  CardType,
  CreditCardFundingSource,
  CreditCardNetwork,
  FundingSourceState,
  Markup,
  Merchant,
  Owner,
  SignedAuthorizationText,
  Transaction,
  TransactionConnection,
  TransactionDetail,
  TransactionType,
  UserCurrencyAmount,
  VirtualCard,
} from '../../gen/graphqlTypes'

export class GraphQLDataFactory {
  private static readonly commonProps = {
    owner: 'dummyOwner',
    createdAtEpochMs: 1.0,
    updatedAtEpochMs: 2.0,
  }

  private static readonly commonFundingSourceUnsealedProps = {
    ...GraphQLDataFactory.commonProps,
    id: 'dummyFundingSourceId',
    currency: 'dummyCurrency',
    state: FundingSourceState.Active,
    flags: [],
    last4: '1234',
    fingerprint: 'fingerprint',
  }

  static readonly owner: Owner = {
    __typename: 'Owner',
    id: 'dummyOwnerId',
    issuer: 'dummyIssuer',
  }

  static readonly signedAuthorizationText: SignedAuthorizationText = {
    __typename: 'SignedAuthorizationText',
    content: 'dummyAuthorizationContent',
    contentType: 'dummyAuthorizationContentType',
    algorithm: 'dummyAuthorizationAlgorithm',
    signature: 'dummyAuthorizationSignature',
    data: 'dummyAuthorizationData',
    keyId: 'dummyAuthorizationKeyId',
    language: 'dummyAuthorizationLanguage',
  }

  static readonly creditCardFundingSource: CreditCardFundingSource = {
    ...this.commonFundingSourceUnsealedProps,
    __typename: 'CreditCardFundingSource',
    version: 1,
    cardType: CardType.Credit,
    network: CreditCardNetwork.Visa,
  }

  static readonly bankAccountFundingSource: BankAccountFundingSource = {
    ...this.commonFundingSourceUnsealedProps,
    __typename: 'BankAccountFundingSource',
    version: 1,
    bankAccountType: BankAccountType.Savings,
    authorization: this.signedAuthorizationText,
    unfundedAmount: {
      __typename: 'UserCurrencyAmount',
      currency: 'USD',
      amount: 123,
    },
  }

  static readonly virtualCards: VirtualCard = {
    ...this.commonProps,
    __typename: 'VirtualCard',
    version: 1,
    id: 'dummyCardId',
    algorithm: 'dummyAlgorithm',
    keyId: 'dummyKeyId',
    keyRingId: 'dummyKeyRingId',
    owners: [this.owner],
    fundingSourceId: 'dummyFundingSourceId',
    currency: 'USD',
    state: CardState.Issued,
    activeToEpochMs: new Date(1).getTime(),
    cancelledAtEpochMs: new Date(1).getTime(),
    last4: '1234',
  }

  static readonly markup: Markup = {
    __typename: 'Markup',
    percent: '1',
    flat: '2',
    minCharge: '0.5',
  }

  private static readonly userCurrencyAmount: UserCurrencyAmount = {
    currency: 'USD',
    amount: 100,
  }

  static readonly merchant: Merchant = {
    __typename: 'Merchant',
    id: 'dummyMerchantId',
    mcc: 'dummyMcc',
    country: 'dummyCountry',
    city: 'dummyCity',
    state: 'dummyState',
    postalCode: 'dummyPostalCode',
  }

  static readonly transactionDetail: TransactionDetail = {
    __typename: 'TransactionDetail',
    virtualCardAmount: this.userCurrencyAmount,
    markup: this.markup,
    fundingSourceId: 'fundingSourceId',
    serviceFee: this.userCurrencyAmount,
    fundingSourceAmount: this.userCurrencyAmount,
    fundingSourceLast4: '1234',
    fundingSourceNetwork: CreditCardNetwork.Visa,
  }

  static readonly transaction: Transaction = {
    __typename: 'Transaction',
    ...this.commonProps,
    id: 'dummyTransactionId',
    type: TransactionType.Pending,
    transactedAtEpochMs: new Date(1.0).getTime().toString(),
    billedAmount: this.userCurrencyAmount,
    transactedAmount: this.userCurrencyAmount,
    merchant: this.merchant,
    declineReason: 'dummyDeclineReason',
    detail: [this.transactionDetail],
  }

  static readonly transactionConnection: TransactionConnection = {
    __typename: 'TransactionConnection',
    items: [GraphQLDataFactory.transaction],
    nextToken: 'dummyNextToken',
  }
}
