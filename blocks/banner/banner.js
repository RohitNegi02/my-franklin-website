/**
 * Decorates the banner block.
 * @param {Element} block The banner block element
 */
export default function decorate(block) {
  // Extract data from the existing block HTML
  const imageSrc = block.querySelector('img').getAttribute('src');
  const featuredText = block.querySelector('strong').textContent;
  const mainTitle = block.querySelector('h2').textContent;
  const description = block.querySelector('p:nth-of-type(2)').textContent;

  // Create the main banner container
  const bannerContent = document.createElement('div');
  bannerContent.className = 'banner-content';
  bannerContent.style.backgroundImage = `url(${imageSrc})`;

  // Create a container for text and temperature info
  const bannerInner = document.createElement('div');
  bannerInner.className = 'banner-inner';

  // Add content to the banner
  const featuredTextElement = document.createElement('h3');
  featuredTextElement.textContent = featuredText;
  featuredTextElement.className = 'banner-title';

  const mainTitleElement = document.createElement('h1');
  mainTitleElement.textContent = mainTitle;
  mainTitleElement.className = 'banner-title';

  const descriptionElement = document.createElement('p');
  descriptionElement.textContent = description;
  descriptionElement.className = 'banner-title';

  const textContainer = document.createElement('div');
  textContainer.className = 'text-container';
  textContainer.appendChild(featuredTextElement);
  textContainer.appendChild(mainTitleElement);
  textContainer.appendChild(descriptionElement);

  // Temperature info section
  const tempInfoContainer = document.createElement('div');
  tempInfoContainer.className = 'temperature-info';

  const currentTemp = document.createElement('li');
  const minTemp = document.createElement('li');
  const maxTemp = document.createElement('li');

  const tempList = document.createElement('ul');
  tempList.appendChild(currentTemp);
  tempList.appendChild(minTemp);
  tempList.appendChild(maxTemp);

  tempInfoContainer.appendChild(tempList);

  bannerInner.appendChild(textContainer);
  bannerInner.appendChild(tempInfoContainer);

  // Append new structure to the block
  block.innerHTML = '';
  block.appendChild(bannerContent);
  bannerContent.appendChild(bannerInner);

  // Fetch temperature data from API
  fetch('https://api.openweathermap.org/data/2.5/weather?q=London&units=imperial&appid=3cb03b517e26c5c370402011f5438cbf')
    .then(response => response.json())
    .then(data => {
      const temp = data.main;
      currentTemp.textContent = `Current Temp: ${((temp.temp - 32) * 5/9).toFixed(2)}°C`;
      minTemp.textContent = `Min Temp: ${((temp.temp_min - 32) * 5/9).toFixed(2)}°C`;
      maxTemp.textContent = `Max Temp: ${((temp.temp_max - 32) * 5/9).toFixed(2)}°C`;
    })
    .catch(error => {
      console.error('Error fetching temperature data:', error);
      currentTemp.textContent = 'Current Temp: N/A';
      minTemp.textContent = 'Min Temp: N/A';
      maxTemp.textContent = 'Max Temp: N/A';
    });
}
