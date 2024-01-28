rgbImage = imread('ecg.png');
grayImage = rgb2gray(rgbImage); % for non-indexed images
level = graythresh(grayImage); % threshold for converting image to binary, 
binaryImage = im2bw(grayImage, level); 
% Extract the individual red, green, and blue color channels.
redChannel = rgbImage(:, :, 1);
greenChannel = rgbImage(:, :, 2);
blueChannel = rgbImage(:, :, 3);
for i = 1:length(a_values)
        a = a_values(i);

        for j = 1:length(b_values)
            b = b_values(j);

            [segments_x, segments_y, num_segments] = segmented_devils_curve(a,b); %get from calulation function
            color = rand(1, 3); % Random color for each calculated value
            
            for k = 1:num_segments
                if k == 1
                    plot(segments_x{k}, segments_y{k}, 'b', 'LineWidth', 2, 'Color', color, 'DisplayName', ['a = ' num2str(a) ', b = ' num2str(b)]); %plot with enty
                else
                    plot(segments_x{k}, segments_y{k}, 'b', 'LineWidth', 2, 'Color', color, 'HandleVisibility', 'off'); %plot without entry
                end
            end
            
        end
    end

    
redChannel(~binaryImage) = 255;
greenChannel(~binaryImage) = 0;
blueChannel(~binaryImage) = 0;
% Now recombine to form the output image.
rgbImageOut = cat(3, redChannel, greenChannel, blueChannel);
imshow(rgbImageOut);

% same thing