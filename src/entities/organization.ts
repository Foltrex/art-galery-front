import {Address} from "./address";
import {OrganizationStatusEnum} from "./enums/organizationStatusEnum";
import {Facility} from "./facility";

export interface Organization {
    id: string,
    name: string,
    address: Address,
    status: OrganizationStatusEnum,
    facilities: Facility[]
}