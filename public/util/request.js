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
    $.post('/auto-complete', {suggested: val}, function (result) {
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
 */
function requestProduct(searchValue, appendToProductStream) {
    $.post('/search', {searchKey: searchValue}, function (result) {
        let productJSON = JSON.parse(result);
        appendToProductStream(productJSON);
    });
}
