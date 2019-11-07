export const getApiUrl = (req) => {
  if(!req) {
    return '/api';
  }

  if (req.headers['x-now-deployment-url']) {
    return `https://${req.headers['x-now-deployment-url']}/api`
  }

  return `http://${req.headers.host}/api`;
}
