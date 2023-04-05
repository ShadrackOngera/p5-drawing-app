
function SprayCanTool(name, icon, points, spread) {
    this.name = name;
    this.icon = icon;
    this.points = points;
    this.spread = spread;
    
    this.draw = function() {
        //if the mouse is pressed paint on the canvas
        //spread describes how far to spread the paint from the mouse pointer
        //points holds how many pixels of paint for each mouse press.
        if (mouseIsPressed) {
            for (var i = 0; i < this.points; i++) {
                point(random(mouseX - this.spread, mouseX + this.spread), random(mouseY - this.spread, mouseY + this.spread));
            }
        }
    }
}