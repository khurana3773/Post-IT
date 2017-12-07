/**
 * Enable request from server
 * Mainly for database request
 *
 * This page uses jQuery for request
 */

/**
 * Request auto complete data from server
 * The response must be an array
 *
 * Example:
 *
 * $(selector).post("url", data, callback)
 */
function requestAutoComplete(val, setCompleteSearchBox){
    $.get('/auto-complete', {suggested: val}, function (result) {
        let source = JSON.parse(result);
        setCompleteSearchBox(source);
    });
}

/**
 * Request a product
 * The return must be a JSON
 * A product:
 *  {
 *      img (the image)
 *      userId (Who posted this)
 *      tag (what kind of category)
 *      timestamp (when was this posted)
 *      keywords (the keywords that users added)
 *      location (the location users want to sell at)
 *  }
 *
 *
function requestProduct(searchValue, appendToProductStream) {
    $.get('/search', {searchKey: searchValue}, function (result) {
        // the result will be a string array
        // as a search could return more than one item
        let productList = JSON.parse(result);
        // loop through
        for(let i = 0; i < productList.length; i++){
            appendToProductStream(productList[i]);
        }

    });
}*/


function requestProductPopup(id, callback) {
    $.post('/popup', {id: id}, function (result) {
        callback(JSON.parse(result));
    });
}

/**
 * Contact back end
 * @param id
 */
function removeItemFromWishList(id){

}

/**
 * Contact back end
 * @param id
 */

function appendItemToWishList(id) {


}