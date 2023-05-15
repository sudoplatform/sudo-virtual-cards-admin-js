import { AdminApiClient } from '../adminApiClient'
import { DefaultSudoVirtualCardsAdminClientOptions } from '../virtualCardsAdmin/virtualCardsAdminClient'

export interface DefaultSudoVirtualCardsAdminClientPrivateOptions
  extends DefaultSudoVirtualCardsAdminClientOptions {
  adminApiClient?: AdminApiClient
}
