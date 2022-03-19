import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import "./ImageList.css";
import ScrollButton from "./ScrollButton";

function ImageList({ searchWord }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const { data: response } = await axios.get(
          `https://pixabay.com/api/?key=${process.env.REACT_APP_PIXABAY_API_KEY}&q=${searchWord}&image_type=photo&page=${currentPage}`
        );
        setData(response);
      } catch (error) {
        console.error(error.message);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [searchWord, currentPage]);

  const incrementPageCount = () => {
    setCurrentPage((currentPage) => currentPage + 1);
  };

  const decrementPageCount = () => {
    setCurrentPage((currentPage) => currentPage - 1);
  };

  const images = data.hits?.map((image) => {
    return (
      <Link to={`/photos/${image.id}`}>
        <img
          className="imageList"
          key={image.id}
          src={image.webformatURL}
          alt={image.tags}
          style={{
            aspectRatio: `${image.webformatWidth / image.webformatHeight}`,
          }}
        />
      </Link>
    );
  });

  return (
    <>
      {!loading && !error && (
        <>
          {!!images.length ? (
            <>
              <div>{images}</div>
              {currentPage > 1 && (
                <button className="changePage" onClick={decrementPageCount}>
                  Previous Page
                </button>
              )}
              <button className="changePage" onClick={incrementPageCount}>
                Next Page
              </button>
              <ScrollButton />
            </>
          ) : (
            <div className="noResultsText">
              No Results. Please try a different search term.
            </div>
          )}
        </>
      )}
      {error && (
        <div className="errorText">{error.message}. Please try again.</div>
      )}
    </>
  );
}

export default ImageList;
