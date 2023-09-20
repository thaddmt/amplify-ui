import { useDisplayText } from '../DisplayText/DisplayTextContext.mjs';
import '@aws-amplify/ui';
import { useComponentRoute } from '../ComponentRoute/ComponentRouteContext.mjs';

const useTitle = () => {
    const { getTitleText } = useDisplayText();
    const { route } = useComponentRoute();
    return { titleText: route ? getTitleText(route) : undefined };
};

export { useTitle };
