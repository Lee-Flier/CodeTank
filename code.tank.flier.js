Jx().$package(function(J){

	var turnToEast = function(angle) {
		if(angle < 180) {
			this.turnRight(angle);
		} else {
			this.turnLeft(360-angle);
		}
	};

	var turnToWest = function(angle) {
		if(angle < 180) {
			this.turnLeft(180-angle);
		} else {
			this.turnRight(angle-180);
		}
	};

	var turnToNorth = function(angle) {
		if(angle < 90 || angle > 270) {
			this.turnLeft((450-angle)%360);
		} else {
			this.turnRight(angle-90);
		}
	};

	var turnToSouth = function(angle) {
		if(angle < 90 || angle > 270) {
			this.turnRight((angle+90)%360);
		} else {
			this.turnLeft(270-angle);
		}
	};

	Robot = new J.Class({extend : tank.Robot},{

		/**
		*robot主函数
		**/	
		run:function(){
            this.setUI(tank.ui["green"]);
            var pos = this.getPos();
            var fieldSize = this.getBattleFieldSize();
            var tankSize = this.getSize();
            //var spaceSize = (fieldSize[1] - tankSize[1])/2;
            var spaceSize = 250;
            var angle = this.getHeading();

            if(pos[0]<spaceSize) {
            	turnToEast.call(this, angle);
            	this.ahead(spaceSize-pos[0]);
            	angle = 0;
            } else if(fieldSize[0]-pos[0]<spaceSize) {
            	turnToWest.call(this, angle);
            	this.ahead(spaceSize+pos[0]-fieldSize[0]);
            	angle = 180;
            }

            if(pos[1]<spaceSize) {
            	turnToSouth.call(this, angle);
            	this.ahead(spaceSize-pos[1]);
            	angle = 270;
            } else if(fieldSize[1]-pos[1]<spaceSize) {
            	turnToNorth.call(this, angle);
            	this.ahead(spaceSize+pos[1]-fieldSize[1]);
            	angle = 90;
            }

			this.loop(function(){
                this.say("转到你晕~~~~","orange");
				this.setTurn(100000);
				this.ahead(100000);
			});
		},
		onHitWall:function(e){
			this.back(10);
		},
		onHitRobot:function(e){
			if(e.getBearing()<10&&e.getBearing()>-10){
				this.fire(3);
			}
		},
		onScannedRobot:function(e){
			this.fire(3);
		}

	});
});