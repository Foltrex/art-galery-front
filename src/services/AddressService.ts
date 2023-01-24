import { AddressApi } from "../api/AddressApi";
import rootStore from "../stores/rootStore"

export class AddressService {
    static async getAllAddressesByCityId(id: string) {
        const { addressStore } = rootStore;

        await AddressApi.getAllAddressesByCityId(id)
            .then(response => addressStore.setAddresses(response.data))
            .catch(error => console.log(error));
    }
}