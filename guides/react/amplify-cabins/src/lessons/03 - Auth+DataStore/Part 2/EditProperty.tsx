/*
 * 📕 Part 2 - DataStore Edit Properties
 *
 *
 * 👉 STEP 1
 *
 * Add a stepper field to capture a star rating 1 - 5
 *
 * Make sure to pass in width="33%" and label="Number of Stars Rating"
 *
 * Take a look at the StepperField documentation https://ui.docs.amplify.aws/react/components/stepperfield
 *
 *
 * 👉 STEP 2
 *
 * Save the data into the Cabin model!
 * Take a look at the documentation for the DataStore https://docs.amplify.aws/lib/datastore/data-access/q/platform/js/
 *
 * * 👉 STEP 3
 *
 * Add a way to navigate to the '/' route after the post is saved.
 *
 *
 * ✨ BONUS 1
 *
 * Try to use a different Amplify UI primitive for the rating capture
 *
 */
import {
  View,
  TextField,
  Card,
  Flex,
  FieldGroupIcon,
  Button,
  StepperField,
} from '@aws-amplify/ui-react';
import { useNavigate } from 'react-router-dom';
import { DataStore } from 'aws-amplify';
import { useState } from 'react';
import { BiBed, BiDollar } from 'react-icons/bi';

import Layout from '../../../components/Layout';
import { Cabin } from '../../../models';

export default function EditProperty() {
  const [name, setName] = useState('');
  const [thumbnail, setThumbnail] = useState('');
  const [thumbnailAlt, setThumbnailAlt] = useState('');
  const [beds, setBeds] = useState(0);
  const [rate, setRate] = useState(0);
  const [rating, setRating] = useState(0);

  const navigate = useNavigate();
  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      /**
       *
       * 👉 STEP 2
       *
       */
      console.log('Post saved successfully!');
      /**
       *
       * 👉 STEP 3
       *
       */
    } catch (error) {
      console.log('Error saving post', error);
    }
  }
  return (
    <Layout>
      <View as="form" onSubmit={onSubmit}>
        <Card maxWidth="800px" margin="auto">
          <Flex direction="column">
            <TextField
              required
              label="Name"
              onChange={(e) => setName(e.target.value)}
            ></TextField>
            <Flex>
              <TextField
                required
                label="Thumbnail path"
                width="50%"
                onChange={(e) => setThumbnail(e.target.value)}
              ></TextField>
              <TextField
                required
                label="Thumbnail alt text"
                width="50%"
                onChange={(e) => setThumbnailAlt(e.target.value)}
              ></TextField>
            </Flex>
            <Flex>
              <TextField
                label="Beds"
                type="number"
                width="33%"
                required
                onChange={(e) => setBeds(+e.target.value)}
                innerStartComponent={
                  <FieldGroupIcon>
                    <BiBed />
                  </FieldGroupIcon>
                }
              ></TextField>
              <TextField
                required
                label="Rate"
                type="number"
                width="33%"
                onChange={(e) => setRate(+e.target.value)}
                innerStartComponent={
                  <FieldGroupIcon>
                    <BiDollar />
                  </FieldGroupIcon>
                }
              ></TextField>
              {/**
               *
               * 👉 STEP 1
               *   Add a rating field!
               *   Use setRating!
               *
               */}
            </Flex>
            <View textAlign="center">
              <Button type="submit" variation="primary">
                Save property
              </Button>
            </View>
          </Flex>
        </Card>
      </View>
    </Layout>
  );
}
