/*
 *弹出框
  Modal.alert({msg:'111'})
  Modal.confirm({msg:'111'},function(is){console.log(is)})
 **/
var dialog_model = '<div id="dialogModal" class="modal" style=" z-index:1000;"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><h3 >[Title]</h3></div><div class="modal-body"><p>[Message]</p></div><div class="modal-footer"><button type="button" class="btn  btn-org ok" >[BtnOk]</button><button type="button" class="btn btn-default cancel">[BtnCancel]</button></div></div></div></div>'
document.write(dialog_model)
var alr = $("#dialogModal");
var windHeight = $(window).height();
alr.children().css({
	"top":(windHeight/2)-165
})
var ahtml = alr.html();
var Modal = {
	alert:function(options){
		alr.html(ahtml); // 复原
		this._dialog(options);
		alr.fadeIn()
		alr.find('.cancel').hide();
		alr.find('.ok').off('click').on('click',function() {
		  alr.fadeOut()
		});
	},
	confirm:function(options,callback) {
		alr.html(ahtml); // 复原
		this._dialog(options);
		alr.fadeIn()
		alr.find('.cancel').show();
		alr.find('.ok').off('click').on('click',function() {
		    callback && callback(true);
		});
		alr.find('.cancel').off('click').on('click',function() {
		    alr.fadeOut();
		})
	},
	_dialog:function(options){
		var reg = new RegExp("\\[([^\\[\\]]*?)\\]", 'igm');
		alr.html(ahtml); // 复原
		var ops = {
			msg: "数据出错",
			title: "操作提示",
			btnok: "确定",
			btncl: "取消"
		}
		$.extend(ops, options);
		var html = alr.html().replace(reg, function(node, key) {
			return {
				Title: ops.title,
				Message: ops.msg,
				BtnOk: ops.btnok,
				BtnCancel: ops.btncl
			}[key];
		});
		alr.html(html);
	}
}
