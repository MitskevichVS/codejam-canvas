window.onload = () => {
  const buttonSmall = document.querySelector('#small');
  const buttonMedium = document.querySelector('#medium');
  const buttonBig = document.querySelector('#big');

  const canvas = document.querySelector('canvas');
  const ctx = canvas.getContext('2d');

  function RGBAToHexA(r, g, b, a) {
    let R = r.toString(16);
    let G = g.toString(16);
    let B = b.toString(16);
    let A = Math.round(a * 255).toString(16);

    if (R.length === 1) { R = `0${r}`; }
    if (G.length === 1) { G = `0${g}`; }
    if (B.length === 1) { B = `0${b}`; }
    if (A.length === 1) { A = `0${a}`; }

    return `#${r}${g}${b}${a}`;
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
        // console.log(`element ${element}, index ${index}, el ${el}, ind ${ind}`);
        ctx.fillStyle = `#${el}`;
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

};
