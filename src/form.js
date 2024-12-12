const form = document.getElementById("myForm");


  form.addEventListener("submit", function(event) {
    if(!form.checkVisibility()) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      event.preventDefault();

      const messageSentModal = new  bootstrap.Modal(document.getElementById("message-sent-modal"))
      messageSentModal.show();
    }
    

  });