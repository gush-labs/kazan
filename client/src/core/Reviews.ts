import type { Review } from "@/core/Review";
import type { Creator, CreatorParams } from "./reviews/Creator";
import WaniKaniReview from "./reviews/WaniKaniReview";

/**
 * Creates a review from the review id.
 */
abstract class Reviews {
  static creators = new Map<string, Creator>();

  static getAllReviews(): Creator[] {
    return Array.from(this.creators.entries(), ([_, value]) => value);
  }

  static create(
    id: string,
    params: CreatorParams,
    rawParams: string[]
  ): Review | undefined {
    return this.creators.get(id)?.create(params, rawParams);
  }
}

function set(creator: Creator) {
  Reviews.creators.set(creator.id, creator);
}

/**
 * This is all reviews that are available in our web-app
 */
set(new WaniKaniReview());

export default Reviews;
