import * as shapes from './shapes.js';


class Blocks {
  updateView () {
    this.target.innerHTML = `
      <table>
      ${this.board.map((row, y) => `
        <tr>
        ${row.map((cell, x) => `
          <td style="background-color: ${cell || this.board[y][x] || 'transparent'}"></td>
        `).join('')}
        </tr>
      `).join('')}
      </table>
    `;  
  }
  
  controls (evt) {
    const _this = this;
    
    if (!this.active || !this.active.canContinue()) return;
    
    function clearCurrent () {
      _this.active.shape.forEach((row, y) => {
        row.forEach((cell, x) => {
          _this.board[_this.active.y - 1 + y][_this.active.x + x] = 0;  
        });
      });
    }
    
    switch (evt.keyCode) {
      case 37:
        if (!this.active) return false;
        if (this.active.x === 0) return false;
        
        this.stop();
        clearCurrent();
        --this.active.x;
        this.active.updatePlacement();
        this.start();
        break;
        
      case 39:
        if (!this.active) return false;
        if (this.active.x === this.size - this.active.width ) return false;
        
        this.stop();
        clearCurrent();
        ++this.active.x;
        this.active.updatePlacement();
        this.start();
        break;
        
      case 40:
        if (this.active.y + this.active.height >= this.size) return;
        this.stop();
        clearCurrent();
        ++this.active.y;
        this.active.updatePlacement();
        this.start();
        break;
        
      case 16:
        if (!this.active) return false;
        
        this.stop();
        clearCurrent();
        
        const shape = [];
        for (let i = 0; i < this.active.shape[0].length; i++) {
          const row = [];
          for (let j = 0; j < this.active.shape.length; j++) {
            row.push(this.active.shape[j][i]);
          }
          shape.push(row);
        }
        
        this.active.shape = shape;
        this.active.height = shape.length;
        this.active.width = shape[0].length;
        if (this.active.x + this.active.width > this.size - 1) --this.active.x;
        
        this.active.updatePlacement();
        this.start();
    }
  }
  
  checkForCompleteRow () {
    this.board.forEach((row, y) => {
      const isFull = !row.filter(x => !x).length;
      if (isFull) {
        const chunkToMoveDown = this.board.splice(0, y + 1);
        chunkToMoveDown.pop();
        this.board.unshift(Array(this.size).fill(0), ...chunkToMoveDown);
        this.updateView();
      }
    })
  }
  
  advanceActivePiece () {
    this.active.updatePlacement();
    this.updateView();
  }
  
  generatePiece () {
    const rand = Math.floor(Math.random() * this.shapes.length);
    const shape = this.shapes[rand];
    this.active = new shape(this);
    // this.active = new shapes.ShapeBox(this);
  }
  
  stop () {
    clearInterval(this.playInterval);
  }
  
  start () {
    this.playInterval = setInterval((_this) => {
      if (!_this.active) _this.generatePiece();
      else _this.advanceActivePiece();
    }, this.speed, this);
  }
  
  gameOver () {
    this.stop();
    console.log('game over');
  }
  
  initBoard () {
    return Array(this.size).fill('').map(x => {
      return Array(this.size).fill(0);
    });
  }
  
  eventListeners () {
    addEventListener('keyup', this.controls.bind(this));
  }
  
  constructor (target, options = {}) {
    this.target = target;
    this.size = options.size || 12;
    this.speed = options.speed || 1000;
    this.colors = options.colors || [ '#f04', '#0f8', '#08f', '#80f' ];
    this.board = this.initBoard();
    this.pieces = [];
    this.shapes = [];
    for (const shape in shapes) this.shapes.push(shapes[shape]);
    
    this.updateView();
    this.start();
    this.eventListeners();
  }
}

export default Blocks;