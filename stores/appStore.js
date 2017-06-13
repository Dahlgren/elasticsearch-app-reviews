const appStore = require('app-store-scraper')
const fetchAllReviews = require('../utils/fetchAllReviews')

function fetchPage (appId, country, page) {
  return appStore.reviews({
    appId: appId,
    country: country,
    page: page,
    sort: appStore.sort.RECENT
  })
}

module.exports = function (appId, country) {
  return fetchAllReviews(fetchPage, appId, country, 1)
}
