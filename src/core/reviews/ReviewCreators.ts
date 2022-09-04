import type ReviewCreator from "./ReviewCreator";
import WaniKaniReview from "./WaniKaniReview";
import JapaneseLessonsReview from "./JapaneseLessonsReview";

const creators = new Map<string, ReviewCreator>();
function set(review: WaniKaniReview) {
  creators.set(review.id, review);
}

set(new WaniKaniReview());
set(new JapaneseLessonsReview());

class ReviewCreators {
  static getAll(): ReviewCreators[] {
    return Array.from(creators, (_, value) => value);
  }

  static get(id: string): ReviewCreator | undefined {
    return creators.get(id);
  }
}

export default ReviewCreators;