document.addEventListener("DOMContentLoaded",_=>{
    generate_pixels();

    document.querySelector("#create-sketch-btn").addEventListener("click",showSketchForm);
    document.querySelector("#close-form-btn").addEventListener("click",closeForm);
    document.querySelector("#create-sketch-pad-btn").addEventListener("click",createSketchArea);
    document.querySelector("#clear-sketch-btn").addEventListener("click",clearSketch);
    addpixelEvent();
});



function generate_pixels(horizontal_dimension=16, vertical_dimension=16){
    let container  = document.querySelector("#sketch-pad");
    
     //get height of container
    let container_height = window.getComputedStyle(container,null).getPropertyValue("height");
    container_height =  Number((container_height.split("p"))[0]);
   
    //get width of container
    let container_width = window.getComputedStyle(container,null).getPropertyValue("width")
    container_width =  Number((container_width.split("p"))[0]);
    //get pixel height

    //remove pixel value
  
    let pixel_height = container_height/vertical_dimension;

    //get pixel width 
    let pixel_width = container_width/horizontal_dimension;

    //create pixels
    container.innerHTML = "";
    for(let i = 0; i<(horizontal_dimension * vertical_dimension); i++){

        let pixel = document.createElement("div");
        pixel.style.cssText= `height:${pixel_height}px; width:${pixel_width}px;`;
        pixel.classList.add("pixel");
        pixel.setAttribute("data-colored",false);
        //add pixel to sketchpad
        container.appendChild(pixel);
    }

    //add event listeners to all pixels
    addpixelEvent();
}

function showSketchForm(){
    document.querySelector("#sketch-form").classList.add("show-form");
}

function closeForm(){
    document.querySelector("#sketch-form").classList.remove("show-form");
}

function createSketchArea(e){
    e.preventDefault();

    let horizontal_dimension = document.getElementById("horizontal_dim").value;
    let vertical_dimension = document.getElementById("vertical_dim").value;

    closeForm();
    generate_pixels(horizontal_dimension,vertical_dimension);
}

function addpixelEvent(){

    let pixels = document.querySelectorAll(".pixel");

    pixels.forEach(pixel => {
       pixel.addEventListener("touchmove",function(){
        
        let current_count = Number(pixel.getAttribute("data-color-transition-count"));

        if(pixel.getAttribute("data-colored") == "true"){
           
            let red = Number(pixel.getAttribute("data-red"));
            let green = Number(pixel.getAttribute("data-green"));
            let blue = Number(pixel.getAttribute("data-blue"));
           
           
            red = red - Number(pixel.getAttribute("data-red-deduct"));
            green = green - Number(pixel.getAttribute("data-green-deduct"));
            blue = blue - Number(pixel.getAttribute("data-blue-deduct"));

            pixel.style.backgroundColor = `rgb(${red},${green},${blue})`;

            pixel.setAttribute("data-red",red);
            pixel.setAttribute("data-green",green);
            pixel.setAttribute("data-blue",blue);
            pixel.setAttribute("data-color-transition-count",++current_count);

        }else{
            let red = Math.floor(255 * Math.random(0,1));
            let green = Math.floor(255 * Math.random(0,1));
            let blue = Math.floor(255 * Math.random(0,1));
    
            
            pixel.style.backgroundColor = `rgb(${red},${green},${blue})`;

            pixel.setAttribute("data-colored","true");
            pixel.setAttribute("data-red",red);
            pixel.setAttribute("data-green",green);
            pixel.setAttribute("data-blue",blue);

            pixel.setAttribute("data-red-deduct",red/10);
            pixel.setAttribute("data-green-deduct",green/10);
            pixel.setAttribute("data-blue-deduct",blue/10);

            pixel.setAttribute("data-color-transition-count",0);
        }
       });

  
    });
}

function clearSketch(){
    let pixels = document.querySelectorAll(".pixel");

    pixels.forEach(pixel=>{

        if(pixel.getAttribute("data-colored") == "true"){
        
        //remove all deductions
        pixel.removeAttribute("data-red-deduct");
        pixel.removeAttribute("data-green-deduct");
        pixel.removeAttribute("data-blue-deduct");

        //remove all intermediate color values
        pixel.removeAttribute("data-red");
        pixel.removeAttribute("data-green");
        pixel.removeAttribute("data-blue");

        //remove color transition intermediate value
        pixel.removeAttribute("data-color-transition-count");

        //set color flag to false
        pixel.setAttribute("data-colored","false");

        pixel.style.backgroundColor = "transparent";
    }
     });
}
        
