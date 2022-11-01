import * as React from 'react';
import { Themer, ThemerPreviewer, ThemerEditor } from '@/components/Themer';
import { Flex, View } from '@aws-amplify/ui-react';

export default function ThemeEditorPage({ colorMode }) {
  React.useEffect(() => {
    document.documentElement.setAttribute('data-hide-nav', 'true');
    return () => {
      document.documentElement.removeAttribute('data-hide-nav');
    };
  }, []);
  return (
    <View position="fixed" top="6rem" left="0" right="0" bottom="0">
      <Themer>
        <Flex direction="row" width="100%" height="100%">
          <View
            flex="1"
            width="50%"
            padding="large"
            maxHeight="100%"
            style={{
              overflow: 'scroll',
            }}
          >
            <ThemerEditor />
          </View>
          <View flex="1" width="50%" padding="large" maxHeight="100%">
            <ThemerPreviewer colorMode={colorMode} />
          </View>
        </Flex>
      </Themer>
    </View>
  );
}
