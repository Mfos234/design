// Basic JavaScript file
const video = document.getElementById('video');
const captionImage = document.getElementById('captionImage');
const hamburgerMenu = document.getElementById('hamburgerMenu');
const videoLink = document.getElementById('videoLink'); // New link element
const videoGallery = document.querySelector('.video-gallery'); // Select the video gallery div
const themeColorMeta = document.getElementById('themeColorMeta'); // Select the meta tag for theme color

// Array of video sources, captions, hamburger menus, URLs, and background colors
const videos = [
  { src: 'videos/Montessori_Classroom.mp4', captionImg: 'images/Logo-montessori.svg', hamburgerMenu: 'images/montessori-menu.svg', url: 'montessori-case-study.html', bgColor: '#376A6A' }, // Red
  { src: 'videos/SubTracked.mp4', captionImg: 'images/Logo-subtrack.svg', hamburgerMenu: 'images/subtracked-menu.svg', url: 'subtracked-case-study.html', bgColor: '#8E94E0' }, // Blue
  { src: 'videos/TinyTales_Animation.mp4', captionImg: 'images/Logo-tinytales.svg', hamburgerMenu: 'images/tinytales-menu.svg', url: 'tinytales-case-study.html', bgColor: '#334272' }, // Purple
  { src: 'videos/Winskills.mp4', captionImg: 'images/Logo-winskills.svg', hamburgerMenu: 'images/winskills-menu.svg', url: 'winskills-case-study.html', bgColor: '#F2F4F5' } // Yellow
];

let currentVideoIndex = 0;

function updateThemeColor(color) {
  themeColorMeta.setAttribute('content', color);
}

function playNextVideo() {
  // Update video source, caption image, hamburger menu, link URL, and background color
  currentVideoIndex = (currentVideoIndex + 1) % videos.length;
  video.src = videos[currentVideoIndex].src;
  captionImage.src = videos[currentVideoIndex].captionImg;
  hamburgerMenu.src = videos[currentVideoIndex].hamburgerMenu;
  videoLink.href = videos[currentVideoIndex].url; // Update video link

  // Set the background color of the video gallery to the color associated with the current video
  videoGallery.style.backgroundColor = videos[currentVideoIndex].bgColor;

  // Update the tab bar color dynamically
  updateThemeColor(videos[currentVideoIndex].bgColor);

  // Play the next video once it's ready
  video.play();
}

// Event listener to loop through the videos when one ends
video.addEventListener('ended', playNextVideo);

// Initial autoplay and loop setup
video.autoplay = true;
video.loop = false;
video.muted = true;

// Set initial background and tab bar color for the first video
videoGallery.style.backgroundColor = videos[0].bgColor;
updateThemeColor(videos[0].bgColor);

// Start playing the first video
video.play();

// Adjust video and container background based on orientation
function adjustVideoForOrientation() {
    if (window.matchMedia("(orientation: landscape)").matches) {
        // Landscape orientation - scale video to fit within the container
        video.style.width = "100%";
        video.style.height = "auto"; // Maintain aspect ratio
        videoGallery.style.backgroundColor = "white"; // Matches safe area insets
    } else {
        // Portrait orientation - reset to original styling
        video.style.width = "100%";
        video.style.height = "100%";
        videoGallery.style.backgroundColor = videos[currentVideoIndex].bgColor; // Reset to video-specific color
    }
}

// Listen for orientation changes
window.addEventListener('resize', adjustVideoForOrientation);

// Initial setup to adjust video on page load
adjustVideoForOrientation();
