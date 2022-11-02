import React, { useCallback, useEffect, useRef } from 'react';
import Quill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { toast } from 'react-toastify';
import { checkImage, imageUpload } from '../../../utils/ImageUpload';

let container = [
	[{ font: [] }],
	[{ header: [1, 2, 3, 4, 5, 6, false] }],
	[{ size: ['small', false, 'large', 'huge'] }], // custom dropdown

	['bold', 'italic', 'underline', 'strike'], // toggled buttons
	['blockquote', 'code-block'],
	[{ color: [] }, { background: [] }], // dropdown with defaults from theme
	[{ script: 'sub' }, { script: 'super' }], // superscript/subscript

	[{ list: 'ordered' }, { list: 'bullet' }],
	[{ indent: '-1' }, { indent: '+1' }], // outdent/indent
	[{ direction: 'rtl' }], // text direction
	[{ align: [] }],

	['clean', 'link', 'image', 'video']
];
interface IProps {
	setBody: (value: string) => void;
	body: string;
}
const ReactQuill: React.FC<IProps> = ({ body, setBody }) => {
	const modules = {
		toolbar: { container }
	};
	const quillRef = useRef<Quill>(null);
	const handleChangeImage = useCallback(() => {
		const input = document.createElement('input');
		input.type = 'file';
		input.accept = 'image/*';
		input.click();
		input.onchange = async () => {
			const files = input.files;
			if (!files) return toast.error('Tập tin không tồn tại');
			const file = files[0];
			const check = checkImage(file);
			if (check) return toast.error(check);
			const photo = await imageUpload(file);
			const quill = quillRef.current;
			const range = quill?.getEditor().getSelection()?.index;
			if (range !== undefined) {
				quill?.getEditor().insertEmbed(range, 'image', `${photo.url}`);
			}
		};
	}, []);
	useEffect(() => {
		const quill = quillRef.current;
		if (!quill) return;
		let toolbar = quill.getEditor().getModule('toolbar');
		toolbar.addHandler('image', handleChangeImage);
	}, [handleChangeImage]);
	return (
		<div>
			<Quill
				theme="snow"
				modules={modules}
				placeholder="Write somethings"
				value={body}
				onChange={e => setBody(e)}
				ref={quillRef}
				style={{ backgroundColor: '#fff' }}
			/>
		</div>
	);
};

export default ReactQuill;
