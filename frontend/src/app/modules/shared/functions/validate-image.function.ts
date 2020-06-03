import { ToastrService } from 'ngx-toastr';

export function validateImage(fileToUpload: File, toastr: ToastrService) {
	if (fileToUpload) {
		const extension = fileToUpload.name.split('.').pop();
		const fileSize = fileToUpload.size / 1024 / 1024;

		if (extension && !isFileAnImage(fileToUpload)) {
			return toastr.warning(`Niewspierany format pliku.`);
		} else if (fileSize > 4) {
			return toastr.warning(`Plik ${fileToUpload.name} jest za duży. Maksymalna wielkość pliku to 4MB.`);
		} else if (fileSize === 0) {
			return toastr.warning(`Plik ${fileToUpload.name}jest pusty lub uszkodzony.`);
		}
	}
}

function isFileAnImage(file: File): boolean {
	const acceptedImageTypes = ['image/gif', 'image/jpeg', 'image/png', 'image/jpg'];
	return file && acceptedImageTypes.includes(file['type']);
}
