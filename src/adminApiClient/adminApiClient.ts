/*
 * Copyright © 2023 Anonyome Labs, Inc. All rights reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  ConfigurationManager,
  DefaultConfigurationManager,
  DefaultLogger,
  FatalError,
  GraphQLNetworkError,
  isGraphQLNetworkError,
  Logger,
  mapNetworkErrorToClientError,
  UnknownGraphQLError,
} from '@sudoplatform/sudo-common'
import { GraphQLOptions } from '@aws-amplify/api-graphql'
import * as t from 'io-ts'
import { ErrorTransformer } from '../data/transformers/errorTransformer/errorTransformer'
import {
  FundingSource,
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
import {
  GraphQLClient,
  GraphQLClientAuthMode,
  GraphQLClientOptions,
  internal,
} from '@sudoplatform/sudo-user'

export interface AdminApiClientProps {
  apiKey: string
  region: string
  graphqlUrl: string
}

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
function getAuthOptions(
  apiKey: string,
): Omit<GraphQLClientOptions, 'graphqlUrl' | 'region'> {
  if (apiKey === 'IAM') {
    const accessKeyId = process.env.AWS_ACCESS_KEY_ID
    const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY
    const sessionToken = process.env.AWS_SESSION_TOKEN

    if (accessKeyId && secretAccessKey) {
      return {
        authMode: GraphQLClientAuthMode.IAM,
        credentials: {
          accessKeyId,
          secretAccessKey,
          sessionToken,
        },
      }
    } else {
      return {
        authMode: GraphQLClientAuthMode.IAM,
      }
    }
  } else {
    return { authMode: GraphQLClientAuthMode.ApiKey, apiKey }
  }
}

export class AdminApiClient {
  private readonly log: Logger
  private readonly configurationManager: ConfigurationManager
  private readonly client: GraphQLClient

  public constructor(
    apiKey: string,
    configurationManager?: ConfigurationManager,
    client?: GraphQLClient,
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
      new internal.AmplifyClient({
        graphqlUrl: config.apiUrl,
        region: config.region,
        ...getAuthOptions(apiKey),
      })
  }

  public async getVirtualCardsActive(
    input: GetVirtualCardsActiveRequest,
  ): Promise<GetVirtualCardsActiveResponse> {
    const data = await this.performQuery<GetVirtualCardsActiveQuery>({
      query: GetVirtualCardsActiveDocument,
      variables: { input },
    })
    return data.getVirtualCardsActive
  }

  public async listFundingSourcesBySub(
    input: ListFundingSourcesBySubRequest,
  ): Promise<FundingSource[]> {
    const data = await this.performQuery<ListFundingSourcesBySubQuery>({
      query: ListFundingSourcesBySubDocument,
      variables: { input },
    })
    return data.listFundingSourcesBySub
  }

  public async listVirtualCardsBySub(
    input: ListVirtualCardsBySubRequest,
  ): Promise<VirtualCard[]> {
    const data = await this.performQuery<ListVirtualCardsBySubQuery>({
      query: ListVirtualCardsBySubDocument,
      variables: { input },
    })
    return data.listVirtualCardsBySub
  }

  public async listVirtualCardsBySudo(
    input: ListVirtualCardsBySudoRequest,
  ): Promise<VirtualCard[]> {
    const data = await this.performQuery<ListVirtualCardsBySudoQuery>({
      query: ListVirtualCardsBySudoDocument,
      variables: { input },
    })
    return data.listVirtualCardsBySudo
  }

  public async searchVirtualCardsTransactions(
    input: SearchVirtualCardsTransactionsRequest,
  ): Promise<TransactionResponse> {
    const data = await this.performQuery<SearchVirtualCardsTransactionsQuery>({
      query: SearchVirtualCardsTransactionsDocument,
      variables: { input },
    })
    return data.searchVirtualCardsTransactions
  }

  async performQuery<Q>({
    variables,
    query,
    calleeName,
  }: GraphQLOptions & { calleeName?: string }): Promise<Q> {
    let result
    try {
      result = await this.client.query<Q>({
        variables,
        query,
      })
    } catch (err: unknown) {
      if (isGraphQLNetworkError(err as Error)) {
        throw mapNetworkErrorToClientError(err as GraphQLNetworkError)
      }
      throw this.mapGraphQLCallError(err as Error)
    }
    const error = result.errors?.[0]
    if (error) {
      this.log.debug('appsync query failed with error', { error })
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

  async performMutation<M>({
    mutation,
    variables,
    calleeName,
  }: Omit<GraphQLOptions, 'query'> & {
    mutation: GraphQLOptions['query']
    calleeName?: string
  }): Promise<M> {
    let result
    try {
      result = await this.client.mutate<M>({
        mutation,
        variables,
      })
    } catch (err) {
      if (isGraphQLNetworkError(err as Error)) {
        throw mapNetworkErrorToClientError(err as GraphQLNetworkError)
      }
      throw this.mapGraphQLCallError(err as Error)
    }
    const error = result.errors?.[0]
    if (error) {
      this.log.debug('appSync mutation failed with error', { error })
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

  mapGraphQLCallError = (err: Error): Error => {
    if ('graphQLErrors' in err && Array.isArray(err.graphQLErrors)) {
      const error = err.graphQLErrors[0] as {
        errorType: string
        message: string
        name: string
      }
      if (error) {
        this.log.debug('appSync operation failed with error', { err })
        return ErrorTransformer.toClientError(error)
      }
    }
    if ('errorType' in err) {
      this.log.debug('appSync operation failed with error', { err })
      return ErrorTransformer.toClientError(
        err as { errorType: string; message: string; errorInfo?: string },
      )
    }
    return new UnknownGraphQLError(err)
  }
}
