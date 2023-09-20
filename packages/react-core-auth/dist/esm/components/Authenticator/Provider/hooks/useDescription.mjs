import { useDisplayText } from '../DisplayText/DisplayTextContext.mjs';
import '@aws-amplify/ui';
import { useComponentRoute } from '../ComponentRoute/ComponentRouteContext.mjs';

const useDescription = () => {
    const { getDescriptionText } = useDisplayText();
    const { route } = useComponentRoute();
    return { descriptionText: getDescriptionText(route) };
};

export { useDescription };
