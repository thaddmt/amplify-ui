'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var uiReactCore = require('@aws-amplify/ui-react-core');
var ui = require('@aws-amplify/ui');
var react = require('@xstate/react');
require('@aws-amplify/core');
var QRCode = require('qrcode');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var QRCode__default = /*#__PURE__*/_interopDefaultLegacy(QRCode);

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

const { DisplayTextContext, DisplayTextProvider, useDisplayText } = uiReactCore.createContextUtilities({
    errorMessage: '`useDisplayText` must be called inside a `DisplayTextProvider`',
    contextName: 'DisplayText',
});

const defaultComparator = () => false;
/**
 * Does an ordering and shallow comparison of each array value,
 * plus a value equality check for empty objects and arrays.
 */
function areSelectorDepsEqual(currentDeps, nextDeps) {
    if (currentDeps.length !== nextDeps.length) {
        return false;
    }
    return currentDeps.every((currentDep, index) => {
        const nextDep = nextDeps[index];
        if (ui.areEmptyArrays(currentDep, nextDep) ||
            ui.areEmptyObjects(currentDep, nextDep)) {
            return true;
        }
        return currentDep === nextDep;
    });
}
const getComparator = (selector) => (currentFacade, nextFacade) => {
    const currentSelectorDeps = selector(currentFacade);
    const nextSelectorDeps = selector(nextFacade);
    // Shallow compare the array values
    return areSelectorDepsEqual(currentSelectorDeps, nextSelectorDeps);
};

const USE_MACHINE_ERROR = '`useMachine` must be used inside an `Authenticator.Provider`.';
const MachineContext = React__default["default"].createContext(null);
function useMachine(selector) {
    const context = React__default["default"].useContext(MachineContext);
    if (!context) {
        throw new Error(USE_MACHINE_ERROR);
    }
    const { service } = context;
    const { send } = service;
    const xstateSelector = React.useCallback((state) => ui.getNextServiceFacade({ send, state }), [send]);
    const comparator = selector ? getComparator(selector) : defaultComparator;
    const facade = react.useSelector(service, xstateSelector, comparator);
    return facade;
}
function MachineProvider(_a) {
    var { children, initialRoute: initialState } = _a, data = __rest(_a, ["children", "initialRoute"]);
    const service = react.useInterpret(() => ui.createAuthenticatorMachine(Object.assign(Object.assign({}, data), { initialState, useNextWaitConfig: true })));
    const value = React__default["default"].useMemo(() => ({ service }), [service]);
    return (React__default["default"].createElement(MachineContext.Provider, { value: value }, children));
}

const COMPONENT_ROUTE = [
    'confirmResetPassword',
    'confirmSignIn',
    'confirmSignUp',
    'confirmVerifyUser',
    'forceNewPassword',
    'resetPassword',
    'setupTOTP',
    'signIn',
    'signUp',
    'verifyUser',
];

const isComponentRoute = (t) => COMPONENT_ROUTE.some((key) => key === t);
const { ComponentRouteContext, useComponentRoute } = uiReactCore.createContextUtilities({
    contextName: 'ComponentRoute',
    errorMessage: '`useComponentRoute` must be used inside a `ComponentRouteProvider',
});
function isRoute(route, ...currentRoute) {
    return currentRoute.includes(route);
}
/**
 * `ComponentRoute` is a subset of `AuthenticatorComponentRoute` containing
 *  values that directly correlate to the UI. Renders `null` if the current
 * `route` is not a `ComponentRoute`
 */
function ComponentRouteProvider({ children, hideSignUp = false, }) {
    const { route: _route, setRoute: setRouteBase } = useMachine(({ route }) => [
        route,
    ]);
    const route = isComponentRoute(_route) ? _route : undefined;
    const setRoute = React__default["default"].useRef(setRouteBase).current;
    const value = React__default["default"].useMemo(() => ({ hideSignUp, route, setRoute }), [hideSignUp, route, setRoute]);
    return (React__default["default"].createElement(ComponentRouteContext.Provider, { value: value }, route ? children : null));
}

/**
 * Default display text properties
 */
const displayTextEn = {
    providersDividerText: 'Or',
    getChallengeText: (challengeName) => `${challengeName}`,
    getCopyButtonText: (hasCopied) => (hasCopied ? 'Copied!' : 'Copy Code'),
    getDescriptionText: (route) => `${route} Description`,
    getProviderButtonText: (provider) => `Sign In with ${provider}`,
    getResetPasswordLinkText: () => 'Reset Password',
    getSecondaryButtonText: (route) => isRoute(route, 'confirmVerifyUser')
        ? `${route} Secondary Button`
        : isRoute(route, 'verifyUser')
            ? 'Skip'
            : undefined,
    getSignInLinkText: () => 'Back to Sign In',
    getSignUpLinkText: () => 'Create Account',
    getPrimaryButtonText: (route) => ui.isString(route) ? `${ui.capitalize(route)} Submit Button` : undefined,
    getTitleText: (route) => `${ui.capitalize(route)} Title`,
};

const ERROR_MESSAGE = '`useForm` must be used inside `Authenticator.Form`';
function useForm() {
    const { handleSubmit: _handleSubmit } = useMachine();
    const { isValid, onSubmit } = uiReactCore.useForm({
        errorMessage: ERROR_MESSAGE,
        onSubmit: _handleSubmit,
    });
    return { isDisabled: !isValid, onSubmit };
}

function useActions() {
    const { resendConfirmationCode, skipAttributeVerification } = useMachine();
    const { getPrimaryButtonText, getSecondaryButtonText } = useDisplayText();
    const { route } = useComponentRoute();
    const hasSkipAction = isRoute(route, 'confirmVerifyUser', 'verifyUser');
    const hasResendAction = isRoute(route, 'confirmResetPassword', 'confirmSignUp');
    const hasSecondaryButton = hasSkipAction || hasResendAction;
    const secondaryButtonAction = hasResendAction
        ? resendConfirmationCode
        : hasSkipAction
            ? skipAttributeVerification
            : undefined;
    const { isDisabled: isPrimaryButtonDisabled, onSubmit } = useForm();
    return {
        isPrimaryButtonDisabled,
        primaryButtonText: getPrimaryButtonText(route),
        primaryButtonAction: onSubmit,
        secondaryButtonAction,
        secondaryButtonText: hasSecondaryButton
            ? getSecondaryButtonText(route)
            : undefined,
    };
}

const useDescription = () => {
    const { getDescriptionText } = useDisplayText();
    const { route } = useComponentRoute();
    return { descriptionText: getDescriptionText(route) };
};

/**
 * Base copy utility hook, prefer usage of platform specific `useHandleCopy`
 *
 * @param {UseHandleCopyBaseParams} params requires `copyHandler`
 * @returns {UseHandleCopyBase} `handleCopy` callback and copied `value`
 */
function useHandleCopyBase({ copyHandler, reset, target, }) {
    const [value, setValue] = React__default["default"].useState();
    // prevent `useTimeout` from executing `callback` by assigning `undefined`
    uiReactCore.useTimeout({
        callback: value ? () => setValue(undefined) : undefined,
        delay: reset,
    });
    const handleCopy = React__default["default"].useCallback((v) => {
        // prefer `v` passed to callback over `target`
        const copyValue = v !== null && v !== void 0 ? v : target;
        if (ui.isTypedFunction(copyHandler) && ui.isString(copyValue)) {
            copyHandler(copyValue);
            setValue(copyValue);
        }
    }, [copyHandler, target]);
    return { handleCopy, value };
}

/**
 * Basic copy utility hook
 *
 * @param {UseHandleCopyParams} params `useHandleCopy` optional parameters
 * @returns {UseHandleCopy} `handleCopy` callback and copied `value`
 */
const useHandleCopy = (params) => useHandleCopyBase(Object.assign(Object.assign({}, params), { copyHandler: navigator.clipboard.writeText }));

const INITIAL_OUTPUT = {
    dataUrl: undefined,
    hasError: false,
    isLoading: true,
};
/**
 * Generates a QR code data url.
 *
 * @param {UseQRCodeUrlParams} params input and event callbacks
 * @returns {UseQRCodeUrl} data url related values
 */
function useQRCodeDataUrl({ input, onError, onSuccess, }) {
    const [output, setOutput] = React__default["default"].useState(() => INITIAL_OUTPUT);
    React__default["default"].useEffect(() => {
        if (!input || output.dataUrl) {
            return;
        }
        let ignore = false;
        try {
            QRCode__default["default"].toDataURL(input).then((dataUrl) => {
                if (ignore) {
                    return;
                }
                if (ui.isFunction(onSuccess)) {
                    onSuccess(dataUrl);
                }
                setOutput((prev) => (Object.assign(Object.assign({}, prev), { dataUrl, isLoading: false })));
            });
        }
        catch (error) {
            if (ignore) {
                return;
            }
            if (ui.isFunction(onError)) {
                onError(error.message);
            }
            setOutput((prev) => (Object.assign(Object.assign({}, prev), { hasError: true, isLoading: false })));
        }
        return () => {
            ignore = true;
        };
    }, [input, onError, onSuccess, output.dataUrl]);
    return output;
}

const { MfaProvider, useMfa } = uiReactCore.createContextUtilities({
    contextName: 'Mfa',
    errorMessage: '`useMfa` must be called inside a `MfaProvider`',
});

const COPY_RESET = 2000;
function useSetupTotp() {
    const { totpSecretCode, username } = useMachine();
    const { getCopyButtonText } = useDisplayText();
    const { totpIssuer, totpUsername: _totpUsername } = useMfa();
    const { handleCopy, value } = useHandleCopy({
        target: totpSecretCode,
        reset: COPY_RESET,
    });
    const hasCopied = !!value;
    const copyButtonText = getCopyButtonText(hasCopied);
    // prefer `_totpUsername` override from `MfaProvider` props
    const totpUsername = _totpUsername !== null && _totpUsername !== void 0 ? _totpUsername : username;
    // prevent QR code url generation if `false`
    const hasRequiredInputParams = totpIssuer && totpSecretCode && totpUsername;
    const totpCodeUrl = hasRequiredInputParams
        ? ui.getTotpCodeURL(totpIssuer, totpUsername, totpSecretCode)
        : undefined;
    const { dataUrl } = useQRCodeDataUrl({ input: totpCodeUrl });
    return {
        copyButtonText,
        handleCopy,
        totpCodeUrl,
        totpSecretCode,
        qrCodeDataUrl: dataUrl,
    };
}

const useTitle = () => {
    const { getTitleText } = useDisplayText();
    const { route } = useComponentRoute();
    return { titleText: route ? getTitleText(route) : undefined };
};

const { PlatformProvider, usePlatform } = uiReactCore.createContextUtilities({
    contextName: 'Platform',
    errorMessage: '`usePlatform` must be called inside a `PlatformProvider`',
});
const isReactNative = (platform) => platform === 'react-native';

const { PrimitivesProvider, usePrimitives: usePrimitivesBase } = uiReactCore.createContextUtilities({
    contextName: 'Primitives',
    errorMessage: '`usePrimitives` must be called from within a `PrimitivesProvider`',
});
// wrap `usePrimitivesBase` to allow consumers to pass in `Platform` type
// for platform specific Primitive typings
function usePrimitives() {
    return usePrimitivesBase();
}

function createProvider({ platform, primitives: primitivesDefault, type, }) {
    // Composable use case does not allow for Primitive slot overrides
    const ignoreComponentsProp = type === 'composable';
    const Provider = ({ children, components: _components, displayText: _displayText, initialRoute = 'signUp', }) => {
        // do not memo `displayText` or `primitives`, respective providers
        // handle memoization internally
        const displayText = Object.assign(Object.assign({}, _displayText), displayTextEn);
        const primitives = ignoreComponentsProp
            ? primitivesDefault
            : Object.assign(Object.assign({}, primitivesDefault), _components);
        return (React__default["default"].createElement(PlatformProvider, { platform: platform },
            React__default["default"].createElement(DisplayTextProvider, Object.assign({}, displayText),
                React__default["default"].createElement(PrimitivesProvider, Object.assign({}, primitives),
                    React__default["default"].createElement(MachineProvider, { initialRoute: initialRoute },
                        React__default["default"].createElement(ComponentRouteProvider, null,
                            React__default["default"].createElement(MfaProvider, null, children)))))));
    };
    Provider.displayName = 'Authenticator.Provider';
    return Provider;
}

function PrimaryButtonControl(_a) {
    var { children: _children, isDisabled: isDisabledOverride = false } = _a, props = __rest(_a, ["children", "isDisabled"]);
    const { platform } = usePlatform();
    const { Actions: { PrimaryButton }, } = usePrimitives();
    const { isPrimaryButtonDisabled, primaryButtonAction, primaryButtonText } = useActions();
    const children = _children !== null && _children !== void 0 ? _children : primaryButtonText;
    const isDisabled = isDisabledOverride || isPrimaryButtonDisabled;
    const handlePrimaryAction = isReactNative(platform)
        ? {
            onPress: (event) => {
                const { onPress } = props;
                if (ui.isTypedFunction(onPress)) {
                    onPress(event);
                }
                primaryButtonAction(event);
            },
        }
        : undefined;
    if (!children) {
        return null;
    }
    return (React__default["default"].createElement(PrimaryButton, Object.assign({}, props, handlePrimaryAction, { isDisabled: isDisabled, type: "submit" }), children));
}
function SecondaryButtonControl(_a) {
    var { children: _children } = _a, props = __rest(_a, ["children"]);
    const { platform } = usePlatform();
    const { Actions: { SecondaryButton }, } = usePrimitives();
    const { secondaryButtonAction = ui.noop, secondaryButtonText } = useActions();
    const children = _children !== null && _children !== void 0 ? _children : secondaryButtonText;
    const handleSecondaryAction = isReactNative(platform)
        ? {
            onPress: (event) => {
                const { onPress = ui.noop } = props;
                onPress(event);
                // `secondaryButtonAction` does not receive params
                secondaryButtonAction();
            },
        }
        : {
            onClick: (event) => {
                const { onClick = ui.noop } = props;
                onClick(event);
                // `secondaryButtonAction` does not receive params
                secondaryButtonAction();
            },
        };
    if (!children) {
        return null;
    }
    return (React__default["default"].createElement(SecondaryButton, Object.assign({}, props, handleSecondaryAction), children));
}
function ButtonGroupControl(props) {
    const { Actions: { ButtonGroup }, } = usePrimitives();
    return React__default["default"].createElement(ButtonGroup, Object.assign({}, props));
}
function ActionsControlBase() {
    return (React__default["default"].createElement(ButtonGroupControl, null,
        React__default["default"].createElement(PrimaryButtonControl, null),
        React__default["default"].createElement(SecondaryButtonControl, null)));
}
const ActionsControl = Object.assign(ActionsControlBase, {
    ButtonGroup: ButtonGroupControl,
    PrimaryButton: PrimaryButtonControl,
    SecondaryButton: SecondaryButtonControl,
});

function DescriptionControl(_a) {
    var { children } = _a, props = __rest(_a, ["children"]);
    const { Description } = usePrimitives();
    const { descriptionText } = useDescription();
    return React__default["default"].createElement(Description, Object.assign({}, props), children !== null && children !== void 0 ? children : descriptionText);
}

function FormControlBase(_a) {
    var { onSubmit: _onSubmit } = _a, props = __rest(_a, ["onSubmit"]);
    const { Form } = usePrimitives();
    const { onSubmit } = useForm();
    const handleSubmit = React__default["default"].useCallback((e) => {
        if (ui.isTypedFunction(_onSubmit)) {
            _onSubmit(e);
        }
        onSubmit(e);
    }, [_onSubmit, onSubmit]);
    return React__default["default"].createElement(Form, Object.assign({}, props, { onSubmit: handleSubmit }));
}
// export wrapped `FormControlBase` in `FormProvider`
function FormControl(_a) {
    var { mode } = _a, rest = __rest(_a, ["mode"]);
    return (React__default["default"].createElement(uiReactCore.FormProvider, { mode: mode },
        React__default["default"].createElement(FormControlBase, Object.assign({}, rest))));
}

function ContainerControl(_a) {
    var { children } = _a, props = __rest(_a, ["children"]);
    const { SetupTotp: { Container }, } = usePrimitives();
    const { totpCodeUrl } = useSetupTotp();
    if (!children || !totpCodeUrl) {
        return null;
    }
    return React__default["default"].createElement(Container, Object.assign({}, props), children);
}
function CopyButtonControl(_a) {
    var { children: _children } = _a, props = __rest(_a, ["children"]);
    const { platform } = usePlatform();
    const { SetupTotp: { CopyButton }, } = usePrimitives();
    const { copyButtonText, handleCopy } = useSetupTotp();
    const handlePress = isReactNative(platform)
        ? {
            onPress: (event) => {
                const { onPress = ui.noop } = props;
                onPress(event);
                // `handleCopy` does not receive params
                handleCopy();
            },
        }
        : {
            onClick: (event) => {
                const { onClick = ui.noop } = props;
                onClick(event);
                // `handleCopy` does not receive params
                handleCopy();
            },
        };
    const children = _children !== null && _children !== void 0 ? _children : copyButtonText;
    if (!children) {
        return null;
    }
    return React__default["default"].createElement(CopyButton, Object.assign({}, props, handlePress));
}
function ImageControl(_a) {
    var _b, _c;
    var { children } = _a, props = __rest(_a, ["children"]);
    const { platform } = usePlatform();
    const { SetupTotp: { Image }, } = usePrimitives();
    const { qrCodeDataUrl } = useSetupTotp();
    const imageSource = isReactNative(platform)
        ? { source: (_b = props.source) !== null && _b !== void 0 ? _b : qrCodeDataUrl }
        : { src: (_c = props.src) !== null && _c !== void 0 ? _c : qrCodeDataUrl };
    if (!children || !imageSource) {
        return null;
    }
    return (React__default["default"].createElement(Image, Object.assign({}, props, imageSource), children));
}
function LoaderControl(props) {
    const { SetupTotp: { Loader }, } = usePrimitives();
    const { qrCodeDataUrl, totpCodeUrl } = useSetupTotp();
    if (!totpCodeUrl || qrCodeDataUrl) {
        return null;
    }
    return React__default["default"].createElement(Loader, Object.assign({}, props));
}
function InstructionTextControlOne(_a) {
    var { children } = _a, rest = __rest(_a, ["children"]);
    const { SetupTotp: { InstructionTextOne }, } = usePrimitives();
    if (!children) {
        return null;
    }
    return React__default["default"].createElement(InstructionTextOne, Object.assign({}, rest), children);
}
function InstructionTextControlTwo(_a) {
    var { children } = _a, rest = __rest(_a, ["children"]);
    const { SetupTotp: { InstructionTextTwo }, } = usePrimitives();
    if (!children) {
        return null;
    }
    return React__default["default"].createElement(InstructionTextTwo, Object.assign({}, rest), children);
}
function InstructionTextControlThree(_a) {
    var { children } = _a, rest = __rest(_a, ["children"]);
    const { SetupTotp: { InstructionTextThree }, } = usePrimitives();
    if (!children) {
        return null;
    }
    return React__default["default"].createElement(InstructionTextThree, Object.assign({}, rest), children);
}
function SetupTotpControlBase() {
    return (React__default["default"].createElement(ContainerControl, null,
        React__default["default"].createElement(LoaderControl, null),
        React__default["default"].createElement(ImageControl, null),
        React__default["default"].createElement(CopyButtonControl, null)));
}
const SetupTotpControl = Object.assign(SetupTotpControlBase, {
    Container: ContainerControl,
    CopyButton: CopyButtonControl,
    Image: ImageControl,
    InstructionTextOne: InstructionTextControlOne,
    InstructionTextTwo: InstructionTextControlTwo,
    InstructionTextThree: InstructionTextControlThree,
    Loader: LoaderControl,
});

function TitleControl(_a) {
    var { children } = _a, props = __rest(_a, ["children"]);
    const { Title } = usePrimitives();
    const { titleText } = useTitle();
    return React__default["default"].createElement(Title, Object.assign({}, props), children !== null && children !== void 0 ? children : titleText);
}

const Controls = {
    Actions: ActionsControl,
    Description: DescriptionControl,
    Form: FormControl,
    Title: TitleControl,
    SetupTotp: SetupTotpControl,
};

const createComposable = (params) => {
    const Provider = createProvider(Object.assign(Object.assign({}, params), { type: 'composable' }));
    const composableComponents = Object.assign(Object.assign({}, Controls), { Provider });
    // remove once composable components are fully added
    // @ts-expect-error
    return composableComponents;
};

function isComposable(t) {
    return t === 'composable';
}

const createDefault = ({ platform, primitives, }) => {
    const Provider = createProvider({ platform, primitives, type: 'default' });
    return function Authenticator(_a) {
        var { children } = _a, props = __rest(_a, ["children"]);
        return (React__default["default"].createElement(Provider, Object.assign({}, props),
            React__default["default"].createElement(Controls.Form, null,
                React__default["default"].createElement(Controls.Title, null),
                React__default["default"].createElement(Controls.Description, null),
                React__default["default"].createElement(Controls.SetupTotp, null),
                React__default["default"].createElement(Controls.Actions, null),
                children)));
    };
};

/**
 * @param platform Authenticator Platform
 * @param callback Base create Authenticator callback expecting `platform`
 * @returns `callback` with `platform` injected
 */
const withPlatform = (platform, callback) => {
    return (rest) => callback(Object.assign(Object.assign({}, rest), { platform }));
};

const PLATFORM = 'react';
function createAuthenticator(params) {
    const handleCreate = withPlatform(PLATFORM, isComposable(params.type) ? createComposable : createDefault);
    return handleCreate(params);
}

exports.createAuthenticator = createAuthenticator;
exports.useHandleCopy = useHandleCopy;
