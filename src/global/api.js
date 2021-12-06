
import { call, select } from 'redux-saga/effects';
import { badApiToken, } from ':module_app/sagas';

import endpoints, { backendUrl, newBackendUrl } from './endpoints';

export { endpoints, backendUrl, newBackendUrl };


const apiKeySelector = ({ auth: { apiToken } }) => apiToken;

export function* callApi({
  url,
  endpoint,
  endpointTemplate,
  queryArgsTemplate,
  method = 'POST',
  payload = {},
  headers = {},
  token,
}) {

  let apiUrl;

  if (endpoint && typeof endpoint === 'string') {
    apiUrl = `${backendUrl}/${endpoint}`;
  } else if (endpoint && typeof endpoint === 'function') {
    apiUrl = `${backendUrl}/${endpoint(payload)}`;
  } else if (url) {
    apiUrl = url;
  } else if (endpointTemplate) {
    apiUrl = `${backendUrl}/${endpointTemplate(payload)}`;
  } else {
    throw new Error('callApi should receive url or endpoint');
  }

  if (queryArgsTemplate) {
    apiUrl = `${apiUrl}?${queryArgsTemplate(payload)}`;
  }

  const apiKey = token
    ? token
    : yield select(apiKeySelector);

  if (apiKey) {
    payload.token = apiKey;
    headers['Authorization'] = `Token ${apiKey}`;
  }

  const options = {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    body: method === 'GET' ? undefined : JSON.stringify(payload),
  };


  console.log(`Request sent to ${apiUrl}`, { options, payload });
  const response = yield call(fetch, apiUrl, options);
  console.log('Raw resp is: ', response);

  if (response.ok && response.status === 204) {
    console.log(`Request executed successfully from ${apiUrl} without content`);
    return null;
  }

  console.log('response.status: ', response.status);

  let json;
  if (!response.json) {

  }
  try {
    json = yield call([response, response.json]);
  } catch (exception) {
    if (response.status === 200) {
      console.log(`Request executed successfully from ${apiUrl} without content`);
      return {};
    } else {
      console.log(`Request executed from ${apiUrl} with failure with:`, { json });
      throw exception;
    }
  }

  if (response.ok) {
    console.log(`Request executed successfully from ${apiUrl}:`, { json });
    return json;
  }

  if (response.status === 400) {
    console.log(`Request from ${apiUrl} executed with some troubles:`, { json });
    return {
      isFail: true,
      ...json,
    };
  }

  if (response.status === 401) {
    // If unauthorized, it's just bad token on some API and user need to login
    yield badApiToken();
    throw new Error('Bad authorization data. You can be logged in with only one device');
  }

  console.log(`Request executed from ${apiUrl} with failure:`, { json });
  throw new Error(json.message);
}

export function* callTmpApi({
  endpoint,
  method = 'POST',
  payload = {},
  headers = {},
}) {

  let apiUrl = `${newBackendUrl}/${endpoint}`;

  let body = new FormData()
  body.append('email', payload.email)

  const options = {
    method,
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    body: body,
  };

  console.log(`-------- ********* -------- Request sent to ${apiUrl}`, { options, payload });
  const response = yield call(fetch, apiUrl, options);
  console.log('----------- ******* --------- Raw resp is: ', response);

  if (response.ok && response.status === 204) {
    console.log(`Request executed successfully from ${apiUrl} without content`);
    return null;
  }

  let json;
  if (!response.json) {

  }
  try {
    json = yield call([response, response.json]);
  } catch (exception) {
    if (response.status === 200) {
      console.log(`Request executed successfully from ${apiUrl} without content`);
      return {};
    } else {
      console.log(`Request executed from ${apiUrl} with failure with:`, { json });
      throw exception;
    }
  }

  console.log(json)
  if (response.ok) {
    console.log(`Request executed successfully from ${apiUrl}:`, { json });
    return json;
  }

  console.log('response.status: ', response.status);
}

export const xhrMultipartSendPromise = (params = {}, url, fileUri, fileType = 'image/jpeg', rawFileName, files = [], extraHeaders = []) =>
  new Promise((res, rej) => {
    const xhr = new XMLHttpRequest();
    const formData = new FormData();

    for (const index in params) formData.append(index, params[index]);


    if (files && files.length > 0) {
      files.forEach((file) => {

        formData.append('files', { uri: file.uri, type: file.type || 'image/jpeg', name: file.name || file.fileName || fileName, });
        formData.append('Content-Type', file.type);
        console.log('fileUri: ', file.uri);
      });
    } else if (fileUri) {
      let fileName = '';

      if (rawFileName && rawFileName.length > 0) {
        fileName = rawFileName;
      } else {
        const addrs = fileUri.split('/');
        fileName = addrs[addrs.length - 1];
      }

      console.log('fileType: ', fileType);
      console.log('fileName: ', fileName);

      formData.append('file', { uri: fileUri, type: fileType, name: fileName, });
      formData.append('Content-Type', fileType);
      console.log('fileUri: ', fileUri);
      console.log('formData: ', formData);
    }

    console.log('formData: ', formData);


    xhr.open('POST', url);
    xhr.setRequestHeader('Content-type', 'multipart/form-data');

    extraHeaders.forEach((extraHeadersItem) => {
      xhr.setRequestHeader(extraHeadersItem.key, extraHeadersItem.value);
    });

    xhr.timeout = 120000;

    xhr.ontimeout = data => rej(new Error('Ошибка загрузки. Превышение времени ожидания'));
    xhr.onerror = data => {
      console.log('onerror: ', data);
      console.log('onerror: ', JSON.stringify(data));
      rej(new Error(data));
    };
    xhr.onload = () => {
      if ((xhr.status < 200) || (xhr.status >= 300)) return rej(new Error(`Ошибка загрузки: ${xhr.response}`));
      return res(xhr.response);
    };

    xhr.send(formData);
  });


export function* uploadPhoto(photoUri, type = 'image/jpeg', name = '') {
  const apiToken = yield select(({ auth: { apiToken } }) => apiToken);
  const uploadUrl = `${backendUrl}/${endpoints.uploadMedia}`;
  const extraHeaders = [
    {
      key: 'Authorization',
      value: `Bearer ${apiToken}`,
    }
  ];

  return JSON.parse(yield xhrMultipartSendPromise(
    {},
    uploadUrl,
    photoUri,
    type,
    name,
    [],
    extraHeaders
  ));
}