class Sort {
    constructor(x, y, width, height) {
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
      this.data = [];
      this.swapping = false;
      this.step = 30;
      this.lowIndex = 0;
      this.lowKey = 0;
    }
  
    shuffle() {
      this.done = false;
      this.currentI = 0;
      this.currentJ = 0;
      this.data = [];
      this.margin = 10;
      // let mX = init ? this.width / 4 : mouseX;
      this.elementWidth = int((this.width * 0.1) / 3); // int((mX - this.x) / 2);
      if (this.elementWidth < 5) this.elementWidth = 5;
      else if (this.width / this.elementWidth < 5)
        this.elementWidth = this.width / 5;
      this.elements = int((this.width - this.margin * 2) / this.elementWidth);
      this.margin = (this.width - this.elements * this.elementWidth) / 2;
  
      for (let i = 0; i < this.elements; i++) {
        const n = int(Math.floor(random(this.height - this.margin - 30)));
  
        this.data.push({
          value: n > 0 ? n : random(10) + 1,
          x: this.x + this.margin + this.elementWidth * i,
          xMove: this.x + this.margin + this.elementWidth * i,
          color: color(random(255), random(255), random(255))
        });
      }
    }
  
    display() {
      fill(' rgba(222, 251, 253, 0.205)');
      rect(this.x, this.y, this.width, this.height);
      for (let i = 0; i < this.elements; i++) {
        fill(this.data[i].color);
        rect(
          this.data[i].xMove,
          this.y + this.height - this.margin,
          this.elementWidth,
          -this.data[i].value
        );
        textSize(12);
        fill(100, 102, 153);
        const textW = int(this.data[i].value) / 2;
        text(
          int(this.data[i].value),
          this.data[i].xMove +
          (this.elementWidth - textWidth(textW.toString())) / 2,
          this.y + this.height - this.margin - this.data[i].value - 10
        );
      }
    }
  
    BubbleSort() {
      this.display();         
      if (this.done) {
        textSize(45);
        fill(0, 102, 153);
        text(
          'Đã sắp xếp !',
          this.x + this.margin + 100,
          this.y + this.margin + 30
        );
        return true;
      }
      if (!this.swapping) {
        for (let i = this.currentI; i < this.elements - 1; i++) {
          this.currentI = i;
          for (let j = this.currentJ; j < this.elements - 1 - i; j++) {
            if (this.data[j].value > this.data[j + 1].value) {
              let title1 = document.querySelector('.condition strong');
              title1.innerHTML = Math.floor(this.data[j].value * 1) + ' < '  + Math.floor(this.data[j + 1].value * 1);
              title1.style.fontSize = '1.3rem';
              title1.style.fontFamily = 'Open Sans, sans-serif';
  
              let title2 = document.querySelector('.countSwap strong');
              title2.innerHTML++;
              title2.style.fontSize = '1.3rem';
              title2.style.fontFamily = 'Open Sans, sans-serif';
              this.swapping = true;
              this.currentJ = j;
              this.swap(j, j + 1);
              return false;
            }
          }
          this.currentJ = 0;
        }
        this.done = true;
      } else {
        this.swap(this.currentJ, this.currentJ + 1);
      }
      return false;
    }
    InsertSort() {
      this.display();         
      if (this.done) {
        textSize(45);
        fill(0, 102, 153);
        text(
          'Đã sắp xếp !',
          this.x + this.margin + 100,
          this.y + this.margin + 30
        );
        return true;
      }
      if (!this.swapping) {
        for (let i = this.currentI; i < 30; i++) {
          let j = i;
          while ((j > 0) && (this.data[j].value < this.data[j-1].value)) {
            let title1 = document.querySelector('.condition strong');
            title1.innerHTML = Math.floor(this.data[j].value * 1) + ' < '  + Math.floor(this.data[j -1].value * 1);
            title1.style.fontSize = '1.3rem';
            title1.style.fontFamily = 'Open Sans, sans-serif';

            let title2 = document.querySelector('.countSwap strong');
            title2.innerHTML++;
            title2.style.fontSize = '1.3rem';
            title2.style.fontFamily = 'Open Sans, sans-serif'
            this.swapping = true;
            this.swap(j, j-1);
            this.done = false;
            return false;
          }
        }
        this.done = true;
      }
      return false;
    }
    
    SelectSort() {
      this.display();
      if (this.done) {
        textSize(45);
        fill(0, 102, 153);
        text(
          'Đã sắp xếp !',
          this.x + this.margin + 100,
          this.y + this.margin + 30
        )
        return true;
      }
      if (!this.swapping) {
        let lowKey;
        let lowIndex;
        
        for (let i = this.currentI; i < 30; i++) {
          lowIndex = i; 
          lowKey = this.data[lowIndex].value;
          let title2 = document.querySelector('.countSwap strong');
          title2.innerHTML = i;
          title2.style.fontSize = '1.3rem';
          title2.style.fontFamily = 'Open Sans, sans-serif'
          for (let j = i; j < 30 ; j++) {
            if (this.data[j].value < lowKey) {
              lowKey = this.data[j].value;
              lowIndex = j;
            }
          }
          if (lowIndex != i) {
            let title1 = document.querySelector('.condition strong');
            title1.innerHTML = Math.floor(this.data[i].value * 1) + ' < '  + Math.floor(this.data[i + 1].value * 1);
            title1.style.fontSize = '1.3rem';
            title1.style.fontFamily = 'Open Sans, sans-serif';


            this.swapping = true;
            this.swap(i, lowIndex);
            return false;
          }

        }
        this.done = true;
      } else {
        this.swap(0, 0);
      }
      return false;
    }

    swap(i, j) {
      this.data[i].xMove += this.step;
      this.data[j].xMove -= this.step;
      if (
        this.data[i].xMove >= this.data[j].x ||
        this.data[j].xMove <= this.data[i].x
      ) {
        const temp = this.data[i];
        this.data[i] = this.data[j];
        this.data[j] = temp;
        this.data[i].xMove = this.data[j].x;
        this.data[j].xMove = this.data[i].x;
        this.data[i].x = this.data[i].xMove;
        this.data[j].x = this.data[j].xMove;
        this.swapping = false;
      }
    }
  }
  
