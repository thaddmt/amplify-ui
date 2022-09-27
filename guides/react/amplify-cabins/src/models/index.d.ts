import { ModelInit, MutableModel } from '@aws-amplify/datastore';

type CabinMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
};

export declare class Cabin {
  readonly id: string;
  readonly name: string;
  readonly thumbnail: string;
  readonly thumbnailAlt: string;
  readonly beds: number;
  readonly rate: number;
  readonly rating: number;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<Cabin, CabinMetaData>);
  static copyOf(
    source: Cabin,
    mutator: (
      draft: MutableModel<Cabin, CabinMetaData>
    ) => MutableModel<Cabin, CabinMetaData> | void
  ): Cabin;
}
