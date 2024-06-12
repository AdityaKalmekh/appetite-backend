import ReviewDAO from "../dao/ReviewDAO.js";

export default class ReviewController {
  static async apiAddReview(req, res, next) {
    try {
      const response = await ReviewDAO.addReview(req.body);
      res.json(response.acknowledged);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}
