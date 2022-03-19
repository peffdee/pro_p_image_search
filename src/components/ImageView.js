import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import "./ImageView.css";

function ImageView() {
  const { id } = useParams();
  const [image, setImage] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const { data: response } = await axios.get(
          `https://pixabay.com/api/?key=${process.env.REACT_APP_PIXABAY_API_KEY}&id=${id}`
        );
        setImage(response.hits[0]);
      } catch (error) {
        setError(error);
        console.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  return (
    <>
      {!loading && !error && (
        <div className="viewContainer">
          <img
            className="imageView"
            key={image.id}
            src={image.webformatURL}
            alt={image.tags}
            style={{
              aspectRatio: `${image.webformatWidth / image.webformatHeight}`,
            }}
          />
          <div
            className="metaContainer"
            style={{ maxWidth: image.webformatWidth }}
          >
            <div className="user">
              <b>Posted By: </b>
              {image.user}
            </div>
            <div className="tags">
              <b>Tags: </b>
              {image.tags}
            </div>
          </div>
        </div>
      )}
      {error && (
        <div className="errorText">{error.message}. Please try again.</div>
      )}
    </>
  );
}

export default ImageView;
