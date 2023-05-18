/*
 * Copyright © 2023 Anonyome Labs, Inc. All rights reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { AdminApiClient } from '../adminApiClient'
import { DefaultSudoVirtualCardsAdminClientPrivateOptions } from '../private/defaultSudoVirtualCardsAdminClientPrivateOptions'
import { FundingSource as FundingSourceEntity } from '../entities/fundingSource'
import { GetVirtualCardsActiveRequest } from './request/getVirtualCardsActiveRequest'
import { GetVirtualCardsActiveResponse } from './response/getVirtualCardsActiveResponse'
import { ListFundingSourcesBySubRequest } from './request/listFundingSourcesBySubRequest'
import { ListVirtualCardsBySubRequest } from './request/listVirtualCardsBySubRequest'
import { ListVirtualCardsBySudoRequest } from './request/listVirtualCardsBySudoRequest'
import { SearchVirtualCardsTransactionsRequest } from './request/searchVirtualCardsTransactionsRequest'
import { TransactionResponse } from '../entities/transactionResponse'
import { VirtualCard } from '../entities/virtualCard'
import { GetVirtualCardsActiveResponseTransformer } from '../data/transformers/getVirtualCardsActiveResponseTransformer'
import { VirtualCardTransformer } from '../data/transformers/virtualCardTransformer/virtualCardTransformer'
import { TransactionResponseTransformer } from '../data/transformers/transactionResponseTransformer'
import { FundingSourceTransformer } from '../data/transformers/fundingSourceTransformer/fundingSourceTransformer'
import { GetPlaidSandboxDataRequest } from './request/getPlaidSandboxDataRequest'
import { GetPlaidSandboxDataResponse } from './response/getPlaidSandboxDataResponse'
import { PlaidAccountMetadataTransformer } from '../data/transformers/plaidAccountMetadataTransformer/plaidAccountMetadataTransformer'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface DefaultSudoVirtualCardsAdminClientOptions {}

export interface SudoVirtualCardsAdminClient {
  /**
   * Return a list of plaid account metadata objects matching
   * the given institute id in the request.
   *
   * @param request Input request object containing an
   * `instituteId` property.
   *
   * @returns Response object containing public token and
   * array of plaid account metadata objects.
   *
   * @remarks This API is only available in sandbox environments.
   */
  getPlaidSandboxData: (
    request: GetPlaidSandboxDataRequest,
  ) => Promise<GetPlaidSandboxDataResponse>
  /**
   * Return the number of virtual cards active in a given
   * date range and timezone.
   *
   * @param request Input request object containing `startDate`,
   * `endDate` and `timeZone` properties.
   *
   * @returns Response object containing array of number of
   * active cards.
   */
  getVirtualCardsActive: (
    request: GetVirtualCardsActiveRequest,
  ) => Promise<GetVirtualCardsActiveResponse>
  /**
   * Return a list of funding sources matching a given sub.
   *
   * @param request Input request object containing `sub` property.
   *
   * @returns Array of funding sources.
   */
  listFundingSourcesBySub: (
    request: ListFundingSourcesBySubRequest,
  ) => Promise<FundingSourceEntity[]>
  /**
   * Return a list of virtual cards matching a given sub.
   *
   * @param request Input request object containing 'sub' property.
   *
   * @returns Array of virtual cards.
   */
  listVirtualCardsBySub: (
    request: ListVirtualCardsBySubRequest,
  ) => Promise<VirtualCard[]>
  /**
   * Return a list of virtual cards matching a given sudo id.
   *
   * @param input Request params object requiring a `sudoId`
   * property.
   *
   * @returns Array of virtual cards that match input sudo id.
   */
  listVirtualCardsBySudo: (
    input: ListVirtualCardsBySudoRequest,
  ) => Promise<VirtualCard[]>
  /**
   * Return a list of virtual card transactions for a given
   * user id.
   *
   * @param request Input request object containing one of `userId`,
   * `last4`, `startDate`, `endDate`, `limit` and/or `nextToken`.
   *
   * @returns Array of virtual card transactions.
   */
  searchVirtualCardsTransactions: (
    request: SearchVirtualCardsTransactionsRequest,
  ) => Promise<TransactionResponse>
}

export class DefaultVirtualCardsAdminClient
  implements SudoVirtualCardsAdminClient
{
  private readonly adminApiClient: AdminApiClient

  public constructor(
    apiKey: string,
    options?: DefaultSudoVirtualCardsAdminClientOptions,
  ) {
    const privateOptions = options as
      | DefaultSudoVirtualCardsAdminClientPrivateOptions
      | undefined
    this.adminApiClient =
      privateOptions?.adminApiClient ?? new AdminApiClient(apiKey)
  }

  public async getPlaidSandboxData(
    request: GetPlaidSandboxDataRequest,
  ): Promise<GetPlaidSandboxDataResponse> {
    const input = {
      institutionId: request.institutionId,
      username: request.username
    }
    const result = await this.adminApiClient.getPlaidSandboxData(input)
    return {
      accountMetadata: result.accountMetadata.map((accountMetadata) =>
        PlaidAccountMetadataTransformer.toEntity(accountMetadata),
      ),
      publicToken: result.publicToken,
    }
  }

  public async getVirtualCardsActive(
    request: GetVirtualCardsActiveRequest,
  ): Promise<GetVirtualCardsActiveResponse> {
    const input = {
      startDate: request.startDate.toISOString(),
      endDate: request.endDate.toISOString(),
      timeZone: request.timeZone,
    }
    const result = await this.adminApiClient.getVirtualCardsActive(input)
    return GetVirtualCardsActiveResponseTransformer.toEntity(result)
  }

  public async listFundingSourcesBySub(
    request: ListFundingSourcesBySubRequest,
  ): Promise<FundingSourceEntity[]> {
    const input = { sub: request.sub }
    const result = await this.adminApiClient.listFundingSourcesBySub(input)
    return result.map((fundingSource) =>
      FundingSourceTransformer.toEntity(fundingSource),
    )
  }

  public async listVirtualCardsBySub(
    request: ListVirtualCardsBySubRequest,
  ): Promise<VirtualCard[]> {
    const input = { sub: request.sub }
    const result = await this.adminApiClient.listVirtualCardsBySub(input)
    return result.map((virtualCard) =>
      VirtualCardTransformer.toEntity(virtualCard),
    )
  }

  public async listVirtualCardsBySudo(
    request: ListVirtualCardsBySudoRequest,
  ): Promise<VirtualCard[]> {
    const input = { sudoId: request.sudoId }
    const result = await this.adminApiClient.listVirtualCardsBySudo(input)
    return result.map((virtualCard) =>
      VirtualCardTransformer.toEntity(virtualCard),
    )
  }

  public async searchVirtualCardsTransactions(
    request: SearchVirtualCardsTransactionsRequest,
  ): Promise<TransactionResponse> {
    const input = {
      userId: request.userId,
      last4: request.last4,
      startDate: request.startDate.toISOString(),
      endDate: request.endDate.toISOString(),
      limit: request.limit,
      nextToken: request.nextToken,
    }

    const result = await this.adminApiClient.searchVirtualCardsTransactions(
      input,
    )

    return TransactionResponseTransformer.toEntity(result)
  }
}
