import React, { useRef, useState } from 'react';
import { Button, Form, Container, Row, Col } from 'react-bootstrap';
import api from '../api/api';

const FileUploadForm = () => {
    const inputRef = useRef();
    const [selectedFile, setSelectedFile] = useState(null);
    const [error, setError] = useState(null);
    const handleFileChange = (e) =>{
        setSelectedFile(e.target.files[0]);
    }

  const handleSubmit = async(e) => {
    e.preventDefault();
    setError(null); // Réinitialiser l'erreur

    console.log(selectedFile);

    try {
      const formData = new FormData();
      formData.append("file", selectedFile);
      await api.uploadImage(formData);
      handleCancel();
      alert("Image uploaded successfully");
    } catch (error) {
      console.log("Error uploading the image: ", error);
      setError("Error uploading the image. Please try again.");
    }
  };

  const handleCancel = () =>{
    inputRef.current.value = null;
    setSelectedFile(null);
  }

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col xs={12} md={8}>
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label style={{ marginTop: '1rem', fontSize: '1.5rem' }}>Upload File</Form.Label>
              <Form.Control
                ref={inputRef}
                type="file"
                id="formFile"
                accept="image/*"
                onChange={handleFileChange}
                formEncType='multipart/form-data'
              />
            </Form.Group>
            {selectedFile && (
            <div style={{ marginTop: '1.5rem',}}>
              <img className='image' src={URL.createObjectURL(selectedFile)} alt="Preview" style={{ maxWidth: '100%' }} />
            </div>
          )}
            <Row style={{ marginTop: '1.5rem', marginBottom: '1.5rem', flexDirection:'column' }}>
              <Col>
                <Button variant='secondary' onClick={handleCancel} disabled={!selectedFile} type="button" style={{ width: '100%', marginBlock: '0.5rem' }}>
                  Annuler
                </Button>
              </Col>
              <Col>
                <Button variant="primary" type="submit" disabled={!selectedFile} style={{ width: '100%', marginBlock: '0.5rem' }}>
                  Valider
                </Button>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
      {error && <div className="alert alert-danger">{error}</div>}
    </Container>
  );
};

export default FileUploadForm;
