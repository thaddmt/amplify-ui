export interface UseHandleCopyBaseParams {
    /**
     * @param value platform clipboard set handler
     */
    copyHandler: ((value: string) => Promise<void>) | ((value: string) => void);
    /**
     * length in milliseconds to delay reset
     */
    reset?: number;
    /**
     * `target` to set as clipboard value
     */
    target?: string;
}
export interface UseHandleCopyParams extends Omit<UseHandleCopyBaseParams, 'copyHandler'> {
}
export interface UseHandleCopyBase {
    /**
     * @param value callback `value` to set as clipboard value, supercedes `target`
     */
    handleCopy: (value?: string) => void;
    /**
     * copied value
     */
    value: string | undefined;
}
export interface UseHandleCopy extends UseHandleCopyBase {
}
