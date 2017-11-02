var fileOfImages;
const FILE_LIMIT = 5;
var fileCount;
$(init);

function init(){
    fileCount = 0;
    $("#photo-holder").sortable();
    /**
     * Add drop functionality to our holder,
     * This is standard HTML5 File API
     */
    var ignoreDrag = function(e) {
        var event = typeof e.originalEvent != 'undefined' ? e.originalEvent : e;
        if (event.stopPropagation) {
            event.stopPropagation();
        }
        if (event.preventDefault) {
            event.preventDefault();
        }
    };

    $("#holder").bind('dragover', ignoreDrag).bind('dragenter', ignoreDrag).bind('drop', function(e){
        var holder= this;
        e = (e&&e.originalEvent?e.originalEvent:window.event) || e;

        ignoreDrag(e);

        var files = (e.files||e.dataTransfer.files);

        if(fileCount > FILE_LIMIT - 1){
            return false;
        }

        fileCount ++;

        for (var i = 0; i < files.length; i++) {
            (function(i){
                var reader = new FileReader();
                reader.onload = function (event) {
                    let image = createImage(event.target.result);

                    appendImage(image);

                };
                reader.readAsDataURL(files[i]);
            })(i);
        }

        return false;
    });
}

function appendImage(imageChild){
    var parent = document.getElementById("holder");
    parent.appendChild(imageChild);

}

function createImage(theSource){
    var imageChild = document.createElement("IMG");
    imageChild.setAttribute("src", theSource);
    return imageChild;
}