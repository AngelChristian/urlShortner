# urlShortner (https://mysterious-spire-38047.herokuapp.com/)

This is an App which helps you create short url,which can be used or shared to easily access your long url.
It is created using nodejs,mongodb,bootstrap,html,css,ejs,tested by jest And hosted on heroku.

## Available APIs

### Url Routes

#### GET `/`

You can do a GET to `/` to get the home page.

![example](https://res.cloudinary.com/angelchristian/image/upload/v1607544233/home_iol3tq.png)


#### POST '/shortUrls'

You can do a POST '/shortUrls' to get the unique short link of 6 digit code(auto-generated).

The body must have:

* `fullUrl`: '...'

It returns the following:
on success:
![example](https://res.cloudinary.com/angelchristian/image/upload/v1607544270/urlsuccess_nxrgnz.png)

on failure:
STATUS(503) - SERVICE  UNAVAILABLE


#### POST '/shortUrlsCustom'

You can do a POST '/shortUrlsCustom' to get the unique code link if it is available.

The body must have:

* `fullUrl`: '...',
* `fullUrlCustom`: '...',


It returns the following:
on success:
![example](https://res.cloudinary.com/angelchristian/image/upload/v1607544270/urlsuccess_nxrgnz.png)

on failure:
![example](https://res.cloudinary.com/angelchristian/image/upload/v1607544319/urlfail_dmtmvo.png)


#### GET '/:shortUrl'

You can do a GET '/:shortUrl' to use the unique link generated to go to the desired link.

The request must look like:

GET /12345

on failure:
STATUS(503) - SERVICE  UNAVAILABLE


#### GET '/:shortUrl/stats'

You can do a GET /:shortUrl/stats to get the stats of unique link like info about registered,last accessed,total number of clicks.

The request must look like:

GET /12345/stats


It returns the following:
on success:
![example](https://res.cloudinary.com/angelchristian/image/upload/v1607544385/stats_xehilt.png)

on failure:
STATUS(404) - NOT FOUND

#### Error Tracking
sentry.io is used,which reports as follows:
![example](https://res.cloudinary.com/angelchristian/image/upload/v1607544464/sentry_fl1mvg.png)

#### Tests
Jest is used,which test as follows:
![example](https://res.cloudinary.com/angelchristian/image/upload/v1607544499/test_usstvt.png)


## Running it

Just clone the repository, run `npm install` and then `node run start`. .

If you want to run it on another port, just run `PORT=3000 node server.js` to run it on port 3000 

Create env file AND create a varible with database link  with name MONGO.

That's it :)

## Testing it

Just run `npm test`


## Author

[Angel Christian](https://github.com/AngelChristian)

