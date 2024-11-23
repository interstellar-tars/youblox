document.getElementById('upload-form').addEventListener('submit', async (event) => {
  event.preventDefault();

  const title = document.getElementById('title').value;
  const description = document.getElementById('description').value;
  const video = document.getElementById('video').files[0];

  const formData = new FormData();
  formData.append('title', title);
  formData.append('description', description);
  formData.append('video', video);

  const response = await fetch('/api/upload', {
    method: 'POST',
    body: formData,
  });

  if (response.ok) {
    alert('Video uploaded!');
  } else {
    alert('Upload failed.');
  }
});

// Fetch and display videos
(async () => {
  const response = await fetch('/api/videos');
  const videos = await response.json();

  const videosContainer = document.getElementById('videos');
  videos.forEach((video) => {
    const videoElement = document.createElement('div');
    videoElement.innerHTML = `
      <h2>${video.title}</h2>
      <video controls>
        <source src="${video.url}" type="video/mp4">
        Your browser does not support the video tag.
      </video>
      <p>${video.description}</p>
    `;
    videosContainer.appendChild(videoElement);
  });
})();
