/**
 * Different utilities for just basically anything
 */
import { watch, type Ref } from "vue";

export function watchRemove<T>(ref: Ref<T>, action: () => void) {
  watch(ref, (v) => {
    if (v == undefined) {
      action();
    }
  });
}

export function watchUpdate<T>(
  ref: Ref<T | undefined>,
  action: (value: T) => void
) {
  watch(ref, (v) => {
    if (v) {
      action(v!);
    }
  });
}

export class TimeDistribution {
  buckets: number[] = [];
  range: { start: number; end: number } = { start: 0, end: 0 };
  slowThreshold = 0;

  static calculate(values: number[]): TimeDistribution {
    const distribution = new TimeDistribution();

    const resolution = 40;
    const buckets: number[] = new Array(resolution).fill(0);
    const maxValue = (Math.floor(this.max(values) / 5) + 1) * 5;

    values
      .map((v) => Math.floor((v / maxValue) * resolution))
      .forEach((i) => (buckets[i] += 1));

    distribution.range = { start: 0, end: maxValue };
    distribution.buckets = buckets;
    distribution.slowThreshold = this.calculateSlowThreshold(distribution);
    return distribution;
  }

  private static calculateSlowThreshold(
    distribution: TimeDistribution
  ): number {
    const maxCount = this.max(distribution.buckets);
    const maxCountId = distribution.buckets.findIndex((v) => v == maxCount);
    const rangeSize = distribution.buckets.length;
    const rangeEnd = distribution.range.end;

    let distrStartId = 0;
    for (const v of distribution.buckets) {
      if (v > 0) {
        break;
      }
      distrStartId += 1;
    }

    let distrEndId = 0;
    distribution.buckets.forEach((v, i) => {
      if (v > 0) {
        distrEndId = i;
      }
    });

    const distrStart = (distrStartId / rangeSize) * rangeEnd;
    const distrMax = (maxCountId / rangeSize) * rangeEnd;
    const distrEnd = (distrEndId / rangeSize) * rangeEnd;

    const distrMaxRight = distrMax + (distrMax - distrStart);
    const distrMaxMean = (distrMax + distrEnd) / 2;

    return Math.max(distrMaxMean, distrMaxRight);
  }

  private static max(values: number[]): number {
    return values.reduce((l, r) => Math.max(l, r));
  }
}
