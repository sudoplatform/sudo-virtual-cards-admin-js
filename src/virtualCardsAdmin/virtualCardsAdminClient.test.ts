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
import { PlaidAccountMetadataTransformer } from '../data/transformers/plaidAccountMetadataTransformer'
import {
  FundingSource,
  GetPlaidSandboxDataResponse,
  GetVirtualCardsActiveResponse,
  PlaidAccountMetadata,
  TransactionResponse,
  VirtualCard,
} from '../gen/graphqlTypes'
import { GetPlaidSandboxDataRequest } from './request/getPlaidSandboxDataRequest'
import { GetVirtualCardsActiveRequest } from './request/getVirtualCardsActiveRequest'
import { GetVirtualCardsActiveResponseTransformer } from '../data/transformers/getVirtualCardsActiveResponseTransformer'
import { ListFundingSourcesBySubRequest } from './request/listFundingSourcesBySubRequest'
import { FundingSourceTransformer } from '../data/transformers/fundingSourceTransformer'
import { defaultCreditCardFundingSourceGraphQL } from '../data/transformers/creditCardFundingSourceTransformer/creditCardFundingSourceTransformer.test'
import { defaultBankAccountFundingSourceGraphQL } from '../data/transformers/bankAccountFundingSourceTransformer/bankAccountFundingSourceTransformer.test'
import { defaultVirtualCardGraphQL } from '../data/transformers/virtualCardTransformer/virtualCardTransformer.test'
import { VirtualCardTransformer } from '../data/transformers/virtualCardTransformer'
import { ListVirtualCardsBySudoRequest } from './request/listVirtualCardsBySudoRequest'
import { ListVirtualCardsBySubRequest } from './request/listVirtualCardsBySubRequest'
import { SearchVirtualCardsTransactionsRequest } from './request/searchVirtualCardsTransactionsRequest'
import { defaultTransactionResponseGraphQL } from '../data/transformers/transactionResponseTransformer/transactionResponseTransformer.test'
import { TransactionResponseTransformer } from '../data/transformers/transactionResponseTransformer'
import { defaultPlaidAccountMetadataGraphQL } from '../data/transformers/plaidAccountMetadataTransformer/plaidAccountMetadataTransformer.test'

describe('\nsudoVirtualCardsAdmin tests', () => {
  const apiKey = 'admin-api-key'
  const mockAdminApiClient = mock<AdminApiClient>()
  let sudoVirtualCardsAdminClient: SudoVirtualCardsAdminClient

  beforeEach(() => {
    reset(mockAdminApiClient)

    const privateOptions: DefaultSudoVirtualCardsAdminClientPrivateOptions = {
      adminApiClient: instance(mockAdminApiClient),
    }
    sudoVirtualCardsAdminClient = new DefaultVirtualCardsAdminClient(
      apiKey,
      privateOptions,
    )
  })

  describe('getPlaidSandboxData', () => {
    const publicToken = 'mock-public-token'
    const institutionId = 'mock-institution-id'

    const adminClientRequest: GetPlaidSandboxDataRequest = {
      institutionId,
    }

    const adminApiResult: GetPlaidSandboxDataResponse = {
      publicToken,
      accountMetadata: [defaultPlaidAccountMetadataGraphQL],
    }

    const adminClientResult = {
      publicToken,
      accountMetadata: adminApiResult.accountMetadata.map(
        (account) =>
          PlaidAccountMetadataTransformer.toEntity(
            account,
          ) as PlaidAccountMetadata,
      ),
    }

    it('should return results', async () => {
      when(mockAdminApiClient.getPlaidSandboxData(anything())).thenResolve(
        adminApiResult,
      )

      await expect(
        sudoVirtualCardsAdminClient.getPlaidSandboxData(adminClientRequest),
      ).resolves.toEqual(adminClientResult)

      const [actualInput] = capture(
        mockAdminApiClient.getPlaidSandboxData,
      ).first()
      expect(actualInput).toEqual(adminClientRequest)
      verify(mockAdminApiClient.getPlaidSandboxData(anything())).once()
    })
  })

  describe('getVirtualCardsActive tests', () => {
    const now = new Date()
    const timeZone = 'Australia/Brisbane'

    const adminClientRequest: GetVirtualCardsActiveRequest = {
      startDate: now,
      endDate: now,
      timeZone,
    }

    const adminApiResult: GetVirtualCardsActiveResponse = {
      activeCards: [1],
      startDate: now.toISOString(),
      endDate: now.toISOString(),
      timeZone,
    }

    const adminClientResult =
      GetVirtualCardsActiveResponseTransformer.toEntity(adminApiResult)

    it('should return results', async () => {
      when(mockAdminApiClient.getVirtualCardsActive(anything())).thenResolve(
        adminApiResult,
      )

      await expect(
        sudoVirtualCardsAdminClient.getVirtualCardsActive(adminClientRequest),
      ).resolves.toEqual(adminClientResult)
    })
  })

  describe('listFundingSourcesBySub tests', () => {
    const adminClientRequest: ListFundingSourcesBySubRequest = {
      sub: 'mock-sub',
    }

    const adminApiResult: FundingSource[] = [
      defaultCreditCardFundingSourceGraphQL,
      defaultBankAccountFundingSourceGraphQL,
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

    const adminApiResult: VirtualCard[] = [defaultVirtualCardGraphQL]

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

    const adminApiResult: VirtualCard[] = [defaultVirtualCardGraphQL]

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
