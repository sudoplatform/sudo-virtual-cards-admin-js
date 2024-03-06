/*
 * Copyright © 2023 Anonyome Labs, Inc. All rights reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  BankAccountFundingSource,
  CardState,
  CardType,
  CreditCardFundingSource,
  CreditCardNetwork,
  Markup,
  Merchant,
  Owner,
  Transaction,
  TransactionConnection,
  TransactionDetail,
  TransactionType,
  UserCurrencyAmount,
  VirtualCard,
} from '../../entities'
import { BankAccountType } from '../../entities/bankAccountType'
import { FundingSourceState } from '../../entities/fundingSourceState'
import { SignedAuthorizationText } from '../../entities/signedAuthorizationText'

export class EntityDataFactory {
  private static readonly commonProps = {
    owner: 'dummyOwner',
    createdAt: new Date(1.0),
    updatedAt: new Date(2.0),
  }

  private static readonly commonFundingSourceProps = {
    ...this.commonProps,
    id: 'dummyFundingSourceId',
    currency: 'dummyCurrency',
    state: FundingSourceState.Active,
    flags: [],
    last4: '1234',
    fingerprint: 'fingerprint',
  }

  static readonly owner: Owner = {
    id: 'dummyOwnerId',
    issuer: 'dummyIssuer',
  }

  static readonly signedAuthorizationText: SignedAuthorizationText = {
    content: 'dummyAuthorizationContent',
    contentType: 'dummyAuthorizationContentType',
    algorithm: 'dummyAuthorizationAlgorithm',
    signature: 'dummyAuthorizationSignature',
    data: 'dummyAuthorizationData',
    keyId: 'dummyAuthorizationKeyId',
    language: 'dummyAuthorizationLanguage',
  }

  static readonly creditCardFundingSource: CreditCardFundingSource = {
    ...this.commonFundingSourceProps,
    version: 1,
    cardType: CardType.Credit,
    network: CreditCardNetwork.Visa,
  }

  static readonly bankAccountFundingSource: BankAccountFundingSource = {
    ...this.commonFundingSourceProps,
    version: 1,
    bankAccountType: BankAccountType.Savings,
    authorization: this.signedAuthorizationText,
  }

  static readonly virtualCards: VirtualCard = {
    ...this.commonProps,
    id: 'dummyCardId',
    version: 1,
    algorithm: 'dummyAlgorithm',
    keyId: 'dummyKeyId',
    keyRingId: 'dummyKeyRingId',
    owners: [this.owner],
    fundingSourceId: 'dummyFundingSourceId',
    currency: 'USD',
    state: CardState.Issued,
    activeTo: new Date(1),
    cancelledAt: new Date(1),
    last4: '1234',
  }

  static readonly markup: Markup = {
    percent: 1,
    flat: 2,
    minCharge: 0.5,
  }

  private static readonly userCurrencyAmount: UserCurrencyAmount = {
    currency: 'USD',
    amount: 100,
  }

  static readonly merchant: Merchant = {
    id: 'dummyMerchantId',
    mcc: 'dummyMcc',
    country: 'dummyCountry',
    city: 'dummyCity',
    state: 'dummyState',
    postalCode: 'dummyPostalCode',
  }

  static readonly transactionDetail: TransactionDetail = {
    virtualCardAmount: this.userCurrencyAmount,
    markup: EntityDataFactory.markup,
    fundingSourceId: 'fundingSourceId',
    serviceFee: this.userCurrencyAmount,
    fundingSourceAmount: this.userCurrencyAmount,
    fundingSourceLast4: '1234',
    fundingSourceNetwork: CreditCardNetwork.Visa,
  }

  static readonly transaction: Transaction = {
    ...this.commonProps,
    id: 'dummyTransactionId',
    type: TransactionType.Pending,
    transactedAt: new Date(1.0),
    billedAmount: this.userCurrencyAmount,
    transactedAmount: this.userCurrencyAmount,
    merchant: this.merchant,
    declineReason: 'dummyDeclineReason',
    detail: [this.transactionDetail],
  }

  static readonly transactionConnection: TransactionConnection = {
    items: [EntityDataFactory.transaction],
    nextToken: 'dummyNextToken',
  }
}
