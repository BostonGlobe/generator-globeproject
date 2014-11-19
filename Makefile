deploy_css:

	sass common/common.scss common/common.css;
	sass common/igraphic.scss common/igraphic.css;
	cp -f common/*.css /Volumes/www_html/multimedia/graphics/projectFiles/lib/css/0.0.3;
	cp -f common/*.css.map /Volumes/www_html/multimedia/graphics/projectFiles/lib/css/0.0.3;