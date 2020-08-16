import {HTTPMethod} from "../../n8nNodeSupport/n8nExternalUse/types";
import {IAPI_ACTIONS} from "../../n8nNodeSupport/n8nInternalUse/helpers";
import {getRandomPlaylist, getPlaylist} from "./operations/index";



export const spotifyActions: IAPI_ACTIONS = {
    resources: [{
        playlists: {
            defaultRequestMethod: HTTPMethod.GET,
            operations: [{
                getPlaylist: {
                    overideRequestMethod: HTTPMethod.POST,
                    executeRequest: getPlaylist,
                },
                ...getRandomPlaylist
            }]
        },
        songs: {
            defaultRequestMethod: HTTPMethod.GET,
            operations: [{
                getSong: {
                    overideRequestMethod: HTTPMethod.POST,
                    executeRequest: getPlaylist
                }
            }]
        },
    }],
};
