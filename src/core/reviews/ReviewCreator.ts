import type { Review } from "@/core/Review";

interface ReviewCreator {
  id: string;
  name: string;
  create(params: string[]): Review | undefined;
}

export default ReviewCreator;
