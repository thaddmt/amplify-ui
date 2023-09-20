import { Platform } from '../Platform';
import { SubmitHandler } from '../Primitives';
export interface UseForm<T> extends Required<SubmitHandler<T>> {
    isDisabled: boolean;
}
export declare function useForm<T extends Platform>(): UseForm<T>;
