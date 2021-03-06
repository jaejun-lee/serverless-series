// Dependencies
import React, { useState, useEffect } from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import { Button, Container } from '@material-ui/core';
// Files
import { listBlogs } from '../graphql/queries';
import BlogChild from './Blogs/Children/BlogChild';
import CreateBlog from './Blogs/Children/CreateBlog';

const ListBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [createBlog, setCreateBlog] = useState(false);

  useEffect(() => {
    handleListBlogs();
  }, []);

  const handleListBlogs = async () => {
    const { data } = await API.graphql(graphqlOperation(listBlogs));
    setBlogs(data.listBlogs.items);
  };

  const handleToggleCreateBlog = () => {
    createBlog === false ? setCreateBlog(true) : setCreateBlog(false);
  };

  return (
    <Container maxWidth='lg'>
      <BlogChild
        blogs={blogs}
        setBlogs={setBlogs}
        setCreateBlog={setCreateBlog}
      />
      <br />
      <Button
        variant='contained'
        color='primary'
        onClick={() => handleToggleCreateBlog()}
      >
        Add Blog
      </Button>
      {createBlog ? (
        <CreateBlog
          blogs={blogs}
          setBlogs={setBlogs}
          setCreateBlog={setCreateBlog}
        />
      ) : null}
    </Container>
  );
};

export default ListBlogs;
