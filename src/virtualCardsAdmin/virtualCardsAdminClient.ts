/*
 * Copyright © 2023 Anonyome Labs, Inc. All rights reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Logger } from '@sudoplatform/sudo-common'
import { IAMCredentials, TokenProvider } from '@sudoplatform/sudo-user'
import { AdminApiClient } from '../adminApiClient'
import { DefaultSudoVirtualCardsAdminClientPrivateOptions } from '../private/defaultSudoVirtualCardsAdminClientPrivateOptions'
import { FundingSource } from '../entities/fundingSource'
import { AcceptPendingFundingSourceRequest } from './request/acceptPendingFundingSourceRequest'
import { CancelFundingSourceRequest } from './request/cancelFundingSourceRequest'
import { ChargeServiceFeeForVirtualCardRequest } from './request/chargeServiceFeeForVirtualCardRequest'
import { RefundServiceFeeForVirtualCardRequest } from './request/refundServiceFeeForVirtualCardRequest'
import { DeleteVirtualCardsDataRequest } from './request/deleteVirtualCardsDataRequest'
import { DeleteProvisionalFundingSourceRequest } from './request/deleteProvisionalFundingSourceRequest'
import { ListFundingSourcesBySubRequest } from './request/listFundingSourcesBySubRequest'
import { ListProvisionalFundingSourcesBySubRequest } from './request/listProvisionalFundingSourcesBySubRequest'
import { ListVirtualCardsBySubRequest } from './request/listVirtualCardsBySubRequest'
import { ListVirtualCardsBySudoRequest } from './request/listVirtualCardsBySudoRequest'
import { ProvisionalFundingSource } from '../entities/provisionalFundingSource'
import { SearchVirtualCardsTransactionsRequest } from './request/searchVirtualCardsTransactionsRequest'
import { Transaction } from '../entities/transaction'
import { TransactionTransformer } from '../data/transformers/transactionTransformer'
import { FeeReasonTransformer } from '../data/transformers/feeReasonTransformer'
import { TransactionResponse } from '../entities/transactionResponse'
import { VirtualCard } from '../entities/virtualCard'
import { VirtualCardTransformer } from '../data/transformers/virtualCardTransformer/virtualCardTransformer'
import { TransactionResponseTransformer } from '../data/transformers/transactionResponseTransformer'
import { FundingSourceTransformer } from '../data/transformers/fundingSourceTransformer/fundingSourceTransformer'
import { ProvisionalFundingSourceTransformer } from '../data/transformers/provisionalFundingSourceTransformer'

/**
 * How the client authenticates to the API.
 */
export type SudoVirtualCardsAdminAuth =
  /** Static admin API key. */
  | { type: 'apiKey'; apiKey: string }
  /** AWS IAM. If `credentials` is omitted, they are read from the AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY and AWS_SESSION_TOKEN environment variables by the underlying client (Node only). */
  | { type: 'iam'; credentials?: IAMCredentials }
  /**
   * Token identifying the signed-in user (for example a JWT). The provider is
   * invoked on every request, so it may return a freshly refreshed token.
   */
  | { type: 'token'; tokenProvider: TokenProvider }

/**
 * Explicit API endpoint. If supplied, it is used instead of the endpoint from
 * the SDK configuration.
 */
export interface SudoVirtualCardsAdminEndpoint {
  /** GraphQL API URL. */
  graphqlUrl: string
  /** AWS region of the API. */
  region: string
}

/**
 * Options for constructing a {@link DefaultVirtualCardsAdminClient}.
 */
export interface DefaultSudoVirtualCardsAdminClientOptions {
  /** How to authenticate to the API. */
  auth: SudoVirtualCardsAdminAuth
  /** If omitted, the endpoint is taken from the SDK configuration. */
  endpoint?: SudoVirtualCardsAdminEndpoint
  /**
   * Optional logger. If omitted, a default logger is used where the runtime
   * supports it, otherwise logging is disabled.
   */
  logger?: Logger
}

export interface SudoVirtualCardsAdminClient {
  /**
   * Accept a pending funding source.
   *
   * @param request Input request object containing the `id` of the pending
   * funding source and optional `identityOptions` and `updateCardFundingSource`.
   *
   * @returns {FundingSource} The accepted funding source.
   */
  acceptPendingFundingSource: (
    request: AcceptPendingFundingSourceRequest,
  ) => Promise<FundingSource>

  /**
   * Cancel a funding source.
   *
   * @param request Input request object containing the `id` of the funding source.
   *
   * @returns {FundingSource} The cancelled funding source.
   */
  cancelFundingSource: (
    request: CancelFundingSourceRequest,
  ) => Promise<FundingSource>

  /**
   * Charge a service fee against a virtual card.
   *
   * @param request Input request object containing `feeReason`, `causeId`
   * and `amount`.
   *
   * @returns {Transaction} The fee transaction.
   */
  chargeServiceFeeForVirtualCard: (
    request: ChargeServiceFeeForVirtualCardRequest,
  ) => Promise<Transaction>

  /**
   * Refund a service fee previously charged against a virtual card.
   *
   * @param request Input request object containing `feeId` and `amount`.
   *
   * @returns {Transaction} The fee refund transaction.
   */
  refundServiceFeeForVirtualCard: (
    request: RefundServiceFeeForVirtualCardRequest,
  ) => Promise<Transaction>

  /**
   * Delete virtual cards data associated with a given owner.
   *
   * @param request Input request object containing `owner`, `deletionType`
   * and optional `inactiveSince`.
   *
   * @returns {string} Status of the deletion request.
   */
  deleteVirtualCardsData: (
    request: DeleteVirtualCardsDataRequest,
  ) => Promise<string>

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
   * Return a list of provisional funding sources belonging to a given sub.
   *
   * @param request Input request object containing `sub` property.
   *
   * @returns {ProvisionalFundingSource[]} Array of provisional funding sources.
   */
  listProvisionalFundingSourcesBySub: (
    request: ListProvisionalFundingSourcesBySubRequest,
  ) => Promise<ProvisionalFundingSource[]>

  /**
   * Delete a single provisional funding source.
   *
   * @param request Input request object containing the `id` of the
   * provisional funding source to delete.
   *
   * @returns {string} ID of the provisional funding source that was deleted.
   */
  deleteProvisionalFundingSource: (
    request: DeleteProvisionalFundingSourceRequest,
  ) => Promise<string>

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

export class DefaultVirtualCardsAdminClient implements SudoVirtualCardsAdminClient {
  private readonly adminApiClient: AdminApiClient

  /**
   * @param optionsOrApiKey Client options or, for backwards compatibility, a
   * bare string. A string is treated as a static admin API key, except that the
   * legacy value `'IAM'` selects AWS IAM authentication using credentials from
   * the process environment. New code should pass an options object.
   * @param legacyOptions Only used together with a string first argument.
   */
  public constructor(
    optionsOrApiKey: string | DefaultSudoVirtualCardsAdminClientOptions,
    legacyOptions?: Partial<DefaultSudoVirtualCardsAdminClientOptions>,
  ) {
    const options: Partial<DefaultSudoVirtualCardsAdminClientPrivateOptions> =
      typeof optionsOrApiKey === 'string'
        ? (legacyOptions ?? {})
        : optionsOrApiKey
    const auth =
      typeof optionsOrApiKey === 'string'
        ? optionsOrApiKey
        : optionsOrApiKey.auth
    this.adminApiClient =
      options.adminApiClient ??
      new AdminApiClient(auth, undefined, undefined, {
        endpoint: options.endpoint,
        logger: options.logger,
      })
  }

  public async acceptPendingFundingSource(
    request: AcceptPendingFundingSourceRequest,
  ): Promise<FundingSource> {
    const input = {
      id: request.id,
      identityOptions: request.identityOptions,
      updateCardFundingSource: request.updateCardFundingSource,
    }
    const result = await this.adminApiClient.acceptPendingFundingSource(input)
    return FundingSourceTransformer.toEntity(result)
  }

  public async cancelFundingSource(
    request: CancelFundingSourceRequest,
  ): Promise<FundingSource> {
    const input = { id: request.id }
    const result = await this.adminApiClient.cancelFundingSource(input)
    return FundingSourceTransformer.toEntity(result)
  }

  public async chargeServiceFeeForVirtualCard(
    request: ChargeServiceFeeForVirtualCardRequest,
  ): Promise<Transaction> {
    const input = {
      feeReason: FeeReasonTransformer.toGraphQL(request.feeReason),
      causeId: request.causeId,
      amount: {
        currency: request.amount.currency,
        amount: request.amount.amount,
      },
    }
    const result =
      await this.adminApiClient.chargeServiceFeeForVirtualCard(input)
    return TransactionTransformer.toEntity(result)
  }

  public async refundServiceFeeForVirtualCard(
    request: RefundServiceFeeForVirtualCardRequest,
  ): Promise<Transaction> {
    const input = {
      feeId: request.feeId,
      amount: {
        currency: request.amount.currency,
        amount: request.amount.amount,
      },
    }
    const result =
      await this.adminApiClient.refundServiceFeeForVirtualCard(input)
    return TransactionTransformer.toEntity(result)
  }

  public async deleteVirtualCardsData(
    request: DeleteVirtualCardsDataRequest,
  ): Promise<string> {
    const input = {
      owner: request.owner,
      deletionType: request.deletionType,
      inactiveSinceEpochMs: request.inactiveSince?.getTime(),
    }
    const result = await this.adminApiClient.deleteVirtualCardsData(input)
    return result.status
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

  public async listProvisionalFundingSourcesBySub(
    request: ListProvisionalFundingSourcesBySubRequest,
  ): Promise<ProvisionalFundingSource[]> {
    const input = { sub: request.sub }
    const result =
      await this.adminApiClient.listProvisionalFundingSourcesBySub(input)
    return result.map((provisionalFundingSource) =>
      ProvisionalFundingSourceTransformer.toEntity(provisionalFundingSource),
    )
  }

  public async deleteProvisionalFundingSource(
    request: DeleteProvisionalFundingSourceRequest,
  ): Promise<string> {
    const input = { id: request.id }
    return await this.adminApiClient.deleteProvisionalFundingSource(input)
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
