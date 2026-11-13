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
  AcceptPendingFundingSourceDocument,
  AcceptPendingFundingSourceMutation,
  AcceptPendingFundingSourceRequest,
  CancelFundingSourceDocument,
  CancelFundingSourceMutation,
  CancelFundingSourceRequest,
  ChargeServiceFeeForVirtualCardDocument,
  ChargeServiceFeeForVirtualCardInput,
  ChargeServiceFeeForVirtualCardMutation,
  DeleteProvisionalFundingSourceDocument,
  DeleteProvisionalFundingSourceMutation,
  DeleteProvisionalFundingSourceRequest,
  DeleteVirtualCardsDataDocument,
  DeleteVirtualCardsDataMutation,
  DeleteVirtualCardsDataRequest,
  DeleteVirtualCardsDataResponse,
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
  RefundServiceFeeForVirtualCardDocument,
  RefundServiceFeeForVirtualCardInput,
  RefundServiceFeeForVirtualCardMutation,
  SearchVirtualCardsTransactionsDocument,
  SearchVirtualCardsTransactionsQuery,
  SearchVirtualCardsTransactionsRequest,
  Transaction,
  TransactionResponse,
  VirtualCard,
} from '../gen/graphqlTypes'
import type {
  SudoVirtualCardsAdminAuth,
  SudoVirtualCardsAdminEndpoint,
} from '../virtualCardsAdmin/virtualCardsAdminClient'
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
  auth: string | SudoVirtualCardsAdminAuth,
): Omit<GraphQLClientOptions, 'graphqlUrl' | 'region'> {
  if (typeof auth !== 'string') {
    switch (auth.type) {
      case 'apiKey':
        return { authMode: GraphQLClientAuthMode.ApiKey, apiKey: auth.apiKey }
      case 'iam':
        return {
          authMode: GraphQLClientAuthMode.IAM,
          credentials: auth.credentials,
        }
      case 'token':
        return {
          authMode: GraphQLClientAuthMode.OpenIDConnect,
          tokenProvider: auth.tokenProvider,
        }
    }
  }

  const apiKey = auth
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

/**
 * `DefaultLogger` reads `process.env`, which does not exist in browsers, so
 * construction throws there. Fall back to a silent logger rather than failing.
 */
function createDefaultLogger(name: string): Logger {
  try {
    return new DefaultLogger(name)
  } catch {
    return {
      trace: () => false,
      debug: () => false,
      info: () => false,
      warn: () => false,
      error: () => false,
      fatal: () => false,
    }
  }
}

/**
 * Long-lived credentials (API key, static IAM credentials) must not be shipped
 * to a browser, where any user of the page can read them.
 */
function warnIfBrowserWithStaticCredentials(
  auth: string | SudoVirtualCardsAdminAuth,
): void {
  const isBrowser =
    typeof window !== 'undefined' && typeof window.document !== 'undefined'
  if (!isBrowser) {
    return
  }
  const type = typeof auth === 'string' ? 'apiKey' : auth.type
  if (
    type === 'apiKey' ||
    (typeof auth !== 'string' && auth.type === 'iam' && auth.credentials)
  ) {
    console.warn(
      `SudoVirtualCardsAdmin: '${type}' authentication uses long-lived credentials that are exposed to anyone who can load this page. Use { type: 'token' } in browser applications.`,
    )
  }
}

export class AdminApiClient {
  private readonly log: Logger
  private readonly configurationManager: ConfigurationManager
  private readonly client: GraphQLClient

  public constructor(
    auth: string | SudoVirtualCardsAdminAuth,
    configurationManager?: ConfigurationManager,
    client?: GraphQLClient,
    options?: { endpoint?: SudoVirtualCardsAdminEndpoint; logger?: Logger },
  ) {
    warnIfBrowserWithStaticCredentials(auth)
    this.log = options?.logger ?? createDefaultLogger(this.constructor.name)
    this.configurationManager =
      configurationManager ?? DefaultConfigurationManager.getInstance()
    let endpoint = options?.endpoint
    if (!endpoint) {
      const config =
        this.configurationManager.bindConfigSet<AdminConsoleProject>(
          AdminConsoleProject,
          'adminConsoleProjectService',
        )
      endpoint = { graphqlUrl: config.apiUrl, region: config.region }
    }

    this.client =
      client ??
      new internal.AmplifyClient({
        graphqlUrl: endpoint.graphqlUrl,
        region: endpoint.region,
        ...getAuthOptions(auth),
      })
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

  public async listProvisionalFundingSourcesBySub(
    input: ListProvisionalFundingSourcesBySubRequest,
  ): Promise<ProvisionalFundingSource[]> {
    const data =
      await this.performQuery<ListProvisionalFundingSourcesBySubQuery>({
        query: ListProvisionalFundingSourcesBySubDocument,
        variables: { input },
      })
    return data.listProvisionalFundingSourcesBySub
  }

  public async deleteProvisionalFundingSource(
    input: DeleteProvisionalFundingSourceRequest,
  ): Promise<string> {
    const data =
      await this.performMutation<DeleteProvisionalFundingSourceMutation>({
        mutation: DeleteProvisionalFundingSourceDocument,
        variables: { input },
      })
    return data.deleteProvisionalFundingSource.id
  }

  public async acceptPendingFundingSource(
    input: AcceptPendingFundingSourceRequest,
  ): Promise<FundingSource> {
    const data = await this.performMutation<AcceptPendingFundingSourceMutation>(
      {
        mutation: AcceptPendingFundingSourceDocument,
        variables: { input },
      },
    )
    return data.acceptPendingFundingSource
  }

  public async cancelFundingSource(
    input: CancelFundingSourceRequest,
  ): Promise<FundingSource> {
    const data = await this.performMutation<CancelFundingSourceMutation>({
      mutation: CancelFundingSourceDocument,
      variables: { input },
    })
    return data.cancelFundingSource
  }

  public async chargeServiceFeeForVirtualCard(
    input: ChargeServiceFeeForVirtualCardInput,
  ): Promise<Transaction> {
    const data =
      await this.performMutation<ChargeServiceFeeForVirtualCardMutation>({
        mutation: ChargeServiceFeeForVirtualCardDocument,
        variables: { input },
      })
    return data.chargeServiceFeeForVirtualCard
  }

  public async refundServiceFeeForVirtualCard(
    input: RefundServiceFeeForVirtualCardInput,
  ): Promise<Transaction> {
    const data =
      await this.performMutation<RefundServiceFeeForVirtualCardMutation>({
        mutation: RefundServiceFeeForVirtualCardDocument,
        variables: { input },
      })
    return data.refundServiceFeeForVirtualCard
  }

  public async deleteVirtualCardsData(
    input: DeleteVirtualCardsDataRequest,
  ): Promise<DeleteVirtualCardsDataResponse> {
    const data = await this.performMutation<DeleteVirtualCardsDataMutation>({
      mutation: DeleteVirtualCardsDataDocument,
      variables: { input },
    })
    return data.deleteVirtualCardsData
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
