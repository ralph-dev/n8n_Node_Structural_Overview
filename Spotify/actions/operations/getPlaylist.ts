import {HTTPMethod} from "../../../n8nNodeSupport/n8nExternalUse/types";
import {IOperations} from "../../../n8nNodeSupport/n8nInternalUse/helpers";

/**
 * What the operation does?
 */
export const getPlaylistOperation = () => {

}

export const getPlaylist: IOperations = {
    "getRandomPlaylist": {
        "overideRequestMethod": HTTPMethod.POST,
        "executeRequest": getPlaylistOperation
    }
}