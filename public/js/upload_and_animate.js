/**
 * @author aishs8 / https://github.com/aishs8/
 */

/**
 * Returns the Image FileName with extension.
 * @param {string} name -query param Name.
 */
function getImageName ( name ) {
    url = window.location.href;
    name = name.replace( /[\\[\]]/g, "\\$&" );

    var regex = new RegExp ( "[?&]" + name + "(=([^&#]*)|&|#|$)" ),
        results = regex.exec( url );

    if ( !results ) return null;

    if ( !results [ 2 ] ) return '';

    return decodeURIComponent ( results[ 2 ].replace( /\\+/g, " " ) );
}

/**
 * Calculates the Aspect Ratio value.
 * @param {number} width
 * @param {number} height
 */
function calculateAspectRatio( width, height ) {
    var gcdValue = gcd( width, height );

    //Debugger to print aspect Ratio
    console.log("Aspect ratio = ", (width/gcdValue) , ":" , (height/gcdValue));

    return [ ( width / gcdValue ), ( height / gcdValue ) ];
}


/**
 * Calculates the gcd value.
 * @param {number} a
 * @param {number} b
 */
function gcd(a, b) {
    if ( a == 0 || b == 0 )
        return Math.abs( Math.max( Math.abs( a ), Math.abs( b ) ) );

    var result = a % b;

    return (result != 0) ? gcd( b, result ) : Math.abs( b );
}

/*
 * Defines the Animation on screen.
 */
function animate( ){
   setTimeout( function( ) {

        requestAnimationFrame( animate );

    }, 1000 / 5 );

    cube.rotateY( -80); //left
    cube.rotateY( 130); //front
    cube.rotateY( 80); //right

  renderer.render(scene, camera);
};


/*
 * Reads the imageName from the Query Params
 */

//Default imagePath
var imagePath = '/uploads/' + 'pic_mountain.jpg';

//Get the imageName and construct imagePath from the query params.
var imageName = getImageName( 'image' );
if ( imageName ){
    imagePath = '/uploads/' + imageName;
}


/**
 * Calculates the dimension of the cube to load the image.
 */
 var cubeDimensions = [ 1, 1, 1];
 var loadImage = new Image ( );
 loadImage.src = imagePath;

 console.log(loadImage.width, loadImage.height);
 var aspect_ratio = calculateAspectRatio( loadImage.width, loadImage.height );

 //Updates the width of the cube when aspect_ratio is not None.
 if ( ! isNaN ( aspect_ratio [ 0 ] ) && ! isNaN ( aspect_ratio [ 1 ] ) ) {
     var width = aspect_ratio[ 0 ] / aspect_ratio[ 1 ];
     cubeDimensions[0] = width;
 }
 console.log(cubeDimensions);


/**
 *
 * Creates a scene, camer and render to display the animated image.
 */

//Creates the Scene instance.
var scene = new THREE.Scene( );

//Creates and positions the Camera instance
var camera = new THREE.PerspectiveCamera( 20, window.innerWidth / window.innerHeight, 1, 1000 );
camera.position.set(0, 0, 5);
camera.lookAt(scene.position);

//Creates an instance of the Renderer.
var renderer = new THREE.WebGLRenderer( );

//Full screen rendering
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );


/**
 * Creates a mesh in the form of Cube and loads the image.
 */

var geometry = new THREE.BoxGeometry( cubeDimensions[0], cubeDimensions[1], cubeDimensions[2] );
var imageTexture = THREE.ImageUtils.loadTexture( imagePath );
var material = new THREE.MeshBasicMaterial( { map: imageTexture } );

var cube = new THREE.Mesh( geometry, material );
scene.add( cube );

/**
 * Calls the anmiate function to render the animation.
 */

animate();
