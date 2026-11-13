/*
 * Copyright © 2023 Anonyome Labs, Inc. All rights reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  anything,
  capture,
  instance,
  mock,
  reset,
  verify,
  when,
} from 'ts-mockito'
import {
  DefaultVirtualCardsAdminClient,
  SudoVirtualCardsAdminClient,
} from './virtualCardsAdminClient'
import { AdminApiClient } from '../adminApiClient'
import { DefaultSudoVirtualCardsAdminClientPrivateOptions } from '../private/defaultSudoVirtualCardsAdminClientPrivateOptions'
import {
  FundingSource,
  ProvisionalFundingSource,
  TransactionResponse,
  VirtualCard,
} from '../gen/graphqlTypes'
import { ListFundingSourcesBySubRequest } from './request/listFundingSourcesBySubRequest'
import { FundingSourceTransformer } from '../data/transformers/fundingSourceTransformer'
import { VirtualCardTransformer } from '../data/transformers/virtualCardTransformer'
import { AcceptPendingFundingSourceRequest } from './request/acceptPendingFundingSourceRequest'
import { CancelFundingSourceRequest } from './request/cancelFundingSourceRequest'
import { ChargeServiceFeeForVirtualCardRequest } from './request/chargeServiceFeeForVirtualCardRequest'
import { RefundServiceFeeForVirtualCardRequest } from './request/refundServiceFeeForVirtualCardRequest'
import { DeleteVirtualCardsDataRequest } from './request/deleteVirtualCardsDataRequest'
import { TransactionTransformer } from '../data/transformers/transactionTransformer'
import { FeeReason } from '../entities/feeReason'
import { FeeReason as FeeReasonGraphQL } from '../gen/graphqlTypes'
import { ListProvisionalFundingSourcesBySubRequest } from './request/listProvisionalFundingSourcesBySubRequest'
import { DeleteProvisionalFundingSourceRequest } from './request/deleteProvisionalFundingSourceRequest'
import { ProvisionalFundingSourceTransformer } from '../data/transformers/provisionalFundingSourceTransformer'
import { ListVirtualCardsBySudoRequest } from './request/listVirtualCardsBySudoRequest'
import { ListVirtualCardsBySubRequest } from './request/listVirtualCardsBySubRequest'
import { SearchVirtualCardsTransactionsRequest } from './request/searchVirtualCardsTransactionsRequest'
import { defaultTransactionResponseGraphQL } from '../data/transformers/transactionResponseTransformer/transactionResponseTransformer.test'
import { TransactionResponseTransformer } from '../data/transformers/transactionResponseTransformer'
import { GraphQLDataFactory } from '../util/data-factory/graphQl'

describe('\nsudoVirtualCardsAdmin tests', () => {
  const apiKey = 'admin-api-key'
  const mockAdminApiClient = mock<AdminApiClient>()
  let sudoVirtualCardsAdminClient: SudoVirtualCardsAdminClient

  beforeEach(() => {
    reset(mockAdminApiClient)

    const privateOptions: Partial<DefaultSudoVirtualCardsAdminClientPrivateOptions> =
      {
        adminApiClient: instance(mockAdminApiClient),
      }
    sudoVirtualCardsAdminClient = new DefaultVirtualCardsAdminClient(
      apiKey,
      privateOptions,
    )
  })

  describe('acceptPendingFundingSource tests', () => {
    const adminClientRequest: AcceptPendingFundingSourceRequest = {
      id: 'dummyId',
      identityOptions: { fingerprint: 'fp' },
      updateCardFundingSource: false,
    }
    const adminApiResult = GraphQLDataFactory.bankAccountFundingSource

    it('should return results', async () => {
      when(
        mockAdminApiClient.acceptPendingFundingSource(anything()),
      ).thenResolve(adminApiResult)

      await expect(
        sudoVirtualCardsAdminClient.acceptPendingFundingSource(
          adminClientRequest,
        ),
      ).resolves.toEqual(FundingSourceTransformer.toEntity(adminApiResult))

      const [actualInput] = capture(
        mockAdminApiClient.acceptPendingFundingSource,
      ).first()
      expect(actualInput).toEqual({
        id: 'dummyId',
        identityOptions: { fingerprint: 'fp' },
        updateCardFundingSource: false,
      })
      verify(mockAdminApiClient.acceptPendingFundingSource(anything())).once()
    })
  })

  describe('cancelFundingSource tests', () => {
    const adminClientRequest: CancelFundingSourceRequest = { id: 'dummyId' }
    const adminApiResult = GraphQLDataFactory.bankAccountFundingSource

    it('should return results', async () => {
      when(mockAdminApiClient.cancelFundingSource(anything())).thenResolve(
        adminApiResult,
      )

      await expect(
        sudoVirtualCardsAdminClient.cancelFundingSource(adminClientRequest),
      ).resolves.toEqual(FundingSourceTransformer.toEntity(adminApiResult))

      const [actualInput] = capture(
        mockAdminApiClient.cancelFundingSource,
      ).first()
      expect(actualInput).toEqual({ id: 'dummyId' })
      verify(mockAdminApiClient.cancelFundingSource(anything())).once()
    })
  })

  describe('chargeServiceFeeForVirtualCard tests', () => {
    const adminClientRequest: ChargeServiceFeeForVirtualCardRequest = {
      feeReason: FeeReason.InsufficientFunds,
      causeId: 'dummyCauseId',
      amount: { currency: 'USD', amount: 1 },
    }
    const adminApiResult = GraphQLDataFactory.transaction

    it('should return results', async () => {
      when(
        mockAdminApiClient.chargeServiceFeeForVirtualCard(anything()),
      ).thenResolve(adminApiResult)

      await expect(
        sudoVirtualCardsAdminClient.chargeServiceFeeForVirtualCard(
          adminClientRequest,
        ),
      ).resolves.toEqual(TransactionTransformer.toEntity(adminApiResult))

      const [actualInput] = capture(
        mockAdminApiClient.chargeServiceFeeForVirtualCard,
      ).first()
      expect(actualInput).toEqual({
        feeReason: FeeReasonGraphQL.InsufficientFunds,
        causeId: 'dummyCauseId',
        amount: { currency: 'USD', amount: 1 },
      })
      verify(
        mockAdminApiClient.chargeServiceFeeForVirtualCard(anything()),
      ).once()
    })
  })

  describe('refundServiceFeeForVirtualCard tests', () => {
    const adminClientRequest: RefundServiceFeeForVirtualCardRequest = {
      feeId: 'dummyFeeId',
      amount: { currency: 'USD', amount: 1 },
    }
    const adminApiResult = GraphQLDataFactory.transaction

    it('should return results', async () => {
      when(
        mockAdminApiClient.refundServiceFeeForVirtualCard(anything()),
      ).thenResolve(adminApiResult)

      await expect(
        sudoVirtualCardsAdminClient.refundServiceFeeForVirtualCard(
          adminClientRequest,
        ),
      ).resolves.toEqual(TransactionTransformer.toEntity(adminApiResult))

      const [actualInput] = capture(
        mockAdminApiClient.refundServiceFeeForVirtualCard,
      ).first()
      expect(actualInput).toEqual({
        feeId: 'dummyFeeId',
        amount: { currency: 'USD', amount: 1 },
      })
      verify(
        mockAdminApiClient.refundServiceFeeForVirtualCard(anything()),
      ).once()
    })
  })

  describe('deleteVirtualCardsData tests', () => {
    const adminClientRequest: DeleteVirtualCardsDataRequest = {
      owner: 'dummyOwner',
      deletionType: 'dummyType',
      inactiveSince: new Date(1),
    }
    const adminApiResult = { status: 'dummyStatus' }

    it('should return results', async () => {
      when(mockAdminApiClient.deleteVirtualCardsData(anything())).thenResolve(
        adminApiResult,
      )

      await expect(
        sudoVirtualCardsAdminClient.deleteVirtualCardsData(adminClientRequest),
      ).resolves.toEqual('dummyStatus')

      const [actualInput] = capture(
        mockAdminApiClient.deleteVirtualCardsData,
      ).first()
      expect(actualInput).toEqual({
        owner: 'dummyOwner',
        deletionType: 'dummyType',
        inactiveSinceEpochMs: 1,
      })
      verify(mockAdminApiClient.deleteVirtualCardsData(anything())).once()
    })
  })

  describe('listProvisionalFundingSourcesBySub tests', () => {
    const adminClientRequest: ListProvisionalFundingSourcesBySubRequest = {
      sub: 'mock-sub',
    }

    const adminApiResult: ProvisionalFundingSource[] = [
      GraphQLDataFactory.provisionalFundingSource,
    ]

    const adminClientResult = adminApiResult.map((provisionalFundingSource) =>
      ProvisionalFundingSourceTransformer.toEntity(provisionalFundingSource),
    )

    it('should return results', async () => {
      when(
        mockAdminApiClient.listProvisionalFundingSourcesBySub(anything()),
      ).thenResolve(adminApiResult)

      await expect(
        sudoVirtualCardsAdminClient.listProvisionalFundingSourcesBySub(
          adminClientRequest,
        ),
      ).resolves.toEqual(adminClientResult)

      const [actualInput] = capture(
        mockAdminApiClient.listProvisionalFundingSourcesBySub,
      ).first()
      expect(actualInput).toEqual(adminClientRequest)
      verify(
        mockAdminApiClient.listProvisionalFundingSourcesBySub(anything()),
      ).once()
    })
  })

  describe('deleteProvisionalFundingSource tests', () => {
    const adminClientRequest: DeleteProvisionalFundingSourceRequest = {
      id: 'dummyProvisionalFundingSourceId',
    }

    it('should return the id of the deleted provisional funding source', async () => {
      when(
        mockAdminApiClient.deleteProvisionalFundingSource(anything()),
      ).thenResolve('dummyProvisionalFundingSourceId')

      await expect(
        sudoVirtualCardsAdminClient.deleteProvisionalFundingSource(
          adminClientRequest,
        ),
      ).resolves.toEqual('dummyProvisionalFundingSourceId')

      const [actualInput] = capture(
        mockAdminApiClient.deleteProvisionalFundingSource,
      ).first()
      expect(actualInput).toEqual(adminClientRequest)
      verify(
        mockAdminApiClient.deleteProvisionalFundingSource(anything()),
      ).once()
    })
  })

  describe('listFundingSourcesBySub tests', () => {
    const adminClientRequest: ListFundingSourcesBySubRequest = {
      sub: 'mock-sub',
    }

    const adminApiResult: FundingSource[] = [
      GraphQLDataFactory.creditCardFundingSource,
      GraphQLDataFactory.bankAccountFundingSource,
    ]

    const adminClientResult = adminApiResult.map((fundingSource) =>
      FundingSourceTransformer.toEntity(fundingSource),
    )
    it('should return results', async () => {
      when(mockAdminApiClient.listFundingSourcesBySub(anything())).thenResolve(
        adminApiResult,
      )

      await expect(
        sudoVirtualCardsAdminClient.listFundingSourcesBySub(adminClientRequest),
      ).resolves.toEqual(adminClientResult)

      const [actualInput] = capture(
        mockAdminApiClient.listFundingSourcesBySub,
      ).first()
      expect(actualInput).toEqual(adminClientRequest)
      verify(mockAdminApiClient.listFundingSourcesBySub(anything())).once()
    })
  })

  describe('listVirtualCardsBySub tests', () => {
    const adminClientRequest: ListVirtualCardsBySubRequest = {
      sub: 'mock-sub',
    }

    const adminApiResult: VirtualCard[] = [GraphQLDataFactory.virtualCards]

    const adminClientResult = adminApiResult.map((virtualCard) =>
      VirtualCardTransformer.toEntity(virtualCard),
    )

    it('should return results', async () => {
      when(mockAdminApiClient.listVirtualCardsBySub(anything())).thenResolve(
        adminApiResult,
      )

      await expect(
        sudoVirtualCardsAdminClient.listVirtualCardsBySub(adminClientRequest),
      ).resolves.toEqual(adminClientResult)

      const [actualInput] = capture(
        mockAdminApiClient.listVirtualCardsBySub,
      ).first()
      expect(actualInput).toEqual(adminClientRequest)
      verify(mockAdminApiClient.listVirtualCardsBySub(anything())).once()
    })
  })

  describe('listVirtualCardsBySudo tests', () => {
    const adminClientRequest: ListVirtualCardsBySudoRequest = {
      sudoId: 'mock-id',
    }

    const adminApiResult: VirtualCard[] = [GraphQLDataFactory.virtualCards]

    const adminClientResult = adminApiResult.map((virtualCard) =>
      VirtualCardTransformer.toEntity(virtualCard),
    )

    it('should return results', async () => {
      when(mockAdminApiClient.listVirtualCardsBySudo(anything())).thenResolve(
        adminApiResult,
      )

      await expect(
        sudoVirtualCardsAdminClient.listVirtualCardsBySudo(adminClientRequest),
      ).resolves.toEqual(adminClientResult)

      const [actualInput] = capture(
        mockAdminApiClient.listVirtualCardsBySudo,
      ).first()
      expect(actualInput).toEqual(adminClientRequest)
      verify(mockAdminApiClient.listVirtualCardsBySudo(anything())).once()
    })
  })

  describe('searchVirtualCardsTransactions tests', () => {
    const userId = 'mock-id'
    const last4 = '1234'
    const now = new Date()
    const limit = 100
    const nextToken = 'mock-token'

    const adminClientRequest: SearchVirtualCardsTransactionsRequest = {
      userId,
      last4,
      startDate: now,
      endDate: now,
      limit,
      nextToken,
    }

    const adminApiResult: TransactionResponse =
      defaultTransactionResponseGraphQL
    adminApiResult.id = userId
    adminApiResult.last4 = last4

    const adminClientResult =
      TransactionResponseTransformer.toEntity(adminApiResult)

    it('should return results', async () => {
      when(
        mockAdminApiClient.searchVirtualCardsTransactions(anything()),
      ).thenResolve(adminApiResult)

      await expect(
        sudoVirtualCardsAdminClient.searchVirtualCardsTransactions(
          adminClientRequest,
        ),
      ).resolves.toEqual(adminClientResult)
    })
  })
})
