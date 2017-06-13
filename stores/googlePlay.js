const googlePlay = require('google-play-scraper')
const moment = require('moment')

const fetchAllReviews = require('../utils/fetchAllReviews')

function fetchPage (appId, lang, page) {
  return googlePlay.reviews({
    appId: appId,
    lang: lang,
    page: page,
    sort: googlePlay.sort.NEWEST
  })
}

module.exports = function (appId, lang, locale) {
  return fetchAllReviews(fetchPage, appId, lang, 0)
    .then((reviews) => {
      return reviews.map((review) => {
        review.date = moment(review.date, 'D MMMM YYYY', locale).toDate()
        return review
      })
    })
}
