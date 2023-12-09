rgbImage = imread('ecg.png');
grayImage = rgb2gray(rgbImage); % for non-indexed images
level = graythresh(grayImage); % threshold for converting image to binary, 
binaryImage = im2bw(grayImage, level); 
% Extract the individual red, green, and blue color channels.
redChannel = rgbImage(:, :, 1);
greenChannel = rgbImage(:, :, 2);
blueChannel = rgbImage(:, :, 3);
% Make the black parts pure red.
redChannel(~binaryImage) = 255;
greenChannel(~binaryImage) = 0;
blueChannel(~binaryImage) = 0;
% Now recombine to form the output image.
rgbImageOut = cat(3, redChannel, greenChannel, blueChannel);
imshow(rgbImageOut);