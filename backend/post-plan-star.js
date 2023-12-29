const radioButtons = document.querySelectorAll('input[name="rating"]');

  // Add an event listener to each radio button
  radioButtons.forEach(function(radioButton) {
    radioButton.addEventListener('change', function() {
      // Check which radio button is selected and log its value
      if (this.checked) {
        console.log('Selected rating:', this.value);
      }
    });
  });