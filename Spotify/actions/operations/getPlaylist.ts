import {HTTPMethod} from "../../../n8nNodeSupport/n8nExternalUse/types";
import {IOperations} from "../../../n8nNodeSupport/n8nInternalUse/helpers";

export const getPlaylistOperation = () => {

}

export const getPlaylist: IOperations = {
    "getRandomPlaylist": {
        "overideRequestMethod": HTTPMethod.POST,
        "executeRequest": getPlaylistOperation
    }
}