import React, { useState, useCallback } from "react";
import Gallery from "react-photo-gallery";
import Carousel, { Modal, ModalGateway } from "react-images";
import { Container } from "react-bootstrap";
import Layout from "../Layout";
import { photos } from "./photos";
import "./style.photos.css";
const PhotoGallery = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const [viewerIsOpen, setViewerIsOpen] = useState(false);

  const openLightbox = useCallback((event, { photo, index }) => {
    setCurrentImage(index);
    setViewerIsOpen(true);
  }, []);

  const closeLightbox = () => {
    setCurrentImage(0);
    setViewerIsOpen(false);
  };
  return (
    <Layout>
      <div className="gallery-container">
        <div className="gallery">
          <h1>Gallery</h1>
          <div>
            <a className="prev" href="/">
              Home&nbsp;
            </a>{" "}
            <span> {">"} </span>
            <a href="#"> &nbsp; Gallery</a>
          </div>
        </div>
      </div>
      <Container style={{ marginBottom: "100px" }}>
        <Gallery photos={photos} onClick={openLightbox} />
        <ModalGateway>
          {viewerIsOpen ? (
            <Modal onClose={closeLightbox}>
              <Carousel
                currentIndex={currentImage}
                views={photos.map((x) => ({
                  ...x,
                  srcset: x.srcSet,
                  caption: x.title,
                }))}
              />
            </Modal>
          ) : null}
        </ModalGateway>
      </Container>
    </Layout>
  );
};

export default PhotoGallery;
