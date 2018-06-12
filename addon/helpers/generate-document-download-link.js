import {helper} from '@ember/component/helper';

export function generateDocumentDownloadLink([url, documentId, jwt]) {
    return `${url}/${documentId}?token=${jwt}`;
}

export default helper(generateDocumentDownloadLink);
