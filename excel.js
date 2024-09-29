const $ = el => document.querySelector(el)
const $$ = el => document.querySelectorAll(el)

//Filas y columnas 

const ROWS = 10
const COLUMS = 10

// Utilidad  dibujar las columnas dentro del body 

const range = length => Array.from({ length }, (_, i)=>i)
const renderSpreadsheets = () =>{
    const $table = $('table')
    const $body = $('tbody')
    const $head = $('thead')

    const headerHTML = `<tr>
        <th></th>
        ${range(COLUMS).map(i => `<th>${i}</th>`).join('')}
    </tr>`
    $head.innerHTML = headerHTML
    
    const bodyHTML = range(ROWS).map(row =>{return `<tr>
        <td> ${row +1 }</td>
         ${range(COLUMS).map(column=>`
            <td data-x="${column}" data-y = ${ROWS}">
                <span></span>
                <input type="text" value=""/>
            </td>
            `).join('')}
    </tr>`}).join('')
    //Se dibujo la fila en el td, contando un total de 10 , se realiza ultimo join para quitar las comas separadoras y dentro del th se dibujaron las columnas. 

    $body.innerHTML = bodyHTML

}
renderSpreadsheets()