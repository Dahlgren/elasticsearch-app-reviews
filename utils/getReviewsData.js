function getReviewsData(platform, appId, lang, reviews) {
  return reviews.map((review) => {
    const { date, id, score, text, title, userName, version } = review
    return {
      appId,
      date,
      id,
      lang,
      platform,
      score,
      text,
      title,
      userName,
      version
    }
  })
}

module.exports = getReviewsData
