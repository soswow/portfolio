import { MediaClientConfig, ClientBasedAuth } from '@atlaskit/media-core';
import { MediaClient, MediaCollectionItem, MediaStore } from '@atlaskit/media-client';

export const config: MediaClientConfig = {
    authProvider: async () => {
        const token = await getToken();
        const auth: ClientBasedAuth = {
            baseUrl: 'https://api.media.atlassian.com',
            clientId: '6d232289-1813-4dfd-b652-2d5a83e3bd6c',
            token
        };
        return auth;
    }
}

const mediaClient = new MediaClient(config);

let tokenCache: string = '';
let tokenCacheDate: number | null = null;
const tokenTimeoutLimit = 1000 * 8 * 60;
const getToken = async () => {
    if (!tokenCache || (tokenCacheDate !== null && Date.now() - tokenCacheDate > tokenTimeoutLimit)) {
        const response = await fetch('https://tn43tw97s3.execute-api.ap-southeast-2.amazonaws.com/default/media-token-generator');
        const data = await response.json();
        tokenCache = data.token
        tokenCacheDate = Date.now();
    }
    return tokenCache;
}

const collectionCache: { [collectionName: string]: MediaCollectionItem[] } = {};
export const getCollectionItems = async (collectionName: string): Promise<MediaCollectionItem[]> => {

    if (!collectionCache[collectionName]) {
        await new Promise<void>((resolve) => {
            let prevSize = 0;
            const replyObject = mediaClient.collection.getItems(collectionName, { limit: 50, details: 'full' })
            replyObject.subscribe(items => {
                if (items.length % 50 === 0 && prevSize !== items.length) {
                    prevSize = items.length;
                    mediaClient.collection.loadNextPage(collectionName, {
                        limit: 50,
                        details: 'full'
                    });
                } else {
                    collectionCache[collectionName] = items;
                    resolve();
                }
            })
        })
    }

    return [...collectionCache[collectionName]];
}

export const findProjectCover = async (projectName: string): Promise<MediaCollectionItem> => {
    const items = await getCollectionItems(projectName);
    return items.find((item: MediaCollectionItem) => item.details.name.toLocaleLowerCase().indexOf('cover') > -1) || items[0];
}

