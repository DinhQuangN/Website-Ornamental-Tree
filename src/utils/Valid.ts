import { ICate } from '../admin/components/Category/CreateUpdateCategory';
import { ICheckOut, IProduct, IRegisterUser } from './TypeScript';

export const checkCategory = (data: ICate) => {
	if (data.id.length === 0) {
		return 'Vui lòng nhập mã loại sản phẩm';
	} else if (data.id.length > 50) {
		return 'Vui lòng nhập < 50 kí tự';
	} else if (checkSpecialCharacters(data.id)) {
		return 'Vui lòng không nhập kí tự đặc biệt trong trường mã loại sản phẩm';
	} else if (data.id.match(/^\s+$/) !== null) {
		return 'Vui lòng nhập mã loại sản phẩm';
	} else if (data.name.length === 0 && data.role === 0) {
		return 'Vui lòng nhập thông tin cho tên loại sản phẩm và chọn trường loại sản phẩm';
	} else if (data.name.length > 0 && data.role === 0) {
		return 'Vui lòng chọn trường loại sản phẩm';
	} else if (data.name.length === 0 && data.role !== 0) {
		return 'Vui lòng nhập thông tin trong trường tên loại sản phẩm ';
	} else if (data.name.match(/^\s+$/) !== null && data.role !== 0) {
		return 'Vui lòng nhập thông tin trong trường tên loại sản phẩm ';
	} else if (checkSpecialCharacters(data.name)) {
		return 'Vui lòng không nhập kí tự đặc biệt trong trường loại sản phẩm';
	} else if (data.name.length > 100 && data.role !== 0) {
		return 'Vui lòng không nhập quá 100 kí tự';
	}
};
export const checkProduct = (data: IProduct) => {
	if (data.title.length === 0) {
		return 'Bạn vui lòng nhập tên sản phẩm';
	} else if (data.title.match(/^\s*$/g) !== null) {
		return 'Bạn vui lòng nhập tên sản phẩm';
	} else if (data.title.length > 100) {
		return 'Bạn vui lòng nhập tên sản phẩm < 100 kí tự';
	} else if (checkSpecialCharacters(data.title) || data.title.match(/\d+S/gi)) {
		return 'Vui lòng không nhập kí tự đặc biệt hoặc kí tự số';
	} else if (data.describe.length === 0) {
		return 'Bạn vui lòng nhập mô tả sản phẩm';
	} else if (data.describe.slice(3, 4).match(/^\s+$/) !== null) {
		return 'Bạn vui lòng nhập mô tả sản phẩm';
	} else if (data.describe.length > 255) {
		return 'Bạn vui lòng nhập mô tả sản phẩm < 255 kí tự';
	} else if (checkSpecialCharacters(data.describe.slice(3, 4))) {
		return 'Bạn vui lòng nhập mô tả sản phẩm không chứa kí tự đặc biệt ';
	} else if (data.price.length === 0) {
		return 'Bạn vui lòng nhập giá sản phẩm';
	} else if (data.price.match(/^\s+$/) !== null) {
		return 'Bạn vui lòng nhập giá sản phẩm';
	} else if (data.price.length > 15) {
		return 'Bạn vui lòng không nhập giá sản phẩm > 15 kí tự ';
	} else if (
		checkSpecialCharacters(data.price) ||
		data.price.match(/[a-z]/gi)
	) {
		return 'Bạn vui lòng nhập giá sản phẩm không chứa kí tự đặc biệt hoặc kí tự chữ ';
	} else if (data.imageArray.length === 0) {
		return 'Bạn chưa chọn ảnh nào cho sản phẩm';
	} else if (data.imageArray[0].image === undefined) {
		return 'Bạn vui lòng chọn ảnh có đuôi jpg, jpeg, png';
	} else if (data.detail.length === 0) {
		return 'Bạn vui lòng nhập chi tiết sản phẩm';
	} else if (data.detail.slice(3, 4).match(/^\s+$/) !== null) {
		return 'Bạn vui lòng nhập chi tiết sản phẩm';
	} else if (checkSpecialCharacters(data.detail.slice(3, 4))) {
		return 'Bạn vui lòng nhập chi tiết sản phẩm không chứa kí tự đặc biệt';
	} else if (data.detail.length > 5000) {
		return 'Bạn vui lòng nhập chi tiết sản phẩm < 5000 kí tự';
	} else if (!data.category) {
		return 'Bạn vui lòng phân biệt chọn loại sản phẩm';
	}
};

export const checkOrder = (data: ICheckOut) => {
	if (data.name.length === 0) {
		return 'Bạn vui lòng nhập họ và tên';
	} else if (data.name.length > 50) {
		return 'Bạn vui lòng nhập họ và tên < 50 kí tự';
	} else if (data.name.match(/\d+S/gi) || checkSpecialCharacters(data.name)) {
		return 'Bạn vui lòng không nhập kí tự đặc biệt hoặc kí tự số trong trường họ và tên';
	} else if (data.email.length === 0) {
		return 'Bạn vui lòng nhập số điện thoại';
	} else if (data.email.length > 12) {
		return 'Bạn vui lòng nhập số điện thoại < 12 kí tự';
	} else if (
		data.email.match(/[a-z]/gi) ||
		checkSpecialCharacters(data.email)
	) {
		return 'Bạn vui lòng không nhập kí tự chữ hoặc kí tự đặc biệt trong trường số điện thoại';
	} else if (data.address.length === 0) {
		return 'Bạn vui lòng nhập địa chỉ';
	} else if (data.address.length > 256) {
		return 'Bạn vui lòng nhập địa chỉ < 256 kí tự';
	} else if (checkSpecialCharacters(data.address)) {
		return 'Bạn vui lòng không nhập kí tự đặc biệt trong trường địa chỉ';
	} else if (data.describe.length === 0) {
		return 'Bạn vui lòng nhập mô tả';
	} else if (data.describe.length > 512) {
		return 'Bạn vui lòng nhập mô tả < 512 kí tự trong trường mô tả';
	} else if (checkSpecialCharacters(data.describe)) {
		return 'Bạn vui lòng không nhập kí tự đặc biệt trong trường mô tả';
	}
};
const checkSpecialCharacters = (data: string) => {
	const format = /^[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/;
	if (data.match(format)) {
		return true;
	} else {
		return false;
	}
};

export const checkInput = (data: IRegisterUser) => {
	if (data.firstName.length < 6 || data.lastName.length < 2) {
		return 'Vui lòng nhập tối thiểu 6 kí tự ';
	} else if (data.password.length < 6) {
		return 'Vui lòng nhập mật khẩu tối thiểu 6 kí tự ';
	} else if (data.password !== data.confirmPassword) {
		return 'Mật khẩu không đúng';
	}
};
export function validPhone(phone: string) {
	const re = /^[+]/g;
	return re.test(phone);
}

export function validateEmail(email: string) {
	const re =
		/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(String(email).toLowerCase());
}

export const vnd = (data: number | string | undefined) => {
	return String(data).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export const removeVietnameseTones = (str: string) => {
	str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a');
	str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e');
	str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i');
	str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o');
	str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u');
	str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y');
	str = str.replace(/đ/g, 'd');
	str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, 'A');
	str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, 'E');
	str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, 'I');
	str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, 'O');
	str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, 'U');
	str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, 'Y');
	str = str.replace(/Đ/g, 'D');
	str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, '');
	str = str.replace(/\u02C6|\u0306|\u031B/g, '');
	str = str.replace(/\s/g, '-');
	str = str.replace(/ + /g, ' ');
	str = str.trim();

	str = str.replace(
		/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|{|}|\||\\/g,
		''
	);
	return str;
};
export const removeVietnamese = (str: string) => {
	str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a');
	str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e');
	str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i');
	str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o');
	str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u');
	str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y');
	str = str.replace(/đ/g, 'd');
	str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, 'A');
	str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, 'E');
	str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, 'I');
	str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, 'O');
	str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, 'U');
	str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, 'Y');
	str = str.replace(/Đ/g, 'D');
	// Some system encode vietnamese combining accent as individual utf-8 characters
	// Một vài bộ encode coi các dấu mũ, dấu chữ như một kí tự riêng biệt nên thêm hai dòng này
	str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ''); // ̀ ́ ̃ ̉ ̣  huyền, sắc, ngã, hỏi, nặng
	str = str.replace(/\u02C6|\u0306|\u031B/g, ''); // ˆ ̆ ̛  Â, Ê, Ă, Ơ, Ư
	// Remove extra spaces
	// Bỏ các khoảng trắng liền nhau
	// str = str.replace(/ - /g, ' ');
	str = str.replace(/ + /g, ' ');
	str = str.trim();

	// Remove punctuations
	// Bỏ dấu câu, kí tự đặc biệt
	str = str.replace(
		/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g,
		''
	);
	return str;
};
