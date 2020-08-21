import {HTTPMethod} from "../../n8nNodeSupport/n8nExternalUse/types";
import {IAPI_ACTIONS} from "../../n8nNodeSupport/n8nInternalUse/helpers";
import {getRandomPlaylist, getPlaylist, getSong} from "./operations/index";

/* Owned by Individual API Node */
const spotifyActions: IAPI_ACTIONS = {
    resources: {
        playlists: {
            defaultRequestMethod: HTTPMethod.GET,
            operations: {
                ...getPlaylist,
                ...getRandomPlaylist,
            }
        },
        songs: {
            defaultRequestMethod: HTTPMethod.GET,
            operations: {
                ...getSong,
            }
        },
    },
};