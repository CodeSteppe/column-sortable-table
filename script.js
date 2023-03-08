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
  e.dataTransfer.setData('id', this.dataset.id);
  this.classList.add('dragged');
}

function handleDragOver(e) {
  if (e.preventDefault) {
    e.preventDefault();
  }
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
  if (e.stopPropagation) {
    e.stopPropagation();
  }
  const dropTarget = this;
  if (draggedHeader !== dropTarget) {
    const draggedHeaderCurrentIndex = order.indexOf(draggedHeader.dataset.id);
    const dropTargetCurrentIndex = order.indexOf(dropTarget.dataset.id);
    // console.log('move', draggedHeaderCurrentIndex, 'to', dropTargetCurrentIndex);
    const [removedColumn] = order.splice(draggedHeaderCurrentIndex, 1);
    order.splice(dropTargetCurrentIndex, 0, removedColumn);
    // console.log('new order', order);
    sortColumns();
  }
  return false;
}

function handleDragEnd(e) {
  this.classList.remove('over');
  this.classList.remove('dragged');
}

const ths = table.getElementsByTagName('th');

for (let i = 0; i < ths.length; i++) {
  ths[i].addEventListener('dragstart', handleDragStart, false);
  ths[i].addEventListener('dragenter', handleDragEnter, false);
  ths[i].addEventListener('dragover', handleDragOver, false);
  ths[i].addEventListener('dragleave', handleDragLeave, false);
  ths[i].addEventListener('drop', handleDrop, false);
  ths[i].addEventListener('dragend', handleDragEnd, false);
}