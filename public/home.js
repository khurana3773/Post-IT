/**
 * Created by Suraj on 12/6/2017.
 */

var dropdownShowing = false;
var userLoggedIn = false;
var interval=null;
var orig_img1=null;
var id= null;
var price= "0";
var maindiv= null;
var searchbox= false;
var searchvalue= null;
var slideIndex=1;
$(init);
function init() {

    initCompleteSearchBox();
    initProductSteamLocation();
    initShoppingList();
    initList();
    initSearchBox();
    getScrollData();

    $("#popup").hide();
    $(".dropdown-content").hide();
    $("#alt-view").hide();
    $("#shopping-list").hide();
    $("#overLay").hide();


    $("#slider").slider({max: 1000, value:0,step:10});
    $("#slider").slider({stop: handleSliderValue});

    $(window).resize();
    //clear featured values
    resetFeature();
    initLogin();
}

function initLogin(){

    let userId = getCookie("userId");

    if(userId){
        userLoggedIn = true;
        $("#login").hide();
        $("#sign-out").show();
    }else{
        userLoggedIn = false;
        $("#sign-out").hide();
        $("#login").show();
    }
}

function onSignOut() {
    if(userLoggedIn){
        $("#sign-out").hide();
        $("#login").show();
        userLoggedIn = false;
        deleteCookie("userId");
    }

}

/**
 * Set event for categories.
 */
function setCategoriesEvent( idd){
    id = idd;
    searchvalue = null;
    searchbox = false;
    searchForCategory();
}


function getScrollData(){
          $.ajax({
              url: ("http://" + $(location).attr('host')) + "/scrollData",
              //data: "",
              type: 'GET',
              contentType: 'application/json'
              ,

              success: function (result) {
                  if ($.trim(result)) {
                      postsJSON = JSON.parse(result);
                      console.log("starting json reading");
                      console.log(postsJSON);
                      for (let i = 0; i < postsJSON.length; i++) {
                          let postJSON = postsJSON[i];
                          if (postJSON !== null) {
                              loadPostToScroll(postsJSON[i]);
                          }
                      }
                  }
              }
            });
        }


        function loadPostToScroll(postJSON){
          //var title = $("<p></p>");
          var title = $("<marquee></marquee>");
          title.attr("behavior","scroll");
          title.attr("direction","up");
          title.attr("direction","up");
          title.height("80").width("80%");
          //title.attr("height","10");

          title.attr("id", postJSON._id + "title");
          title.text(postJSON.title);
          var newdiv = $("<br><p>Price: $");
          var newdiv2 = $("</p></br>");
          title.append(newdiv);
          title.append(postJSON.price);
          title.append(newdiv2);
          title.css("text-align","center");
          $("#scroll-text").append(title);
        }


/**
 * Resets variable, products list and feature variables
 */
function resetFeature(){        	if(id){

    $("#flabel1").html("");
    $("#flabel2").html("");
    $("#featured img").removeAttr('src');
    $("#flabel1").removeAttr("class","script1");
    $("#flabel2").removeAttr("class","script2");
    $("#ftitle").removeAttr("class","shadow text2");
    $("#fprice").removeAttr("class","shadow text3");
    $("#ftitle").html("");
    $("#fprice").html("");
    $("#featured").css('background-color','#e0e0dd');
    $("#featured div")[0].style.backgroundColor='#e0e0dd';
    $("#featured div")[1].style.backgroundColor='#e0e0dd';
    $("#featured div")[0].style.display='block';
    $("#featured div")[1].style.width='50%';
}
    $("#products-list").empty();
}

/**
 * Gets products with category from database.
 * Update product stream
 */
function searchForCategory() {
    id = $(this).attr('id');
    $("#products-list").empty();
    resetFeature();
    $.ajax({
        url: ("http://" + $(location).attr('host')) + "/category",
        data: "type=" + id + ",price:" + price,
        type: 'GET',
        contentType: 'application/json'
        ,
        success: function (result) {
            if ($.trim(result)) {
                postsJSON = JSON.parse(result);
                for (let i = 0; i < postsJSON.length; i++) {
                    let postJSON = postsJSON[i];
                    if (postJSON !== null) {
                        if(i===0){
                            featurefill(postsJSON[i]);
                        }
                        loadPostToList(postsJSON[i]);
                    }
                }
            }
        }
    });
}

//Creates elements and set their values and styling
function loadPostToList(postJSON) {
    var li = $("<li></li>");

    var div1 = $("<div></div>");
    div1.attr("id",postJSON._id +"detail");
    div1.css("display","block");


    var d = postJSON._id + "div";

    //   var div = $("<div onmouseover=\"over(this)\" onmouseout=\"out(this)\" )\"></div>");
    var div = $("<div onmouseover=\"over(this)\" onmouseout=\"out(this)\" )\"></div>");
    div.data("allInfoJson",postJSON);

    div.draggable({helper: 'clone'});
    div.attr("class", "product");
    div.attr("id", postJSON._id + "div");
    //  $("#products-list").on("DOMNodeInserted", ".product", function() { $(this).draggable(); });

    var title = $("<p></p>");
    title.attr("id", postJSON._id + "title");
    title.addClass("productTitle");
    title.text(postJSON.title);
    title.css("text-align","center");
    title.css("overflow","hidden");
    title.css("white-space","nowrap");
    title.css("text-overflow", "ellipsis");

    var img_1 = $("<img></img>");
    img_1.attr("src",postJSON.img1);
    img_1.attr("class","pic");
    img_1.height("100").width("80%");
    img_1.attr("id","img1");

    img_1.on("error", function(){
        if(this.src !== './img/NoImage.png' || this.src !== 'null') this.src = './img/NoImage.png';
    });

    var img_2 = $("<img></img>");
    img_2.attr("src",postJSON.img2);
    img_2.height("100").width("80%");
    img_2.attr("class","pic");
    img_2.css("display","none");

    var img_3 = $("<img></img>");
    img_3.attr("src",postJSON.img3);
    img_3.height("100").width("80%");
    img_3.attr("class","pic");
    img_3.css("display","none");

    var desc = $("<p></p>");
    desc.attr("id", postJSON._id + "desc");
    desc.text(postJSON.about);
    desc.css("text-align","center");
    desc.css("overflow","hidden");
    desc.css("white-space","nowrap");
    desc.css("text-overflow", "ellipsis");

    var price = $("<p></p>");
    price.attr("id", postJSON._id + "price");
    price.text("$ " +postJSON.price);
    price.css("text-align","center");

    var div2 = $("<div></div>");
    div2.css("text-align","center");

    var clickME = $("<button onclick=\"onPop()\"></button>");
    clickME.text("Click Me for more!");
    clickME.css("text-align","center");
    clickME.css("visibility","hidden");

    var loc =$("<a></a>");
    loc.text("Location");
    loc.attr("id", postJSON._id + "loc");
    loc.attr("href","");
    loc.attr("target","_blank");
    loc.css("text-align","left");
    loc.css("display","none");
    loc.css("font-weight","bold");
    getLatitudeLongitude(postJSON.location,postJSON._id + "loc" );

    var contact = $("<a></a>");
    loc.text("Contact");
    contact.attr("id", postJSON.userId);
    contact.attr("subject", "Re:"+postJSON.title+"("+postJSON.type+")");
    contact.css("text-align","right");
    contact.css("display","none");

    li.append(div);
    div.append(title);
    div.append(img_1);
    if ($(img_2).src!== "" ||$(img_2).src!== "null"||$(img_2).src!== null)
        div.append(img_2);
    if ($(img_3).src!== "" ||$(img_3).src!== "null"||$(img_3).src!== null)
        div.append(img_3);

    div.append(price);
    div.append(div1);
    div1.append(desc);
    div1.append(div2);
    div2.append(clickME);
    div1.append(loc);
    div1.append(contact);

    $("#products-list").append(li);
}

//used to generate div for wishlist
function  generateDivForWishlist(postJSON)
{
//            alert("in Generate Div");
//            alert(JSON.stringify(postJSON));
//           alert((postJSON));

    var mainDiv = $("<div></div>");
    mainDiv.attr("class","mainDivPostWishlist");
    mainDiv.data("allInfoJson",postJSON);
    mainDiv.click(function () {
        onPop2($(this).data("allInfoJson"))
    });

    var deleteButton = $("<a>X</a>");
    deleteButton.attr("class","deleteFromWishlist");







    //make 2 divs ,one for image one for content
    var imageDiv = $("<div></div>");
    imageDiv.attr("class","imgDivPostWishlist");

    var contentDiv = $("<div></div>");
    contentDiv.attr("class","contentDivPostWishlist");

    //add image to image div


    var img_1 = $("<img/>");
    img_1.attr("class","imgPostWishlist");
    try {
        if(postJSON['img1']=="")
        {
            img_1.attr("src",'./img/NoImage.png');
        }
        else {
            img_1.attr("src", postJSON['img1']);
        }
    }
    catch(err) {
        img_1.attr("src",'./img/NoImage.png');
    }






    imageDiv.append(img_1);

    //add content to contentdiv
    var title = $("<p></p>");
    //      title.attr("id", postJSON._id + "title");
    title.addClass("contentPostWishlist");
    title.text(postJSON['title']);


    $(contentDiv).append(title);


    deleteButton.click(function (event) {
        event.stopPropagation();
        let mainDivToDelete =$(this).closest('.mainDivPostWishlist');
        let postJSONToDelete = mainDivToDelete.data('allInfoJson');

        // backend need postId parameter
        postJSONToDelete['postId'] = postJSONToDelete['_id'];

        deletePostFromWishlist(postJSONToDelete);
        $(mainDivToDelete).fadeOut("slow",function () {
            $(mainDivToDelete).remove();
        })
        alertify.success("Post Removed from WishList");


    });

    $(contentDiv).append(deleteButton);



    $(mainDiv).append(contentDiv);
    $(mainDiv).append(imageDiv);


    return mainDiv;
}
//deletes a post from wishlist, json should have ID of the post as '_id'.
function deletePostFromWishlist(postJSONToDelete)
{
    $.ajax({
        url: ("http://" + $(location).attr('host')) + "/delete-post-wishlist",
        data: postJSONToDelete ,
        type: 'POST',
        success: function (result) {
            console.log("deleted from wishlist");
        }
    });
}


// To fill the Feature content with first json object if any
function featurefill(postJSON) {

    if (postJSON.img1.length > 2) {
        $("#featured img").attr("src", postJSON.img1);

    } else {
        $("#featured div")[0].style.display="none";
        $("#featured div")[1].style.width="100%";
    }
    $("#flabel1").html("Featuring");
    $("#flabel2").html("Browse below for more!");
    $("#ftitle").html(postJSON.title);
    $("#fprice").html("For only $"+ postJSON.price);

    $("#flabel1").attr("class","script1");
    $("#flabel2").attr("class","script2");
    $("#ftitle").attr("class","shadow text2");
    $("#fprice").attr("class","shadow text3");
    $("#featured").css('background-color',' #52a5c3');
    $("#featured div")[0].style.backgroundColor='#52a5c3';
    $("#featured div")[1].style.backgroundColor=' #52a5c3';
}

function displayNextImage() {
    x = (x === images.length - 1) ? 0 : x + 1;
    document.getElementById("img").src = images[x];
}

function displayPreviousImage() {
    x = (x <= 0) ? images.length - 1 : x - 1;
    document.getElementById("img").src = images[x];
}

function startTimer() {
    setInterval(displayNextImage, 3000);
}

var images = [], x = -1;
images[0] = "image1.jpg";
images[1] = "image2.jpg";
images[2] = "image3.jpg";

// Search bar event listener once return/enter key pressed
function initSearchBox() {
    $("#search-bar").keyup(function(event){
        if(event.keyCode === 13){
            //TODO: Enable search from database
            searchValue = $("#search-bar").val();
            console.log("inside Searchbox"+searchValue);
            if(!searchValue){
                // shake it
                $("#search-bar").effect("shake", {times: 4, distance: 10}, 1000);
                return;
            }
            else{
                //clear search bar value
                console.log("Before calling "+searchValue);
                price= "0";
                //resetFeature();
                requestProduct(searchValue);
                $("#search-bar").val("");
            }
        }
    });
}

//Updates product view once return/enter key pressed on search bar
function requestProduct(searchVal) {
	console.log("inside request"+searchVal);
    searchvalue = searchVal;
    searchbox = true;
    id = $(this).attr('id');
    $("#products-list").empty();
    resetFeature();
    console.log("inside request"+searchvalue);
    $.ajax({
        url: ("http://" + $(location).attr('host')) + "/search",
        data: "search=" + searchvalue + ",price:" + price,
        type: 'GET',
        contentType: 'application/json'
        ,
        success: function (result) {
            if ($.trim(result)) {
                postsJSON = JSON.parse(result);
                for (let i = 0; i < postsJSON.length; i++) {
                    let postJSON = postsJSON[i];
                    if (postJSON !== null) {
                        if(i===0){
                            featurefill(postsJSON[i]);
                        }
                        loadPostToList(postsJSON[i]);
                    }
                }
            }
        }
    });

}


function errorHandler () {
    $('img').error( handleError);
}

function handleError (){
     this.src = './img/NoImage.png';
}


function toggleWishList() {

    if(userLoggedIn) {
        $("#shopping-list").find('p').css("line-height",($("#nav").height()+"px"));
        $('#shopping-list').toggle("slide", {direction:'right'});
    }
    else
    {
        window.location.href = "login.html";
    }

}

function initShoppingList(){

    let userId = getCookie("userId");

    $("#wishListButton").click(toggleWishList);

    var dataPost={
        "userId" : userId
    };

   // $("#shopping-list").draggable();
   //  $("#shopping-list").resizable({
   //      handles: 'n, e, s, w'
   //  });
   //  $("#dragTest").draggable({  revert: "invalid" });

    $("#shopping-list").droppable(
        {
            over: dragObject
        }
    );



    // $("#shopping-list").position({
    //     my:        "right top",
    //     at:        "right bottom+30px",
    //     of:        $("#nav"),
    //     collision: "fit"
    //
    //
    // });

//     $("#deleteProductBtn").bind("click", function () {
//         var deleteWishListData=[];
//
//         $(".yellow").each(function (index) {
//             let eachData = {};
//             eachData['postId'] = $(this).data("dbId");
//
//             deleteWishListData.push(eachData);
//             $.ajax({
//                 url: ("http://" + $(location).attr('host')) + "/delete-post-wishlist",
//                 data: eachData ,
//                 type: 'POST',
//                 success: function (result) {
//                     console.log("deleted from wishlist");
//                 }
//             });
//         })
//         $(".yellow").remove()
//
//         //console.log(JSON.stringify(deleteWishListData));
//
// //
// //                $.ajax({
// //                    url: ("http://" + $(location).attr('host')) + "/delete-post-wishlist",
// //                    data: deleteWishListData,
// //                    type: 'POST',
// //                    success: function (result) {
// //                        console.log("deleted from wishlist");
// //                    }
// //                });
// //                 $(".yellow").remove()
//     });

    $.ajax({
        url: ("http://" + $(location).attr('host')) + "/get-wishlist-posts",
        data: dataPost ,
        type: 'GET',
        contentType: 'application/json'
        ,
        success: function (result) {
            if ($.trim(result)) {
                console.log("inside wishlist: " + result);
                let wishListItems = JSON.parse(result)


                $.each(wishListItems, function(i, item) {
                    let wishListItem =  wishListItems[i];
                    wishListItem['_id'] = wishListItem['postId']

                    $.ajax({
                        url: ("http://" + $(location).attr('host')) + "/get-post",
                        data: wishListItem ,
                        type: 'GET'
                        ,
                        success: function (result) {

                            let  responseJSON = JSON.parse(result);
                            if(responseJSON.length==0)
                            {
                                deletePostFromWishlist(wishListItem);
                                alert("One of your Wishlisted Post No Longer Exists.");
                                return true;
                            }


                            //   wishListAllItems.push(wishListItem);
                            //add eachloop
                            //   createListView(wishListAllItems);

                            createListView2(responseJSON[0]);

                        }
                    });
                });


            }
        }
    });


}

function initList() {
    $(".product").draggable({ revert: 'invalid' });

    $(".product").css("zIndex", 2);
}

/**
 * Handles what happens when user decides to add product to list.
 * Wish List/Shopping List UI is a list view. Is link to product.
 */
function dragObject(event, ui){
    //$("#product").remove();

    wishListAllItems=[];
    let product = $(ui.draggable).clone();
    //  $(product).clone();
    let productTitle = $(product).children('.productTitle');
//            alert(productTitle.text())
    var wishListItem = {};
    wishListItem['title'] = productTitle.text();


    let id = $(ui.draggable).attr("id");

    id = id.substring(0,id.length-3)
    wishListItem['postId']=id;
    // alert(id.substring(0,id.length-3));


    $.ajax({
        url: ("http://" + $(location).attr('host')) + "/add-post-wishlist",
        data: wishListItem ,
        type: 'POST'
        ,
        success: function (result) {

            responseJSON = JSON.parse(result);
            if(responseJSON.alreadyExists=='yes')
            {
                alertify.success("This post Already Exists in your WishList");

            }else
            {
                wishListItem['_id'] = wishListItem['postId']
                $.ajax({
                    url: ("http://" + $(location).attr('host')) + "/get-post",
                    data: wishListItem ,
                    type: 'GET'
                    ,
                    success: function (result) {

                        let  responseJSON = JSON.parse(result);
                        createListView2(responseJSON[0]);

                    }
                });
            }
        }
    });





    //todo : intimate customer about item already being in wishlist
//            $.post( '/add-post-wishlist', wishListItem,function(data) {
//                    alert("finished call");
//                    alert(JSON.stringify(data));
//                    var exists = data.alreadyExist;
//                    if(exist.toString().trim()==='yes'.trim())
//                    {
//                        wishListAllItems.push(wishListItem);
//                        createListView(wishListAllItems);
//                    }
//                    else
//                    {
//                        alert("else condition");
//                    }
//
//                } , 'application/json'
//            );


}


function createListView2(prodJson) {
    let div = generateDivForWishlist(prodJson);
    $("#shopping-list").append(div);
}

function createListView(productJSON) {
    //var data = productJSON;
    $.each(productJSON, function(i, item) {

        let title = $("<p></p>");
        title.text(item['title']);

        let anItem = $("<li></li>");
        anItem.bind("click", function(){
            $(this).toggleClass('yellow');
            //console.log($(this).data("dbId"));
        });

        anItem.data("dbId",String(item['postId']));

        anItem.append(title);
        $("#list").append(anItem);
    });
}

//todo: use this method instead of calling all functionality in dragobject
/**
 * Add product id into user's shopping list
 * MongoDB
 */
function appendProduct(productId) {


}

/**
 * Filters products currently on stream by miles
 */
function handleSliderValue(event, ui) {
    price = ui.value;
    $( "#p-distance" ).text( "Min Price $ "+ui.value );
    if (!searchbox){
        searchForCategory();
    }else{
        requestProduct(searchvalue);
    }
}

// Will dynamically generate search bar population with ajax from our database
function initCompleteSearchBox(){
    $("#search-bar").keyup(function () {
        let val = $("#search-bar").val();
        requestAutoComplete(val, setCompleteSearchBox);
    });
}

// search input is an array
function setCompleteSearchBox(searchInput){
    $("#search-bar").autocomplete({
        source: searchInput
    });
}

/**
 * Add productJSON to product stream
 */
function appendToProductStream(productJSON){
    var unorderList = document.getElementById("products-list");
    // append to list
    // tester
    alert(productJSON.location);
}
/**
 * Dynamically centers product streams
 */
function initProductSteamLocation() {
    $(window).resize(function(){
        $('#products').css({
            position:'absolute',
            left: ($(window).width() - $('#products').outerWidth())/2,
            top: 70
        });
    });
}

function fetchPopupInfo(){
    requestProductPopup('tester', onPopUp);
}
/**
 * Enables pop up on background
 */
function onPopUp(popupJSON) {
    $("#popup").toggle();
    $("#overLay").toggle();
    let addressJSON = popupJSON.address;
    displayLocation(addressJSON);
    // should be able to undo pop up
    enableRemovePopUp();
}
/**
 * Enable to hide pop up
 */
function enableRemovePopUp() {
    let overlay = document.getElementById("overLay");
    /**
     * Disable pop up on background
     */
    overlay.onclick = function () {
        $("#popup").toggle();
        $("#overLay").toggle();
    }
}

function dropdownAnimateDown() {
    if(dropdownShowing){
        $('.dropdown-content').slideUp("medium");

    }else{
        $('.dropdown-content').slideDown("medium");
    }

    dropdownShowing = !dropdownShowing;
}


function loadToPopUp(productJSON) {

}

function loadNagBar() {

}

/**
 * Allows drop down /expansion effect
 * once user hovers on a product
 */
function over(e) {

    maindiv=e;
    orig_img1	=null;
    //var d= document.getElementById(e.id).getElementsByTagName("div")[0];
    //d.style.display="block";
    var images = [],
        x = 0;
    var buttonclick= document.getElementById(e.id).getElementsByTagName("button")[0];
    buttonclick.style.visibility="visible";
    var image= document.getElementById(e.id).getElementsByClassName("pic");
    $.each( image,function(index, value){
        if( value.currentSrc!=="" && value.currentSrc!== null  && value.currentSrc!== "null"){
            images[x]=value.src;
            x++;
        }
    });

    var $img = $("#"+e.id+' #img1'), i = 0, speed = 200;
    orig_img1=images[0];
    // Only if there are more than 1 images, allow pics to keep changing in every 3secs.
    if(images.length>1)
        interval=window.setInterval(function() {
            $img.fadeOut(speed, function() {
                $img.attr("src", images[(++i % images.length)]);
                $img.fadeIn(speed);
            });
        }, 1500);
}
/**
 * Allows unsettin of intervals if set for the product.
 * and undo the expansion effect
 */
function out(e) {
    var buttonclick= document.getElementById(e.id).getElementsByTagName("button")[0];
    buttonclick.style.visibility="hidden";
    if (interval!==null){
        clearInterval(interval);
        interval=null;
        var $img = $("#"+e.id+' #img1');
        $img.attr("src", orig_img1);

    }
    orig_img1=null;
    maindiv=null;
}

/**
 * Allows complete view of a product as poped-up alternative view
 */
function onPop() {

    $("#alt-view").toggle();
    $("#overLay").toggle();
    var d= document.getElementById(maindiv.id);
    var p=d.getElementsByTagName("p");
    var div1=d.getElementsByTagName("div")[0];
    var loc= div1.getElementsByTagName("a")[0];
    var contact= div1.getElementsByTagName("a")[1];
    var image= d.getElementsByClassName("pic");
    $(".mypics").remove();
    if(orig_img1!==null)
        out(maindiv);
    $.each( image,function(index, value){
        if( value.currentSrc!=="" && value.currentSrc!== null  && value.currentSrc!== "null"){
            var img = $("<img></img>");
            img.attr("src",value.src);
            img.height("300px").width("300px");
            img.css("margin","auto");
            img.attr("class","mypics");
            $("#first").before(img);
            x++;

        }
    });
    slideIndex = 1;
    showSigns(slideIndex);
    $("#poptitle").text(p[0].innerHTML);
    $("#popprice").text("Price: "+ p[1].innerHTML);
    $("#popdesc").text(p[2].innerHTML);
    if(userLoggedIn) {
        $(".validuserenable").css("visibility","visible");
        $("#poploc").attr("href", loc.href);
        $.ajax({
            url: ("http://" + $(location).attr('host')) + "/email",
            data: "id=" + contact.id,
            type: 'GET',
            contentType: 'application/text'
            ,
            success: function (result) {
                if ($.trim(result)) {
                    $("#popcontct").attr("href", "mailto:" + result);

                }
            }
        });
    }
    else{
        $(".validuserenable").css("visibility","hidden");
    }
    // should be able to undo pop up

    removePop();
}


function onPop2(postJSON) {

    $("#alt-view").toggle();
    $("#overLay").toggle();

    image = []
    image.push(postJSON['img1'])
    image.push(postJSON['img2'])
    image.push(postJSON['img3'])



    $(".mypics").remove();

    $.each( image,function(index, value){
        //fix if no image is present, this will display no image in alt-view
        if(index==0 && value=="")
        {
            value="./img/NoImage.png";
        }

        if( value!=="" && value!== null  && value!== "null" ){
            var img = $("<img></img>");
            img.attr("src",value);
            img.height("300px").width("300px");
            img.css("margin","auto");
            img.attr("class","mypics");
            $("#first").before(img);
            x++;
        }
    });
    slideIndex = 1;
    showSigns(slideIndex);
    $("#poptitle").text(postJSON['title']);
    $("#popprice").text("PRICE : $"+postJSON['price']);
    $("#popdesc").text(postJSON['about']);
    if(userLoggedIn) {
        $(".validuserenable").css("visibility","visible");
        var address={}
        address['street'] = postJSON['street']
        address['city'] = postJSON['city']
        address['zip'] = postJSON['zip']
        address['state'] = postJSON['state']

        getLatitudeLongitude(address,'poploc');

        // $("#poploc").attr("href", loc.href);

        $.ajax({
            url: ("http://" + $(location).attr('host')) + "/email",
            data: "id=" + postJSON['userId'],
            type: 'GET',
            contentType: 'application/text'
            ,
            success: function (result) {
                if ($.trim(result)) {

                    $("#popcontct").attr("href", "mailto:" + result);

                }
            }
        });
    }
    // should be able to undo pop up

    removePop();
}




/**
 * Enable to hide pop up
 */
function removePop() {
    let overlay = document.getElementById("overLay");
    /**
     * Disable pop up on background
     */

    overlay.onclick = function () {
        $("#alt-view").toggle();
        $("#overLay").toggle();
    }
}

function plusDivs(n) {
    showSigns(slideIndex += n);
}

function showSigns(n) {
    var i;
    var x = document.getElementsByClassName("mypics");
    if (n > x.length) {slideIndex = 1}
    if (n < 1) {slideIndex = x.length}
    for (i = 0; i < x.length; i++) {
        x[i].style.display = "none";
    }
    x[slideIndex-1].style.display = "block";
}
