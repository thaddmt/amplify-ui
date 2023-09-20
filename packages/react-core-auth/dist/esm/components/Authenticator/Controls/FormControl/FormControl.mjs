import { __rest } from '../../../../node_modules/@rollup/plugin-typescript/node_modules/tslib/tslib.es6.mjs';
import React from 'react';
import { isTypedFunction } from '@aws-amplify/ui';
import { FormProvider } from '@aws-amplify/ui-react-core';
import { useForm } from '../../Provider/hooks/useForm.mjs';
import '../../Provider/DisplayText/DisplayTextContext.mjs';
import '../../Provider/ComponentRoute/ComponentRouteContext.mjs';
import '../../Provider/Machine/MachineContext.mjs';
import '@aws-amplify/core';
import 'qrcode';
import '../../Provider/Mfa/MfaContext.mjs';
import '../../Provider/Platform/PlatformContext.mjs';
import { usePrimitives } from '../../Provider/Primitives/PrimitivesContext.mjs';

function FormControlBase(_a) {
    var { onSubmit: _onSubmit } = _a, props = __rest(_a, ["onSubmit"]);
    const { Form } = usePrimitives();
    const { onSubmit } = useForm();
    const handleSubmit = React.useCallback((e) => {
        if (isTypedFunction(_onSubmit)) {
            _onSubmit(e);
        }
        onSubmit(e);
    }, [_onSubmit, onSubmit]);
    return React.createElement(Form, Object.assign({}, props, { onSubmit: handleSubmit }));
}
// export wrapped `FormControlBase` in `FormProvider`
function FormControl(_a) {
    var { mode } = _a, rest = __rest(_a, ["mode"]);
    return (React.createElement(FormProvider, { mode: mode },
        React.createElement(FormControlBase, Object.assign({}, rest))));
}

export { FormControl };
