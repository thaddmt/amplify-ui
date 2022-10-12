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
      await DataStore.save(
        new Cabin({
          name,
          rate,
          beds,
          thumbnail,
          thumbnailAlt,
          rating,
        })
      );
      console.log('Post saved successfully!');
      navigate('/');
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
              <StepperField
                max={5}
                min={1}
                width="33%"
                onStepChange={(e) => setRating(+e.target.value)}
                label="Number of Stars Rating"
              />
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
