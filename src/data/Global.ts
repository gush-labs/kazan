import type ReviewReport from "./ReviewReport";
import type ReviewCollection from "./ReviewCollection";

class Global {
  reviewReport: ReviewReport | null = null;
  reviewCollection: ReviewCollection | null = null;
}

const global = new Global(); 

export default global;