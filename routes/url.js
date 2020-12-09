const router = require('express').Router();
const {
  getIndex,
  postShortUrl,
  postShortUrlCustom,
  getShortUrlRedirect,
  getShortUrlStats,
} = require('../controllers/url');

router.get('/', getIndex);

router.post('/shortUrls', postShortUrl);

router.post('/shortUrlsCustom', postShortUrlCustom);

router.get('/:shortUrl', getShortUrlRedirect);

router.get('/:shortUrl/stats', getShortUrlStats);

module.exports = router;
