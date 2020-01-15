/**
 * Copyright (c) JOB TODAY S.A. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
/**
 * This is iOS only.
 * Same functionality for Android implemented inside useZoomPanResponder hook.
 */
declare function useDoubleTapToZoom(initialScale: number, targetScale: number, ref: any, onZoom: (isScaled: boolean) => void): readonly [number, () => void];
export default useDoubleTapToZoom;
