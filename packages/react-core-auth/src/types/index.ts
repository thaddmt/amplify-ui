import React from 'react';

export type DefaultViewComponent<P = {}> = React.ComponentType<
  P & { children?: React.ReactNode }
>;
