nid = require('nanoid');
const nanoid = nid.customAlphabet(
  '1234567890qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM',
  6
);
const ShortUrl = require('../models/url');

exports.getIndex = async (req, res) => {
  try {
    const shortUrls = await ShortUrl.find();
  } catch (err) {
    res.sendStatus(503);
  }
  res.render('index', {
    customCode: '',
    success: '',
    failure: '',
    short: ``,
    note: '',
  });
};

exports.postShortUrl = async (req, res) => {
  auto_code = nanoid();
  await ShortUrl.create(
    {
      full: req.body.fullUrl,
      short: `http://${req.headers.host}/${auto_code}`,
    },
    function (err) {
      if (err) return res.sendStatus(503);
    }
  );
  res.status(201).render('index', {
    customCode: auto_code,
    success: 1,
    failure: '',
    short: `http://${req.headers.host}/${auto_code}`,
    note: 'You Can Click/Copy The Above Link',
  });
};

exports.postShortUrlCustom = async (req, res) => {
  const shortUrl = await ShortUrl.findOne(
    {
      short: `http://${req.headers.host}/${req.body.fullUrlCustom}`,
    },
    function (err) {
      if (err) {
        return res.sendStatus(503);
      }
    }
  );
  if (shortUrl == null) {
    await ShortUrl.create(
      {
        full: req.body.fullUrl,
        short: `http://${req.headers.host}/${req.body.fullUrlCustom}`,
      },
      function (err) {
        if (err) return res.sendStatus(503);
      }
    );
    return res.status(200).render('index', {
      customCode: req.body.fullUrlCustom,
      success: 1,
      failure: '',
      note: 'You Can Click/Copy The Above Link',
      short: `http://${req.headers.host}/${req.body.fullUrlCustom}`,
    });
  } else {
    return res.status(400).render('index', {
      customCode: 'Sorry!Not Available',
      failure: 1,
      success: '',
      note: 'Try Different Code Or Use Auto-Generate',
    });
  }
};

exports.getShortUrlRedirect = async (req, res) => {
  const shortUrl = await ShortUrl.findOne(
    {
      short: `http://${req.headers.host}/${req.params.shortUrl}`,
    },
    function (err) {
      if (err) return res.sendStatus(503);
    }
  );
  if (shortUrl == null) {
    return res.sendStatus(404);
  }
  shortUrl.clicks++;
  shortUrl.save();

  res.redirect(shortUrl.full);
};

exports.getShortUrlStats = async (req, res) => {
  const shortUrl = await ShortUrl.findOne(
    {
      short: `http://${req.headers.host}/${req.params.shortUrl}`,
    },
    function (err) {
      if (err) return res.sendStatus(503);
    }
  );
  res.render('stats', { shortUrl: shortUrl });
};
