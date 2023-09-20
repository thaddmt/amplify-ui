/**
 * @param platform Authenticator Platform
 * @param callback Base create Authenticator callback expecting `platform`
 * @returns `callback` with `platform` injected
 */
const withPlatform = (platform, callback) => {
    return (rest) => callback(Object.assign(Object.assign({}, rest), { platform }));
};

export { withPlatform };
