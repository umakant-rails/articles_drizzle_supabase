'use client';
import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { ReactTransliterate } from "react-transliterate";
import { Editor } from 'primereact/editor';
import { useAppDispatch, useAppSelector } from '@/store';
import { NewArticle } from '@/app/utils/interfaces';
import { createArticle, getnewArticleData } from '@/app/slices/users/articleSlice';
import { useRouter } from 'next/navigation';
import { useCurrentUser } from '@/app/hooks/useCurrentUser';


const articleObj: NewArticle = { 
	authorId: 0,
	userId: 0,
	tagId: 0,
	title: "",
	content: "",
};

const AddArticle = () => {
	const dispatch = useAppDispatch();
	const router = useRouter();
	const user = useCurrentUser();
	const [formValues, setFormValues] = useState<NewArticle>(articleObj);
	const {tags, authors} = useAppSelector(state => state.article)

	useEffect(() => {dispatch(getnewArticleData({})); }, []);

	const onInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
		const { name, value } = event.target;
		if(name === "tagId" || name === "authorId"){
			setFormValues({ ...formValues, [name]: Number(value), userId: user?.id }); 
		} else { setFormValues({ ...formValues, [name]: value, userId: user?.id }); }
	}

	const resetForm = () => {setFormValues(articleObj); }
	const onCancel = (event: React.MouseEvent<HTMLButtonElement>) => { event.preventDefault(); resetForm();}

	const onArticleSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();

  	dispatch(createArticle(formValues)).then(res => {
			router.push('/admin/articles');
		})
	}

	if(!authors){return <div>Data is Loading ....</div>}
	return (
		<div className='grid md:grid-cols-12'>
			<div className='md:col-start-2 md:col-span-10 shadow-2xl bg-white border border-gray-200 p-6'>
				<div className={`px-2 py-2 text-2xl text-blue-800 border-b-2 border-blue-500 shadow-lg 
					mb-5 font-bold bg-blue-50`}>
					New Article Form
				</div>
				<form className="py-5 px-5">
					<div className='grid md:grid-cols-12 gap-6 mb-3'>
						<div className="col-span-6">
							<label className="block mb-2 font-medium text-gray-900 dark:text-white">
								Author <span title="required" className="text-red-600 font-bold">*</span>
							</label>
							<select
								name="authorId"
								value={formValues.authorId || ''}
								onChange={onInputChange}
								className={`shadow-sm bg-gray-50 border border-gray-300 text-gray-900 
								rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2 py-2.5`}
							>
								<option value="">Select Author</option>
								{authors.map((a) => (
									<option key={a.id} value={a.id}>{a.name}</option>
								))}
							</select>
						</div>
					</div>
					<div className='grid md:grid-cols-12 gap-6 mb-3'>
						<div className="col-span-6">
							<label className="block mb-2 font-medium text-gray-900 dark:text-white">
								Tag <span title="required" className="text-red-600 font-bold">*</span>
							</label>
							<select
								name="tagId"
								value={formValues.tagId || ''}
								onChange={onInputChange}
								className={`shadow-sm bg-gray-50 border border-gray-300 text-gray-900 
								rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2 py-2.5`}
							>
								<option value="">Select Author</option>
								{tags.map((a) => (
									<option key={a.id} value={a.id}>{a.name}</option>
								))}
							</select>
						</div>
					</div>
					<div className='grid md:grid-cols-12 gap-6 mb-3'>
						<div className="col-span-6 relative">
							<label className="block mb-2 font-medium text-gray-900 dark:text-white">
								Title <span title="required" className="text-red-600 font-bold">*</span>
							</label>
							<input type="text" id="title" name="title"
								value={formValues.title || ''}
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
							<textarea name="content" 
								className={`shadow-sm bg-gray-50 border border-gray-300 text-gray-900 
								rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2`} 
								onChange={onInputChange} 
								value={formValues.content || ''} 
								rows={5}></textarea>
						</div>
					</div>
					<div className='mb-3'>
						<button type="button" onClick={onArticleSubmit} 
							className="mr-5 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
							Add Article
						</button>
						<button type="button" onClick={onCancel}
							className="text-white bg-gray-500 hover:bg-gray-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
							Reset
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default AddArticle;
