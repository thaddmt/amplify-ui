import { Collection } from '@aws-amplify/ui-react';

import { properties } from '../data/properties';
import PropertyCard from '../lessons/01-Property-Card/PropertyCard';
import Layout from '../components/Layout';

export default function Properties() {
  return (
    <Layout>
      <Collection
        items={properties}
        type="grid"
        maxWidth="1100px"
        margin="0 auto"
        justifyContent="center"
        templateColumns={{
          base: 'minmax(0, 500px)',
          medium: 'repeat(2, minmax(0, 1fr))',
          large: 'repeat(3, minmax(0, 1fr))',
        }}
        gap="small"
      >
        {(item, index) => <PropertyCard key={index} {...item}></PropertyCard>}
      </Collection>
    </Layout>
  );
}
