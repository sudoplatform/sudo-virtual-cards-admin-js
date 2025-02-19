/*
 * Copyright © 2023 Anonyome Labs, Inc. All rights reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { AdminApiClient } from '../adminApiClient'
import { DefaultSudoVirtualCardsAdminClientPrivateOptions } from '../private/defaultSudoVirtualCardsAdminClientPrivateOptions'
import { FundingSource } from '../entities/fundingSource'
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

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface DefaultSudoVirtualCardsAdminClientOptions {}

export interface SudoVirtualCardsAdminClient {
  /**
   * Return the number of virtual cards active in a given
   * date range and timezone.
   *
   * @param request Input request object containing `startDate`,
   * `endDate` and `timeZone` properties.
   *
   * @returns {GetVirtualCardsActiveRequest} Response object containing
   * array of number of active cards.
   */
  getVirtualCardsActive: (
    request: GetVirtualCardsActiveRequest,
  ) => Promise<GetVirtualCardsActiveResponse>

  /**
   * Return a list of funding sources matching a given sub.
   *
   * @param request Input request object containing `sub` property.
   *
   * @returns {FundingSource[]} Array of funding sources.
   */
  listFundingSourcesBySub: (
    request: ListFundingSourcesBySubRequest,
  ) => Promise<FundingSource[]>

  /**
   * Return a list of virtual cards matching a given sub.
   *
   * @param request Input request object containing 'sub' property.
   *
   * @returns {VirtualCard[]} Array of virtual cards.
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
   * @returns {VirtualCard[]} Array of virtual cards that match input sudo id.
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
   * @returns {TransactionResponse} Array of virtual card transactions.
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
  ): Promise<FundingSource[]> {
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

    const result =
      await this.adminApiClient.searchVirtualCardsTransactions(input)

    return TransactionResponseTransformer.toEntity(result)
  }
}
