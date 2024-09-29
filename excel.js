const $ = el => document.querySelector(el)
const $$ = el => document.querySelectorAll(el)
const $table = $('table')
const $body = $('tbody')
const $head = $('thead')
//Filas y columnas 
const ROWS = 30
const COLUMS = 21
const FISTR_CHAR = 65
// Utilidad  dibujar las columnas dentro del body 

const times = length => Array.from({ length }, (_, i)=>i)
const getColumn = i => String.fromCharCode(FISTR_CHAR + i)
// variables 
let STATE = times(COLUMS)
.map(i => times(ROWS).map(j => ({computedValue: '', value: '' })))

console.log(STATE)

function updateCell ({x, y, value}){
    //copia profunda del Array STATE 
    const newState = structuredClone(STATE)
    const cell = newState[x][y]
    const computedValue = Number(value)

    cell.value = value //input
    cell.computedValue = computedValue //Span

    newState[x][y] =cell

    STATE = newState

    renderSpreadsheets()
}

const renderSpreadsheets = () =>{
    const headerHTML = `<tr>
        <th></th>
        ${times(COLUMS).map(i => `<th>${getColumn(i)}</th>`).join('')}
    </tr>`
    //Se crea las columnas con el codigo de la letra, en este caso dibuja un array desde la posicion 65 = A hasta el valor que determinemos en en la constante COLUMNS
    $head.innerHTML = headerHTML
    
    const bodyHTML = times(ROWS).map(row =>{return `<tr>
        <td> ${row +1 }</td>
         ${times(COLUMS).map(column=>`
            <td data-x="${column}" data-y = ${ROWS}">
                <span>${STATE[column][row].computedValue}</span>
                <input type="text" value="${STATE[column][row].value}"/>
            </td>
            `).join('')}
    </tr>`}).join('')
    //Se dibujo la fila en el td, contando un total de 10 , se realiza ultimo join para quitar las comas separadoras y dentro del th se dibujaron las columnas. 

    $body.innerHTML = bodyHTML

}
$body.addEventListener('click', event =>{
    const td = event.target.closest('td')
    if(!td) return
    const { x, y } = td.dataset
    const input =td.querySelector('input')
    const span =td.querySelector('span')

    const end = input.value.length
    //Pocicion del cursor dentro del input 
    input.setSelectionRange(end, end)
    td.classList.add('editing')
    input.focus()
    
    input.addEventListener('blur', () => {
        console.log({ value: input.value, state: STATE[x][y].value })

        if (input.value === STATE[x][y].value) return

        updateCell({ x, y, value: input.value })
    //Escuchar el evento en el input una sola vez 
    },{once: true})
})
renderSpreadsheets()