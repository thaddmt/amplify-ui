import * as React from 'react';
import { useActor, useInterpret } from '@xstate/react';
import {
  livenessMachine,
  FaceLivenessDetectorProps as FaceLivenessDetectorPropsFromUi,
} from './service';
import { View, Flex } from '@aws-amplify/ui-react';

import { FaceLivenessDetectorProvider } from './providers';
import { StartLiveness } from './StartLiveness';
import { LivenessCheck } from './LivenessCheck';
import { getVideoConstraints } from './StartLiveness/helpers';
import { LivenessComponents } from './shared/DefaultStartScreenComponents';

const DETECTOR_CLASS_NAME = 'liveness-detector';

export interface FaceLivenessDetectorProps
  extends FaceLivenessDetectorPropsFromUi {
  components?: LivenessComponents;
}

export default function FaceLivenessDetector(
  props: FaceLivenessDetectorProps
): JSX.Element {
  const { disableInstructionScreen = false, components, config } = props;
  const currElementRef = React.useRef<HTMLDivElement>(null);

  const service = useInterpret(livenessMachine, {
    devTools: process.env.NODE_ENV === 'development',
    context: {
      componentProps: {
        ...props,
        config: config ?? {},
      },
    },
  });

  const [state, send] = useActor(service);
  const isStartView = state.matches('start') || state.matches('userCancel');

  const beginLivenessCheck = React.useCallback(() => {
    const videoConstraints = getVideoConstraints();

    send({
      type: 'BEGIN',
      data: { videoConstraints },
    });
  }, [send]);

  React.useLayoutEffect(() => {
    if (disableInstructionScreen && isStartView) {
      beginLivenessCheck();
    }
  }, [beginLivenessCheck, disableInstructionScreen, isStartView]);

  return (
    <View className={DETECTOR_CLASS_NAME} testId={DETECTOR_CLASS_NAME}>
      <FaceLivenessDetectorProvider componentProps={props} service={service}>
        <Flex direction="column" ref={currElementRef}>
          {isStartView ? (
            <StartLiveness
              beginLivenessCheck={beginLivenessCheck}
              components={components}
            />
          ) : (
            <LivenessCheck />
          )}
        </Flex>
      </FaceLivenessDetectorProvider>
    </View>
  );
}
