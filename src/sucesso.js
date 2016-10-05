// OBJETO SUCESSO
var Sucesso = function()
{
	// container principal
	var o = new createjs.Container("sucesso");
	// container dos textos
	var content = new createjs.Container();

	var shadow = new createjs.Shape();
	shadow.alpha = 0.1;

	// label do objeto
	var label = new Label("FASE COMPLETA", Common.modalTitleBlack());
	// fundo sobre o qual os botões estão dispostos
	var background = new Bitmap("background", {width:900, height:500}, preloader.queue, true);
	// botão que confirma as informacoes (*OK)
	var btconfirm = new Bitmap("confirmbutton", {width:192, height:73}, preloader.queue, true);
	btconfirm.on("click", confirmHandler);
	// configurando os botões
	MouseSettings.settings(btconfirm, "normal");

	// CAMPOS
    var format = {format:"bold 35px Jockey One", color:"#333333", align:"center", baseLine:"top", w:middleX, h:middleY, lineHeight:35};

    var str = "Parabéns!\nVocê conseguiu montar a cruzadinha dentro do tempo estipulado.\nAgora você possui " + Common.points + " pontos.\nAvance para a próxima fase.";
    var texto = new Label(str, format);
    texto.regY = texto.getBounds().height * 0.45;

	content.addChild(background, btconfirm, label, texto);

	o.addChild(shadow, content);

	function confirmHandler(event)
	{
		game.removeChild(sucesso);
		sucesso = null;
		
		game.novoLevel();
		
		playSound("pop");
	}

	o.update = function()
	{
		shadow.graphics.clear();
		shadow.graphics.beginFill("#000000").drawRect(0, 0, stage.width, stage.height);

		var maxScale = Math.max(verticalScale, horizontalScale);

		label.set({x : middleX, y : 75 * verticalScale, lineWidth:middleX, font:"bold " + (50 * maxScale) + "px Jockey One"});

		background.set({x:middleX, y:middleY, scaleX:horizontalScale, scaleY:verticalScale});
		
		var textoBounds = texto.getTransformedBounds();
		texto.regY = textoBounds.height * 0.5;
		texto.set({	x:middleX, y:middleY, height:textoBounds.height, lineWidth:window.innerWidth * 0.85, lineHeight: 35 * maxScale, font:"bold " + (35 * maxScale) + "px Jockey One"});
		
		btconfirm.set({x:middleX, y:window.innerHeight * 0.95, scaleX:maxScale, scaleY:maxScale});
	}

	Common.Tween(shadow, "show", {alpha:0.7});

	return o;
}