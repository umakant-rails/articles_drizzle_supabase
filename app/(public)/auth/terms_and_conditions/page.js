const TermAndConditions = () => {
  return (
    <div className='shadow-2xl bg-white border border-gray-200 px-10 pt-5'>
      <div className='px-2 py-2 text-2xl text-blue-800 border-b border-b-blue-400 shadow-xl mb-5 font-bold'>
        Terms and Conditions
      </div>
      <div className='mt-4 text-sm text-gray-700'>
        <div className="grid grid-cols-4 font-lighttt mb-10">
          <div className="col-span-3">
            <div className='mb-2'>
              Brijras.com is welcoming to every one who have interest in Brijras Content.
              Brijras.com are platforms where are collection of relegious scripture's poetry 
              like pad, savaiya, doha, kavitt, bhajan, rasiya, lokgeet etc.
            </div>
            <div className='mb-2'>
              There are certain following terms and conditions:
            </div>
            <div className="ms-4">
              <ul className="list-disc">
                <li className='mb-2'>
                  Brijras have strong beleif in following terms and conditions, that's why these 
                  are applicable at you and your content whatever is publish or post at this platforms.
                </li>
                <li className='mb-2'>
                  Brijras Admin have right to hide, disable delete to your content like article, story strota and your comment, 
                  if Admin find that your content are objectionable and contents are not as per our standards.
                </li>
                <li className='mb-2'>
                  No one user have right to object against the Admin regarding there contents and account, if Admin have deleted account and contents.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermAndConditions;