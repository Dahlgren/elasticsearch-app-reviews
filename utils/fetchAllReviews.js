function fetchAllReviews (fetchPage, appId, lang, page) {
  return fetchPage(appId, lang, page)
    .then((reviews) => {
      if (reviews.length > 0) {
        return fetchAllReviews(fetchPage, appId, lang, page + 1)
          .then((moreReviews) => {
            return reviews.concat(moreReviews)
          })
      }

      return reviews
    })
}

module.exports = fetchAllReviews
