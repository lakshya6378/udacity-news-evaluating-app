var handleSubmit = async (event)=> {
    event.preventDefault()

    // check what text was put into the form field
    let formText = document.getElementById('name').value
   // Client.checkForName(formText)
   //const formData=new FormData();
  // formData.append('txt',formText);

    console.log("::: Form Submitted :::")
    fetch('http://localhost:8081/test', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: formText }), // Send the text as a JSON object
      }
     )
    .then(res => {
        return res.json()
    })
    .then(function(data) {
        console.log(data)
        const results=document.querySelector('#results');
        results.classList.add('card');
        const heading=document.createElement('h2');
        heading.textContent="evalution results";
        results.append(heading);
       const result= document.getElementById('results');
        const virtualDocument = document.createDocumentFragment();
        const overallheading=document.createElement('h3');
        overallheading.textContent="overall results of text";
        const agreement=document.createElement('div');
        agreement.textContent=`agreement = ${data.agreement}`;

    })
}

export { handleSubmit }
