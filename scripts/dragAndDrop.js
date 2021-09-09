let isDragging = false;

document.addEventListener('pointerdown', function(event) {
    let dragElement = event.target.closest('.draggable');
    let parentDroppable = event.target.parentNode;
    let currentDroppable = null;

    if (!dragElement) return;
    event.preventDefault();

    dragElement.ondragstart = function() {
        return false;
    };

    let shiftX, shiftY;

    startDrag(dragElement, event.clientX, event.clientY);


    function onPointerUp(event) {
        finishDrag(event);
    }
    function onPointerMove(event) {
        moveAt(event.clientX, event.clientY);

        event.target.hidden = true;
        let elemBelow = document.elementFromPoint(event.clientX, event.clientY);
        event.target.hidden = false;
        let dropReceiver = elemBelow.closest('.droppable');

        if (!elemBelow) return;

        if(currentDroppable !== dropReceiver) {
            if(currentDroppable != null) {
                leaveReciever(currentDroppable);
            }

            currentDroppable = dropReceiver;
            if(currentDroppable) {
                enterReciever(currentDroppable);
            }
        }
    }

    function startDrag(element, clientX, clientY) {
        if(isDragging) {
            return;
        }
        isDragging = true;

        document.addEventListener('pointermove', onPointerMove);
        element.addEventListener('pointerup', onPointerUp);

        shiftX = clientX - element.getBoundingClientRect().left;
        shiftY = clientY - element.getBoundingClientRect().top;

        element.style.position = 'fixed';
        element.style.zIndex = '9999';

        moveAt(clientX, clientY);
    }

    function finishDrag(event) {
        if(!isDragging) {
            return;
        }

        isDragging = false;
        dragElement.style.position = 'relative';
        dragElement.style.zIndex = '0';
        dragElement.style.top = '0';
        dragElement.style.right = '0';
        dragElement.style.left = '0';
        dragElement.style.marginTop = '10px';
        dragElement.style.marginBottom = '10px';
        if(currentDroppable)
            dragElement.style.marginLeft = '5px';
        else if(parentDroppable)
            dragElement.style.marginLeft = '0';

        // dragElement.style.top = parseInt(dragElement.style.top) + pageYOffset + 'px';

        if(currentDroppable) {
            leaveReciever(currentDroppable);
            currentDroppable.append(event.target);
        } else {
            parentDroppable.append(event.target);
        }


        document.removeEventListener('pointermove', onPointerMove);
        dragElement.removeEventListener('pointerup', onPointerUp);
    }

    function moveAt(clientX, clientY) {
        let newX = clientX - shiftX;
        let newY = clientY - shiftY;

        let newBottom = newY + dragElement.offsetHeight + 4;

        if (newBottom > document.documentElement.clientHeight) {
            let docBottom = document.body.getBoundingClientRect().bottom;

            let scrollY = Math.min(docBottom - newBottom, 10);

            if (scrollY < 0) scrollY = 0;

            // console.log(`docBottom: ${docBottom}; newBottom: ${newBottom}; scrollY: `+scrollY);

            window.scrollBy(0, scrollY);

            newY = Math.min(newY, document.documentElement.clientHeight - dragElement.offsetHeight);
        }

        if (newY < 0) {
            let scrollY = Math.min(-newY, 10);
            if (scrollY < 0) scrollY = 0;

            window.scrollBy(0, -scrollY);
            newY = Math.max(newY, 0);
        }

        if (newX < 8) newX = 8;
        if (newX > document.documentElement.clientWidth - dragElement.offsetWidth) {
            newX = document.documentElement.clientWidth - dragElement.offsetWidth;
        }

        dragElement.style.left = newX + 'px';
        dragElement.style.top = newY + 'px';
    }

    function enterReciever(elem) {
        elem.style.background = 'lightgreen';
        console.log('Enter reciever: ' + elem +" "+ elem.className);
    }

    function leaveReciever(elem) {
        elem.style.background = '';
    }

});