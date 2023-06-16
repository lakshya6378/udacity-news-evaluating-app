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
        const previous=document.querySelector('#results');
        if(previous)
        {
            previous.innerHTML="";
        }
        
        const results=document.querySelector('#results');
        results.classList.add('card');
        const heading=document.createElement('h2');
        heading.textContent="evalution results";
        results.append(heading);
        const virtualDocument = document.createDocumentFragment();
        const result= document.getElementById('results');
        const overallheading=document.createElement('h3');
        overallheading.textContent="overall results of text";
        result.append(overallheading);
        const agreement=document.createElement('div');
        agreement.textContent=`agreement = ${data.agreement}`;
        virtualDocument.appendChild(agreement)
        const irony=document.createElement('div');
        irony.textContent=`irony = ${data.irony}`;
        virtualDocument.append(irony)
        const polarity=document.createElement('div');
        polarity.textContent=`polarity = ${data.score_tag}`;
        virtualDocument.append(polarity);
        // Create a table
const table = document.createElement('table');

// Create the table header (thead) and its row (tr)
const thead = document.createElement('thead');
const headerRow = document.createElement('tr');

// Create header cells (th) and set their text content
const header1 = document.createElement('th');
header1.textContent = 'Text';
header1.classList.add('Text');
const header2 = document.createElement('th');
header2.textContent = 'polarity';
header2.classList.add('polarity');
const header3 = document.createElement('th');
header3.textContent = 'Agreement';
header3.classList.add('agreement');
const header4 = document.createElement('th');
header4.textContent = 'Confidence';
header4.classList.add('confidence');

// Append header cells to the header row
headerRow.appendChild(header1);
headerRow.appendChild(header2);
headerRow.appendChild(header3);
headerRow.appendChild(header4);

// Append the header row to the table header (thead)
thead.appendChild(headerRow);
table.appendChild(thead);
// Create the table body (tbody)
const tbody = document.createElement('tbody');

// Create data rows (tr) and their cells (td)
for(let i=0;i<data.sentence_list.length;i++)
{
const row = document.createElement('tr');
const cell1 = document.createElement('td');
cell1.textContent =data.sentence_list[i].text;
const cell2 = document.createElement('td');
cell2.textContent = data.sentence_list[i].score_tag;
const cell3 = document.createElement('td');
cell3.textContent = data.sentence_list[i].agreement;
const cell4 = document.createElement('td');
cell4.textContent = data.sentence_list[i].confidence;
row.appendChild(cell1);
row.appendChild(cell2);
row.appendChild(cell3);
row.appendChild(cell4);
tbody.appendChild(row);
}

table.appendChild(tbody);
virtualDocument.append(table);
result.append(virtualDocument);
    })
}

export { handleSubmit }
