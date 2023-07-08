import Accounts from '../assets/accounts.json'

type FediverseAccount = typeof Accounts[0] & {
    linkTo: string
}

interface FediverseAccountFilter {
    isActive?: boolean
    isFeatured?: boolean
}

/**
 * Fediverse Account Filter
 */
export default class {
    static getAccounts(filter?: FediverseAccountFilter): FediverseAccount[] {
        return Accounts.filter(({isActive, featured}) => {
            if (filter?.isFeatured) {
                return featured
            }
            return (filter?.isActive ? isActive : true)
        }).map((account) => {
            const {accountId} = account
            const accountIdElements = (accountId.charAt(0) === '@' ? accountId.substring(1) : accountId).split('@')
            const linkTo = `https://${accountIdElements[1]}/@${accountIdElements[0]}`
            const vals: FediverseAccount = {
                linkTo: linkTo,
                ...account
            }
            return vals
        })
    }
}
