import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';

export function insertDeleteInfo(
    toastrService: ToastrService,
    translateService: TranslateService
): void {
    toastrService.warning(
        translateService.instant('TOASTR_MESSAGE.DBLCLICK_INFO')
    );
}
