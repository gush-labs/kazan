import type { Review } from "@/core/Review";
import type Creator from "./reviews/Creator";
import JapaneseBasicVerbs from "./reviews/JapaneseBasicVerbs";
import WaniKaniReview from "./reviews/WaniKaniReview";
import JapanesePhrases from "./reviews/JapanesePhrases";

/**
 * Creates a review from its name.
 */
abstract class ReviewCreator {
  static creators = new Map<string, Creator>();

  static getAllReviews(): Creator[] {
    return Array.from(this.creators.entries(), ([_, value]) => value);
  }

  static create(id: string, params: string[]): Review | undefined {
    return this.creators.get(id)?.create(params);
  }
}

function set(creator: Creator) {
  ReviewCreator.creators.set(creator.id, creator);
}

set(new WaniKaniReview());
set(new JapaneseBasicVerbs());
set(new JapanesePhrases());

export default ReviewCreator;
