import { PlaidAccountMetadata } from '../../entities/plaidAccountMetadata'

export interface GetPlaidSandboxDataResponse {
  accountMetadata: PlaidAccountMetadata[]
  publicToken: string
}
