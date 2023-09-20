import { ActionsControl } from './ActionsControl/ActionsControl.mjs';
import { DescriptionControl } from './DescriptionControl/DescriptionControl.mjs';
import { FormControl } from './FormControl/FormControl.mjs';
import { SetupTotpControl } from './SetupTotpControl/SetupTotpControl.mjs';
import { TitleControl } from './TitleControl/TitleControl.mjs';

const Controls = {
    Actions: ActionsControl,
    Description: DescriptionControl,
    Form: FormControl,
    Title: TitleControl,
    SetupTotp: SetupTotpControl,
};

export { Controls };
