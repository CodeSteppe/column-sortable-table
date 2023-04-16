const table = document.getElementById('my-table');
let order = ['col1', 'col2', 'col3'];
let draggedHeader = null;

function sortColumns() {
  const trs = table.querySelectorAll('tr');
  for (const tr of trs) {
    const columns = [];
    for (const id of order) {
      columns.push(tr.querySelector(`[data-id=${id}]`));
    }
    tr.innerHTML = '';
    for (const column of columns) {
      tr.appendChild(column);
    }
  }
}

function handleDragStart(e) {
  draggedHeader = this;
  e.dataTransfer.effectAllowed = 'move';
  this.classList.add('dragged');
}

function handleDragOver(e) {
  // prevent default to allow drop
  e.preventDefault();
  e.dataTransfer.dropEffect = 'move';
  return false;
}

function handleDragEnter(e) {
  this.classList.add('over');
}

function handleDragLeave(e) {
  this.classList.remove('over');
}

function handleDrop(e) {
  const dropTarget = this;
  dropTarget.classList.remove('over');
  if (draggedHeader !== dropTarget) {
    const draggedHeaderCurrentIndex = order.indexOf(draggedHeader.dataset.id);
    const dropTargetCurrentIndex = order.indexOf(dropTarget.dataset.id);
    // console.log('move', draggedHeaderCurrentIndex, 'to', dropTargetCurrentIndex);
    const [removedColumn] = order.splice(draggedHeaderCurrentIndex, 1);
    order.splice(dropTargetCurrentIndex, 0, removedColumn);
    // console.log('new order', order);
    sortColumns();
  }
}

function handleDragEnd(e) {
  this.classList.remove('dragged');
}

function listenEvents() {
  const ths = table.getElementsByTagName('th');

  for (let i = 0; i < ths.length; i++) {
    ths[i].addEventListener('dragstart', handleDragStart);
    ths[i].addEventListener('dragenter', handleDragEnter);
    ths[i].addEventListener('dragover', handleDragOver);
    ths[i].addEventListener('dragleave', handleDragLeave);
    ths[i].addEventListener('drop', handleDrop);
    ths[i].addEventListener('dragend', handleDragEnd);
  }
}

listenEvents();