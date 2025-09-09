window.addEventListener('DOMContentLoaded', () => {

    // Global variables:

    const canvas = document.querySelector('canvas'),
        toolBtns = document.querySelectorAll('.tool');


    // Variables:

    let ctx = canvas.getContext('2d'),
        isDrawing = false,
        brushWidth = 3,
        selectedTool = 'brush',
        prevMouseX,
        prevMouseY,
        snapshot;


    // Set canvas width and height:

    window.addEventListener('load', () => {
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
    });


    // Start drawing:

    const startDraw = (event) => {
        isDrawing = true;

        prevMouseX = event.offsetX;

        prevMouseY = event.offsetY;

        ctx.beginPath();

        ctx.lineWidth = brushWidth;

        snapshot = ctx.getImageData(0, 0, canvas.width, canvas.height);
    }


    // Draw rectangle:

    const drawRectangle = (event) => {
        ctx.strokeRect(event.offsetX, event.offsetY, prevMouseX - event.offsetX, prevMouseY - event.offsetY)
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


    // Stop drawing:

    const stopDraw = () => {
        isDrawing = false;
    }

    canvas.addEventListener('mousedown', startDraw);

    canvas.addEventListener('mousemove', draw);

    canvas.addEventListener('mouseup', stopDraw);
});