import {HTTPMethod} from "../../../n8nNodeSupport/n8nExternalUse/types";
import {IOperations} from "../../../n8nNodeSupport/n8nInternalUse/helpers";

export const getSongOperation = () => {

}

export const getSong: IOperations = {
    "getRandomPlaylist": {
        "overideRequestMethod": HTTPMethod.POST,
        "executeRequest": getSongOperation
    }
}