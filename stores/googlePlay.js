const googlePlay = require('google-play-scraper')

const fetchAllReviews = require('../utils/fetchAllReviews')

function fetchPage (appId, lang, page) {
  return googlePlay.reviews({
    appId: appId,
    lang: lang,
    page: page,
    sort: googlePlay.sort.NEWEST
  })
}

module.exports = function (appId, lang) {
  return fetchAllReviews(fetchPage, appId, lang, 0)
}
