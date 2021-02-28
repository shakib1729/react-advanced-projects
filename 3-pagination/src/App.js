import React, { useState, useEffect } from 'react';
import { useFetch } from './useFetch';
import Follower from './Follower';

function App() {
  // out whole list is data
  const { loading, data } = useFetch();
  const [currPage, setCurrPage] = useState(0);

  // the data of current page is in followers
  const [followers, setFollowers] = useState([]);

  // when loading changes, re-run useEffect
  useEffect(() => {
    if (loading) return;
    setFollowers(data[currPage]);
  }, [loading, currPage]);

  const handlePage = (index) => {
    setCurrPage(index);
  };

  const nextPage = () => {
    setCurrPage((oldPageNo) => {
      let nextPage = oldPageNo + 1;
      if (nextPage > data.length - 1) nextPage = 0;
      return nextPage;
    });
  };

  const prevPage = () => {
    setCurrPage((oldPageNo) => {
      let prevPage = oldPageNo - 1;
      if (prevPage < 0) prevPage = data.length - 1;
      return prevPage;
    });
  };

  return (
    <main>
      <div className='section-title'>
        <h1>{loading ? 'loading...' : 'pagination'}</h1>
        <div className='underline'></div>
      </div>
      <section className='followers'>
        <div className='container'>
          {followers.map((follower) => {
            return <Follower key={follower.id} {...follower} />;
          })}
        </div>
        {!loading && (
          <div className='btn-container'>
            <button className='prev-btn' onClick={prevPage}>
              prev
            </button>
            {data.map((item, index) => {
              return (
                <button
                  key={index}
                  className={`page-btn ${
                    index == currPage ? 'active-btn' : null
                  }`}
                  onClick={() => handlePage(index)}
                >
                  {index + 1}
                </button>
              );
            })}
            <button className='next-btn' onClick={nextPage}>
              next
            </button>
          </div>
        )}
      </section>
    </main>
  );
}

export default App;
