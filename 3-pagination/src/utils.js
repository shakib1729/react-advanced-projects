const paginate = (followers) => {
  // returns array of arrays
  const itemsPerPage = 9;
  const numOfPages = Math.ceil(followers.length / itemsPerPage);

  // create array of arrays
  const newFollowers = Array.from({ length: numOfPages }, (_, index) => {
    const start = index * itemsPerPage;
    // In slice, end is not included
    return followers.slice(start, start + itemsPerPage);
  });

  return newFollowers;
};

export default paginate;
