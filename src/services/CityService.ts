import { CityApi } from "../api/CityApi";
import rootStore from "../stores/rootStore";

export class CityService {

    static async getAllCities() {
        const { cityStore } = rootStore;

        await CityApi.getAllCities()
            .then(response => cityStore.setCities(response.data))
            .catch(error => console.log(error));
    }
}