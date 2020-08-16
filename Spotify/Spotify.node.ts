import {
	IExecuteFunctions,
} from 'n8n-core';

import {
	IDataObject,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
} from 'n8n-workflow';

import {
	spotifyApiRequest,
	spotifyApiRequestAllItems,
} from './GenericFunctions';

export class Spotify implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Spotify',
		name: 'spotify',
		icon: 'file:spotify.png',
		group: ['input'],
		version: 1,
		description: 'Access public song data via the Spotify API.',
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		defaults: {
			name: 'Spotify',
			color: '#1DB954',
		},
		inputs: ['main'],
		outputs: ['main'],
		credentials: [
			{
				name: 'spotifyOAuth2Api',
				required: true,
			},
		],
		properties: [
			// ----------------------------------------------------------
			//         Resource to Operate on
			//		   Player, Album, Artisits, Playlists, Tracks
			// ----------------------------------------------------------
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				options: [
					{
						name: 'Album',
						value: 'album',
					},
					{
						name: 'Artist',
						value: 'artist',
					},
					{
						name: 'Player',
						value: 'player',
					},
					{
						name: 'Playlist',
						value: 'playlist',
					},
					{
						name: 'Track',
						value: 'track',
					},
				],
				default: 'player',
				description: 'The resource to operate on.',
			},
			// --------------------------------------------------------------------------------------------------------
			//         Player Operations
			//		   Pause, Play, Get Recently Played, Get Currently Playing, Next Song, Previous Song, Add to Queue
			// --------------------------------------------------------------------------------------------------------
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				displayOptions: {
					show: {
						resource: [
							'player',
						],
					},
				},
				options: [
					{
						name: 'Add Song to Queue',
						value: 'addSongToQueue',
						description: 'Add a song to your queue.'
					},
					{
						name: 'Currently Playing',
						value: 'currentlyPlaying',
						description: 'Get your currently playing track.'
					},
					{
						name: 'Next Song',
						value: 'nextSong',
						description: 'Skip to your next track.'
					},
					{
						name: 'Pause',
						value: 'pause',
						description: 'Pause your music.',
					},
					{
						name: 'Previous Song',
						value: 'previousSong',
						description: 'Skip to your previous song.'
					},
					{
						name: 'Recently Played',
						value: 'recentlyPlayed',
						description: 'Get your recently played tracks.'
					},
					{
						name: 'Start Music',
						value: 'startMusic',
						description: 'Start playing a playlist, artist, or album.'
					},
				],
				default: 'addSongToQueue',
				description: 'The operation to perform.',
			},
			{
				displayName: 'Resource ID',
				name: 'id',
				type: 'string',
				default: '',
				required: true,
				displayOptions: {
					show: {
						resource: [
							'player'
						],
						operation: [
							'startMusic',
						],
					},
				},
				placeholder: 'spotify:album:1YZ3k65Mqw3G8FzYlW1mmp',
				description: `Enter a playlist, artist, or album URI or ID.`,
			},
			{
				displayName: 'Track ID',
				name: 'id',
				type: 'string',
				default: '',
				required: true,
				displayOptions: {
					show: {
						resource: [
							'player'
						],
						operation: [
							'addSongToQueue',
						],
					},
				},
				placeholder: 'spotify:track:0xE4LEFzSNGsz1F6kvXsHU',
				description: `Enter a track URI or ID.`,
			},
			// -----------------------------------------------
			//         Album Operations
			//		   Get an Album, Get an Album's Tracks
			// -----------------------------------------------
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				displayOptions: {
					show: {
						resource: [
							'album',
						],
					},
				},
				options: [
					{
						name: 'Get',
						value: 'get',
						description: 'Get an album by URI or ID.',
					},
					{
						name: `Get Tracks`,
						value: 'getTracks',
						description: `Get an album's tracks by URI or ID.`,
					},
				],
				default: 'get',
				description: 'The operation to perform.',
			},
			{
				displayName: 'Album ID',
				name: 'id',
				type: 'string',
				default: '',
				required: true,
				displayOptions: {
					show: {
						resource: [
							'album',
						],
					},
				},
				placeholder: 'spotify:album:1YZ3k65Mqw3G8FzYlW1mmp',
				description: `The album's Spotify URI or ID.`,
			},
			// -------------------------------------------------------------------------------------------------------------
			//         Artist Operations
			//		   Get an Artist, Get an Artist's Related Artists, Get an Artist's Top Tracks, Get an Artist's Albums
			// -------------------------------------------------------------------------------------------------------------
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				displayOptions: {
					show: {
						resource: [
							'artist',
						],
					},
				},
				options: [
					{
						name: 'Get',
						value: 'get',
						description: 'Get an artist by URI or ID.',
					},
					{
						name: `Get Albums`,
						value: 'getAlbums',
						description: `Get an artist's albums by URI or ID.`,
					},
					{
						name: `Get Related Artists`,
						value: 'getRelatedArtists',
						description: `Get an artist's related artists by URI or ID.`,
					},
					{
						name: `Get Top Tracks`,
						value: 'getTopTracks',
						description: `Get an artist's top tracks by URI or ID.`,
					},
				],
				default: 'get',
				description: 'The operation to perform.',
			},
			{
				displayName: 'Artist ID',
				name: 'id',
				type: 'string',
				default: '',
				required: true,
				displayOptions: {
					show: {
						resource: [
							'artist',
						],
					},
				},
				placeholder: 'spotify:artist:4LLpKhyESsyAXpc4laK94U',
				description: `The artist's Spotify URI or ID.`,
			},
			{
				displayName: 'Country',
				name: 'country',
				type: 'string',
				default: 'US',
				required: true,
				displayOptions: {
					show: {
						resource: [
							'artist'
						],
						operation: [
							'getTopTracks',
						],
					},
				},
				placeholder: 'US',
				description: `Top tracks in which country? Enter the postal abbriviation.`,
			},
			// -------------------------------------------------------------------------------------------------------------
			//         Playlist Operations
			//		   Get a Playlist, Get a Playlist's Tracks, Add/Remove a Song from a Playlist, Get a User's Playlists
			// -------------------------------------------------------------------------------------------------------------
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				displayOptions: {
					show: {
						resource: [
							'playlist',
						],
					},
				},
				options: [
					{
						name: 'Add an Item',
						value: 'add',
						description: 'Add tracks from a playlist by track and playlist URI or ID.',
					},
					{
						name: 'Get',
						value: 'get',
						description: 'Get a playlist by URI or ID.',
					},
					{
						name: 'Get Tracks',
						value: 'getTracks',
						description: `Get a playlist's tracks by URI or ID.`,
					},
					{
						name: `Get the User's Playlists`,
						value: 'getUserPlaylists',
						description: `Get a user's playlists.`,
					},
					{
						name: 'Remove an Item',
						value: 'delete',
						description: 'Remove tracks from a playlist by track and playlist URI or ID.',
					},
				],
				default: 'add',
				description: 'The operation to perform.',
			},
			{
				displayName: 'Playlist ID',
				name: 'id',
				type: 'string',
				default: '',
				required: true,
				displayOptions: {
					show: {
						resource: [
							'playlist',
						],
						operation: [
							'add',
							'delete',
							'get',
							'getTracks',
						],
					},
				},
				placeholder: 'spotify:playlist:37i9dQZF1DWUhI3iC1khPH',
				description: `The playlist's Spotify URI or its ID.`,
			},
			{
				displayName: 'Track ID',
				name: 'trackID',
				type: 'string',
				default: '',
				required: true,
				displayOptions: {
					show: {
						resource: [
							'playlist',
						],
						operation: [
							'add',
							'delete',
						],
					},
				},
				placeholder: 'spotify:track:0xE4LEFzSNGsz1F6kvXsHU',
				description: `The track's Spotify URI or its ID. The track to add/delete from the playlist.`,
			},
			// -----------------------------------------------------
			//         Track Operations
			//		   Get a Track, Get a Track's Audio Features
			// -----------------------------------------------------
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				displayOptions: {
					show: {
						resource: [
							'track',
						],
					},
				},
				options: [
					{
						name: 'Get',
						value: 'get',
						description: 'Get a track by its URI or ID.',
					},
					{
						name: 'Get Audio Features',
						value: 'getAudioFeatures',
						description: 'Get audio features for a track by URI or ID.',
					},
				],
				default: 'track',
				description: 'The operation to perform.',
			},
			{
				displayName: 'Track ID',
				name: 'id',
				type: 'string',
				default: '',
				required: true,
				displayOptions: {
					show: {
						resource: [
							'track',
						],
					},
				},
				placeholder: 'spotify:track:0xE4LEFzSNGsz1F6kvXsHU',
				description: `The track's Spotify URI or ID.`,
			},
			{
				displayName: 'Return All',
				name: 'returnAll',
				type: 'boolean',
				default: false,
				required: true,
				displayOptions: {
					show: {
						resource: [
							'album',
							'artist',
							'playlist',
						],
						operation: [
							'getTracks',
							'getAlbums',
							'getUserPlaylists',
						],
					},
				},
				description: `The number of items to return.`,
			},
			{
				displayName: 'Limit',
				name: 'limit',
				type: 'number',
				default: 50,
				required: true,
				displayOptions: {
					show: {
						resource: [
							'album',
							'artist',
							'playlist'
						],
						operation: [
							'getTracks',
							'getAlbums',
							'getUserPlaylists',
						],
						returnAll: [
							false,
						],
					},
				},
				typeOptions: {
					minValue: 1,
					maxValue: 100,
				},
				description: `The number of items to return.`,
			},
			{
				displayName: 'Limit',
				name: 'limit',
				type: 'number',
				default: 50,
				required: true,
				displayOptions: {
					show: {
						resource: [
							'player',
						],
						operation: [
							'recentlyPlayed',
						],
					},
				},
				typeOptions: {
					minValue: 1,
					maxValue: 50,
				},
				description: `The number of items to return.`,
			},
		]
	};


	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		// Get all of the incoming input data to loop through
		const items = this.getInputData();
		const returnData: IDataObject[] = [];

		// For Post
		let body: IDataObject;
		// For Query string
		let qs: IDataObject;

		let requestMethod: string;
		let endpoint: string;
		let returnAll: boolean;
		let propertyName = '';
		let responseData;

		const operation = this.getNodeParameter('operation', 0) as string;
		const resource = this.getNodeParameter('resource', 0) as string;

		// Set initial values
		requestMethod = 'GET';
		endpoint = '';
		body = {};
		qs = {};
		returnAll = false;

		for(let i = 0; i < items.length; i++) {
      // TODO: Insert API_ACTIONS

			if(returnAll) {
				responseData = await spotifyApiRequestAllItems.call(this, propertyName, requestMethod, endpoint, body, qs);
			}

			if (Array.isArray(responseData)) {
				returnData.push.apply(returnData, responseData as IDataObject[]);
			} else {
				returnData.push(responseData as IDataObject);
			}
		}

		return [this.helpers.returnJsonArray(returnData)];
	}
}
