import { useAuthenticator } from '@aws-amplify/ui-react-core-auth';

export default function useCodeDeliveryDetails(): {
  deliveryMedium: string;
  destination: string;
  isMediumEmail: boolean;
  isMediumSMS: boolean;
} {
  const { codeDeliveryDetails } = useAuthenticator(
    ({ codeDeliveryDetails }) => [codeDeliveryDetails]
  );

  const { DeliveryMedium: deliveryMedium, Destination: destination } =
    codeDeliveryDetails ?? {};

  const isMediumEmail = deliveryMedium === 'EMAIL';
  const isMediumSMS = deliveryMedium === 'SMS';
  return { deliveryMedium, destination, isMediumEmail, isMediumSMS };
}
