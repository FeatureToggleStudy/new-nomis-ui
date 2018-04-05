/* eslint-disable camelcase */
const axios = require('axios');
const querystring = require('querystring');
const nurl = require('url');
const session = require('../session');
const gatewayToken = require('../jwt-token');
const { logger } = require('../services/logger');

const apiClientId = process.env.API_CLIENT_ID || 'elite2apiclient';
const apiClientSecret = process.env.API_CLIENT_SECRET || 'clientsecret';

const encodeClientCredentials = () => new Buffer(`${querystring.escape(apiClientId)}:${querystring.escape(apiClientSecret)}`).toString('base64');

const getRequest = ({ req, res, url, headers, disableGatewayMode }) => service.callApi({
  method: 'get',
  url,
  headers: headers || {},
  reqHeaders: { jwt: { access_token: req.access_token, refresh_token: req.refresh_token }, host: req.headers.host },
  onTokenRefresh: session.updateHmppsCookie(res),
  disableGatewayMode,
}).then(response => new Promise(r => r(response.data))).catch(error => {
  logger.error(error);
  return new Promise(r => r(null))
});  

const callApi = ({ method, url, headers, reqHeaders, onTokenRefresh, responseType, data, disableGatewayMode = false }) => {
  const { access_token, refresh_token } = reqHeaders.jwt;

  return service.httpRequest({
    url,
    method,
    responseType,
    data,
    headers: getHeaders({ headers, reqHeaders, access_token }),
  }, disableGatewayMode
  ).catch(error => {
    logger.error(error);
    if (error.response.status === 401) {
      return service.refreshTokenRequest({ token: refresh_token, headers, reqHeaders })
        .then(response => {
          onTokenRefresh(response.data);
          return service.httpRequestRetry({
            url,
            method,
            responseType,
            headers: getHeaders({ headers, reqHeaders, access_token: response.data.access_token }),
          }, disableGatewayMode);
        })
    }
    throw error;
  });
};

function httpRequest(options, disableGatewayMode) {
  if (!disableGatewayMode && gatewayToken.useApiAuth) {
    const apiToken = options.headers.authorization;
    if (apiToken) {
      options.headers['elite-authorization'] = apiToken; // eslint-disable-line no-param-reassign
    }
    options.headers.authorization = `Bearer ${gatewayToken.generateToken()}`; // eslint-disable-line no-param-reassign
  }
  return axios(options);
}

function httpRequestRetry(options, disableGatewayMode) {
  return httpRequest(options, disableGatewayMode);
}

const getApiHealth = () => httpRequest({ url: nurl.resolve(process.env.API_ENDPOINT_URL, '/health'), method: 'get', headers: {} });

const refreshTokenRequest = ({ headers, reqHeaders, token }) => axios({
  method: 'post',
  url: nurl.resolve(process.env.API_ENDPOINT_URL,'oauth/token'),
  headers: getClientHeaders({ headers, reqHeaders }),
  data: `refresh_token=${token}&grant_type=refresh_token`,
});

const getClientHeaders = ({ headers, reqHeaders }) => Object.assign({}, headers, {
  authorization: `Basic ${encodeClientCredentials()}`,
  'Content-Type': 'application/x-www-form-urlencoded',
  'access-control-allow-origin': reqHeaders.host,
});

const getHeaders = ({ headers, reqHeaders, access_token }) => Object.assign({}, headers, {
  authorization: `bearer ${access_token}`,
  'access-control-allow-origin': reqHeaders.host,
});

const errorStatusCode = (response) => (response && response.status) || 500;

const service = {
  callApi,
  httpRequest,
  httpRequestRetry,
  refreshTokenRequest,
  errorStatusCode,
  encodeClientCredentials,
  getRequest,
  getApiHealth,
};

module.exports = service;