import { useEffect, useState } from 'react';

function useGetImages(imageNames) {
  const [imageData, setImageData] = useState({});

  useEffect(() => {
    const fetchImage = async (imageName) => {
      try {
        const response = await fetch(`http://localhost:5000/api/images/${imageName}`);
        if (!response.ok) {
          throw new Error('Failed to fetch image');
        }
        const imageBlob = await response.blob();
        setImageData((prevImageData) => ({
          ...prevImageData,
          [imageName]: URL.createObjectURL(imageBlob),
        }));
      } catch (error) {
        console.error('Error fetching image:', error);
        setImageData((prevImageData) => ({
          ...prevImageData,
          [imageName]: null, // Set null for failed requests
        }));
      }
    };

    const fetchImages = async () => {
      if (Array.isArray(imageNames)) {
        await Promise.all(imageNames.map(fetchImage));
      } else {
        await fetchImage(imageNames);
      }
    };

    if (imageNames) {
      fetchImages();
    }

    return () => {
      // Clean up the image data when component unmounts
      Object.values(imageData).forEach((imageUrl) => {
        if (imageUrl) {
          URL.revokeObjectURL(imageUrl);
        }
      });
    };
  }, [imageNames]);

  return imageData;
}

export default useGetImages;
