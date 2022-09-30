/*
 * 📕 Part 3 - Retrieve from DataStore
 *
 * 👉 STEP 1
 *
 * Retrieve the data from datastore and set it to cabins variable
 * See https://docs.amplify.aws/lib/datastore/data-access/q/platform/js/
 *
 * ✨ BONUS 1
 *
 * After loading the page and seeing the data, try again in offline mode
 *
 * * ✨ Test It Out!
 *
 * After you are done with step 1, try it out! On the command line run:
 *
 * npm start
 *
 * Then open localhost:3000/login and create a new account and log in!
 * It should redirect you to the Edit Property page.
 *
 * Fill out the data in each field (without the '').
 *
 *   name: 'A mountain lakeside retreat',
 *   thumbnail: '/img/properties/2.jpg',
 *   thumbnailAlt: 'Cabin built on a lakeside dock at the foot of mountains',
 *   beds: 2,
 *   rate: 200,
 *   rating: 3.5,
 *
 * Save and you should see a page displaying your cabin data!
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
