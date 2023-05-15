import {
  AppSyncError,
  ConfigurationManager,
  FatalError,
  IllegalArgumentError,
  UnknownGraphQLError,
} from '@sudoplatform/sudo-common'
import { NormalizedCacheObject } from 'apollo-cache-inmemory'
import { ApolloError, NetworkStatus } from 'apollo-client'
import { AWSAppSyncClient } from 'aws-appsync'
import {
  anything,
  capture,
  instance,
  mock,
  reset,
  verify,
  when,
} from 'ts-mockito'
import { defaultBankAccountFundingSourceGraphQL } from '../data/transformers/bankAccountFundingSourceTransformer/bankAccountFundingSourceTransformer.test'
import { defaultTransactionConnectionGraphQL } from '../data/transformers/transactionConnectionTransformer/transactionConnectionTransformer.test'
import { defaultVirtualCardGraphQL } from '../data/transformers/virtualCardTransformer/virtualCardTransformer.test'
import {
  CardState,
  FundingSource,
  GetPlaidSandboxDataDocument,
  GetPlaidSandboxDataQuery,
  GetPlaidSandboxDataRequest,
  GetPlaidSandboxDataResponse,
  GetVirtualCardsActiveDocument,
  GetVirtualCardsActiveQuery,
  GetVirtualCardsActiveRequest,
  GetVirtualCardsActiveResponse,
  ListFundingSourcesBySubDocument,
  ListFundingSourcesBySubQuery,
  ListFundingSourcesBySubRequest,
  ListVirtualCardsBySubDocument,
  ListVirtualCardsBySubQuery,
  ListVirtualCardsBySubRequest,
  ListVirtualCardsBySudoDocument,
  ListVirtualCardsBySudoQuery,
  ListVirtualCardsBySudoRequest,
  SearchVirtualCardsTransactionsDocument,
  SearchVirtualCardsTransactionsQuery,
  SearchVirtualCardsTransactionsRequest,
  TransactionResponse,
  VirtualCard,
} from '../gen/graphqlTypes'
import { AdminApiClient, AdminConsoleProject } from './adminApiClient'
import { CardNotFoundError, UnknownTimeZoneError } from '../global/error'
import { GraphQLError } from 'graphql'

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
  const mockClient = mock<AWSAppSyncClient<NormalizedCacheObject>>()

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

  const fetchPolicy = 'network-only'
  const externalId = 'mock-external-id'

  describe('getPlaidSandboxData tests', () => {
    const institutionId = 'mock-institution-id'
    const publicToken = 'mock-public-token'

    const request: GetPlaidSandboxDataRequest = {
      institutionId,
    }

    const result: GetPlaidSandboxDataResponse = {
      __typename: 'GetPlaidSandboxDataResponse',
      publicToken,
      accountMetadata: [
        {
          __typename: 'PlaidAccountMetadata',
          accountId: externalId,
        },
      ],
    }

    it('should return results', async () => {
      when(mockClient.query<GetPlaidSandboxDataQuery>(anything())).thenResolve({
        data: {
          getPlaidSandboxData: result,
        },
        loading: false,
        stale: false,
        networkStatus: NetworkStatus.ready,
      })

      await expect(
        adminApiClient.getPlaidSandboxData(request),
      ).resolves.toEqual(result)

      const [actualQuery] = capture(mockClient.query as any).first()
      expect(actualQuery).toEqual({
        query: GetPlaidSandboxDataDocument,
        variables: { input: request },
        fetchPolicy,
      })
      verify(mockClient.query(anything())).once()
    })

    it('should throw `FatalError` when no result data is returned', async () => {
      const error = new FatalError(
        'getPlaidSandboxData did not return any result.',
      )

      when(mockClient.query<GetPlaidSandboxDataQuery>(anything())).thenReject(
        error,
      )

      await expect(
        adminApiClient.getPlaidSandboxData(anything()),
      ).rejects.toEqual(error)
    })

    it('should throw `UnknownGraphQLError` when non sudoplatform error thrown', async () => {
      const error = new Error()

      when(mockClient.query<GetPlaidSandboxDataQuery>(anything())).thenReject(
        error,
      )

      await expect(
        adminApiClient.getPlaidSandboxData(anything()),
      ).rejects.toEqual(new UnknownGraphQLError(error))
    })

    it('should throw `IllegalArgumentError` when invalid argument received', async () => {
      const invalidRequest = {
        invalid: 'argument',
      } as unknown as GetPlaidSandboxDataRequest
      const error = new IllegalArgumentError()

      when(mockClient.query<GetPlaidSandboxDataQuery>(anything())).thenReject(
        error,
      )

      await expect(
        adminApiClient.getPlaidSandboxData(invalidRequest),
      ).rejects.toThrow(error)
    })
  })

  describe('getVirtualCardsActive tests', () => {
    const now = new Date()
    const startDate = now.toString()
    const endDate = now.toString()
    const timeZone = 'Australia/Brisbane'

    const request: GetVirtualCardsActiveRequest = {
      startDate,
      endDate,
      timeZone,
    }

    const result: GetVirtualCardsActiveResponse = {
      __typename: 'GetVirtualCardsActiveResponse',
      activeCards: [1],
      startDate,
      endDate,
      timeZone,
    }

    it('should return results', async () => {
      when(
        mockClient.query<GetVirtualCardsActiveQuery>(anything()),
      ).thenResolve({
        data: {
          getVirtualCardsActive: result,
        },
        loading: false,
        stale: false,
        networkStatus: NetworkStatus.ready,
      })

      await expect(
        adminApiClient.getVirtualCardsActive(request),
      ).resolves.toEqual(result)

      const [actualQuery] = capture(mockClient.query as any).first()
      expect(actualQuery).toEqual({
        query: GetVirtualCardsActiveDocument,
        variables: { input: request },
        fetchPolicy,
      })
      verify(mockClient.query(anything())).once()
    })

    it('should throw fatal error when no result data is returned', async () => {
      const error = new FatalError(
        'getVirtualCardsActive did not return any result.',
      )

      when(mockClient.query<GetVirtualCardsActiveQuery>(anything())).thenReject(
        error,
      )

      await expect(
        adminApiClient.getVirtualCardsActive(request),
      ).rejects.toEqual(
        new FatalError('getVirtualCardsActive did not return any result.'),
      )
    })

    it('should throw `UnknownGraphQLError` when non sudoplatform error thrown', async () => {
      const error = new Error()

      when(mockClient.query<GetVirtualCardsActiveQuery>(anything())).thenReject(
        error,
      )

      await expect(
        adminApiClient.getVirtualCardsActive(anything()),
      ).rejects.toEqual(new UnknownGraphQLError(error))
    })

    it('should throw `IllegalArgumentError` when invalid argument received', async () => {
      const invalidRequest = {
        invalid: 'argument',
      } as unknown as GetVirtualCardsActiveRequest
      const error = new IllegalArgumentError()

      when(mockClient.query<GetVirtualCardsActiveQuery>(anything())).thenReject(
        error,
      )

      await expect(
        adminApiClient.getVirtualCardsActive(invalidRequest),
      ).rejects.toThrow(error)
    })

    it('should throw `UnknownTimeZoneError` when unknown timezone given', async () => {
      const invalidRequest = {
        ...request,
        timeZone: 'not-a-timezone',
      }
      const error: GraphQLError = new GraphQLError('')
      ;(error as AppSyncError).errorType = 'sudoplatform.UnknownTimeZoneError'

      when(
        mockClient.query<GetVirtualCardsActiveQuery>(anything()),
      ).thenResolve({
        errors: [error],
        data: null as unknown as GetVirtualCardsActiveQuery,
        loading: false,
        stale: false,
        networkStatus: NetworkStatus.ready,
      })

      await expect(
        adminApiClient.getVirtualCardsActive(invalidRequest),
      ).rejects.toEqual(new UnknownTimeZoneError())
    })
  })

  describe('listFundingSourcesBySub tests', () => {
    const request: ListFundingSourcesBySubRequest = {
      sub: 'mock-sub',
    }

    const result: FundingSource[] = [defaultBankAccountFundingSourceGraphQL]

    it('should return results', async () => {
      when(
        mockClient.query<ListFundingSourcesBySubQuery>(anything()),
      ).thenResolve({
        data: {
          listFundingSourcesBySub: result,
        },
        loading: false,
        stale: false,
        networkStatus: NetworkStatus.ready,
      })

      await expect(
        adminApiClient.listFundingSourcesBySub(request),
      ).resolves.toEqual(result)

      const [actualQuery] = capture(mockClient.query as any).first()
      expect(actualQuery).toEqual({
        query: ListFundingSourcesBySubDocument,
        variables: { input: request },
        fetchPolicy,
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
      ).rejects.toEqual(
        new FatalError('listFundingSourcesBySub did not return any result.'),
      )
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
      ).rejects.toThrow(error)
    })
  })

  describe('listVirtualCardsBySub tests', () => {
    const sub = 'mock-sub'

    const request: ListVirtualCardsBySubRequest = {
      sub,
    }

    const result: VirtualCard[] = [defaultVirtualCardGraphQL]

    it('should return results', async () => {
      when(
        mockClient.query<ListVirtualCardsBySubQuery>(anything()),
      ).thenResolve({
        data: {
          listVirtualCardsBySub: result,
        },
        loading: false,
        stale: false,
        networkStatus: NetworkStatus.ready,
      })

      await expect(
        adminApiClient.listVirtualCardsBySub(request),
      ).resolves.toEqual(result)

      const [actualQuery] = capture(mockClient.query as any).first()
      expect(actualQuery).toEqual({
        query: ListVirtualCardsBySubDocument,
        variables: { input: request },
        fetchPolicy,
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
      ).rejects.toEqual(
        new FatalError('listVirtualCardsBySub did not return any result.'),
      )
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
      ).rejects.toThrow(error)
    })
  })

  describe('listVirtualCardsBySudo tests', () => {
    const sudoId = 'mock-id'

    const request: ListVirtualCardsBySudoRequest = {
      sudoId,
    }

    const result: VirtualCard[] = [defaultVirtualCardGraphQL]

    it('should return results', async () => {
      when(
        mockClient.query<ListVirtualCardsBySudoQuery>(anything()),
      ).thenResolve({
        data: {
          listVirtualCardsBySudo: result,
        },
        loading: false,
        stale: false,
        networkStatus: NetworkStatus.ready,
      })

      await expect(
        adminApiClient.listVirtualCardsBySudo(request),
      ).resolves.toEqual(result)

      const [actualQuery] = capture(mockClient.query as any).first()
      expect(actualQuery).toEqual({
        query: ListVirtualCardsBySudoDocument,
        variables: { input: request },
        fetchPolicy,
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
      ).rejects.toEqual(
        new FatalError('listVirtualCardsBySudo did not return any result.'),
      )
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
      ).rejects.toThrow(error)
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
      transactions: defaultTransactionConnectionGraphQL,
    }

    it('should return results', async () => {
      when(
        mockClient.query<SearchVirtualCardsTransactionsQuery>(anything()),
      ).thenResolve({
        data: {
          searchVirtualCardsTransactions: result,
        },
        loading: false,
        stale: false,
        networkStatus: NetworkStatus.ready,
      })

      await expect(
        adminApiClient.searchVirtualCardsTransactions(request),
      ).resolves.toEqual(result)

      const [actualQuery] = capture(mockClient.query as any).first()
      expect(actualQuery).toEqual({
        query: SearchVirtualCardsTransactionsDocument,
        variables: { input: request },
        fetchPolicy,
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
      ).rejects.toEqual(
        new FatalError(
          'searchVirtualCardsTransactions did not return any result.',
        ),
      )
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
      ).rejects.toThrow(error)
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
        loading: false,
        stale: false,
        networkStatus: NetworkStatus.ready,
      })

      await expect(
        adminApiClient.searchVirtualCardsTransactions(request),
      ).rejects.toEqual(new CardNotFoundError())
    })
  })
})
