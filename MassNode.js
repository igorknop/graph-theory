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
  this.ax = 0;
  this.ay = 0;
};

MassNode.prototype.K = 0.000001;
MassNode.prototype.G = 0.3;
MassNode.prototype.C = 0.00005;

MassNode.prototype.repel = function (other) {
  dx = this.x - other.x;
  dy = this.y - other.y;
  d = Math.sqrt(dx*dx+dy*dy);
  f = (this.G*this.m*other.m)/(d*d);
  this.ax  += +f*dx/d/this.m;
  other.ax += -f*dx/d/other.m;
  this.ay  += +f*dy/d/this.m;
  other.ay += -f*dy/d/other.m;
};

MassNode.prototype.attract = function (other,dt) {
  dx = this.x - other.x;
  dy = this.y - other.y;
  this.ax   += -this.K*dx -this.C*this.vx*dt;
  this.ay   += -this.K*dy -this.C*this.vy*dt;
};
