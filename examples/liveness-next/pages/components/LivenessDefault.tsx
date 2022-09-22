import { LivenessFlow, View, Flex, Loader, Icon } from '@aws-amplify/ui-react';
import { useLiveness } from './useLiveness';
import { SessionIdAlert } from './SessionIdAlert';
import { GetLivenessResultCard } from './GetLivenessResultCard';

import LivenessLogo from './LivenessLogo';

export default function LivenessDefault({ disableStartScreen = false }) {
  const {
    getLivenessResponse,
    createLivenessSessionApiError,
    createLivenessSessionApiData,
    createLivenessSessionApiLoading,
    handleGetLivenessDetection,
    stopLiveness,
  } = useLiveness();

  if (createLivenessSessionApiError) {
    return <div>Some error occured...</div>;
  }

  return (
    <View maxWidth="640px" margin="0 auto">
      {createLivenessSessionApiLoading ? (
        <div>
          <Loader /> Loading...
        </div>
      ) : (
        <Flex direction="column" gap="xl">
          <SessionIdAlert sessionId={createLivenessSessionApiData.sessionId} />

          <Icon
            ariaLabel="Amplify UI Liveness"
            margin="0 auto"
            width="160"
            height="52"
            viewBox={{ width: 160, height: 52 }}
          >
            <LivenessLogo />
          </Icon>

          <LivenessFlow
            sessionId={createLivenessSessionApiData.sessionId}
            sessionInformation={createLivenessSessionApiData.sessionInformation}
            onGetLivenessDetection={handleGetLivenessDetection}
            onExit={stopLiveness}
            disableStartScreen={disableStartScreen}
            enableAnalytics={true}
          />

          <GetLivenessResultCard getLivenessResponse={getLivenessResponse} />
        </Flex>
      )}
    </View>
  );
}
