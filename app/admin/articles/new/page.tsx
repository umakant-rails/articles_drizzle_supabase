'use client';
import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { ReactTransliterate } from "react-transliterate";
import { Editor } from 'primereact/editor';
import { useAppDispatch } from '@/store';

const articleObj = {article_type_id: '', raag_id: '', scripture_id: '', index: '', context_id: 1, 
	author_id: 9, hindi_title: '', english_title: '', content: '', interpretation: '', tags: []
};

const AddArticle = () => {
	// const dispatch = useAppDispatch();

	const [contentText, setContentText] = useState<string>("");
	const [formValues, setFormValues] = useState(articleObj);
	const [newTag, setNewTag] = useState('');
	const [selectedTags, setSelectedTags] = useState([]);
	const [tagFormDisplay,setTagFormDisplay] = useState(false);
	const [searchArticleList, setSearchArticleList] = useState([]);
	const [isOpen, setIsOpen] = useState(false);


	// useEffect( () => { dispatch(newArticle());}, [dispatch]);

	const setEditorValues = (name: string, value: string) => {
		setFormValues(formValues => ({ ...formValues, [name]: value }));
	}

	const onInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { name, value } = event.target;
		setFormValues({ ...formValues, [name]: value });
	}

	const resetForm = () => { setSelectedTags([]);setFormValues(articleObj); }
	const onCancel = (event: React.MouseEvent<HTMLButtonElement>) => { event.preventDefault(); resetForm();}

	const onArticleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		let form = {}
		// for (const [key, value] of Object.entries(formValues)) { 
		// 	form[key] = (typeof(value) == "string") ? value.trim() : value;
		// }
		// form['tags'] = selectedTags.map(tag => tag.value);
	}


	return (
		<div className='grid md:grid-cols-12'>
			<div className='md:col-start-2 md:col-span-10 shadow-2xl bg-white border border-gray-200 p-6'>
				<div className={`px-2 py-2 text-2xl text-blue-800 border-b-2 border-blue-500 shadow-lg 
					mb-5 font-bold bg-blue-50`}>
					रचना फॉर्म
				</div>
				<form className="py-5 px-5" onSubmit={onArticleSubmit}>
					{/* <div className='grid md:grid-cols-12 gap-6 mb-3'>
						<div className="col-span-6">
							<label className="block mb-2 font-medium text-gray-900 dark:text-white">
								रचना का प्रकार <span title="required" className="text-red-600 font-bold">*</span>
							</label>
							<select id="article_type_id" name="article_type_id" 
								value={formValues.article_type_id || ''}
								onChange={onInputChange}
								className={`shadow-sm bg-gray-50 border border-gray-300 text-gray-900 
									rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2 
									dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
									dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 
									dark:shadow-sm-light`} required>
									<option value="">रचना प्रकार चुने</option>
									{
										article_types && article_types.map( (aType, index) => 
											<option key={index} value={aType.id}>{aType.name}</option>
										)
									}
							</select>
						</div>
					</div> */}
					<div className='grid md:grid-cols-12 gap-6 mb-3'>
						<div className="col-span-6">
							<label className="block mb-2 font-medium text-gray-900 dark:text-white">
								Author <span title="required" className="text-red-600 font-bold">*</span>
							</label>
							{/* <select id="article_type_id" name="article_type_id" 
								value={formValues.article_type_id || ''}
								onChange={onInputChange}
								className={`shadow-sm bg-gray-50 border border-gray-300 text-gray-900 
									rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2 
									dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
									dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 
									dark:shadow-sm-light`} required>
									<option value="">रचना प्रकार चुने</option>
									{
										article_types && article_types.map( (aType, index) => 
											<option key={index} value={aType.id}>{aType.name}</option>
										)
									}
							</select> */}
							<input type="text" className={`shadow-sm bg-gray-50 border border-gray-300 text-gray-900 
								rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2`} ></input>
						</div>
					</div>
					<div className='grid md:grid-cols-12 gap-6 mb-3'>
						<div className="col-span-6">
							<label className="block mb-2 font-medium text-gray-900 dark:text-white">
								Tag <span title="required" className="text-red-600 font-bold">*</span>
							</label>
							<input type="text" className={`shadow-sm bg-gray-50 border border-gray-300 text-gray-900 
								rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2`} ></input>
						</div>
					</div>
					<div className='grid md:grid-cols-12 gap-6 mb-3'>
						<div className="col-span-6 relative">
							<label className="block mb-2 font-medium text-gray-900 dark:text-white">
								Title <span title="required" className="text-red-600 font-bold">*</span>
							</label>
							<input type="text" id="english_title" name="english_title"
								value={formValues.english_title}
								onChange={onInputChange}
								className={`shadow-sm bg-gray-50 border border-gray-300 text-gray-900 
								rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2`} required />
						</div>
					</div>
					<div className='grid md:grid-cols-12 gap-6 mb-3'>
						<div className="col-span-6 relative">
							<label className="block mb-2 font-medium text-gray-900 dark:text-white">
								Content <span title="required" className="text-red-600 font-bold">*</span>
							</label>
							<textarea className={`shadow-sm bg-gray-50 border border-gray-300 text-gray-900 
								rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2`} rows={5} />
						</div>
					</div>
					<div className='mb-3'>
						<button type="submit" 
							className="mr-5 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
							रचना जोड़े
						</button>
						<button type="button" onClick={onCancel}
							className="text-white bg-gray-500 hover:bg-gray-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
							रद्द करें
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default AddArticle;