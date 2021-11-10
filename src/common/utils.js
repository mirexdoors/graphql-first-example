import {resourceTypes} from "@/common/constants";
import {AuthApiService} from "@/services/api.service";

export const createApi = () => {
    return {
        [resourceTypes.AUTH]: new AuthApiService(),
    }
}
