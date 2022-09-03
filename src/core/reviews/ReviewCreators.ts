import type ReviewCreator from "./ReviewCreator";
import WaniKaniReview from "./WaniKaniReview";

const creators = new Map<string, ReviewCreator>();
function set(review: WaniKaniReview) {
  creators.set(review.id, review);
}

set(new WaniKaniReview());

class ReviewCreators {
  static getAll(): ReviewCreators[] {
    return Array.from(creators, (_, value) => value);
  }

  static get(id: string): ReviewCreator | undefined {
    return creators.get(id);
  }
}

export default ReviewCreators;