import { useEffect, useMemo, useRef, useState } from 'react';
import { Card, FormField, Loader } from '../components';
import { postsApi } from '../api';

import { CardGridType, Post, GetPosts } from '../interfaces';
import { getRandomPrompt } from '../utils';



const RenderCards = ({ data, title }: CardGridType ) => {
  if (data?.length > 0) {
    return (
      <>
        { data.map( (post: Post) => <Card key={post._id} {...post} /> ) }
      </>
    )
  }

  return (
    <h2 className="mt-5 font-bold text-[#6469ff] text-xl uppercase">{ title }</h2>
  )
}

export const Home = () => {

  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState<Post[]>([]);
  const [searchedResults, setSearchedResults] = useState<Post[]>([])
  const [searchText, setSearchText] = useState('')

  const randomPrompt = useMemo(() => getRandomPrompt(''), [])

  const debounceRef = useRef<NodeJS.Timeout>()

  useEffect(() => {
    
    const fetchPosts = async () => {
      setLoading(true)

      try {

        const { data } = await postsApi.get<GetPosts>('/api/v1/post', {
          headers: {
            'Content-Type': 'application/json'
          }
        })

        if (data.ok) {
          setPosts(data.posts.reverse());
        }
        
      } catch (error) {
        console.log(error);

      } finally {
        setLoading(false)
      }
    }

    fetchPosts();
    
    
  }, [])
  
  const handleSearchChange: React.FormEventHandler<Element> = (e: React.ChangeEvent<HTMLInputElement>) => {

    if ( debounceRef.current ) {
      clearTimeout( debounceRef.current )
    }

    setSearchText(e.currentTarget.value)

    debounceRef.current = setTimeout(() => {  
      const searchResults = posts.filter( (item: Post) => item.name.toLowerCase().includes( e.target.value.toLowerCase() ) || item.prompt.toLowerCase().includes( e.target.value.toLowerCase() ) );
      setSearchedResults(searchResults);
    }, 350)
  }


  return (
    <section className="max-w-7xl mx-auto">
      <div>
        <h1 className="font-extrabold text-[#222328] text-[32px]">Community Showcase</h1>
        <p className="mt-3 text-[#666e75] text-[15px] max-w-[500px] ">CRAP??E is a system that can fetch realistic images and art generated by DALL??E's AI system from a description in natural language.</p>
      </div>

      <div className="mt-16">
        <FormField 
          labelName='Search post'
          type='text'
          name='text'
          placeholder={ randomPrompt }
          value={ searchText }
          handleInputChange={ handleSearchChange }
        />
      </div>

      <div className="mt-10">
        { loading ? (
          <div className="flex justify-center items-center">
            <Loader />
          </div>
        ) : (
          <>
            { searchText &&  (
              <h2 className="font-medium text-[#666e75] text-xl mb-3">
                Showing results for <span className="text-[#222328]">{ searchText }</span>
              </h2>
            )}
            <div className="grid lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-3">
              { searchText ? (
                <RenderCards 
                  data={ searchedResults }
                  title="No search results found."
                />
                ) : (
                <RenderCards 
                  data={ posts }
                  title="No posts found."
                />
              )}
            </div>
          </>
        )}
      </div>
    </section>
  )
}
