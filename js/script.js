window.addEventListener('DOMContentLoaded', () => {

    // Global variables:

    const canvas = document.querySelector('canvas'),
        toolBtns = document.querySelectorAll('.tool'),
        fillColor = document.querySelector('#fill-color'),
        sizeSlider = document.querySelector('#size-slider'),
        colorBtns = document.querySelectorAll('.colors .option'),
        colorPicker = document.querySelector('#color-picker'),
        clearCanvasBtn = document.querySelector('.clear-canvas'),
        saveImageBtn = document.querySelector('.save-image');


    // Variables:

    let ctx = canvas.getContext('2d'),
        isDrawing = false,
        brushWidth = 3,
        selectedTool = 'brush',
        selectedColor = '#000',
        prevMouseX,
        prevMouseY,
        snapshot;


    // Set canvas background:

    const setCanvasBackground = () => {
        ctx.fillStyle = '#fff';

        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = selectedColor;
    }


    // Set canvas width and height:

    window.addEventListener('load', () => {
        canvas.width = canvas.offsetWidth;

        canvas.height = canvas.offsetHeight;

        setCanvasBackground();
    });


    // Start drawing:

    const startDraw = (event) => {
        isDrawing = true;

        prevMouseX = event.offsetX;

        prevMouseY = event.offsetY;

        ctx.beginPath();

        ctx.lineWidth = brushWidth;

        ctx.strokeStyle = selectedColor;

        ctx.fillStyle = selectedColor;

        snapshot = ctx.getImageData(0, 0, canvas.width, canvas.height);
    }


    // Draw rectangle:

    const drawRectangle = (event) => {
        // if (!fillColor.checked) {
        //     return ctx.strokeRect(event.offsetX, event.offsetY, prevMouseX - event.offsetX, prevMouseY - event.offsetY);
        // }
        
        // ctx.fillRect(event.offsetX, event.offsetY, prevMouseX - event.offsetX, prevMouseY - event.offsetY);
        
        fillColor.checked 
            ? ctx.fillRect(event.offsetX, event.offsetY, prevMouseX - event.offsetX, prevMouseY - event.offsetY)
            : ctx.strokeRect(event.offsetX, event.offsetY, prevMouseX - event.offsetX, prevMouseY - event.offsetY);        
    }


    // Draw circle:

    // const drawCircle = (event) => {
    //     ctx.beginPath();

    //     const radius = Math.sqrt(Math.pow(prevMouseX - event.offsetX, 2)) + Math.pow(prevMouseY - event.offsetY, 2);

    //     ctx.arc(prevMouseX, prevMouseY, 50, 0, 2 * Math.PI);

    //     fillColor.checked ? ctx.fill() : ctx.stroke();
    // }

    const drawCircle = (event) => {
        ctx.beginPath();

        const radius = Math.sqrt(
            Math.pow(event.offsetX - prevMouseX, 2) +
            Math.pow(event.offsetY - prevMouseY, 2)
        );

        ctx.arc(prevMouseX, prevMouseY, radius, 0, 2 * Math.PI);

        fillColor.checked ? ctx.fill() : ctx.stroke();
    }


    // Draw triangle:

    const drawTriangle = (event) => {
        ctx.beginPath();

        ctx.moveTo(prevMouseX, prevMouseY);

        ctx.lineTo(event.offsetX, event.offsetY);

        ctx.lineTo(prevMouseX * 2 - event.offsetX, event.offsetY);

        ctx.closePath();

        fillColor.checked ? ctx.fill() : ctx.stroke();
    }


    // Drawing:

    const draw = (event) => {
        if (!isDrawing) return;

        ctx.putImageData(snapshot, 0, 0);

        switch (selectedTool) {
            case 'brush':
                ctx.lineTo(event.offsetX, event.offsetY);
                ctx.stroke();
                break;

            case 'rectangle':
                drawRectangle(event); 
                break;

            case "circle":
                drawCircle(event);
                break;

            case "triangle":
                drawTriangle(event);
                break;

            case 'eraser':
                ctx.strokeStyle = '#fff';
                ctx.lineTo(event.offsetX, event.offsetY);
                ctx.stroke();
                break;
        
            default:
                break;
        }
    }


    // ToolsBtn and set to variables selected tool:

    toolBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelector('.options .active').classList.remove('active');

            btn.classList.add('active');

            selectedTool = btn.id;

            console.log(`Selected tool ${selectedTool}`);
        });
    });


    // Change brush width:

    sizeSlider.addEventListener('change', () => {
        brushWidth = sizeSlider.value;
    });


    // Set color to shapes:

    colorBtns.forEach(btn => {
        btn.addEventListener('click', (event) => {
            document.querySelector('.options .selected').classList.remove('selected');

            btn.classList.add('selected');

            const bgColor = window.getComputedStyle(btn).getPropertyValue('background-color');

            selectedColor = bgColor;
        });
    });


    // Set color from color-picker:

    colorPicker.addEventListener('change', () => {
        colorPicker.parentElement.style.background = colorPicker.value;

        colorPicker.parentElement.click();
    });


    // Clear canvas button:

    clearCanvasBtn.addEventListener('click', () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        setCanvasBackground();
    });


    // Save like image our paint:

    saveImageBtn.addEventListener('click', () => {
        const link = document.createElement('a');

        link.download = `Akobir-Paint${Date.now()}.jpg`;

        link.href = canvas.toDataURL();

        link.click();
    });


    // Stop drawing:

    const stopDraw = () => {
        isDrawing = false;
    }

    canvas.addEventListener('mousedown', startDraw);

    canvas.addEventListener('mousemove', draw);

    canvas.addEventListener('mouseup', stopDraw);
});