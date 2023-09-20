import { Platform } from '../Platform';
import { UseForm } from './useForm';
export interface UseActions<T extends Platform> {
    isPrimaryButtonDisabled: boolean;
    primaryButtonAction: UseForm<T>['onSubmit'];
    primaryButtonText: string | undefined;
    secondaryButtonAction: (() => void) | undefined;
    secondaryButtonText: string | undefined;
}
export declare function useActions<T extends Platform>(): UseActions<T>;
