var canvas  = 0 ;
var context = 0 ;

var w = 800 ;
var h = 450 ;
var margin =  25 ;
var scale  = 1.0 ;
var current_object = 0 ;
var mouse_x = -1 ;
var mouse_y = -1 ;

function movable_object(name,w,h,color){
  this.name = name ;
  this.x  = 0 ;
  this.y  = 0 ;
  this.x0 = 0 ;
  this.y0 = 0 ;
  this.w  = w ;
  this.h  = h ;
  this.fill_color   = color ;
  this.stroke_color = 'rgb(0,0,0)' ;
  
  this.u = function(x){ return margin + scale*x ; }
  this.v = function(y){ return margin + scale*y ; }
  this.draw = function(context){
    context.beginPath() ;
    context.moveTo( this.u(this.x)              , this.v(this.y)              ) ;
    context.lineTo( this.u(this.x)+scale*this.w , this.v(this.y)              ) ;
    context.lineTo( this.u(this.x)+scale*this.w , this.v(this.y)+scale*this.h ) ;
    context.lineTo( this.u(this.x)              , this.v(this.y)+scale*this.h ) ;
    context.lineTo( this.u(this.x)              , this.v(this.y)              ) ;
    context.fillStyle   = this.fill_color ;
    context.strokeStyle = this.stroke_color ;
    context.fill() ;
    context.stroke() ;
  }
}

function fixed_object(name,points){
  this.name = name ;
  this.points = points ;
  this.x = 0 ;
  this.y = 0 ;
  this.stroke_color = 'rgb(0,0,0)' ;
  
  this.draw = function(context){
    context.beginPath() ;
    context.strokeStyle = this.stroke_color ;
    var x = this.x + this.points[this.points.length-1][0] ;
    var y = this.y + this.points[this.points.length-1][1] ;
    var u = margin + scale*x ;
    var v = margin + scale*y ;
    context.moveTo(u,v) ;
    for(var i=0 ; i<this.points.length ; i++){
      x = this.x + this.points[i][0] ;
      y = this.y + this.points[i][1] ;
      u = margin + scale*x ;
      v = margin + scale*y ;
      context.lineTo(u,v) ;
    }
    context.closePath() ;
    context.stroke() ;
  }
}

// All units in cm
var ww = 16 ; // wall width

var movables = [] ;
var fixed    = [] ;
var points   =  0 ;

points = [] ;
{
points.push([  0,  0    ]) ;
points.push([112,  0    ]) ;
points.push([112,    -ww]) ;
points.push([-ww,    -ww]) ;
points.push([-ww, 400+ww]) ;
points.push([ 87, 400+ww]) ;
points.push([ 87, 400   ]) ;
points.push([  0, 400   ]) ;
}
fixed.push(new fixed_object('West_wall',points)) ;

points = [] ;
{
points.push([262,  0]) ;
points.push([262,-ww]) ;
points.push([600,-ww]) ;
points.push([600,  0]) ;
}
fixed.push(new fixed_object('North_wall',points)) ;

points = [] ;
{
points.push([672   ,  0   ]) ;
points.push([672   ,   -ww]) ;
points.push([745+ww,   -ww]) ;
points.push([745+ww,400+ww]) ;
points.push([675   ,400+ww]) ;
points.push([675   ,400   ]) ;
points.push([745   ,400   ]) ;
points.push([745   ,  0   ]) ;
}
fixed.push(new fixed_object('East_wall',points)) ;

points = [] ;
{
points.push([369,400   ]) ;
points.push([566,400   ]) ;
points.push([566,400+ww]) ;
points.push([369,400+ww]) ;
}
fixed.push(new fixed_object('South_wall',points)) ;

points = [] ;
{
points.push([ 87, 400   ]) ;
points.push([ 87, 400+ww]) ;
points.push([369, 400+ww]) ;
points.push([369, 400   ]) ;
}
var window_1 = new fixed_object('Window_1',points) ;
window_1.stroke_color = 'rgb(255,0,0)' ;
fixed.push(window_1) ;

points = [] ;
{
points.push([566, 400   ]) ;
points.push([566, 400+ww]) ;
points.push([675, 400+ww]) ;
points.push([675, 400   ]) ;
}
var window_2 = new fixed_object('Window_2',points) ;
window_2.stroke_color = 'rgb(255,0,0)' ;
fixed.push(window_2) ;

movables.push( new movable_object('sofa'      , 150, 135,'rgba(255,  0,  0,0.5)' )) ;
movables.push( new movable_object('chair'     ,  67,  80,'rgba(100,100,100,0.5)' )) ;
movables.push( new movable_object('Lack'      ,  55,  55,'rgba(255,255,255,0.5)' )) ;
movables.push( new movable_object('shelves_1' ,  80,  28,'rgba(255,255,  0,0.5)' )) ;
movables.push( new movable_object('CD_shelves', 100,  17,'rgba(255,255,255,0.5)' )) ;
movables.push( new movable_object('shelves_2' , 149,  39,'rgba(255,255,255,0.5)' )) ;
movables.push( new movable_object('shelves_3' ,  40,  28,'rgba(255,255,255,0.5)' )) ;
movables.push( new movable_object('shelves_4' ,  80,  28,'rgba(255,255,255,0.5)' )) ;
movables.push( new movable_object('table_1'   ,  74, 118,'rgba(255,200,200,0.5)' )) ;
movables.push( new movable_object('table_2'   ,  75, 120,'rgba(255,200,200,0.5)' )) ;
movables.push( new movable_object('TV'        ,  50, 280,'rgba(  0,  0,  0,0.5)' )) ;
movables.push( new movable_object('island'    ,  62, 227,'rgba(100,100,100,0.5)' )) ;

function update_positions(){
update_movable("sofa",201,231,150,135) ;
update_movable("chair",94,310,67,80) ;
update_movable("Lack",180,219,55,55) ;
update_movable("shelves_1",6,370,80,28) ;
update_movable("CD_shelves",1,1,100,17) ;
update_movable("shelves_2",328,2,149,39) ;
update_movable("shelves_3",478,2,40,28) ;
update_movable("shelves_4",520,2,80,28) ;
update_movable("table_1",431,134,74,118) ;
update_movable("table_2",431,254,75,120) ;
update_movable("TV",1,67,50,280) ;
update_movable("island",559,142,62,227) ;

}

function draw_all(){
  context.fillStyle = 'rgb(255,255,255)' ;
  context.fillRect(0,0,w,h) ;
  for(var i=0 ; i<fixed.length ; i++){
    fixed[i].draw(context) ;
  }
  for(var i=0 ; i<movables.length ; i++){
    movables[i].draw(context) ;
  }
}

function start(){
  canvas  = document.getElementById('canvas_room') ;
  context = canvas.getContext('2d') ;
  canvas.addEventListener('mousedown',mouse_down) ;
  canvas.addEventListener('mousemove',mouse_move) ;
  canvas.addEventListener('mouseup'  ,mouse_up  ) ;
  
  window.oncontextmenu = function() { return false } ;
  
  update_positions() ;
  draw_all() ;
  update_info() ;
}

function select_object_with_mouse(x,y){
  for(var i=movables.length-1 ; i>=0 ; i--){
    var o = movables[i] ;
    if(x>=o.x && x<=o.x+o.w && y>=o.y && y<=o.y+o.h) return o ;
  }
  return 0 ;
}
function rotate_object(o){
  var h = o.h ;
  o.h = o.w ;
  o.w = h ;
}
function mouse_down(evt){
  var u = evt.pageX - evt.target.offsetLeft ;
  var v = evt.pageY - evt.target.offsetTop  ;
  var x = (u-margin)/scale ;
  var y = (v-margin)/scale ;
  current_object = select_object_with_mouse(x,y) ;
  if(!current_object.name) return ;
  
  var rightclick;
  if(!evt) var evt = window.event ;
  if(evt.which) rightclick = (evt.which==3) ;
  else if(evt.button) rightclick = (evt.button==2) ;
  if(rightclick){
    rotate_object(current_object) ;
    draw_all() ;
  }
  else{
    mouse_x = x ;
    mouse_y = y ;
  }
}
function mouse_move(evt){
  if(!current_object.name) return ;
  var u = evt.pageX - evt.target.offsetLeft ;
  var v = evt.pageY - evt.target.offsetTop  ;
  var x = (u-margin)/scale ;
  var y = (v-margin)/scale ;
  var dx = x-mouse_x ;
  var dy = y-mouse_y ;
  current_object.x = current_object.x0 + dx ;
  current_object.y = current_object.y0 + dy ;
  draw_all() ;
}
function mouse_up(evt){
  current_object.x0 = current_object.x ;
  current_object.y0 = current_object.y ;
  current_object = 0 ;
  draw_all() ;
  update_info() ;
}

function update_movable(name,x,y,w,h){
  for(var i=0 ; i<movables.length ; i++){
    if(movables[i].name==name){
      var o = movables[i] ;
      o.x = x ; o.y = y ; o.x0 = x ; o.y0 = y ; o.w = w ; o.h = h ;
      return ;
    }
  }
}

function update_info(){
  var string = [] ;
  for(var i=0 ; i<movables.length ; i++){
    var o = movables[i] ;
    string.push( 'update_movable("' + o.name + '",' + o.x + ',' + o.y + ',' + o.w + ',' + o.h + ') ;\n' ) ;
  }
  var lines = '' ;
  for(var i=0 ; i<string.length ; i++){
    lines = lines + string[i] ;
  }
  document.getElementById('textarea_info').value = lines ;
}
