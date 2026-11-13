/*
 * Copyright © 2023 Anonyome Labs, Inc. All rights reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  AppSyncError,
  ConfigurationManager,
  FatalError,
  IllegalArgumentError,
  UnknownGraphQLError,
} from '@sudoplatform/sudo-common'
import { GraphQLError } from 'graphql'
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
  CardState,
  AcceptPendingFundingSourceDocument,
  AcceptPendingFundingSourceMutation,
  AcceptPendingFundingSourceRequest,
  CancelFundingSourceDocument,
  CancelFundingSourceMutation,
  CancelFundingSourceRequest,
  ChargeServiceFeeForVirtualCardDocument,
  ChargeServiceFeeForVirtualCardMutation,
  ChargeServiceFeeForVirtualCardInput,
  RefundServiceFeeForVirtualCardDocument,
  RefundServiceFeeForVirtualCardMutation,
  RefundServiceFeeForVirtualCardInput,
  DeleteVirtualCardsDataDocument,
  DeleteVirtualCardsDataMutation,
  DeleteVirtualCardsDataRequest,
  FeeReason,
  DeleteProvisionalFundingSourceDocument,
  DeleteProvisionalFundingSourceMutation,
  DeleteProvisionalFundingSourceRequest,
  FundingSource,
  ListFundingSourcesBySubDocument,
  ListFundingSourcesBySubQuery,
  ListFundingSourcesBySubRequest,
  ListProvisionalFundingSourcesBySubDocument,
  ListProvisionalFundingSourcesBySubQuery,
  ListProvisionalFundingSourcesBySubRequest,
  ListVirtualCardsBySubDocument,
  ListVirtualCardsBySubQuery,
  ListVirtualCardsBySubRequest,
  ListVirtualCardsBySudoDocument,
  ListVirtualCardsBySudoQuery,
  ListVirtualCardsBySudoRequest,
  ProvisionalFundingSource,
  SearchVirtualCardsTransactionsDocument,
  SearchVirtualCardsTransactionsQuery,
  SearchVirtualCardsTransactionsRequest,
  TransactionResponse,
  VirtualCard,
} from '../gen/graphqlTypes'
import { CardNotFoundError } from '../global/error'
import { AdminApiClient, AdminConsoleProject } from './adminApiClient'
import { GraphQLDataFactory } from '../util/data-factory/graphQl'
import { GraphQLClient, GraphQLClientAuthMode } from '@sudoplatform/sudo-user'
import { SudoVirtualCardsAdminAuth } from '../virtualCardsAdmin/virtualCardsAdminClient'

describe('\nadminApiClient tests', () => {
  const adminApiKey = 'admin-api-key'
  const config: AdminConsoleProject = {
    region: 'us-east-1',
    apiUrl:
      'https://xitd3gs5bfcrtgepuht57zr7z4.appsync-api.us-east-1.amazonaws.com/graphql',
    userPoolId: 'us-east-1_DFsODjKwq',
    clientId: '3svojfatkq6sonb7ium25l7bad',
  }
  const mockConfigurationManager = mock<ConfigurationManager>()
  const mockClient = mock<GraphQLClient>()

  let adminApiClient: AdminApiClient

  beforeEach(() => {
    reset(mockConfigurationManager)
    reset(mockClient)

    when(
      mockConfigurationManager.bindConfigSet<AdminConsoleProject>(
        anything(),
        anything(),
      ),
    ).thenReturn(config)

    adminApiClient = new AdminApiClient(
      adminApiKey,
      instance(mockConfigurationManager),
      instance(mockClient),
    )
  })

  describe('constructor tests', () => {
    const endpoint = { graphqlUrl: 'https://example.com/graphql', region: 'x' }

    it('does not consult config when endpoint supplied', () => {
      reset(mockConfigurationManager)
      new AdminApiClient(
        adminApiKey,
        instance(mockConfigurationManager),
        instance(mockClient),
        { endpoint },
      )
      verify(
        mockConfigurationManager.bindConfigSet(anything(), anything()),
      ).never()
    })

    it('uses adminConsoleProjectService config when endpoint omitted', () => {
      verify(
        mockConfigurationManager.bindConfigSet(
          anything(),
          'adminConsoleProjectService',
        ),
      ).once()
    })

    it('warns in a browser when using long-lived credentials', () => {
      const warn = vi.spyOn(console, 'warn').mockImplementation(() => undefined)
      vi.stubGlobal('window', { document: {} })
      try {
        const make = (auth: string | SudoVirtualCardsAdminAuth): void => {
          new AdminApiClient(
            auth,
            instance(mockConfigurationManager),
            instance(mockClient),
          )
        }
        make({ type: 'token', tokenProvider: 'token' })
        make({ type: 'iam' })
        expect(warn).not.toHaveBeenCalled()
        make({ type: 'apiKey', apiKey: 'k' })
        make('k')
        make({
          type: 'iam',
          credentials: { accessKeyId: 'a', secretAccessKey: 's' },
        })
        expect(warn).toHaveBeenCalledTimes(3)
      } finally {
        vi.unstubAllGlobals()
        warn.mockRestore()
      }
    })
  })

  describe('auth options tests', () => {
    // Builds a real underlying client and returns the options it received.
    const clientOptionsFor = (
      auth: string | SudoVirtualCardsAdminAuth,
    ): { authMode?: unknown; [key: string]: unknown } =>
      (
        new AdminApiClient(
          auth,
          instance(mockConfigurationManager),
        ) as unknown as {
          client: { options: { authMode?: unknown } }
        }
      ).client.options

    afterEach(() => {
      vi.unstubAllEnvs()
    })

    it('maps each auth type', () => {
      const tokenProvider = (): string => 'token'
      const credentials = { accessKeyId: 'a', secretAccessKey: 's' }
      expect(clientOptionsFor({ type: 'apiKey', apiKey: 'k' })).toMatchObject({
        authMode: GraphQLClientAuthMode.ApiKey,
        apiKey: 'k',
      })
      expect(clientOptionsFor({ type: 'iam', credentials })).toMatchObject({
        authMode: GraphQLClientAuthMode.IAM,
        credentials,
      })
      expect(clientOptionsFor({ type: 'token', tokenProvider })).toMatchObject({
        authMode: GraphQLClientAuthMode.OpenIDConnect,
        tokenProvider,
      })
    })

    it('treats a bare string as an API key', () => {
      expect(clientOptionsFor('k')).toMatchObject({
        authMode: GraphQLClientAuthMode.ApiKey,
        apiKey: 'k',
      })
    })

    it("treats the legacy 'IAM' string as IAM using env credentials", () => {
      vi.stubEnv('AWS_ACCESS_KEY_ID', 'id')
      vi.stubEnv('AWS_SECRET_ACCESS_KEY', 'secret')
      vi.stubEnv('AWS_SESSION_TOKEN', 'session')
      expect(clientOptionsFor('IAM')).toMatchObject({
        authMode: GraphQLClientAuthMode.IAM,
        credentials: {
          accessKeyId: 'id',
          secretAccessKey: 'secret',
          sessionToken: 'session',
        },
      })
      vi.stubEnv('AWS_SECRET_ACCESS_KEY', '')
      const options = clientOptionsFor('IAM')
      expect(options.authMode).toBe(GraphQLClientAuthMode.IAM)
      expect(options.credentials).toBeUndefined()
    })
  })

  describe('listFundingSourcesBySub tests', () => {
    const request: ListFundingSourcesBySubRequest = {
      sub: 'mock-sub',
    }

    const result: FundingSource[] = [
      GraphQLDataFactory.bankAccountFundingSource,
    ]

    it('should return results', async () => {
      when(
        mockClient.query<ListFundingSourcesBySubQuery>(anything()),
      ).thenResolve({
        data: {
          listFundingSourcesBySub: result,
        } as ListFundingSourcesBySubQuery,
      })

      await expect(
        adminApiClient.listFundingSourcesBySub(request),
      ).resolves.toEqual(result)

      const [actualQuery] = capture(mockClient.query as any).first()
      expect(actualQuery).toEqual({
        query: ListFundingSourcesBySubDocument,
        variables: { input: request },
      })

      verify(mockClient.query(anything())).once()
    })

    it('should throw fatal error when no result data is returned', async () => {
      const error = new FatalError(
        'listFundingSourcesBySub did not return any result.',
      )

      when(
        mockClient.query<ListFundingSourcesBySubQuery>(anything()),
      ).thenReject(error)

      await expect(
        adminApiClient.listFundingSourcesBySub(request),
      ).rejects.toEqual(new UnknownGraphQLError(error))
    })

    it('should throw `UnknownGraphQLError` when non sudoplatform error thrown', async () => {
      const error = new Error()

      when(
        mockClient.query<ListFundingSourcesBySubQuery>(anything()),
      ).thenReject(error)

      await expect(
        adminApiClient.listFundingSourcesBySub(anything()),
      ).rejects.toEqual(new UnknownGraphQLError(error))
    })

    it('should throw `IllegalArgumentError` when invalid argument received', async () => {
      const invalidRequest = {
        invalid: 'argument',
      } as unknown as ListFundingSourcesBySubRequest
      const error = new IllegalArgumentError()

      when(
        mockClient.query<ListFundingSourcesBySubQuery>(anything()),
      ).thenReject(error)

      await expect(
        adminApiClient.listFundingSourcesBySub(invalidRequest),
      ).rejects.toEqual(new UnknownGraphQLError(error))
    })
  })

  describe('listVirtualCardsBySub tests', () => {
    const sub = 'mock-sub'

    const request: ListVirtualCardsBySubRequest = {
      sub,
    }

    const result: VirtualCard[] = [GraphQLDataFactory.virtualCards]

    it('should return results', async () => {
      when(
        mockClient.query<ListVirtualCardsBySubQuery>(anything()),
      ).thenResolve({
        data: {
          listVirtualCardsBySub: result,
        } as ListVirtualCardsBySubQuery,
      })

      await expect(
        adminApiClient.listVirtualCardsBySub(request),
      ).resolves.toEqual(result)

      const [actualQuery] = capture(mockClient.query as any).first()
      expect(actualQuery).toEqual({
        query: ListVirtualCardsBySubDocument,
        variables: { input: request },
      })

      verify(mockClient.query(anything())).once()
    })

    it('should throw fatal error when no result data is returned', async () => {
      const error = new FatalError(
        'listVirtualCardsBySub did not return any result.',
      )

      when(mockClient.query<ListVirtualCardsBySubQuery>(anything())).thenReject(
        error,
      )

      await expect(
        adminApiClient.listVirtualCardsBySub(request),
      ).rejects.toEqual(new UnknownGraphQLError(error))
    })

    it('should throw `UnknownGraphQLError` when non sudoplatform error thrown', async () => {
      const error = new Error()

      when(mockClient.query<ListVirtualCardsBySubQuery>(anything())).thenReject(
        error,
      )

      await expect(
        adminApiClient.listVirtualCardsBySub(anything()),
      ).rejects.toEqual(new UnknownGraphQLError(error))
    })

    it('should throw `IllegalArgumentError` when invalid argument received', async () => {
      const invalidRequest = {
        invalid: 'argument',
      } as unknown as ListVirtualCardsBySubRequest
      const error = new IllegalArgumentError()

      when(mockClient.query<ListVirtualCardsBySubQuery>(anything())).thenReject(
        error,
      )

      await expect(
        adminApiClient.listVirtualCardsBySub(invalidRequest),
      ).rejects.toEqual(new UnknownGraphQLError(error))
    })
  })

  describe('listVirtualCardsBySudo tests', () => {
    const sudoId = 'mock-id'

    const request: ListVirtualCardsBySudoRequest = {
      sudoId,
    }

    const result: VirtualCard[] = [GraphQLDataFactory.virtualCards]

    it('should return results', async () => {
      when(
        mockClient.query<ListVirtualCardsBySudoQuery>(anything()),
      ).thenResolve({
        data: {
          listVirtualCardsBySudo: result,
        } as ListVirtualCardsBySudoQuery,
      })

      await expect(
        adminApiClient.listVirtualCardsBySudo(request),
      ).resolves.toEqual(result)

      const [actualQuery] = capture(mockClient.query as any).first()
      expect(actualQuery).toEqual({
        query: ListVirtualCardsBySudoDocument,
        variables: { input: request },
      })

      verify(mockClient.query(anything())).once()
    })

    it('should throw fatal error when no result data is returned', async () => {
      const error = new FatalError(
        'listVirtualCardsBySudo did not return any result.',
      )

      when(
        mockClient.query<ListVirtualCardsBySudoQuery>(anything()),
      ).thenReject(error)

      await expect(
        adminApiClient.listVirtualCardsBySudo(request),
      ).rejects.toEqual(new UnknownGraphQLError(error))
    })

    it('should throw `UnknownGraphQLError` when non sudoplatform error thrown', async () => {
      const error = new Error()

      when(
        mockClient.query<ListVirtualCardsBySudoQuery>(anything()),
      ).thenReject(error)

      await expect(
        adminApiClient.listVirtualCardsBySudo(anything()),
      ).rejects.toEqual(new UnknownGraphQLError(error))
    })

    it('should throw `IllegalArgumentError` when invalid argument received', async () => {
      const invalidRequest = {
        invalid: 'argument',
      } as unknown as ListVirtualCardsBySudoRequest
      const error = new IllegalArgumentError()

      when(
        mockClient.query<ListVirtualCardsBySudoQuery>(anything()),
      ).thenReject(error)

      await expect(
        adminApiClient.listVirtualCardsBySudo(invalidRequest),
      ).rejects.toEqual(new UnknownGraphQLError(error))
    })
  })

  describe('searchVirtualCardsTransactions tests', () => {
    const now = new Date()
    const id = 'mock-id'
    const last4 = '1234'

    const request: SearchVirtualCardsTransactionsRequest = {
      startDate: now.toString(),
      endDate: now.toString(),
      userId: id,
      last4,
    }

    const result: TransactionResponse = {
      __typename: 'TransactionResponse',
      cardState: CardState.Closed,
      id,
      last4,
      transactions: GraphQLDataFactory.transactionConnection,
    }

    it('should return results', async () => {
      when(
        mockClient.query<SearchVirtualCardsTransactionsQuery>(anything()),
      ).thenResolve({
        data: {
          searchVirtualCardsTransactions: result,
        } as SearchVirtualCardsTransactionsQuery,
      })

      await expect(
        adminApiClient.searchVirtualCardsTransactions(request),
      ).resolves.toEqual(result)

      const [actualQuery] = capture(mockClient.query as any).first()
      expect(actualQuery).toEqual({
        query: SearchVirtualCardsTransactionsDocument,
        variables: { input: request },
      })

      verify(mockClient.query(anything())).once()
    })

    it('should throw fatal error when no result data is returned', async () => {
      const error = new FatalError(
        'searchVirtualCardsTransactions did not return any result.',
      )

      when(
        mockClient.query<SearchVirtualCardsTransactionsQuery>(anything()),
      ).thenReject(error)

      await expect(
        adminApiClient.searchVirtualCardsTransactions(request),
      ).rejects.toEqual(new UnknownGraphQLError(error))
    })

    it('should throw `UnknownGraphQLError` when non sudoplatform error thrown', async () => {
      const error = new Error()

      when(
        mockClient.query<SearchVirtualCardsTransactionsQuery>(anything()),
      ).thenReject(error)

      await expect(
        adminApiClient.searchVirtualCardsTransactions(anything()),
      ).rejects.toEqual(new UnknownGraphQLError(error))
    })

    it('should throw `IllegalArgumentError` when invalid argument received', async () => {
      const invalidRequest = {
        invalid: 'argument',
      } as unknown as SearchVirtualCardsTransactionsRequest
      const error = new IllegalArgumentError()

      when(
        mockClient.query<SearchVirtualCardsTransactionsQuery>(anything()),
      ).thenReject(error)

      await expect(
        adminApiClient.searchVirtualCardsTransactions(invalidRequest),
      ).rejects.toEqual(new UnknownGraphQLError(error))
    })

    it('should throw `CardNotFoundError` if card not found in transactions search', async () => {
      const error: GraphQLError = new GraphQLError('')
      ;(error as AppSyncError).errorType =
        'sudoplatform.virtual-cards.CardNotFoundError'

      when(
        mockClient.query<SearchVirtualCardsTransactionsQuery>(anything()),
      ).thenResolve({
        errors: [error],
        data: null as unknown as SearchVirtualCardsTransactionsQuery,
      })

      await expect(
        adminApiClient.searchVirtualCardsTransactions(request),
      ).rejects.toEqual(new CardNotFoundError())
    })
  })

  describe('listProvisionalFundingSourcesBySub tests', () => {
    const request: ListProvisionalFundingSourcesBySubRequest = {
      sub: 'mock-sub',
    }

    const result: ProvisionalFundingSource[] = [
      GraphQLDataFactory.provisionalFundingSource,
    ]

    it('should return results', async () => {
      when(
        mockClient.query<ListProvisionalFundingSourcesBySubQuery>(anything()),
      ).thenResolve({
        data: {
          listProvisionalFundingSourcesBySub: result,
        } as ListProvisionalFundingSourcesBySubQuery,
      })

      await expect(
        adminApiClient.listProvisionalFundingSourcesBySub(request),
      ).resolves.toEqual(result)

      const [actualQuery] = capture(mockClient.query as any).first()
      expect(actualQuery).toEqual({
        query: ListProvisionalFundingSourcesBySubDocument,
        variables: { input: request },
      })

      verify(mockClient.query(anything())).once()
    })

    it('should throw `UnknownGraphQLError` when non sudoplatform error thrown', async () => {
      const error = new Error()

      when(
        mockClient.query<ListProvisionalFundingSourcesBySubQuery>(anything()),
      ).thenReject(error)

      await expect(
        adminApiClient.listProvisionalFundingSourcesBySub(request),
      ).rejects.toEqual(new UnknownGraphQLError(error))
    })

    it('should throw `IllegalArgumentError` when invalid argument received', async () => {
      const invalidRequest = {
        invalid: 'argument',
      } as unknown as ListProvisionalFundingSourcesBySubRequest
      const error = new IllegalArgumentError()

      when(
        mockClient.query<ListProvisionalFundingSourcesBySubQuery>(anything()),
      ).thenReject(error)

      await expect(
        adminApiClient.listProvisionalFundingSourcesBySub(invalidRequest),
      ).rejects.toEqual(new UnknownGraphQLError(error))
    })
  })

  describe('deleteProvisionalFundingSource tests', () => {
    const request: DeleteProvisionalFundingSourceRequest = {
      id: 'dummyProvisionalFundingSourceId',
    }

    it('should return the deleted id', async () => {
      when(
        mockClient.mutate<DeleteProvisionalFundingSourceMutation>(anything()),
      ).thenResolve({
        data: {
          deleteProvisionalFundingSource: {
            id: 'dummyProvisionalFundingSourceId',
          },
        },
      })

      await expect(
        adminApiClient.deleteProvisionalFundingSource(request),
      ).resolves.toEqual('dummyProvisionalFundingSourceId')

      const [actualMutation] = capture(mockClient.mutate as any).first()
      expect(actualMutation).toEqual({
        mutation: DeleteProvisionalFundingSourceDocument,
        variables: { input: request },
      })

      verify(mockClient.mutate(anything())).once()
    })

    it('should throw `UnknownGraphQLError` when non sudoplatform error thrown', async () => {
      const error = new Error()

      when(
        mockClient.mutate<DeleteProvisionalFundingSourceMutation>(anything()),
      ).thenReject(error)

      await expect(
        adminApiClient.deleteProvisionalFundingSource(request),
      ).rejects.toEqual(new UnknownGraphQLError(error))
    })

    it('should throw `FatalError` when no result data is returned', async () => {
      when(
        mockClient.mutate<DeleteProvisionalFundingSourceMutation>(anything()),
      ).thenResolve({})

      await expect(
        adminApiClient.deleteProvisionalFundingSource(request),
      ).rejects.toBeInstanceOf(FatalError)
    })
  })

  describe('acceptPendingFundingSource tests', () => {
    const request: AcceptPendingFundingSourceRequest = {
      id: 'dummyId',
      identityOptions: { fingerprint: 'fp' },
      updateCardFundingSource: false,
    }
    const result = GraphQLDataFactory.bankAccountFundingSource

    it('should return results', async () => {
      when(
        mockClient.mutate<AcceptPendingFundingSourceMutation>(anything()),
      ).thenResolve({
        data: {
          acceptPendingFundingSource: result,
        } as AcceptPendingFundingSourceMutation,
      })

      await expect(
        adminApiClient.acceptPendingFundingSource(request),
      ).resolves.toEqual(result)

      const [actualMutation] = capture(mockClient.mutate as any).first()
      expect(actualMutation).toEqual({
        mutation: AcceptPendingFundingSourceDocument,
        variables: { input: request },
      })
      verify(mockClient.mutate(anything())).once()
    })

    it('should throw `UnknownGraphQLError` when non sudoplatform error thrown', async () => {
      const error = new Error()
      when(
        mockClient.mutate<AcceptPendingFundingSourceMutation>(anything()),
      ).thenReject(error)

      await expect(
        adminApiClient.acceptPendingFundingSource(request),
      ).rejects.toEqual(new UnknownGraphQLError(error))
    })
  })

  describe('cancelFundingSource tests', () => {
    const request: CancelFundingSourceRequest = { id: 'dummyId' }
    const result = GraphQLDataFactory.bankAccountFundingSource

    it('should return results', async () => {
      when(
        mockClient.mutate<CancelFundingSourceMutation>(anything()),
      ).thenResolve({
        data: { cancelFundingSource: result } as CancelFundingSourceMutation,
      })

      await expect(
        adminApiClient.cancelFundingSource(request),
      ).resolves.toEqual(result)

      const [actualMutation] = capture(mockClient.mutate as any).first()
      expect(actualMutation).toEqual({
        mutation: CancelFundingSourceDocument,
        variables: { input: request },
      })
      verify(mockClient.mutate(anything())).once()
    })

    it('should throw `UnknownGraphQLError` when non sudoplatform error thrown', async () => {
      const error = new Error()
      when(
        mockClient.mutate<CancelFundingSourceMutation>(anything()),
      ).thenReject(error)

      await expect(adminApiClient.cancelFundingSource(request)).rejects.toEqual(
        new UnknownGraphQLError(error),
      )
    })
  })

  describe('chargeServiceFeeForVirtualCard tests', () => {
    const request: ChargeServiceFeeForVirtualCardInput = {
      feeReason: FeeReason.InsufficientFunds,
      causeId: 'dummyCauseId',
      amount: { currency: 'USD', amount: 1 },
    }
    const result = GraphQLDataFactory.transaction

    it('should return results', async () => {
      when(
        mockClient.mutate<ChargeServiceFeeForVirtualCardMutation>(anything()),
      ).thenResolve({
        data: {
          chargeServiceFeeForVirtualCard: result,
        } as ChargeServiceFeeForVirtualCardMutation,
      })

      await expect(
        adminApiClient.chargeServiceFeeForVirtualCard(request),
      ).resolves.toEqual(result)

      const [actualMutation] = capture(mockClient.mutate as any).first()
      expect(actualMutation).toEqual({
        mutation: ChargeServiceFeeForVirtualCardDocument,
        variables: { input: request },
      })
      verify(mockClient.mutate(anything())).once()
    })

    it('should throw `UnknownGraphQLError` when non sudoplatform error thrown', async () => {
      const error = new Error()
      when(
        mockClient.mutate<ChargeServiceFeeForVirtualCardMutation>(anything()),
      ).thenReject(error)

      await expect(
        adminApiClient.chargeServiceFeeForVirtualCard(request),
      ).rejects.toEqual(new UnknownGraphQLError(error))
    })
  })

  describe('refundServiceFeeForVirtualCard tests', () => {
    const request: RefundServiceFeeForVirtualCardInput = {
      feeId: 'dummyFeeId',
      amount: { currency: 'USD', amount: 1 },
    }
    const result = GraphQLDataFactory.transaction

    it('should return results', async () => {
      when(
        mockClient.mutate<RefundServiceFeeForVirtualCardMutation>(anything()),
      ).thenResolve({
        data: {
          refundServiceFeeForVirtualCard: result,
        } as RefundServiceFeeForVirtualCardMutation,
      })

      await expect(
        adminApiClient.refundServiceFeeForVirtualCard(request),
      ).resolves.toEqual(result)

      const [actualMutation] = capture(mockClient.mutate as any).first()
      expect(actualMutation).toEqual({
        mutation: RefundServiceFeeForVirtualCardDocument,
        variables: { input: request },
      })
      verify(mockClient.mutate(anything())).once()
    })

    it('should throw `UnknownGraphQLError` when non sudoplatform error thrown', async () => {
      const error = new Error()
      when(
        mockClient.mutate<RefundServiceFeeForVirtualCardMutation>(anything()),
      ).thenReject(error)

      await expect(
        adminApiClient.refundServiceFeeForVirtualCard(request),
      ).rejects.toEqual(new UnknownGraphQLError(error))
    })
  })

  describe('deleteVirtualCardsData tests', () => {
    const request: DeleteVirtualCardsDataRequest = {
      owner: 'dummyOwner',
      deletionType: 'dummyType',
      inactiveSinceEpochMs: 1,
    }
    const result = { status: 'dummyStatus' }

    it('should return results', async () => {
      when(
        mockClient.mutate<DeleteVirtualCardsDataMutation>(anything()),
      ).thenResolve({
        data: {
          deleteVirtualCardsData: result,
        },
      })

      await expect(
        adminApiClient.deleteVirtualCardsData(request),
      ).resolves.toEqual(result)

      const [actualMutation] = capture(mockClient.mutate as any).first()
      expect(actualMutation).toEqual({
        mutation: DeleteVirtualCardsDataDocument,
        variables: { input: request },
      })
      verify(mockClient.mutate(anything())).once()
    })

    it('should throw `UnknownGraphQLError` when non sudoplatform error thrown', async () => {
      const error = new Error()
      when(
        mockClient.mutate<DeleteVirtualCardsDataMutation>(anything()),
      ).thenReject(error)

      await expect(
        adminApiClient.deleteVirtualCardsData(request),
      ).rejects.toEqual(new UnknownGraphQLError(error))
    })
  })
})
