
const shouldApplySafeAreaTopPadding = () => {
    if (typeof navigator === 'undefined') return true;
    const ua = navigator.userAgent;

    // match old Android devices
    if (!/(vivo|oppo|xiaomi|redmi|huawei|honor)/i.test(ua)) return true;

    // parse Android version
    const match = ua.match(/Android\s+([\d\.]+)/i);
    if (match) {
        const version = parseFloat(match[1]);
        // Android version < 10 has bug that return env value even if padding is added
        if (version <= 10) return false;
    }
    return true;
};
const _safearea = {
    supported: shouldApplySafeAreaTopPadding(),
}

export const isSafeAreaSupported = () => _safearea.supported;
// for customize development, disable safearea for some mobile devices
export const setSafeAreaSupported = (supported: boolean) => {
    _safearea.supported = supported;
}