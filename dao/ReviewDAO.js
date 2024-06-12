let review;

export default class ReviewDAO {
  static async injectDB(conn) {
    if (review) {
      return;
    } else {
      try {
        review = await conn.db(process.env.RESTREVIEWS_NS).collection("Review_collection");
      } catch (e) {
        console.error(
          `Unable to establish a collection handle in ReviewDAO: ${e}`
        );
      }
    }
  }

  static async addReview(data) {
    try {
      return await review.insertOne(data);
    } catch (error) {
      console.error(`Unable to add Review data: ${error}`);
      return error;
    }
  }
}
