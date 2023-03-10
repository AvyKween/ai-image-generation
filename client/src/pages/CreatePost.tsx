import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { preview } from '../assets';
import { getRandomName, getRandomPrompt } from '../utils';
import { FormField, Loader } from '../components';
import { initialPostState } from '../constants';
import { postsApi } from '../api';
import { CreateImage } from '../interfaces';

export const CreatePost = () => {
  
  const navigate = useNavigate();
  const [form, setForm] = useState(initialPostState);
  const [generatingImg, setGeneratingImg] = useState(false);
  const [loading, setLoading] = useState(false);

  const randomName = useMemo(() => getRandomName(''), [])
  const randomPrompt = useMemo(() => getRandomPrompt(''), [])

  const handleSubmit: React.FormEventHandler = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if ( form.prompt && form.photo ) {
      setLoading(true);
      
      try {
        await postsApi.post('/api/v1/post', form, {
          headers: {
            "Content-Type": 'application/json', 
          }
        })

        navigate('/');
        
      } catch (error) {
        console.log(error);

      } finally {
        setLoading(false);
      }

    } else {
      alert('Please enter a prompt and generate and image');
      console.log('Please enter a prompt and generate and image');
    }
  }

  const handleChange: React.FormEventHandler<Element> = (e: React.FormEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [ e.currentTarget.name ]: e.currentTarget.value
    })
  }

  const handleSurpriseMe: React.MouseEventHandler = () => {
    const randomPrompt = getRandomPrompt(form.prompt)
    setForm({
      ...form,
      prompt: randomPrompt
    })
  }
  
  const generateImage: React.MouseEventHandler = async() => {
    
    if (form.prompt) {
      try {
        setGeneratingImg(true);

        const { data } = await postsApi.post<CreateImage>('/api/v1/dalle', {
          prompt: form.prompt
        }, {
          headers: {
            "Content-Type": 'application/json'
          }
        })

        setForm({
          ...form,
          photo: `data:image/jpeg;base64,${data.photo}`
        })


      } catch (error) {
        console.log(error)

      } finally {
        setGeneratingImg(false)
      }

    } else {
      alert('Please enter a prompt');
      console.log('Please enter a prompt');
    }
  }
  

  return (
    <section className='max-w-7xl mx-auto'>
      <div>
        <h1 className="font-extrabold text-[#222328] text-[32px]">Create Image</h1>
        <p className="mt-3 text-[#666e75] text-[15px] max-w-[500px] ">Create imaginative and visually stunning images through DALL??E AI and share them with the community</p>
      </div>

      <form className="mt-16 max-w-3xl" onSubmit={handleSubmit}>
        <div className='flex flex-col gap-5'>
          <FormField 
            labelName='Your Name'
            type='text'
            name='name'
            placeholder={ randomName }
            value={ form.name }
            handleInputChange={ handleChange }
          />
          <FormField 
            labelName='Prompt'
            type='text'
            name='prompt'
            placeholder={ randomPrompt }
            value={ form.prompt }
            handleInputChange={ handleChange }
            isSurpriseMe
            handleSurpriseMe={ handleSurpriseMe }
          />

          <div className="relative bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border w-64 p-3 h-64 flex justify-center items-center">
            { form.photo ? (
              <img 
                src={ form.photo } 
                alt={ form.prompt }
                className="w-full h-full object-contain" 
              />
            ) : (
              <img 
                src={ preview.default }
                alt="preview"
                className='w-9/12 h-9/12 object-contain opacity-40'
              />
            )}

            { generatingImg && (
              <div className='absolute inset-0 z-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)] rounded-lg'>
                <Loader />
              </div>
            )}
          </div>

        </div>

        <div className='mt-5 flex gap-5 '>
          <button
            type='button'
            onClick={ generateImage }
            className="text-white bg-green-700 font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center"
          >
            { generatingImg ? 'Generating...' : 'Generate' }
          </button>
        </div>

        <div className="mt-10">
          <p className='mt-2 text-[#666e75] text-[14px]'>Once you have created the image you want, you can share it with others in the community</p>
          <button 
            type='submit'
            className='mt-3 text-white bg-[#6469ff] font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center'
          >
            { loading ? 'Sharing...' : 'Share with the community' }
          </button>
        </div>
      </form>
    </section>
  )
}
