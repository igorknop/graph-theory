function MassNode(id){
  this.id = id;
  this.x = 0;
  this.vx = 0;
  this.ax = 0;
  this.y = 0;
  this.vy = 0;
  this.ay = 0;
  this.m = 1;
  this.r = 10;
}

MassNode.prototype.move = function (dt) {
  this.x += dt*this.vx;
  this.vx += dt*this.ax;
  this.y += dt*this.vy;
  this.vy += dt*this.ay;
};

MassNode.prototype.G = 1.0;

MassNode.prototype.repel = function (other) {
  dx = this.x - other.x;
  dy = this.y - other.y;
  this.ax += -(this.G*this.m*other.m)/(dx*dx);
  other.ax += -(this.G*this.m*other.m)/(dx*dx);
};
