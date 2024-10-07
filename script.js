
    const canvas = new fabric.Canvas("canvas");
    let currentImg;

    document.getElementById('upload').addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                const imgElement = new Image();
                imgElement.src = e.target.result;
                imgElement.onload = function() {
                    const imgInstance = new fabric.Image(imgElement);
                    canvas.clear(); // Clear the canvas before adding a new image
                    canvas.add(imgInstance);
                    canvas.setActiveObject(imgInstance);
                    canvas.renderAll();
                    currentImg = imgInstance; // Keep reference to the current image
                };
            }
            reader.readAsDataURL(file); // Read the file as a Data URL (for images)
        }
    });

    document.getElementById('bright').addEventListener('click', () => {
        if (currentImg) {
            currentImg.filters.push(new fabric.Image.filters.Brightness({ brightness: 0.1 }));
            currentImg.applyFilters();
            canvas.renderAll();
        }
    });

    document.getElementById('crop').addEventListener('click', () => {
        if (currentImg) {
            const cropRect = new fabric.Rect({
                left: 100,
                top: 100,
                width: 300,
                height: 300,
                fill: 'transparent',
                stroke: 'red',
                strokeWidth: 2,
            });
            canvas.add(cropRect);
            canvas.setActiveObject(cropRect);
            canvas.renderAll();
        }
    });

    document.getElementById('addText').addEventListener('click', () => {
        const text = new fabric.Text('Hello!', {
            left: 100,
            top: 100,
            fontSize: 20,
            fill: '#000',
        });
        canvas.add(text);
        canvas.setActiveObject(text);
        canvas.renderAll();
    });

    document.getElementById('download').addEventListener('click', () => {
        const link = document.createElement('a');
        link.href = canvas.toDataURL({
            format: 'png',
            quality: 0.8
        });
        link.download = 'edited-image.png';
        link.click();
    });