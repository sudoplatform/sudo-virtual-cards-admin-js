import {
  AppSyncError,
  AppSyncNetworkError,
  ConfigurationManager,
  DefaultConfigurationManager,
  DefaultLogger,
  FatalError,
  Logger,
  mapGraphQLToClientError,
  mapNetworkErrorToClientError,
  UnknownGraphQLError,
} from '@sudoplatform/sudo-common'
import { NormalizedCacheObject } from 'apollo-cache-inmemory'
import { ApolloError, QueryOptions } from 'apollo-client'
import AWSAppSyncClient, { AUTH_TYPE } from 'aws-appsync'
import { AuthOptions } from 'aws-appsync-auth-link'
import { GraphQLError } from 'graphql'
import * as t from 'io-ts'
import { ErrorTransformer } from '../data/transformers/errorTransformer/errorTransformer'
import {
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

export interface AdminApiClientProps {
  apiKey: string
  region: string
  graphqlUrl: string
}

const queryFetchPolicy = 'network-only'

// eslint-disable-next-line tree-shaking/no-side-effects-in-initialization
export const AdminConsoleProject = t.type({
  region: t.string,
  apiUrl: t.string,
  userPoolId: t.string,
  clientId: t.string,
})

export type AdminConsoleProject = t.TypeOf<typeof AdminConsoleProject>

/**
 * For auth, we allow IAM auth primarily to enable our own
 * system tests. It's unlikely that this would be of use
 * externally so we enable IAM auth by making 'IAM' a special
 * API key value.
 */
function getAuthOptions(apiKey: string): AuthOptions {
  if (apiKey === 'IAM') {
    const accessKeyId = process.env.AWS_ACCESS_KEY_ID
    const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY
    const sessionToken = process.env.AWS_SESSION_TOKEN

    if (accessKeyId && secretAccessKey) {
      return {
        type: AUTH_TYPE.AWS_IAM,
        credentials: {
          accessKeyId,
          secretAccessKey,
          sessionToken,
        },
      }
    } else {
      return {
        type: AUTH_TYPE.AWS_IAM,
        credentials: null,
      }
    }
  } else {
    return { type: AUTH_TYPE.API_KEY, apiKey }
  }
}

export class AdminApiClient {
  private readonly log: Logger
  private readonly configurationManager: ConfigurationManager
  private readonly client: AWSAppSyncClient<NormalizedCacheObject>

  public constructor(
    apiKey: string,
    configurationManager?: ConfigurationManager,
    client?: AWSAppSyncClient<NormalizedCacheObject>,
  ) {
    this.log = new DefaultLogger(this.constructor.name)
    this.configurationManager =
      configurationManager ?? DefaultConfigurationManager.getInstance()
    const config = this.configurationManager.bindConfigSet<AdminConsoleProject>(
      AdminConsoleProject,
      'adminConsoleProjectService',
    )

    this.client =
      client ??
      new AWSAppSyncClient<NormalizedCacheObject>({
        url: config.apiUrl,
        region: config.region,
        auth: getAuthOptions(apiKey),
        disableOffline: true,
      })
  }

  private mapAndThrowError(
    returnedError?: AppSyncError | GraphQLError,
    thrownError?: Error,
  ): never {
    if (thrownError) {
      const appSyncNetworkError = thrownError as AppSyncNetworkError
      if (appSyncNetworkError.networkError) {
        throw mapNetworkErrorToClientError(appSyncNetworkError)
      }
      const apolloError = thrownError as ApolloError
      if (apolloError.graphQLErrors?.[0]) {
        returnedError = apolloError.graphQLErrors?.[0]
      } else if ((thrownError as AppSyncError).errorType) {
        returnedError = thrownError as AppSyncError
      } else {
        throw new UnknownGraphQLError(thrownError)
      }
    }

    if (returnedError) {
      if (
        'errorType' in returnedError &&
        returnedError.errorType?.startsWith('sudoplatform.')
      ) {
        throw new FatalError(returnedError?.errorType)
      } else {
        throw mapGraphQLToClientError(returnedError)
      }
    }

    throw new FatalError('no error to map')
  }

  public async getPlaidSandboxData(
    input: GetPlaidSandboxDataRequest,
  ): Promise<GetPlaidSandboxDataResponse> {
    const data = await this.performQuery<GetPlaidSandboxDataQuery>({
      query: GetPlaidSandboxDataDocument,
      variables: { input },
      fetchPolicy: queryFetchPolicy,
    })
    return data.getPlaidSandboxData
  }

  public async getVirtualCardsActive(
    input: GetVirtualCardsActiveRequest,
  ): Promise<GetVirtualCardsActiveResponse> {
    const data = await this.performQuery<GetVirtualCardsActiveQuery>({
      query: GetVirtualCardsActiveDocument,
      variables: { input },
      fetchPolicy: queryFetchPolicy,
    })
    return data.getVirtualCardsActive
  }

  public async listFundingSourcesBySub(
    input: ListFundingSourcesBySubRequest,
  ): Promise<FundingSource[]> {
    const data = await this.performQuery<ListFundingSourcesBySubQuery>({
      query: ListFundingSourcesBySubDocument,
      variables: { input },
      fetchPolicy: queryFetchPolicy,
    })
    return data.listFundingSourcesBySub
  }

  public async listVirtualCardsBySub(
    input: ListVirtualCardsBySubRequest,
  ): Promise<VirtualCard[]> {
    const data = await this.performQuery<ListVirtualCardsBySubQuery>({
      query: ListVirtualCardsBySubDocument,
      variables: { input },
      fetchPolicy: queryFetchPolicy,
    })
    return data.listVirtualCardsBySub
  }

  public async listVirtualCardsBySudo(
    input: ListVirtualCardsBySudoRequest,
  ): Promise<VirtualCard[]> {
    const data = await this.performQuery<ListVirtualCardsBySudoQuery>({
      query: ListVirtualCardsBySudoDocument,
      variables: { input },
      fetchPolicy: queryFetchPolicy,
    })
    return data.listVirtualCardsBySudo
  }

  public async searchVirtualCardsTransactions(
    input: SearchVirtualCardsTransactionsRequest,
  ): Promise<TransactionResponse> {
    const data = await this.performQuery<SearchVirtualCardsTransactionsQuery>({
      query: SearchVirtualCardsTransactionsDocument,
      variables: { input },
      fetchPolicy: queryFetchPolicy,
    })
    return data.searchVirtualCardsTransactions
  }

  async performQuery<Q>({
    variables,
    fetchPolicy,
    query,
    calleeName,
  }: QueryOptions & { calleeName?: string }): Promise<Q> {
    let result
    try {
      result = await this.client.query<Q>({
        variables,
        fetchPolicy,
        query,
      })
    } catch (err: any) {
      const clientError = err as ApolloError
      this.log.debug('error received', { calleeName, clientError })
      const error = clientError.graphQLErrors?.[0]
      if (error) {
        this.log.debug('appSync query failed with error', { error })
        throw ErrorTransformer.toClientError(error)
      } else {
        throw new UnknownGraphQLError(err)
      }
    }
    const error = result.errors?.[0]
    if (error) {
      this.log.debug('error received', { error })
      throw ErrorTransformer.toClientError(error)
    }
    if (result.data) {
      return result.data
    } else {
      throw new FatalError(
        `${calleeName ?? '<no callee>'} did not return any result`,
      )
    }
  }
}
