(function($){
	 _myDialog = {
		init:function(opts){
			var opts = $.extend({},this.defaults,opts)
			var dialog = this.template(opts);
			this._position(dialog);
			if(opts.drag)this._drag(dialog);
			this._risize(dialog);
			this._event(dialog,opts)
			dialog.css({
				width:opts.width,
				height:opts.height,
				content:opts.content,
				background:"",
			})
			return dialog;
		},
		/*创建模版*/
		template:function(opts){
			var $dialog = $("<div class=\"dialog\">"+
				"				<div class=\"head\">"+
				"			    	<p class=\"title\" unselectable=\"on\">"+opts.title+"</p>"+
				"				</div>"+
				"				<div class=\"container\">"+
				"					<p>"+opts.content+"</p>"+
				"					<div class=\"button\">"+
				"						<a href=\"javascript:void(0);\" class=\"sure\">确定</a>"+
				"						<a href=\"javascript:void(0);\" class=\"cancle\">取消</a>"+
				"					</div>"+
				"				</div>"+
				"			</div>");
			//追加到body中
			$("body").append($dialog).append("<div class='shadow'></div>");
			return $dialog;
		},
		/*居中*/
		_position:function(dialog){
			var x = ($(window).width() - dialog.width())/2 + $(document).scrollLeft();
			var y = ($(window).height() - dialog.width())/2 + $(document).scrollTop();
			dialog.css({left:x,top:y});
		},
		_drag:function(dialog){
			dialog.find(".head").mousedown(function(e){
				var x = getXY(e).x - dialog.offset().left ;
				var y = getXY(e).y - dialog.offset().top ;
				$(document).mousemove(function(e){
					var sleft = getXY(e).x - x ;
					var stop = getXY(e).y - y ;
					var maxSleft = $(window).width() - dialog.innerWidth() + $(document).scrollLeft();
					var maxStop = $(window).height() - dialog.innerHeight() + $(document).scrollTop();
					if(sleft <= $(document).scrollLeft()) sleft = $(document).scrollLeft();
					if(stop <= $(document).scrollTop()) stop = $(document).scrollTop();
					if(sleft >= maxSleft)sleft = maxSleft;
					if(stop >= maxStop)stop = maxStop;
					dialog.css({left:sleft,top:stop});
				}).mouseup(function(){
					$(document).off("mousemove");
					$(document).off("mouseup");							
				})
				return false;
			})						
		},
		/*实时居中*/
		_risize:function(dialog){
			$this = this;
			$(window).resize(function(){
				$this._position(dialog)
			})
		},
		/*触发事件*/
		_event:function(dialog,opts){
			dialog.find(".sure").click(function(){
				if(opts.callback)opts.callback.call(this,true);
				dialog.next().remove();
				dialog.remove();
			});
			dialog.find(".cancle").click(function(){
				if(opts.callback)opts.callback.call(this,false);
				dialog.next().remove();
				dialog.remove();
			});
			/*点击阴影层是否关闭*/
			if(opts.shadowClick){
				dialog.next().click(function(){
					$(this).remove();
					dialog.remove();
				})
			}
		}
   };
   /*设置默认属性*/
   _myDialog.defaults = {
   		title:"Here We Go",
   		content:"Here We Go",
   		width:200,
   		height:200,
   		/*是否能拖拽*/
		drag:true,
		/*点击阴影层是否关闭*/
		shadowClick:true,
   }
})(jQuery);