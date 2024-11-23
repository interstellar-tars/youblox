const uploadForm = document.getElementById('upload-form');
const videosContainer = document.getElementById('videos');

// Upload video
uploadForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const title = document.getElementById('title').value;
  const description = document.getElementById('description').value;
  const video = document.getElementById('video').files[0];

  if (!video) {
    alert('Please select a video file!');
    return;
  }

  const formData = new FormData();
  formData.append('title', title);
  formData.append('description', description);
  formData.append('video', video);

  try {
    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });

    if (response.ok) {
      alert('Video uploaded successfully!');
      fetchVideos(); // Refresh the video list
    } else {
      alert('Failed to upload the video.');
    }
  } catch (error) {
    console.error('Error:', error);
    alert('An error occurred.');
  }
});

// Fetch and display uploaded videos
async function fetchVideos() {
  try {
    const response = await fetch('/api/videos');
    const videos = await response.json();

    videosContainer.innerHTML = ''; // Clear previous content

    videos.forEach((video) => {
      const videoElement = document.createElement('div');
      videoElement.innerHTML = `
        <h3>${video.title}</h3>
        <video controls width="300">
          <source src="${video.url}" type="video/mp4">
          Your browser does not support the video tag.
        </video>
        <p>${video.description}</p>
      `;
      videosContainer.appendChild(videoElement);
    });
  } catch (error) {
    console.error('Error fetching videos:', error);
    videosContainer.innerHTML = '<p>Failed to load videos.</p>';
  }
}

// Fetch videos on page load
fetchVideos();
