import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios"; // Import axios

const UploadResume = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState([]);

  // Fetch the list of uploaded files when the component mounts
  useEffect(() => {
    const fetchUploadedFiles = async () => {
      try {
        // Replace with your actual backend URL
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

    // Prepare form data
    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      // Send POST request to backend for file upload
      const response = await axios.post("https://backendapps-0d3a0920208f.herokuapp.com/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data && response.data.resumeFileName) {
        // On success, update the UI
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
    }
  };

  // Handle file download
  const handleDownload = (id) => {
    const downloadUrl = `https://backendapps-0d3a0920208f.herokuapp.com/files/download/${id}`;
    const link = document.createElement("a");
    link.href = downloadUrl;
    link.setAttribute("download", "");
    document.body.appendChild(link);
    link.click(); // Trigger download
    document.body.removeChild(link);
  };

  return (
    <div className="container mt-5 p-4 border rounded shadow bg-white" style={{ maxWidth: "700px" }}>
      <h2 className="text-center mb-4">Upload Your Resume</h2>

      {/* Success or Error Messages */}
      {successMessage && <div className="alert alert-success text-center">{successMessage}</div>}
      {errorMessage && <div className="alert alert-danger text-center">{errorMessage}</div>}

      {/* Upload Form */}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <input
            type="file"
            className="form-control"
            onChange={handleFileChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">
          Upload
        </button>
      </form>

      {/* Display Uploaded Files */}
      <div className="file-list mt-5">
        <h3>Uploaded Files:</h3>
        <div className="list-group">
          {uploadedFiles.length > 0 ? (
            uploadedFiles.map((file) => (
              <div className="list-group-item d-flex justify-content-between align-items-center" key={file.id}>
                <span>{file.resumeFileName}</span>
                <button
                  onClick={() => handleDownload(file.id)} // Download file by ID
                  className="btn btn-info btn-sm"
                >
                  Download
                </button>
              </div>
            ))
          ) : (
            <p>No files uploaded yet.</p>
          )}
        </div>
      </div>

      {/* Back to Dashboard Button */}
      <div className="text-center mt-4">
        <a href="/AdminDaschboard" className="btn btn-warning">
          Back to Dashboard
        </a>
      </div>
    </div>
  );
};

export default UploadResume;
