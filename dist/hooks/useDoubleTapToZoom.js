/**
 * Copyright (c) JOB TODAY S.A. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import { useEffect, useState } from "react";
import { Animated } from "react-native";
const DOUBLE_TAP_DELAY = 300;
let lastTapTS = null;
/**
 * This is iOS only.
 * Same functionality for Android implemented inside useZoomPanResponder hook.
 */
function useDoubleTapToZoom(initialScale, targetScale, ref, onZoom) {
    const [scale, setScale] = useState(initialScale);
    const scaleValue = new Animated.Value(initialScale);
    useEffect(() => {
        scaleValue.addListener(({ value }) => {
            var _a, _b;
            (_b = (_a = ref) === null || _a === void 0 ? void 0 : _a.current) === null || _b === void 0 ? void 0 : _b.setNativeProps({ zoomScale: value });
        });
        return () => {
            scaleValue.removeAllListeners();
        };
    });
    const handleDoubleTap = () => {
        const nowTS = new Date().getTime();
        if (lastTapTS && nowTS - lastTapTS < DOUBLE_TAP_DELAY) {
            lastTapTS = null;
            const nextScale = !scale || scale === initialScale ? targetScale : initialScale;
            const isScaled = nextScale !== initialScale;
            onZoom(isScaled);
            Animated.timing(scaleValue, {
                toValue: nextScale,
                duration: 300
            }).start(() => setScale(nextScale));
        }
        else {
            lastTapTS = nowTS;
        }
    };
    return [scale, handleDoubleTap];
}
export default useDoubleTapToZoom;
