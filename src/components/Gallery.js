import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, CardActions } from "@mui/material";

function Gallery({ onLogout }) {
  const [images, setImages] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [file, setFile] = useState("");
  const [description, setDescription] = useState("");

  const url = "http://127.0.0.1:3000/user/gallery";

  const token = localStorage.getItem("authToken");
  const headers = {
    Authorization: `Bearer ${token}`,
    // "Access-Control-A11ow-Origin": "*",
    "Content-Type": "multipart/form-data",
  };

  const handleLogout = () => {
    onLogout();
  };

  const fetchImages = async () => {
    try {
      console.log("hello from fetch images 1");
      const response = await axios.get(url, { headers });
      console.log("hello from fetch images 1");
      setImages(response.data);

      console.log(response.data);
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const uploadImage = async (e) => {
    e.preventDefault();
    if (!file) return;
    const formdata = new FormData();
    formdata.append("file", file);
    formdata.append("desc", description);
    // console.log(formdata);
    // for (let [key, value] of formdata.entries()) {
    //   console.log(`${key}: ${value}`);
    // }
    // const data = {
    //   imageurl: file,
    //   description,
    // };
    // console.log(data);
    setUploading(true);
    try {
      await axios.post(url, formdata, { headers });
      setUploading(false);
      setFile("");
      setDescription("");
      fetchImages();
      console.log("still in uploading images");
    } catch (error) {
      console.error("Error uploading image:", error);
      setUploading(false);
    }
  };

  const deleteImage = async (imageId) => {
    try {
      console.log("hello");
      const fullURL = `${url}/${imageId}`;
      console.log(fullURL);
      const response = await axios.delete(fullURL, { headers });
      console.log(response);
      fetchImages();
    } catch (error) {
      console.error("Error deleting image:", error);
    }
  };

  return (
    <div>
      <h1>Gallery</h1>
      <Button onClick={handleLogout}>Logout</Button>
      {/* <input type="file" onChange={handleFileChange} /> */}
      <label>Image:</label>
      {/* <FileBase64
        type="file"
        multiple={false}
        onDone={({ base64 }) => setFile(base64)}
      /> */}
      <form onSubmit={uploadImage}>
        <input type="file" onChange={(e) => setFile(e.target.files[0])} />
        <Button type="submit" disabled={uploading}>
          {uploading ? "Uploading..." : "Upload Image"}
        </Button>

        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </form>
      {/* <img src={file} width="200px" /> */}
      {/*  */}
      <div style={{ display: "flex" }}>
        {images.map((image) => (
          <Card sx={{ minWidth: 300, margin: 2 }}>
            <CardActionArea>
              <CardMedia
                component="img"
                height="140"
                image={`http://127.0.0.1:3000/` + image.imageUrl}
                alt={image.description}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {image.description}
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button
                onClick={() => deleteImage(image._id)}
                size="small"
                color="primary"
              >
                Delete
              </Button>
            </CardActions>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default Gallery;
