import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { Container, Row, Col, Form, Button, Alert, ListGroup, Spinner } from "react-bootstrap";

const UploadResume = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch the list of uploaded files when the component mounts
  useEffect(() => {
    const fetchUploadedFiles = async () => {
      try {
        const response = await axios.get("https://backendapps-0d3a0920208f.herokuapp.com/files");
        setUploadedFiles(response.data); // Assuming backend returns all uploaded files
      } catch (error) {
        console.error("Error fetching files:", error);
        setErrorMessage("Failed to fetch files. Please try again.");
      }
    };

    fetchUploadedFiles();
  }, []);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!selectedFile) {
      setErrorMessage("Please select a file to upload.");
      setSuccessMessage("");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      setLoading(true);
      const response = await axios.post("https://backendapps-0d3a0920208f.herokuapp.com/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.data && response.data.resumeFileName) {
        const newFile = {
          id: uploadedFiles.length + 1,
          resumeFileName: response.data.resumeFileName,
          resumeFileUrl: response.data.resumeFileUrl,
        };
        setUploadedFiles([...uploadedFiles, newFile]);
        setSelectedFile(null);
        setSuccessMessage("File uploaded successfully!");
        setErrorMessage("");
      }
    } catch (error) {
      setErrorMessage("Failed to upload file. Please try again.");
      setSuccessMessage("");
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = (id) => {
    const downloadUrl = `https://backendapps-0d3a0920208f.herokuapp.com/files/download/${id}`;
    const link = document.createElement("a");
    link.href = downloadUrl;
    link.setAttribute("download", "");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Container className="mt-5 p-4 bg-light rounded shadow">
      {/* Header */}
      <Row className="text-center mb-4">
        <Col>
          <h2 className="fw-bold text-primary">Upload Your Resume</h2>
          <p className="text-muted">Easily upload and manage your resumes below.</p>
        </Col>
      </Row>

      {/* Success/Error Messages */}
      {successMessage && <Alert variant="success" className="text-center">{successMessage}</Alert>}
      {errorMessage && <Alert variant="danger" className="text-center">{errorMessage}</Alert>}

      {/* File Upload Form */}
      <Row>
        <Col md={{ span: 8, offset: 2 }}>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label className="fw-bold">Select File</Form.Label>
              <Form.Control type="file" onChange={handleFileChange} required />
            </Form.Group>
            <Button type="submit" variant="primary" className="w-100" disabled={loading}>
              {loading ? <Spinner animation="border" size="sm" /> : "Upload"}
            </Button>
          </Form>
        </Col>
      </Row>

      {/* Uploaded Files List */}
      <Row className="mt-5">
        <Col>
          <h3 className="fw-bold">Uploaded Files:</h3>
          {uploadedFiles.length > 0 ? (
            <ListGroup>
              {uploadedFiles.map((file) => (
                <ListGroup.Item
                  key={file.id}
                  className="d-flex justify-content-between align-items-center"
                >
                  <span>{file.resumeFileName}</span>
                  <Button variant="info" size="sm" onClick={() => handleDownload(file.id)}>
                    Download
                  </Button>
                </ListGroup.Item>
              ))}
            </ListGroup>
          ) : (
            <p className="text-muted">No files uploaded yet.</p>
          )}
        </Col>
      </Row>

      {/* Back to Dashboard Button */}
      <Row className="mt-4 text-center">
        <Col>
          <Button href="/AdminDaschboard" variant="warning">
            Back to Dashboard
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default UploadResume;
