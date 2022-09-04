import type { Review } from "@/core/Review";

interface Creator {
  id: string;
  name: string;

  create(params: string[]): Review | undefined;
}

export default Creator;
