import {Address} from "./address";
import {OrganizationStatusType} from "./enums/organizationStatusType";
import {Facility} from "./facility";

export interface Organization {
    id: string,
    name: string,
    address: Address,
    status: OrganizationStatusType,
    facilities: Facility[]
}