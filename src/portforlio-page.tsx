/** @jsx jsx */
import { jsx } from "@emotion/react";
// import { useState, useEffect } from 'react';

import {MediaClientConfig, ClientBasedAuth} from '@atlaskit/media-core';
import { FileIdentifier } from '@atlaskit/media-client';
import { Card } from '@atlaskit/media-card';

const getToken = async ()  => {
    const response = await fetch('https://tn43tw97s3.execute-api.ap-southeast-2.amazonaws.com/default/media-token-generator');
    const data = await response.json();
    return data.token;
}

const config: MediaClientConfig = {
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

export const PortfolioPage = () => {
    const fileId: FileIdentifier = {
        mediaItemType: 'file',
        id: '03a510de-b4fe-4f66-8bbb-3a014ff3bbba',
        collectionName: 'books',
      };

    return <div>Portfolio Page ... token is -   <Card mediaClientConfig={config} identifier={fileId} shouldOpenMediaViewer={true} /></div>;
}