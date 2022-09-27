/*
 * 📕 Part 3 - Retrieve from DataStore
 *
 * 👉 STEP 1
 *
 * Retrieve the data from datastore and set it to cabins variable
 *
 * ✨ BONUS 1
 *
 * After loading the page and seeing the data, try again in offline mode
 *
 */
import { Collection } from '@aws-amplify/ui-react';

import PropertyCard from '../../../components/PropertyCard';
import Layout from '../../../components/Layout';
import { useEffect, useState } from 'react';
import { DataStore } from 'aws-amplify';
import { Cabin } from '../../../models';

export default function Properties() {
  const [cabins, setCabins] = useState<Cabin[]>([]);

  useEffect(() => {
    async function getCabins() {
      try {
        /**
         *
         * 👉 STEP 1
         *
         */

        console.log('Posts retrieved successfully!');
      } catch (error) {
        console.log('Error retrieving posts', error);
      }
    }
    getCabins();
  }, []);
  return (
    <Layout>
      <Collection
        items={cabins}
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
