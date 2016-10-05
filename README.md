# node_js_upload_and_animate

This is a mini project to learn and use Nodejs and Threejs technologies.
This website uploads and animates the uploaded image.

Build Project: npm install

Run Server: node index.js


* Node.js, Three.js and Jade templates were used for this project.
* The website allows the user to upload an image from the hard drive via the index page. http://localhost:3000/
* After a successful upload, the user is redirected to http://localhost:3000/cube?image=pic_mountain.jpg where the image rotates in the form of the cube based on the aspect_ratio. The image source is provided via the query param.
* If the image is not rendered in the correct aspect_ratio, please refresh the page to get the correct aspect_ratio.
* This url can be accessed by anyone when deployed.
* The uploaded images can be located at /public/uploads folder.

00_upload_file.png and 01_animation_of_img.png are some screenshots for reference.

Known Issues:
I am working on fixing the following known issues.
* If the image is not rendered in the correct aspect_ratio, please refresh the page to get the correct aspect_ratio.
* The correct image name has to be passed in the query param. If the image is missing in public/uploads directory, it will display a blank page. If no query param is passed, it displays an animated image of pic_mountain.jpg. By default, pic_mountain.jpg will be present in /public/uploads folder.
* This project contains some deprecated modules which needs to be updates to new modules. 
