const elasticsearch = require('elasticsearch')

const appstore = require('./stores/appStore')
const googlePlay = require('./stores/googlePlay')
const getReviewsData = require('./utils/getReviewsData')

class ElasticsearchAppReviews {
  constructor (config) {
    this.config = config
    this.index = this.config.elasticsearch.index
    this.client = new elasticsearch.Client(this.config.elasticsearch)
  }

  importAppStoreReviews (appId, country) {
    return appstore(appId, country)
      .then((reviews) => {
        this.handleReviews('iOS', appId, country, reviews)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  importGooglePlayReviews (appId, lang, locale) {
    return googlePlay(appId, lang, locale)
      .then((reviews) => {
        this.handleReviews('Android', appId, lang, reviews)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  handleReviews (platform, appId, lang, reviews) {
    reviews = getReviewsData(platform, appId, lang, reviews)

    // Add index operation to bulk queue, will insert or update
    for (let i = reviews.length - 1; i >= 0; i--) {
      reviews.splice(i, 0, {
        index: {
          _index: this.index,
          _type: 'review',
          _id: reviews[i].id
        }
      })
    }

    this.client.bulk({ body: reviews })
  }
}

module.exports = ElasticsearchAppReviews
