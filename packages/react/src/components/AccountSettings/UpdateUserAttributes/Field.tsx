import React from 'react';
import { TextField } from '../../../primitives';

function Field({ label }: { label: string }): JSX.Element {
  return <TextField label={label}></TextField>;
}

export default Field;
