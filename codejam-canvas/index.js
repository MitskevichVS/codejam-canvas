window.onload = () => {
  const buttonSmall = document.querySelector('#small');
  const buttonMedium = document.querySelector('#medium');
  const buttonBig = document.querySelector('#big');

  const canvas = document.querySelector('canvas');
  const ctx = canvas.getContext('2d');

  function RGBAToHexA(r, g, b) {
    let R = r.toString(16);
    let G = g.toString(16);
    let B = b.toString(16);

    if (R.length === 1) R = `0${R}`;
    if (G.length === 1) G = `0${G}`;
    if (B.length === 1) B = `0${B}`;

    return `${R}${G}${B}`;
  }

  async function loadJson(path) {
    const res = await fetch(path);
    const data = res.json();
    return data;
  }

  function draw(arr) {
    const inputArray = arr;
    inputArray.forEach((element, index) => {
      element.forEach((el, ind) => {
        let color;
        // console.log(`el ${el}, index ${index}, ind ${ind}`);
        if (typeof el === 'object') {
          color = RGBAToHexA(el[0], el[1], el[2]);
        } else {
          color = el;
        }

        ctx.fillStyle = `#${color}`;
        ctx.fillRect(index, ind, index + 1, ind + 1);
      });
    });
  }

  buttonSmall.addEventListener('click', () => {
    buttonSmall.classList.toggle('selected');
    buttonMedium.classList.remove('selected');
    buttonBig.classList.remove('selected');

    canvas.width = 4;
    canvas.height = 4;

    const path = './data/4x4.json';
    loadJson(path)
      .then((data) => {
        draw(data);
      });
  });

  buttonMedium.addEventListener('click', () => {
    buttonMedium.classList.toggle('selected');
    buttonSmall.classList.remove('selected');
    buttonBig.classList.remove('selected');

    canvas.width = 32;
    canvas.height = 32;

    const path = './data/32x32.json';
    loadJson(path)
      .then((data) => {
        draw(data);
      });
  });

  buttonBig.addEventListener('click', () => {
    buttonBig.classList.toggle('selected');
    buttonMedium.classList.remove('selected');
    buttonSmall.classList.remove('selected');

    canvas.width = 256;
    canvas.height = 256;

    const image = new Image();
    image.src = './data/image.png';
    image.onload = () => {
      ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
    };
  });
};
