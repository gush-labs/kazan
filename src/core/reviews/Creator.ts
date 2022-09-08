import type { Review } from "@/core/Review";

interface Creator {
  id: string;
  name: string;

  levels?: { 
    prefix: string,
    postfix: string,
    start: number, 
    end: number,
  };

  meaning: boolean;
  reading: boolean;
  translation: boolean;
  shuffling: boolean;

  create(params: string[]): Review | undefined;
}

export default Creator;
