% Define time vector
t = 0:0.01:2*pi;

% Generate a sine wave
y = sin(t);

% Add random noise to the sine wave
y_noisy = y + 0.1*randn(size(t));

% Plot the clean sine wave
figure;
plot(t, y, 'LineWidth', 2);
hold on;

% Plot the noisy sine wave
plot(t, y_noisy, '--', 'LineWidth', 2);
legend('Clean Signal', 'Noisy Signal');
title('Sine Wave with Noise');
xlabel('Time (seconds)');
ylabel('Amplitude');
grid on;

% Calculate the mean of the noisy signal
mean_val = mean(y_noisy);

% Display the mean value in the command window
disp(['Mean value of the noisy signal: ', num2str(mean_val)]);

% Demonstrate a basic for loop and if statement
for i = 1:length(y_noisy)
    if y_noisy(i) > 0.5
        % Display the first time the noisy signal exceeds 0.5
        disp(['Noisy signal first exceeds 0.5 at t = ', num2str(t(i)), ' seconds']);
        break; % Exit the loop after finding the first instance
    end
end
