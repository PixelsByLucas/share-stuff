const User = require('../../models/user')

const applyReview = agenda => {
  agenda.define("apply review", async job => {
    try {
      const { revieweeId, reviewId, rating } = job.attrs.data

      // == update reviewee with new review ==
      const reviewee = await User.findById(revieweeId)

      if (!reviewee) {
        throw new Error('Reviewee not found')
      }

      reviewee.reviews.push({ review: reviewId })
      reviewee.totalRatings = reviewee.totalRatings + 1
      reviewee.rating = reviewee.rating + rating

      await reviewee.save()


    } catch (error) {
      job.fail(error.message)
      await job.save()
    }
  })
}

module.exports = applyReview