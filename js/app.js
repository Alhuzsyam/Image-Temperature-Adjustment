const fileInput = document.querySelector(".file-input"),
previewImg = document.querySelector(".preview-img img");
filterValue = document.querySelector(".filter-info .value"),
filterSlider = document.querySelector(".sliders input"),
filtername = document.querySelector(".filter-info .name");
chooseImBtn = document.querySelector(".choose-img");
resetImg = document.querySelector(".reset-filter");
saveImgBtn = document.querySelector(".save-img");

let hueRotateValue = 0;
let unit = 'deg';
const applyFilter = (hueRotateValue,unit) => {
    previewImg.style.filter = `hue-rotate(${hueRotateValue}${unit})`;
  };
const loadImage = () =>{
    let file = fileInput.files[0];
    if(!file) return;
    var fileExtension = file.name.split('.').pop().toLowerCase();
    // console.log(fileExtension);
    if (fileExtension !== 'jpeg') {
        alert("Only support JPEG File !");
    }else{
        previewImg.src = URL.createObjectURL(file);
        previewImg.addEventListener("load", ()=>{
        document.querySelector(".container").classList.remove("disable")
    })
    }
}


const updateFIlter = ()=>{
    // console.log(filterSlider.value)
    filterValue.innerText = filterSlider.value + '%';
    if(filterSlider.value > 0){
        filterSlider.classList.add("inputhot");
    }else{
        filterSlider.classList.remove("inputhot");
    }
    hueRotateValue = filterSlider.value;
    applyFilter(hueRotateValue,unit);
};




const resetImage = ()=>{
    filterSlider.value = 0;
    filterValue.innerText = filterSlider.value + '%';
    hueRotateValue = 0;
    applyFilter(hueRotateValue,unit);
}

const saveImage = () => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = previewImg.naturalWidth;
    canvas.height = previewImg.naturalHeight;
  
    ctx.filter = `hue-rotate(${hueRotateValue}${unit}`;
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.drawImage(
      previewImg,
      -canvas.width / 2,
      -canvas.height / 2,
      canvas.width,
      canvas.height
    );
  
    const link = document.createElement("a");
    link.download = "YourImage.jpeg";
    link.href = canvas.toDataURL();
    link.click();
  };


fileInput.addEventListener("change",loadImage);
filterSlider.addEventListener("input",updateFIlter);
chooseImBtn.addEventListener("click", ()=> fileInput.click());
resetImg.addEventListener("click",resetImage);
saveImgBtn.addEventListener("click", saveImage);