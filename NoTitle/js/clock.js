//设置钟表
myCanvas = {
	//初始化
	init : function(){
		var opts = mix({},this.defaults);
		opts.context.save(); 
		opts.context.translate(200,200);
		this.drawDial(opts);
		this.drawFont(opts);
		this.drawPointer(opts);
		opts.context.restore();
		setTimeout(this.init.bind(this),1000);
	},
	//绘制表盘刻度
	drawDial : function(opts){
		//--------------------------------------表盘
		opts.context.save();
		opts.context.beginPath();
		for(var i=0;i<13;i++){
			var x = Math.sin(i*opts.deg);//sin(0-1)》x变大 加+
			var y = -Math.cos(i*opts.deg);//cos(0-1) > y变小 加-
			opts.context.lineTo(x*150,y*150);
		}
		//为表盘添加渐变色
		var c=opts.context.createRadialGradient(0,0,0,0,0,120);
		c.addColorStop(0,"#95ffe4");
		c.addColorStop(1,"#688aff");
		opts.context.fillStyle=c;
		opts.context.fill();
		opts.context.closePath();
		opts.context.restore();
		//-----------------------------------钟表大刻度
		opts.context.save();
		opts.context.beginPath();
		for (var i = 0;i < 13 ;i++ )
		{
			var x2 = Math.sin(i*opts.deg);
			var y2 = -Math.cos(i*opts.deg);
			opts.context.moveTo(x2*136,y2*136);
			opts.context.lineTo(x2*148,y2*148);
		}
		opts.context.strokeStyle = "#fff";
		opts.context.lineWidth = 5;
		opts.context.stroke();
		opts.context.closePath();
		opts.context.restore();
		//-----------------------------------钟表小刻度
		opts.context.save();
		opts.context.beginPath();
		//60个小刻度
		for (var i = 0;i < 60;i++ )
		{
			var x3 = Math.sin(i*opts.deg1);
			var y3 = -Math.cos(i*opts.deg1);
			opts.context.moveTo(x3*138,y3*138);
			opts.context.lineTo(x3*146,y3*146);
		}
		opts.context.strokeStyle = "#fff";
		opts.context.lineWidth = 2;
		opts.context.stroke();
		opts.context.closePath();
		opts.context.restore();
	},
	//绘制数字文字
	drawFont : function(opts){
		//------------------------------------数字
		opts.context.save();
		opts.context.beginPath();
		opts.context.fillStyle = "#fff";
		opts.context.font = "bold 16px 宋书";
		opts.context.textAlign='center';
		opts.context.textBaseline='middle';
		for (var i = 1;i < 13 ;i++ )
		{
			var x1 = Math.sin(i*opts.deg);
			var y1 = -Math.cos(i*opts.deg);
			opts.context.fillText(i,x1*120,y1*120)
		}
		opts.context.closePath();
		opts.context.restore();
		//------------------------------------文字
		opts.context.save();
		var d = new Date();
		var h = d.getHours();
		var day = d.getDate();
		var month = d.getMonth() + 1;
		var year = d.getFullYear();
		var T = year + "." + month + "." +day ;
		var time = (h >= 12) ? "PM" : "AM";
		opts.context.strokeStyle = "#fff";
		opts.context.font = "13px 微软雅黑";
		opts.context.textAlign='center';
		//context.textBaseline='middle';
		opts.context.strokeText(T + "  " + time,0,65);

		opts.context.restore();
	},
	//绘制指针
	drawPointer : function(opts){
		//-----------------------------------new date()
		//context.save();
		var time = new Date();
		var h = (time.getHours()%12)*2*Math.PI/12;
		var m = (time.getMinutes()%60)*2*Math.PI/60;
		var s = (time.getSeconds()%60)*2*Math.PI/60;
		//----------------------------------秒针
		opts.context.save();
		opts.context.rotate(s);
		opts.context.beginPath();
		opts.context.moveTo(0,20);
		opts.context.lineTo(0,-128);
		opts.context.strokeStyle = "#fff";
		opts.context.lineWidth = 1;
		opts.context.stroke();
		opts.context.closePath();
		opts.context.restore();
		//----------------------------------分针
		opts.context.save();
		opts.context.rotate( m + s/60);
		opts.context.beginPath();
		opts.context.moveTo(0,8);
		opts.context.lineTo(0,-110);
		opts.context.strokeStyle = "#fff";
		opts.context.lineWidth = 3;
		opts.context.stroke();
		opts.context.closePath();
		opts.context.restore();
		//----------------------------------时针
		opts.context.save();
		opts.context.rotate( h + m/60 + s/720);
		opts.context.beginPath();
		opts.context.moveTo(0,8);
		opts.context.lineTo(0,-80);
		opts.context.strokeStyle = "#fff";
		opts.context.lineWidth = 5;
		opts.context.stroke();
		opts.context.closePath();
		opts.context.restore();
	},
};
myCanvas.defaults = {
	canvas:document.getElementById('canvas'),
	context:document.getElementById('canvas').getContext('2d'),
	deg:2*Math.PI/12,
	deg1:2*Math.PI/60,
	width:document.getElementById('canvas').width
}
function mix(target,source){
	var arr = [];
	var args = arr.slice.call(arguments);
	
	var i = 1;
	if(args.length==1){
		return target;
	};

	while((source = args[i++])){
		for(var key in source){
			if(source.hasOwnProperty(key)){
				target[key] = source[key];
			}
		}
	}
	return target;
};