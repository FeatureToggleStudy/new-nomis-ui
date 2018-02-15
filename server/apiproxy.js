const proxy = require('http-proxy-middleware');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const modifyResponse = require('node-http-proxy-json');
const elite2Api = require('./elite2Api');
const tokenGeneration = require('./jwt-token');

const HEALTH_CHECK_PATH = 'health';
const appInfo = getAppInfo();

function getAppInfo() {
  const packageData = JSON.parse(fs.readFileSync('./package.json'));
  const buildVersion = fs.existsSync('./build-info.json') ? JSON.parse(fs.readFileSync('./build-info.json')).buildNumber : packageData.version;

  return {
    name: packageData.name,
    version: buildVersion,
    description: packageData.description,
  };
}

function healthCheckResponse(status) {
  const response = appInfo;

  response.api = status;

  return response;
}

const onErrorHandler = (err, req, res) => {
  if (req.path === HEALTH_CHECK_PATH) {
    res.writeHead(500, {
      'Content-Type': 'application/json',
    });

    res.end(JSON.stringify(healthCheckResponse('DOWN')));
  } else {
    res.writeHead(500, {
      'Content-Type': 'text/plain',
    });

    res.end('Something went wrong.');
  }
};

const onProxyResponse = (proxyRes, req, res) => {
  res.setHeader('access-control-allow-origin', req.headers.host);
  res.setHeader('cache-control', 'no-store');
  res.setHeader('pragma', 'no-cache');

  // If health check request, check and translate response content-type
  if (req.path === HEALTH_CHECK_PATH) {
    proxyRes.headers['content-type'] = 'application/json;charset=UTF-8';  // eslint-disable-line no-param-reassign

    delete proxyRes.headers['content-length']; // eslint-disable-line no-param-reassign

    modifyResponse(res, proxyRes.headers['content-encoding'], (body) => healthCheckResponse(body ? body : 'DOWN'));
  }
};

const onProxyRequest = (proxyReq, req) => {
  const authHeader = req.headers.authorization;

  if (authHeader !== undefined) {
    proxyReq.setHeader('elite-authorization', authHeader);
  }

  if (tokenGeneration.useApiAuth) {
    // Add Api Gateway JWT header token
    try {
      const jwToken = tokenGeneration.generateToken();
      proxyReq.setHeader('authorization', `Bearer ${jwToken}`);
    } catch (err) {
      proxyReq.setHeader('authorization', 'JUNK');
    }
  }
};

// proxy middleware options
const options = {
  target: elite2Api.baseUrl,                  // target host
  changeOrigin: true,               // needed for virtual hosted sites
  ws: true,                         // proxy websockets
  pathRewrite: {
    '^/api': 'api',                    // rewrite path
    '^/info': 'info',                    // rewrite path
    '^/health': HEALTH_CHECK_PATH,
  },
  //eslint-disable-next-line
  logProvider: (provider) => require('winston'),
  onError: onErrorHandler,
  onProxyRes: onProxyResponse,
  onProxyReq: onProxyRequest,
};

// create the proxy (without context)
const apiProxy = proxy(options);

module.exports = apiProxy;
