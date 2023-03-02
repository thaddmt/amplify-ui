import * as React from 'react';
import { useActor, useInterpret } from '@xstate/react';
import {
  livenessMachine,
  FaceLivenessDetectorProps as FaceLivenessDetectorPropsFromUi,
} from '@aws-amplify/ui';

import { FaceLivenessDetectorProvider } from './providers';
import { StartLiveness } from './StartLiveness';
import { LivenessCheck } from './LivenessCheck';
import { View, Flex } from '../../primitives';
import { getVideoConstraints } from './StartLiveness/helpers';
import { LivenessComponents } from './hooks/useCustomComponents/defaultComponents';

const DETECTOR_CLASS_NAME = 'liveness-detector';

export interface FaceLivenessDetectorProps
  extends FaceLivenessDetectorPropsFromUi {
  components?: LivenessComponents;
}

export const FaceLivenessDetector: React.FC<FaceLivenessDetectorProps> = (
  props
) => {
  const { disableInstructionScreen = false, components, config } = props;
  const currElementRef = React.useRef<HTMLDivElement>(null);

  const service = useInterpret(livenessMachine, {
    devTools: process.env.NODE_ENV === 'development',
    context: {
      componentProps: {
        ...props,
        config: config || {},
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
};