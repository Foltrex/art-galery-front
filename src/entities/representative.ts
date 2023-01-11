import {Organization} from "./organization";
import {Facility} from "./facility";

export interface Representative {
    id: string,
    organization: Organization,
    facility: Facility,
    accountId: string
}