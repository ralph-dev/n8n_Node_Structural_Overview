import {HTTPMethod} from "../../../n8nNodeSupport/n8nExternalUse/types";
import {IOperations} from "../../../n8nNodeSupport/n8nInternalUse/helpers";

export const getRandomPlaylistOperation = () => {

}

export const getRandomPlaylist: IOperations = {
    "getRandomPlaylist": {
        "overideRequestMethod": HTTPMethod.POST,
        "executeRequest": getRandomPlaylistOperation
    }
}