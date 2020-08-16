import {IAPI_ACTIONS} from '../../n8nNodeSupport/n8nInternalUse/helpers.ts';

const spotifyActions: IAPI_ACTIONS = {
    resources: [{
        playlists: {
            defaultRequestMethod: 'GET',
            operations: [{
                getPlaylist: {
                    overideRequestMethod: 'POST',
                    executeRequest: Function_Reference_Imported_From_Actions_Folder
                },
                getRandomPlaylist: {
                    overideRequestMethod: 'POST',
                    executeRequest: Function_Reference_Imported_From_Actions_Folder
                }
            }]
        },
        songs: {
            defaultRequestMethod: 'GET',
            operations: [{
                getSong: {
                    overideRequestMethod: 'POST',
                    executeRequest: Function_Reference_Imported_From_Actions_Folder
                }
            }]
        },
    }],
};
